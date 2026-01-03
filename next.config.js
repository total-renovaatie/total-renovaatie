import createNextIntlPlugin from "next-intl/plugin";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
const withNextIntl = createNextIntlPlugin();
/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: Dangerously allow production builds to successfully complete
    // even if your project has type errors.
    ignoreBuildErrors: true,
  },
};
export default withNextIntl(config);
