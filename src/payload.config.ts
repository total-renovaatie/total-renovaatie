import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Media } from "./collections/Media";
import { WorkImages } from "./collections/WorkImages";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { Categories } from "./collections/Categories";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  globals: [SiteSettings],
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "French", code: "fr" },
      { label: "Dutch", code: "nl" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Media, WorkImages, Services, Users, Categories],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: {
          clientUploads: true,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
