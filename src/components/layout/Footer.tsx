'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { theme } = useTheme();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("Footer Form Submitted:", data);
    (e.target as HTMLFormElement).reset();
  };

  const goldLogo = "https://i.ibb.co/xSkmkymJ/9-1.png";
  const whiteLogo = "https://i.ibb.co/xSkmkymJ/9-1.png";
  const logoSrc = theme === 'dark' ? goldLogo : whiteLogo;

  const paymentMethods = [
    { name: "Visa", src: "https://i.ibb.co/9jKj8q3/New-Project.png" },
    { name: "Mastercard", src: "https://i.ibb.co/1fmZ67Q7/New-Project-2.png" },
    { name: "Meeza", src: "https://i.ibb.co/hFRFqh6M/New-Project-3.png"},
    { name: "Fawry", src: "https://i.ibb.co/HT4BqKfG/New-Project-4.png"},
    { name: "Vodafone Cash", src: "https://i.ibb.co/G3tbq6tK/New-Project-5-4.png"},
    { name: "Instapay", src: "https://i.ibb.co/676FkK9F/New-Project-5.png"},
    { name: "Orange Cash", src: "https://i.ibb.co/rRDg77bY/New-Project-1.png"},
    { name: "Etisalat Cash", src: "https://www.eand.com.eg/portal/assets/images/e&money-logo.png" }
  ];

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="text-sm">
            <Link href="/" className="mb-4 inline-block">
                <Image 
                    src={logoSrc}
                    alt="LAVIE COSMETICS" 
                    width={60} 
                    height={60} 
                />
            </Link>
            <p className="leading-relaxed text-gray-400">
              Official and exclusive distributor of La Vie Professional Brazil in Egypt. We bring authentic Brazilian hair technology to the heart of the local market, ensuring certified quality and transformative results.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="text-sm">
            <h4 className="font-serif text-xl font-bold text-white dark:text-brand-gold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-gray-400 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-brand-pink dark:text-brand-gold" />
                <span>P7 Tower - Office 211 - Podium 7, Cairo Festival City - New Cairo</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 shrink-0 text-brand-pink dark:text-brand-gold" />
                <div>
                    <a href="tel:01097230130" className="hover:text-white transition-colors text-gray-400 dark:text-gray-400 dark:hover:text-white">01097230130</a><br/>
                    <a href="https://wa.me/201000025670" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-gray-400 dark:text-gray-400 dark:hover:text-white">WhatsApp: 01000025670</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 shrink-0 text-brand-pink dark:text-brand-gold" />
                <a href="mailto:info@laviecosmetics-eg.com" className="hover:text-white transition-colors text-gray-400 dark:text-gray-400 dark:hover:text-white">info@laviecosmetics-eg.com</a>
              </li>
              <li className="text-xs text-gray-500 pt-2">
                Working Hours: Sunday – Thursday 9 AM – 5 PM
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="text-sm">
            <h4 className="font-serif text-xl font-bold text-white dark:text-brand-gold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 dark:text-gray-300">
              <li><Link href="/shop" className="hover:text-white transition-colors text-gray-400 dark:text-gray-400 dark:hover:text-white">Shop All Products</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors text-gray-400 dark:text-gray-400 dark:hover:text-white">Best Sellers</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors text-gray-400 dark:text-gray-400 dark:hover:text-white">About Us</Link></li>
              <li><Link href="/tracking" className="hover:text-white transition-colors text-gray-400 dark:text-gray-400 dark:hover:text-white">Track Order</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Form */}
          <div className="text-sm">
            <h4 className="font-serif text-xl font-bold text-white dark:text-brand-gold mb-4">Send us a Message</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="email" name="email" placeholder="Your Email" required className="bg-zinc-800 border-zinc-700 text-white focus:border-brand-pink dark:focus:border-brand-gold" />
              <Textarea name="message" placeholder="Your Message" required rows={3} className="bg-zinc-800 border-zinc-700 text-white focus:border-brand-pink dark:focus:border-brand-gold" />
              <Button type="submit" className="w-full bg-brand-pink text-white rounded hover:bg-brand-pink/90 shadow-lg shadow-black/20 hover:shadow-xl transition-all dark:bg-brand-gold dark:text-black dark:hover:bg-brand-gold/90">
                Send Message
              </Button>
            </form>
          </div>

        </div>

        {/* Payment Methods */}
        <div className="border-t border-zinc-800 pt-8 mb-8">
            <div className="max-w-xl mx-auto flex flex-col items-center justify-center">
                <h5 className="text-sm text-gray-400 mb-4">We Accept</h5>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    {paymentMethods.map((method) => (
                         <div key={method.name} className="relative h-8 w-14 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                            <Image 
                                src={method.src} 
                                alt={method.name} 
                                fill
                                className="object-contain"
                                sizes="56px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-center md:text-left text-gray-500">
            © {year} La Vie Cosmetics Egypt. Official Distributor.
          </div>
          
          <div className="text-[10px] uppercase tracking-widest space-x-3 text-gray-400">
            <span>Cruelty-Free</span><span className="opacity-30">|</span>
            <span>Paraben-Free</span><span className="opacity-30">|</span>
            <span>Made in Brazil</span>
          </div>

          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/19DqeX73Kb/?mibextid=wwXIfr" aria-label="Facebook" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/laviecosmetics.eg/#" aria-label="Instagram" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
