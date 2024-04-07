/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "INR" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "INR" },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }]
  }
};

module.exports = nextConfig;
