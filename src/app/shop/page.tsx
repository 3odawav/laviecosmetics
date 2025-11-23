
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/types';
import { getAllProducts } from '@/lib/shopify';

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error: any) {
        console.error("Failed to fetch products:", error);
        setError(error.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setTimeout(() => {
      if (product.handle) {
        router.push(`/shop/${product.handle}`);
      }
    }, 1200);
  };
  
    if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to load products</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There was an issue connecting to Shopify. Please ensure your environment variables are set up correctly.
          </p>
          <pre className="text-left bg-gray-100 dark:bg-zinc-900 p-4 rounded-md text-red-500 text-sm overflow-x-auto">
            <code>{error}</code>
          </pre>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20">
        <div className="container mx-auto px-4 md:px-8 py-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="group flex flex-col">
                  <div className="relative aspect-[3/4] w-full bg-zinc-100 dark:bg-zinc-900 rounded-sm animate-pulse"></div>
                  <div className="text-center mt-4">
                    <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded mx-auto mt-2 animate-pulse"></div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      {/* Collection Cover Section */}
      <section className="relative w-full h-[40vh] bg-black text-white flex items-center justify-center text-center mb-16">
          <Image
            src="https://i.ibb.co/YBJVmfDZ/Untitled-png.png"
            alt="Shop Collection"
            fill
            className="object-cover object-center opacity-40"
          />
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl caveat-heading">Shop Collection</h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Discover our premium Brazilian hair care solutions, formulated to transform and protect your hair.
            </p>
          </div>
        </section>

      {/* Products Grid */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => {
             const [pTitlePart1, pTitlePart2] = product.title.includes('|')
                ? product.title.split('|').map(s => s.trim())
                : [product.title, ''];
            
            return (
            <div key={product.id} className="group cursor-pointer flex flex-col" onClick={() => handleProductClick(product)}>
              
              {/* Product Info - Title */}
               <div className="text-center mb-4">
                 <h2 className="text-4xl caveat-heading leading-tight min-h-[4rem]">
                    {pTitlePart1}
                 </h2>
               </div>
              
              {/* Image Container */}
              <motion.div layoutId={`product-image-${product.id}`} className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-zinc-900/5 dark:bg-zinc-900">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                <Button className="absolute bottom-4 left-4 right-4 bg-brand-gold text-white hover:opacity-90 transition-colors backdrop-blur-sm py-3 px-4 text-sm uppercase tracking-widest font-bold opacity-0 translate-y-4 duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg shadow-black/20 hover:shadow-xl">
                  Add to Cart — {product.price.toFixed(2)} EGP
                </Button>
                
                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.tags.map(tag => (
                      <span key={tag} className="bg-brand-text dark:bg-brand-gold dark:text-black text-white text-[10px] px-2 py-1 uppercase tracking-widest font-bold rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info - Price & Subtitle */}
              <div className="text-center mt-4">
                {pTitlePart2 && <p className="font-serif text-lg text-black dark:text-gray-300 mb-1">{pTitlePart2}</p>}
                <div className="font-bold text-base text-brand-text dark:text-gray-400">
                  {product.price.toFixed(2)} EGP
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>

       {/* Magic Spin Animation Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              layoutId={`product-image-${selectedProduct.id}`}
              className="relative w-64 h-64 md:w-96 md:h-96"
              animate={{
                rotate: 720,
                transition: { duration: 1, ease: "easeInOut" },
              }}
            >
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
