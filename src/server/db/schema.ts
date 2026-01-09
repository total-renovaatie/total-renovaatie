import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * T3 Pattern: Prefixes tables to avoid collisions.
 * Result: 'total-renovatie_categories'
 */
export const createTable = pgTableCreator((name) => `total-renovatie_${name}`);

// 1. Categories Table (The Filter Tabs)
export const categories = createTable("categories", {
  id: serial("id").primaryKey(),
  // Slugs are used as unique IDs for your filter logic (#structural, #finish)
  slug: text("slug").notNull().unique(),
  // Multilingual names for the tab labels
  nameEn: text("name_en").notNull(),
  nameFr: text("name_fr").notNull(),
  nameNl: text("name_nl").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// 2. Services Table (The Masonry Items)
export const services = createTable(
  "services",
  {
    id: serial("id").primaryKey(),
    // Links the service to a category
    categoryId: integer("category_id")
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
    // Multilingual titles for the image overlays/modals
    titleEn: text("title_en").notNull(),
    titleFr: text("title_fr").notNull(),
    titleNl: text("title_nl").notNull(),
    // The URL returned from UploadThing
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    // Speed up filtering by category on the home page
    categoryIdx: index("category_idx").on(table.categoryId),
  }),
);

/**
 * Drizzle Relations: Allows fetching everything in one clean query.
 */
export const categoriesRelations = relations(categories, ({ many }) => ({
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one }) => ({
  category: one(categories, {
    fields: [services.categoryId],
    references: [categories.id],
  }),
}));
