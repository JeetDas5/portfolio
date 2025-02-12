/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Disable default image optimization
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }
};

export default nextConfig;
