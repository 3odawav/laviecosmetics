
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const EGYPTIAN_GOVERNORATES = [
  'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia', 'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Matruh', 'Minya', 'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai', 'Suez'
];

export default function CheckoutPage() {
  const router = useRouter();

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/checkout/payment');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-black">
      {/* Left Column - Form */}
      <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:pl-20 xl:pl-24 lg:pr-12">
        <div className="mx-auto w-full max-w-lg">
          <div className="text-left mb-10">
            <h1 className="text-4xl caveat-heading text-brand-pink dark:text-brand-gold mt-2">Shipping Address</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please enter your delivery information.
            </p>
          </div>

           <form onSubmit={handleContinueToPayment} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-gray-300">Full Name</Label>
                <Input id="name" type="text" placeholder="Your Name" required className="mt-1 dark:bg-zinc-800 dark:border-zinc-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-gray-300">Mobile Number</Label>
                <Input id="phone" type="tel" placeholder="+20 123 456 7890" required className="mt-1 dark:bg-zinc-800 dark:border-zinc-700" />
              </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="governorate" className="dark:text-gray-300">Governorate</Label>
                <Select required>
                  <SelectTrigger className="w-full mt-1 dark:bg-zinc-800 dark:border-zinc-700">
                    <SelectValue placeholder="Select a governorate" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-zinc-800 dark:text-white">
                    {EGYPTIAN_GOVERNORATES.map(gov => (
                      <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="city" className="dark:text-gray-300">City / Area</Label>
                <Input id="city" type="text" placeholder="e.g. Nasr City" required className="mt-1 dark:bg-zinc-800 dark:border-zinc-700" />
              </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="dark:text-gray-300">Street Address</Label>
              <Input id="address" type="text" placeholder="123 Main St" required className="mt-1 dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="building" className="dark:text-gray-300">Building, Floor, or Apt No.</Label>
                <Input id="building" type="text" placeholder="Building 10, Apt 301" required className="mt-1 dark:bg-zinc-800 dark:border-zinc-700" />
              </div>

            <div className="flex items-center justify-end pt-4">
              <Button type="submit" className="w-full md:w-auto bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 py-3 px-8 text-base">
                Continue to Payment
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Image & Order Summary */}
      <div className="hidden lg:block relative">
        <div className="sticky top-0 h-screen flex flex-col">
             <div className="absolute inset-0">
                 <Image
                    src="https://i.ibb.co/zVzkJRF/20251123-1819-Floral-Botanical-Pattern-remix-01karr10khe52begq14j0fgbmq.png"
                    alt="Floral Pattern"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center flex-grow p-12">
                <div className="bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-lg shadow-2xl p-8 w-full max-w-md text-gray-800 dark:text-gray-200">
                    <h3 className="text-2xl font-serif font-bold mb-6 text-brand-pink dark:text-brand-gold">Order Summary</h3>
                    <div className="space-y-4">
                        {/* Mock Cart Item */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200 dark:border-zinc-700">
                                    <Image src="https://cdn.shopify.com/s/files/1/0692/8406/9466/files/1_7e86b146-b991-4254-9c17-4c3077a9aed1.png?v=1763373574" alt="Hair Mask" fill className="object-contain" />
                                </div>
                                <div>
                                    <p className="font-semibold">Brazilian Hair Mask</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Qty: 1</p>
                                </div>
                            </div>
                            <p className="font-semibold">600.00 EGP</p>
                        </div>
                         <Separator className="dark:bg-zinc-700" />
                         <div className="space-y-2">
                             <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>600.00 EGP</span>
                             </div>
                              <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>50.00 EGP</span>
                             </div>
                             <Separator className="dark:bg-zinc-700" />
                              <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-brand-pink dark:text-brand-gold">650.00 EGP</span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

    