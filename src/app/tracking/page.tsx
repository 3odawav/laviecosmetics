'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, PackageCheck, Truck, Home } from 'lucide-react';

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setIsSubmitted(true);
    }
  };

  const timelineSteps = [
    { icon: Package, title: 'Order Placed', date: 'July 25, 2024', complete: true },
    { icon: PackageCheck, title: 'Processing', date: 'July 25, 2024', complete: true },
    { icon: Truck, title: 'Shipped', date: 'July 26, 2024', complete: false },
    { icon: Home, title: 'Delivered', date: 'Est. July 28, 2024', complete: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl caveat-heading text-brand-pink dark:text-brand-gold">Order Tracking</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Enter your order ID to see its status.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md">
          {!isSubmitted ? (
            <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter your Order ID (e.g., LAVIE-12345)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-grow dark:bg-zinc-800 dark:border-zinc-700"
              />
              <Button type="submit" className="bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90">
                Track Order
              </Button>
            </form>
          ) : (
            <div>
              <div className="mb-8 text-center">
                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tracking Order: <span className="text-brand-pink dark:text-brand-gold">{orderId}</span></h2>
                 <p className="text-gray-500 dark:text-gray-400">Estimated Delivery: July 28, 2024</p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Dotted Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-zinc-700" />
                
                <div className="space-y-12">
                    {timelineSteps.map((step, index) => (
                        <div key={index} className="flex items-start gap-6">
                            <div className={`z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${step.complete ? 'bg-brand-pink dark:bg-brand-gold' : 'bg-gray-200 dark:bg-zinc-700'}`}>
                                <step.icon className={`h-6 w-6 ${step.complete ? 'text-white dark:text-black' : 'text-gray-500'}`} />
                            </div>
                            <div>
                                <h3 className={`font-bold ${step.complete ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{step.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{step.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
              <Button variant="link" onClick={() => setIsSubmitted(false)} className="mt-8 text-brand-pink dark:text-brand-gold">Track another order</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
