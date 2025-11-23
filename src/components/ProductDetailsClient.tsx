
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart.`);
    // Here you would typically call a context function to update the cart state
  };

  const [titlePart1, titlePart2] = product.title.includes('|')
    ? product.title.split('|').map(s => s.trim())
    : [product.title, ''];
  
  return (
    <div className="min-h-screen bg-white dark:bg-black text-brand-text dark:text-gray-300 pt-20 pb-20">
      <div className="container mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <motion.div 
              layoutId={`product-image-${product.id}`}
              className="relative aspect-[3/4] w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden"
            >
              <Image
                src={activeImage}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(img)} className={`relative aspect-square rounded-md overflow-hidden border-2 ${activeImage === img ? 'border-brand-pink dark:border-brand-gold' : 'border-transparent'}`}>
                    <Image src={img} alt={`${product.title} thumbnail ${idx+1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 sticky top-24">
            <div>
                {product.tags && product.tags.length > 0 && (
                    <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-2 block">{product.tags.join(', ')}</span>
                )}
              
               <h1 className="text-5xl md:text-6xl font-bold caveat-heading leading-tight text-brand-pink dark:text-brand-gold">
                {titlePart1}
              </h1>
              {titlePart2 && (
                <h2 className="text-3xl font-serif text-black dark:text-white mt-4">
                  {titlePart2}
                </h2>
              )}

              <p className="text-3xl font-bold text-brand-text dark:text-brand-gold mt-4 mb-6">
                {product.price.toFixed(2)} EGP
              </p>
            </div>
            
            <Separator className="bg-zinc-200 dark:bg-zinc-700" />
            
            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
                <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-md">
                    <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-12 w-12 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                     <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-12 w-12 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Button 
                    size="lg" 
                    className="flex-1 bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 transition-colors h-12 text-base shadow-lg shadow-black/20 hover:shadow-xl"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </div>

            <Separator className="bg-zinc-200 dark:bg-zinc-700" />

            {/* Description & Details Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-zinc-200 dark:border-zinc-700">
                <AccordionTrigger className="hover:no-underline text-black dark:text-white">Product Description</AccordionTrigger>
                <AccordionContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400"
                        dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-zinc-200 dark:border-zinc-700">
                <AccordionTrigger className="hover:no-underline text-black dark:text-white">How to Use</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  <p>Usage instructions specific to this product will be displayed here. For now, please refer to the product packaging.</p>
                </AccordionContent>
              </AccordionItem>
                <AccordionItem value="item-3" className="border-zinc-200 dark:border-zinc-700">
                <AccordionTrigger className="hover:no-underline text-black dark:text-white">Ingredients</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  <p>A full list of ingredients will be available here soon. All our products are formulated with high-quality, safe ingredients and are paraben-free.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
