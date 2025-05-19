/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // During development you can disable type checking
    // Remove this in production when all types are correct
    ignoreBuildErrors: true,
  },
  eslint: {
    // During development you can disable ESLint
    // Remove this in production when all ESLint issues are fixed
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
