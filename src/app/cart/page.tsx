
'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data for cart items - replace with actual cart state management
const mockCartItems = [
  {
    id: 'hydrating-mask',
    title: 'Brazilian Natural Spices Hair Mask',
    price: 600.0,
    image: 'https://cdn.shopify.com/s/files/1/0692/8406/9466/files/1_7e86b146-b991-4254-9c17-4c3077a9aed1.png?v=1763373574',
    quantity: 1,
  },
  {
    id: 'lavie-brazilian-natural-spices-shampoo-daily-hydrating-hair-shampoo-300ml',
    title: 'Brazilian Natural Spices Shampoo',
    price: 420.0,
    image: 'https://cdn.shopify.com/s/files/1/0692/8406/9466/files/rrrrrr.png?v=1763373571',
    quantity: 2,
  },
];

export default function CartPage() {
    const [cartItems, setCartItems] = React.useState(mockCartItems);
    const router = useRouter();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 50.00; // Example shipping cost
    const total = subtotal + shipping;

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(items => items.map(item => item.id === id ? {...item, quantity: newQuantity} : item));
    };

    const handleRemoveItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        router.push('/checkout');
    }

  return (
    <div className="min-h-screen bg-white text-brand-green-dark dark:bg-black dark:text-gray-300 pt-20">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl caveat-heading text-brand-pink dark:text-brand-gold">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-4">Your cart is empty.</p>
            <Link href="/shop">
              <Button className="bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 transition-colors">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-50 dark:bg-zinc-900 p-4 rounded-lg">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/shop/${item.id}`} className="font-bold hover:underline dark:text-white">{item.title}</Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.price.toFixed(2)} EGP</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                        type="number" 
                        min="1" 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 text-center dark:bg-zinc-800 dark:border-zinc-700"
                    />
                  </div>
                  <p className="font-bold w-24 text-right dark:text-white">{(item.price * item.quantity).toFixed(2)} EGP</p>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="text-gray-500 hover:text-red-500">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg h-fit">
              <h2 className="text-2xl font-serif font-bold mb-6 dark:text-white">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">{subtotal.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold">{shipping.toFixed(2)} EGP</span>
                </div>
                <Separator className="dark:bg-zinc-700" />
                <div className="flex justify-between text-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold dark:text-brand-gold">{total.toFixed(2)} EGP</span>
                </div>
              </div>
              <Button onClick={handleCheckout} className="w-full mt-6 bg-brand-pink text-white dark:bg-brand-gold dark:text-black hover:opacity-90 transition-colors py-6 text-base uppercase tracking-widest">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
