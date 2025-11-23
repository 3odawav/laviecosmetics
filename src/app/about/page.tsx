
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="bg-white text-brand-green-dark dark:bg-black dark:text-gray-300">
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-black text-white flex items-center justify-center text-center pt-20">
          <Image
            src="https://i.ibb.co/bgR9Lktf/Whisk-jjzyirwnwgtnxuwotezn5ewlkftm00szkrmytkd.jpg"
            alt="La Vie products display"
            fill
            className="object-cover object-top opacity-30"
          />
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-serif caveat-heading text-brand-pink dark:text-brand-gold">Our Story</h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Bringing Authentic Brazilian Hair Care to the Heart of Egypt.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-5xl mb-6 caveat-heading text-brand-pink dark:text-brand-gold">From Brazil, With Love</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-400 leading-relaxed">
                  <p>
                    LAVIE COSMETICS EGYPT was born from a simple mission: to introduce the revolutionary power of authentic Brazilian hair technology to the Egyptian market. As the official and exclusive distributor of La Vie Professional Brazil, we bridge the gap between world-class innovation and local beauty aspirations.
                  </p>
                  <p>
                    Our journey began with a passion for hair and a belief that everyone deserves to feel confident in their own skin. We saw the transformative results of Brazilian protein treatments and knew we had to share them.
                  </p>
                </div>
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://i.ibb.co/S7BC7SGt/design.png"
                  alt="Woman with beautiful hair"
                  fill
                  className="object-cover object-top"
                  data-ai-hint="beautiful hair"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Quality & Authenticity */}
        <section className="py-20 bg-[#f9f9f9] dark:bg-zinc-900">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                 <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-pink/10 rounded-full mb-6 text-brand-pink dark:bg-brand-gold/10 dark:text-brand-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                </div>
                <h2 className="text-4xl md:text-5xl mb-4 caveat-heading text-brand-pink dark:text-brand-gold">Quality &amp; Authenticity Guaranteed</h2>
                <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                    We are more than just distributors; we are custodians of quality. Every product is certified by Tecso Cosméticos, Brazil, ensuring you receive the genuine, salon-grade formulas that have made La Vie a global leader. Our commitment is to your hair's health and your complete satisfaction.
                </p>
                <Link href="/shop">
                    <Button variant="default" size="lg" className="bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 transition-colors shadow-lg shadow-black/20 hover:shadow-xl">
                        Explore Our Products
                    </Button>
                </Link>
            </div>
        </section>
      </main>
    </div>
  );
}
