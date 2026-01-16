import createNextIntlPlugin from "next-intl/plugin";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 */
import "./src/env.js";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add the images configuration here
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/**",
      },
      {
        protocol: "https",
        hostname: "sd6ugp3ku1.ufs.sh", // This is your UploadThing identifier
        pathname: "/f/**",
      },

      {
        protocol: "https",
        hostname: "utfs.io", // Pre-configuring for UploadThing
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh", // This allows all UploadThing subdomains
        pathname: "**",
      },
    ],
  },
};

export default withNextIntl(config);
