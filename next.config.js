/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "img.clerk.com" },
      { hostname: "hpm58d6xookcs2il.public.blob.vercel-storage.com" },
    ],
  },
};

module.exports = nextConfig;
