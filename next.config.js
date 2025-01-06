/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/sw-motors-invoice',
  assetPrefix: '/sw-motors-invoice',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'export',
};

module.exports = nextConfig;
