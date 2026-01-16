import { getPayload } from "payload";
import configPromise from "~/payload.config";
import type { Category, Service, WorkImage } from "~/payload-types";
/**
 * Fetches categories and maps services into them.
 */
export async function getCategoriesWithServices(
  locale: "en" | "fr" | "nl" = "en",
) {
  const payload = await getPayload({ config: configPromise });

  // 1. Fetch Categories
  const categoriesReq = await payload.find({
    collection: "categories",
    locale: locale,
    depth: 0,
    pagination: false, // Ensure we get all categories
  });

  // 2. Fetch Services with depth 1
  const servicesReq = await payload.find({
    collection: "services",
    locale: locale,
    depth: 1,
    pagination: false,
  });

  const categories = categoriesReq.docs;
  const services = servicesReq.docs;

  const final = categories.map((category) => {
    // Force current category ID to a Number for strict comparison
    const targetId = Number(category.id);

    const matchedServices = services.filter((service) => {
      const rel = service.category;
      if (!rel) return false;

      // 1. Try to match by Numeric ID (Most common in Postgres)
      const serviceCatId =
        typeof rel === "object" ? Number(rel.id) : Number(rel);
      const isIdMatch = serviceCatId === targetId;

      // 2. Backup: Try to match by Slug (If IDs are acting weird during localization)
      const serviceCatSlug = typeof rel === "object" ? rel.slug : null;
      const isSlugMatch = serviceCatSlug === category.slug;

      return isIdMatch || isSlugMatch;
    });

    return {
      ...category,
      services: matchedServices,
    };
  });

  // Log summary to your terminal to verify counts
  console.log("Check First Image URL:", final[0]?.services[0]?.image?.url);

  return final;
}

/**
 * We define the return type as an array of WorkImage
 */
export async function getAllWorkImages(): Promise<WorkImage[]> {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "work-images",
    depth: 2,
    sort: "-isFavorite",
  });

  return docs;
}
