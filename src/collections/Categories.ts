import type { CollectionConfig } from "payload";
// src/collections/Categories.ts
export const iconOptions = [
  { label: "Home / Structural", value: "Home" },
  { label: "Construction / Hammer", value: "Hammer" },
  { label: "Boxes / Storage", value: "Boxes" },
  { label: "Design / Layout", value: "LayoutDashboard" },
  { label: "Plumbing / Wrench", value: "Wrench" },
  { label: "Painting / Brush", value: "Paintbrush" },
  { label: "Electrical / Zap", value: "Zap" },
  { label: "Heating / Flame", value: "Flame" },
  { label: "Cooling / Snowflake", value: "Snowflake" },
  { label: "Outdoor / Tree", value: "TreePine" },
  { label: "Garden / Flower", value: "Flower2" },
  { label: "Windows / Grid", value: "Grid3X3" },
  { label: "Safety / Shield", value: "ShieldCheck" },
  { label: "Kitchen / Utensils", value: "Utensils" },
  { label: "Bathroom / Bath", value: "Bath" },
];
export const Categories: CollectionConfig = {
  slug: "categories",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true, localized: true }, // Replaces 3 columns
    { name: "slug", type: "text", required: true, unique: true }, // For your URL filters
    {
      name: "icon",
      type: "text",
      admin: {
        components: {
          Field: "~/components/payload/IconSelect",
        },
        description: "Select the icon to display in the services navigation.",
      },
    },
  ],
};
