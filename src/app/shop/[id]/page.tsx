import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/data';

// دي الدالة اللي بتحل مشكلة الـ Build
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/shop" className="text-sm mb-8 inline-block hover:underline text-gray-600 dark:text-gray-400">
          ← Back to Shop
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* صورة المنتج */}
          <div className="aspect-square bg-gray-50 dark:bg-zinc-900 rounded-3xl overflow-hidden relative border border-gray-100 dark:border-zinc-800">
             <img 
               src={product.image} 
               alt={product.title}
               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
             />
          </div>
          
          {/* تفاصيل المنتج */}
          <div className="flex flex-col justify-center space-y-8">
             <div>
               <h2 className="text-brand-pink dark:text-brand-gold text-sm font-bold tracking-widest uppercase mb-2">La Vie Cosmetics</h2>
               <h1 className="text-4xl md:text-5xl font-bold caveat-heading text-gray-900 dark:text-white">{product.title}</h1>
             </div>

             <div className="text-3xl font-bold text-gray-900 dark:text-white font-comfortaa">
               {product.price} EGP
             </div>

             <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
               {product.description}
             </p>
             
             <div className="flex gap-4 pt-4">
                <Link href="/cart" className="flex-1">
                  <Button className="w-full py-6 text-lg rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity">
                    Add to Cart
                  </Button>
                </Link>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
