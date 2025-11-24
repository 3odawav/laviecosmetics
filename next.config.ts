import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. تم حذف output: 'export' (ضروري جداً)
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'www.eand.com.eg' }
    ],
  },
  // 2. هذا هو الحل للتحذير الذي أرسلته (للسماح لـ IDX)
  experimental: {
    allowedDevOrigins: ['*'], // أو يمكنك وضع رابط البريفيو الخاص بـ IDX هنا
    serverActions: {
      allowedOrigins: ['*'], 
    },
  },
};

export default nextConfig;
