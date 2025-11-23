
"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/data';

const SLIDES = [
{
type: 'video',
src: 'https://res.cloudinary.com/dvuzdllda/video/upload/v1763793653/sahrana_clip_-2_dkc9rj.mp4',
duration: 8000,
title: "La Vie Professional",
subtitle: "Global Brazilian Haircare Arrives in Egypt",
description: "Experience the power of professional-grade Brazilian protein formulas trusted by salons worldwide.",
cta: "Shop La Vie Protein",
link: "/shop"
},
{
type: 'image',
src: 'https://i.ibb.co/DH0qmKXR/Untitled-16-x-9-in.png',
duration: 5000,
title: "La Vie Shine & Repair",
subtitle: "Instant Nourishment",
description: "Revive your glow with instant nourishment. Lightweight mist, maximum hydration.",
cta: "Shop Shine Spray",
link: "/shop"
},
{
type: 'image',
src: 'https://i.ibb.co/qM2J5hQD/hero2.png',
duration: 5000,
title: "La Vie Deep Hair Mask",
subtitle: "Intense Repair",
description: "Intense repair meets luxury care. Feel your hair's strength return.",
cta: "Shop Hair Mask",
link: "/shop"
}
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, SLIDES[currentSlide].duration);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* ========== HERO SECTION ========== */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {slide.type === 'video' ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-transform ease-linear ${index === currentSlide ? 'scale-100' : 'scale-105'}`}
                    style={{ animationDuration: `${slide.duration}ms`}}
                >
                    <source src={slide.src} type="video/mp4" />
                </video>
                ) : (
                <img
                    src={slide.src}
                    alt={slide.title}
                    className={`w-full h-full object-cover transition-transform ease-linear ${index === currentSlide ? 'scale-100' : 'scale-105'}`}
                    style={{ animationDuration: `${slide.duration}ms`}}
                />
                )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 dark:from-black/80 dark:to-black/50 [background-image:radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.9)_100%)]"></div>

            <div
              className={`absolute inset-0 flex flex-col justify-end pb-24 px-6 md:px-12 container mx-auto pointer-events-none z-20 transition-all duration-1000 transform ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`max-w-2xl text-white pointer-events-auto transition-all duration-1000 delay-500 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="uppercase tracking-widest text-xs font-bold mb-4 block text-brand-green-light dark:text-gray-400">{slide.subtitle}</span>
                <h1 className="text-5xl md:text-7xl mb-6 leading-tight caveat-heading">{slide.title}</h1>
                <p className="text-lg md:text-xl mb-8 opacity-90 font-light leading-relaxed max-w-lg">{slide.description}</p>
                <Link href={slide.link || '/shop'}>
                  <Button className="bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 transition-colors px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-lg shadow-black/20 hover:shadow-xl dark:shadow-brand-gold/20">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ========== CIRCULAR BEST SELLERS STRIP ========== */}
      <section className="py-24 border-b border-gray-100 dark:border-zinc-800 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <Link href="/shop">
            <Button size="lg" className="bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 transition-colors px-10 py-6 rounded-full font-bold uppercase tracking-wider text-lg shadow-lg shadow-black/20 hover:shadow-xl mb-16 dark:shadow-brand-gold/20">Shop All</Button>
          </Link>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group flex flex-col items-center w-36 cursor-pointer">
                <Link href={`/shop/${product.id}`} className="flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-pink dark:group-hover:border-brand-gold transition-all duration-300 shadow-sm">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <p className="mt-3 text-xs font-bold uppercase tracking-widest text-center text-brand-text dark:text-brand-gold group-hover:text-brand-pink dark:group-hover:text-white transition-colors line-clamp-2 h-8">
                        {product.title.replace('LAVIE ', '').split('|')[0]}
                    </p>
                </Link>
                <Link href={`/shop/${product.id}`} className="mt-3">
                    <Button size="sm" className="bg-brand-pink text-white hover:opacity-90 transition-colors rounded-full px-4 py-2 text-xs uppercase tracking-wider">
                        Shop Now
                    </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CERTIFICATE BADGE ========== */}
      <div className="bg-[#f9f9f9] dark:bg-zinc-900 py-16 px-4 text-center border-b border-gray-200 dark:border-zinc-800">
        <h3 className="text-4xl caveat-heading mb-2">Authorized Distributor</h3>
        <p className="text-base text-gray-600 dark:text-gray-400 font-comfortaa">Genuine products imported directly from <span className="font-bold text-brand-text dark:text-gray-200">Tecso Cosméticos, Brazil</span>.</p>
      </div>

      {/* ========== PROFESSIONAL TREATMENT SECTION ========== */}
      <section className="bg-white dark:bg-black">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 relative aspect-square bg-black">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="https://res.cloudinary.com/dvuzdllda/video/upload/v1763790907/sahrana_clip_-1_hbr006.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-20 text-center md:text-left bg-brand-pink/10 dark:bg-brand-pink/10">
            <div className="max-w-md">
              <p className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-4 text-brand-text dark:text-gray-300">Keratin Deep Conditioning</p>
              <h2 className="text-5xl md:text-6xl text-center mb-12 caveat-heading">Natural Spices Hair Mask</h2>
              <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-300 mb-8 leading-relaxed font-comfortaa">Treat your hair to spa-level luxury with our exclusive formula featuring plant-based Brazilian keratin and nourishing Buriti oil.</p>
              <Link href="/shop/hydrating-mask">
                <Button className="bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 transition-colors px-10 py-4 rounded-full font-bold text-base shadow-lg shadow-black/20 hover:shadow-xl dark:shadow-brand-gold/20">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MARQUEE STRIP ========== */}
      <section className="bg-brand-pink dark:bg-brand-gold py-4 overflow-hidden whitespace-nowrap">
        <div className="flex gap-8 animate-marquee text-white dark:text-black font-bold text-sm tracking-widest">
          <span>BRAZILIAN FORMULA</span>
          <span>▪</span>
          <span>SULFATE-FREE</span>
          <span>▪</span>
          <span>PROFESSIONAL QUALITY</span>
          <span>▪</span>
          <span>BRAZILIAN FORMULA</span>
          <span>▪</span>
          <span>SULFATE-FREE</span>
          <span>▪</span>
          <span>PROFESSIONAL QUALITY</span>
          <span>▪</span>
        </div>
      </section>
    </main>
  );
}
