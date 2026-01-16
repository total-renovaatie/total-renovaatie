// src/collections/Globals/SiteSettings.ts
import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
  },
  admin: {
    livePreview: {
      url: ({ locale }) => {
        const localeCode = typeof locale === "object" ? locale?.code : locale;
        return `${process.env.NEXT_PUBLIC_SERVER_URL ?? `http://localhost:3000/${localeCode}`}`;
        // return `${"http://localhost:3000"}/${localeCode}`;
      },
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero Section",
          fields: [
            {
              name: "heroTitle",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "rotatingServices",
              type: "array",
              fields: [{ name: "text", type: "text", localized: true }],
            },
            {
              name: "heroImages",
              type: "array",
              minRows: 6,
              maxRows: 6,
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "aspect",
                  type: "select",
                  defaultValue: "aspect-square",
                  options: [
                    { label: "Vertical (2/3)", value: "aspect-[2/3]" },
                    { label: "Portrait (3/4)", value: "aspect-[3/4]" },
                    { label: "Square", value: "aspect-square" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "About Us",
          fields: [
            {
              name: "aboutTitle",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "aboutDescription",
              type: "textarea",
              required: true,
              localized: true,
            },
          ],
        },
        {
          label: "Services Section",
          fields: [
            {
              name: "servicesTitle",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "servicesDescription",
              type: "textarea",
              required: true,
              localized: true,
            },
          ],
        },
        {
          label: "Work Section",
          fields: [
            {
              name: "workTitle",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "workDescription",
              type: "textarea",
              required: true,
              localized: true,
            },
            {
              name: "viewAllText",
              type: "text",
              defaultValue: "View All",
              localized: true,
            },
          ],
        },
        {
          label: "Contact Section (UI)",
          fields: [
            {
              name: "contactSectionTitle",
              type: "text",
              required: true,
              localized: true,
            },
            { name: "emailButtonText", type: "text", localized: true },
            { name: "whatsappButtonText", type: "text", localized: true },
          ],
        },
        {
          label: "Global Footer Info",
          fields: [
            { name: "supportEmail", type: "text" },
            {
              name: "whatsappNumber",
              type: "text",
              admin: { description: "Format: 32473200030" },
            },
            { name: "address", type: "textarea", localized: true },
            { name: "copyrightText", type: "text", localized: true },
          ],
        },
      ],
    },
  ],
};
