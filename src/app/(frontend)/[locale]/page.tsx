export const dynamic = "force-dynamic";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";
import About from "~/components/about";
import Contact from "~/components/contact";
import configPromise from "@payload-config";
import FloatingActions from "~/components/floating-actions";
import Home from "~/components/home";
import Services from "~/components/services";
import Work from "~/components/work";
import { getCategoriesWithServices, getAllWorkImages } from "~/lib/data";
import ContactMap from "~/components/contact-map";
export default async function HomePage() {
  const locale = await getLocale(); // This gets 'en', 'fr', or 'nl'
  const payload = await getPayload({ config: configPromise });
  const categories = await getCategoriesWithServices(
    locale as "en" | "fr" | "nl",
  );
  const siteSettings = await payload.findGlobal({
    slug: "site-settings",
    locale: locale, // This ensures we get EN, FR, or NL content
    depth: 2,
    next: {
      revalidate: 10800, // Cache for 3 hours
      tags: ["settings"],
    },
  });
  const images = await getAllWorkImages();
  console.log("work images:", images);
  return (
    <>
      <Home initialData={siteSettings} />
      <About initialData={siteSettings} />

      <Services data={categories} locale={locale} settings={siteSettings} />
      <Work
        locale={locale}
        categories={categories}
        workImages={images}
        settings={siteSettings}
      />
      <ContactMap />
      <Contact locale={locale} settings={siteSettings} />
      <FloatingActions />
    </>
  );
}
