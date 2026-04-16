/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ['better-sqlite3'],
};

module.exports = nextConfig;
