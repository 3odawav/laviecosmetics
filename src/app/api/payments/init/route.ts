
import { NextResponse } from 'next/server';
import { initFawryPayment } from '@/services/paymentService';
import type { CartItem, User } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, user }: { items: CartItem[], user: User } = body;

    if (!items || items.length === 0 || !user) {
      return NextResponse.json({ error: 'Missing required payment information' }, { status: 400 });
    }

    const result = await initFawryPayment({ items, customer: user });
    return NextResponse.json(result);

  } catch (error: any) {
    console.error('Payment initiation failed:', error);
    return NextResponse.json({ error: error.message || 'Payment initiation failed' }, { status: 500 });
  }
}
