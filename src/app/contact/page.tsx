
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-white text-brand-green-dark dark:bg-black dark:text-gray-300">
      <main className="pt-20">
        {/* Header */}
        <section className="relative py-28 text-center text-white bg-black">
           <Image
            src="https://i.ibb.co/DH0qmKXR/Untitled-16-x-9-in.png"
            alt="Contact us background"
            fill
            className="object-cover opacity-30"
            data-ai-hint="woman hair"
          />
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl mb-4 caveat-heading text-brand-pink dark:text-brand-gold">Contact Us</h1>
            <p className="text-gray-200 max-w-2xl mx-auto font-light">
              We're here to help! Whether you have a question about our products, an order, or anything else, our team is ready to answer all your questions.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-gray-100 dark:bg-zinc-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="bg-white dark:bg-black p-8 rounded-lg shadow-md border border-gray-100 dark:border-zinc-800">
                <h2 className="text-4xl md:text-5xl mb-6 caveat-heading text-brand-pink dark:text-brand-gold">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium dark:text-gray-300">Full Name</label>
                    <Input id="name" placeholder="Your Name" className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium dark:text-gray-300">Email Address</label>
                    <Input id="email" type="email" placeholder="you@example.com" className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                  </div>
                   <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium dark:text-gray-300">Phone Number (Optional)</label>
                    <Input id="phone" type="tel" placeholder="+20 123 456 7890" className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium dark:text-gray-300">Message</label>
                    <Textarea id="message" placeholder="How can we help you?" rows={5} className="dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" />
                  </div>
                  <Button type="submit" className="w-full bg-brand-pink text-white hover:bg-brand-pink/90 py-6 text-base uppercase tracking-widest shadow-lg shadow-black/20 hover:shadow-xl transition-all dark:bg-brand-gold dark:text-black dark:hover:bg-brand-gold/90">
                    Submit Message
                  </Button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="flex flex-col justify-center">
                 <h2 className="text-4xl md:text-5xl mb-8 caveat-heading text-brand-pink dark:text-brand-gold">Get in Touch</h2>
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-brand-pink/10 dark:bg-brand-gold/10 p-3 rounded-full text-brand-pink dark:text-brand-gold">
                            <MapPin className="w-5 h-5"/>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-white">Our Office</h3>
                            <p className="text-gray-600 dark:text-gray-400">P7 Tower - Office 211 - Podium 7, Cairo Festival City, New Cairo, Egypt</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-brand-pink/10 dark:bg-brand-gold/10 p-3 rounded-full text-brand-pink dark:text-brand-gold">
                            <Phone className="w-5 h-5"/>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-white">Phone Support</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                <a href="tel:+201097230130" className="hover:text-brand-pink dark:hover:text-brand-gold transition-colors">+20 109 723 0130</a>
                            </p>
                            <p className="text-xs text-gray-500">Sunday - Thursday, 9 AM - 5 PM</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-brand-pink/10 dark:bg-brand-gold/10 p-3 rounded-full text-brand-pink dark:text-brand-gold">
                            <Mail className="w-5 h-5"/>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-white">Email</h3>
                             <p className="text-gray-600 dark:text-gray-400">
                                <a href="mailto:info@laviecosmetics-eg.com" className="hover:text-brand-pink dark:hover:text-brand-gold transition-colors">info@laviecosmetics-eg.com</a>
                            </p>
                             <p className="text-xs text-gray-500">We reply within 24 hours</p>
                        </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
