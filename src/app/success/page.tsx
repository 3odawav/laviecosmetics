'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-10 rounded-xl shadow-lg">
        <div>
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white caveat-heading">
            Order Placed Successfully!
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Thank you for your purchase. Your order #LAVIE-12345 is being processed and you will receive a confirmation email shortly.
          </p>
        </div>
        <div className="space-y-4">
          <Button
            onClick={() => router.push('/tracking')}
            className="w-full bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 py-3"
          >
            Track Your Order
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/shop')}
            className="w-full dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
