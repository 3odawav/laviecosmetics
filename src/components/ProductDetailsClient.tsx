
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
    <div className="min-h-screen bg-zinc-900 text-white pt-20 pb-20">
      <div className="container mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Image Gallery */}
          <motion.div 
            layoutId={`product-image-${product.id}`}
            className="relative aspect-[3/4] w-full bg-zinc-800 rounded-lg overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
                {product.tags && product.tags.length > 0 && (
                    <span className="text-sm uppercase tracking-widest text-gray-300 font-bold mb-2 block">{product.tags.join(', ')}</span>
                )}
              
               <h1 className="text-5xl md:text-6xl font-bold caveat-heading leading-tight">
                {titlePart1}
              </h1>
              {titlePart2 && (
                <h2 className="text-3xl font-serif text-white mt-4">
                  {titlePart2}
                </h2>
              )}

              <p className="text-3xl font-bold text-brand-pink dark:text-brand-gold mt-4 mb-6">
                {product.price.toFixed(2)} EGP
              </p>
            </div>
            
            <Separator className="bg-zinc-700" />
            
            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
                <div className="flex items-center border border-zinc-700 rounded-md">
                    <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-12 w-12 text-white hover:bg-zinc-800">
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                     <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-12 w-12 text-white hover:bg-zinc-800">
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

            <Separator className="bg-zinc-700" />

            {/* Description & Details Accordion */}
            <div className="prose prose-invert max-w-none text-gray-300">
                {product.description && <div dangerouslySetInnerHTML={{ __html: product.description.split('</p>')[0] + '</p>' || '' }} />} 
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-zinc-700">
                <AccordionTrigger className="hover:no-underline text-white">Product Description</AccordionTrigger>
                <AccordionContent>
                    <div className="prose prose-invert max-w-none text-sm text-gray-400"
                        dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-zinc-700">
                <AccordionTrigger className="hover:no-underline text-white">How to Use</AccordionTrigger>
                <AccordionContent>
                  <p>Usage instructions specific to this product will be displayed here. For now, please refer to the product packaging.</p>
                </AccordionContent>
              </AccordionItem>
                <AccordionItem value="item-3" className="border-zinc-700">
                <AccordionTrigger className="hover:no-underline text-white">Ingredients</AccordionTrigger>
                <AccordionContent>
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
