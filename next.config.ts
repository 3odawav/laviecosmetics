import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ❌ تم حذف output: export للسماح بالـ Server Actions والذكاء الاصطناعي
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // ✅ تم تفعيل تحسين الصور (حذفنا unoptimized: true)
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
  // إعدادات تجريبية لحل مشكلة الـ Cross Origin في Project IDX
  experimental: {
    serverActions: {
      allowedOrigins: ['*'], 
    },
  },
};

export default nextConfig;
