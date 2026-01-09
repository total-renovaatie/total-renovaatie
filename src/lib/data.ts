import { db } from "~/server/db";
import type { CategoryWithServices } from "~/server/db/types";

export async function getCategoriesWithServices() {
  const data = await db.query.categories.findMany({
    with: {
      services: true,
    },
  });
  return data as CategoryWithServices[];
}
