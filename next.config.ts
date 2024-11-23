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
    APP_CATEGORIES: process.env.APP_CATEGORIES,
    APP_ACCOUNTS: process.env.APP_ACCOUNTS,
    APP_TRANSACTIONS: process.env.APP_TRANSACTIONS,
    APP_ANALIS: process.env.APP_ANALIS,
    APP_REVIEWS: process.env.APP_REVIEWS,
  },
};

export default nextConfig;
