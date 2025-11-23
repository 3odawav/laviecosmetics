import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/lib/shopify'; // استدعاء دالة شوبيفاي

// الصفحة دي لازم تكون Server Component عشان تجيب البيانات وقت الـ Build
export default async function ShopPage() {
  // هنا بنجيب المنتجات الحقيقية من شوبيفاي
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12">
      {/* Collection Cover Section */}
      <section className="relative w-full h-[40vh] bg-black text-white flex items-center justify-center text-center mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-40">
             <img src="https://i.ibb.co/YBJVmfDZ/Untitled-png.png" alt="Cover" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl caveat-heading mb-4">Shop Collection</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
              Discover our premium Brazilian hair care solutions, direct from Shopify.
            </p>
          </div>
      </section>

      {/* Products Grid */}
      <div className="container mx-auto px-4 md:px-8">
        {products.length === 0 ? (
           <div className="text-center py-20 text-xl text-gray-500">
             Loading products from Shopify... or no products found.
           </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product: any) => (
            <div key={product.id} className="group cursor-pointer flex flex-col">
              
              {/* Product Title */}
               <Link href={`/shop/${product.handle}`} className="text-center mb-4 block">
                 <h2 className="text-3xl caveat-heading leading-tight min-h-[3rem] hover:text-brand-pink transition-colors">
                   {product.title}
                 </h2>
               </Link>
              
              {/* Image Container */}
              <Link href={`/shop/${product.handle}`} className="block relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button className="w-full bg-brand-gold text-black font-bold uppercase tracking-widest hover:bg-white">
                        View Details
                    </Button>
                </div>
              </Link>

              {/* Price */}
              <div className="text-center mt-4">
                <div className="font-bold text-lg text-brand-text dark:text-brand-gold">
                  {product.price} {product.currency}
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
