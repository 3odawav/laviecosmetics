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

const EGYPTIAN_GOVERNORATES = [
  'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia', 'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Matruh', 'Minya', 'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai', 'Suez'
];

export default function CheckoutPage() {
  const router = useRouter();

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate the form
    router.push('/checkout/payment');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl caveat-heading text-brand-pink dark:text-brand-gold">Shipping Details</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please provide your delivery address.
            </p>
          </div>

          <form onSubmit={handleContinueToPayment} className="space-y-6 bg-gray-50 dark:bg-zinc-900 p-8 rounded-lg">
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
                <Label htmlFor="building" className="dark:text-gray-300">Building, Floor, or Apartment No.</Label>
                <Input id="building" type="text" placeholder="Building 10, Floor 3, Apt 301" required className="mt-1 dark:bg-zinc-800 dark:border-zinc-700" />
              </div>

            <div className="flex items-center justify-end pt-4">
              <Button type="submit" className="w-full md:w-auto bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 py-3 px-8">
                Continue to Payment
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
