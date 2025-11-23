
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { SiVodafone } from 'react-icons/si';

const EGYPTIAN_GOVERNORATES = [
  'Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia', 'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Matruh', 'Minya', 'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai', 'Suez'
];

type PaymentMethod = 'card' | 'wallet' | 'fawry' | 'cod';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const router = useRouter();

  const handlePlaceOrder = () => {
    // Here you would typically process the payment and save the order.
    // For this example, we'll just navigate to a success page.
    router.push('/success');
  };

  const PaymentMethodLogos = () => (
    <div className="flex items-center space-x-2">
      <Image src="https://i.ibb.co/L9bCjY9/Meeza-logo-vector-01.png" alt="Meeza" width={40} height={24} className="object-contain" />
      <FaCcVisa className="text-blue-600" size={24} />
      <FaCcMastercard className="text-red-600" size={24} />
      <Image src="https://i.ibb.co/3W6f5fS/fawry-logo.png" alt="Fawry" width={50} height={24} className="object-contain" />
      <SiVodafone className="text-red-500" size={24} />
       <Image src="https://i.ibb.co/yY1Z3yV/instapay-logo-A1-A4-A3-D10-F-seeklogo-com.png" alt="Instapay" width={50} height={24} className="object-contain" />
    </div>
  );

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-black">
      {/* Left Column - Form */}
      <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-lg">
          <div className="text-center mb-10">
            <h1 className="text-4xl caveat-heading text-brand-pink dark:text-brand-gold">Checkout</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Complete your order with just a few steps.
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step >= 1 ? 'bg-brand-pink dark:bg-brand-gold dark:text-black' : 'bg-gray-300 dark:bg-zinc-700'}`}>1</div>
              <p className={`ml-2 font-medium ${step >= 1 ? 'text-brand-pink dark:text-brand-gold' : 'text-gray-500'}`}>Shipping</p>
            </div>
            <Separator className="w-16 mx-4 bg-gray-300 dark:bg-zinc-700" />
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step >= 2 ? 'bg-brand-pink dark:bg-brand-gold dark:text-black' : 'bg-gray-300 dark:bg-zinc-700'}`}>2</div>
              <p className={`ml-2 font-medium ${step >= 2 ? 'text-brand-pink dark:text-brand-gold' : 'text-gray-500'}`}>Payment</p>
            </div>
          </div>

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="dark:text-gray-300">Full Name</Label>
                <Input id="name" type="text" placeholder="Your Name" className="mt-1 dark:bg-zinc-900 dark:border-zinc-700" />
              </div>
              <div>
                <Label htmlFor="phone" className="dark:text-gray-300">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+20 123 456 7890" className="mt-1 dark:bg-zinc-900 dark:border-zinc-700" />
              </div>
              <div>
                <Label htmlFor="city" className="dark:text-gray-300">Governorate</Label>
                <Select>
                  <SelectTrigger className="w-full mt-1 dark:bg-zinc-900 dark:border-zinc-700">
                    <SelectValue placeholder="Select a governorate" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-zinc-800 dark:text-white">
                    {EGYPTIAN_GOVERNORATES.map(gov => (
                      <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="address" className="dark:text-gray-300">Street Address</Label>
                <Input id="address" type="text" placeholder="123 Main St, Apt 4B" className="mt-1 dark:bg-zinc-900 dark:border-zinc-700" />
              </div>
              <Button onClick={() => setStep(2)} className="w-full bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 py-3">
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-6">
              <RadioGroup defaultValue="card" onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                <div className="space-y-4">
                  {/* Credit Card */}
                  <Label htmlFor="card" className="flex items-center justify-between p-4 border rounded-lg cursor-pointer has-[:checked]:border-brand-pink has-[:checked]:dark:border-brand-gold dark:border-zinc-700">
                    <div className="flex items-center space-x-4">
                       <RadioGroupItem value="card" id="card" />
                       <span className="font-medium dark:text-white">Credit/Debit Card</span>
                    </div>
                    <PaymentMethodLogos />
                  </Label>
                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-2 gap-4 p-4 border border-t-0 rounded-b-lg border-gray-200 dark:border-zinc-700 -mt-4">
                       <Input placeholder="Card Number" className="col-span-2 dark:bg-zinc-800 dark:border-zinc-600" />
                       <Input placeholder="MM / YY" className="dark:bg-zinc-800 dark:border-zinc-600" />
                       <Input placeholder="CVC" className="dark:bg-zinc-800 dark:border-zinc-600" />
                    </div>
                  )}
                  {/* Other methods */}
                  <Label htmlFor="wallet" className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:border-brand-pink has-[:checked]:dark:border-brand-gold dark:border-zinc-700">
                     <RadioGroupItem value="wallet" id="wallet" />
                     <span className="ml-4 font-medium dark:text-white">Mobile Wallets</span>
                  </Label>
                   <Label htmlFor="fawry" className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:border-brand-pink has-[:checked]:dark:border-brand-gold dark:border-zinc-700">
                     <RadioGroupItem value="fawry" id="fawry" />
                     <span className="ml-4 font-medium dark:text-white">Fawry Pay</span>
                  </Label>
                   <Label htmlFor="cod" className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:border-brand-pink has-[:checked]:dark:border-brand-gold dark:border-zinc-700">
                     <RadioGroupItem value="cod" id="cod" />
                     <span className="ml-4 font-medium dark:text-white">Cash on Delivery</span>
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(1)} className="dark:text-gray-300 dark:hover:text-white">
                  &larr; Back to Shipping
                </Button>
                <Button onClick={handlePlaceOrder} className="bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 py-3">
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Image & Order Summary */}
      <div className="hidden lg:block relative">
        <Image
          src="https://i.ibb.co/zVzkJRF/20251123-1819-Floral-Botanical-Pattern-remix-01karr10khe52begq14j0fgbmq.png"
          alt="Floral Pattern"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center p-12">
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-lg shadow-2xl p-8 max-w-md w-full text-gray-800 dark:text-gray-200">
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
  );
}
