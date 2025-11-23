
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type PaymentMethod = 'card' | 'wallet' | 'instapay' | 'fawry' | 'cod';

const paymentLogos = {
    cards: [
        { name: "Meeza", src: "https://i.ibb.co/hFRFqh6M/New-Project-3.png"},
        { name: "Visa", src: "https://i.ibb.co/9jKj8q3/New-Project.png" },
        { name: "Mastercard", src: "https://i.ibb.co/1fmZ67Q7/New-Project-2.png" },
    ],
    wallets: [
        { name: "Vodafone Cash", src: "https://i.ibb.co/G3tbq6tK/New-Project-5-4.png"},
        { name: "Orange Cash", src: "https://i.ibb.co/rRDg77bY/New-Project-1.png"},
        { name: "Etisalat Cash", src: "https://www.eand.com.eg/portal/assets/images/e&money-logo.png"},
        { name: "WE Pay", src: "https://i.ibb.co/G3tbq6tK/New-Project-5-4.png"}, // placeholder
    ],
    gateways: [
        { name: "Fawry", src: "https://i.ibb.co/HT4BqKfG/New-Project-4.png"},
    ],
    fintech: [
      { name: "Instapay", src: "https://i.ibb.co/676FkK9F/New-Project-5.png"},
    ]
};

export default function CheckoutPaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const router = useRouter();

  const handlePlaceOrder = () => {
    // Here you would typically process the payment and save the order.
    // For this example, we'll just navigate to a success page.
    router.push('/success');
  };

  const PaymentMethodLogos = ({ methods }: { methods: {name: string, src: string}[]}) => (
    <div className="flex items-center space-x-2">
      {methods.map(method => (
        <div key={method.name} className="relative h-6 w-10">
          <Image src={method.src} alt={method.name} fill className="object-contain" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-black">
      {/* Left Column - Form */}
      <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-lg">
          <div className="text-left mb-10">
            <Button variant="link" onClick={() => router.back()} className="px-0 dark:text-gray-300">&larr; Back to Shipping</Button>
            <h1 className="text-4xl caveat-heading text-brand-pink dark:text-brand-gold mt-2">Payment</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Choose your preferred payment method.
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="card" className="w-full space-y-4">
              {/* Credit/Debit Card */}
              <AccordionItem value="card" className="border dark:border-zinc-700 rounded-lg">
                  <AccordionTrigger className="p-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                           <span className="font-medium dark:text-white">Credit/Debit Card</span>
                           <PaymentMethodLogos methods={paymentLogos.cards} />
                      </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 border-t dark:border-zinc-700">
                      <div className="grid grid-cols-2 gap-4">
                           <Input placeholder="Card Number" className="col-span-2 dark:bg-zinc-800 dark:border-zinc-600" />
                           <Input placeholder="MM / YY" className="dark:bg-zinc-800 dark:border-zinc-600" />
                           <Input placeholder="CVC" className="dark:bg-zinc-800 dark:border-zinc-600" />
                      </div>
                  </AccordionContent>
              </AccordionItem>

              {/* Mobile Wallets */}
              <AccordionItem value="wallet" className="border dark:border-zinc-700 rounded-lg">
                   <AccordionTrigger className="p-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                           <span className="font-medium dark:text-white">Mobile Wallets</span>
                           <PaymentMethodLogos methods={paymentLogos.wallets} />
                      </div>
                  </AccordionTrigger>
                   <AccordionContent className="p-4 border-t dark:border-zinc-700">
                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Enter your wallet number to request payment.</p>
                       <Input placeholder="e.g. 01012345678" className="dark:bg-zinc-800 dark:border-zinc-600" />
                  </AccordionContent>
              </AccordionItem>

               {/* Instapay */}
              <AccordionItem value="instapay" className="border dark:border-zinc-700 rounded-lg">
                   <AccordionTrigger className="p-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                           <span className="font-medium dark:text-white">Instapay</span>
                           <PaymentMethodLogos methods={paymentLogos.fintech} />
                      </div>
                  </AccordionTrigger>
                   <AccordionContent className="p-4 border-t dark:border-zinc-700 text-center">
                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scan QR code with the Instapay app or pay to <b className="text-brand-pink dark:text-brand-gold">@lavie.eg</b></p>
                        <div className="flex justify-center">
                           {/* Placeholder for QR Code */}
                           <div className="w-40 h-40 bg-gray-200 dark:bg-zinc-800 flex items-center justify-center rounded-md">
                               <p className="text-xs text-gray-500">QR Code</p>
                           </div>
                       </div>
                  </AccordionContent>
              </AccordionItem>

               {/* Fawry Pay */}
              <AccordionItem value="fawry" className="border dark:border-zinc-700 rounded-lg">
                   <AccordionTrigger className="p-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                           <span className="font-medium dark:text-white">Fawry Pay</span>
                           <PaymentMethodLogos methods={paymentLogos.gateways} />
                      </div>
                  </AccordionTrigger>
                   <AccordionContent className="p-4 border-t dark:border-zinc-700">
                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">You will receive a reference code to pay at any Fawry machine within 24 hours.</p>
                        <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-zinc-800 rounded-md">
                           <p className="text-lg font-mono tracking-widest">REF: 123-456-789</p>
                       </div>
                  </AccordionContent>
              </AccordionItem>
              
               {/* Cash on Delivery */}
              <AccordionItem value="cod" className="border dark:border-zinc-700 rounded-lg">
                   <AccordionTrigger className="p-4 hover:no-underline">
                       <span className="font-medium dark:text-white">Cash on Delivery (COD)</span>
                  </AccordionTrigger>
                   <AccordionContent className="p-4 border-t dark:border-zinc-700">
                       <p className="text-sm text-gray-500 dark:text-gray-400">Pay with cash when your order is delivered to your doorstep.</p>
                  </AccordionContent>
              </AccordionItem>
          </Accordion>
          
          <div className="mt-8">
            <Button onClick={handlePlaceOrder} className="w-full bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 py-3 text-lg">
              Place Order
            </Button>
          </div>
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

    