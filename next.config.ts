import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    SITE_NAME: process.env.SITE_NAME,
    APP_URL: process.env.APP_URL,
    SITE_DESCRIPTION: process.env.SITE_DESCRIPTION,
  },
};

export default nextConfig;
