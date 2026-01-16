import { type CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: true, // Crucial: This enables file handling
  access: {
    read: () => true, // Allows anyone to view your renovation photos
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
