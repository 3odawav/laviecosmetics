
'use server';

import axios from 'axios';
import crypto from 'crypto';
import type { CartItem, User } from '@/lib/types';

// Define the shape of the payment initiation result
export interface InitPaymentResult {
  provider: string;
  paymentId: string;
  redirectUrl?: string;
  referenceCode?: string;
  raw: any; // Raw provider response
}

interface InitPaymentPayload {
    items: CartItem[];
    customer: User;
}

// Ensure environment variables are loaded
const FAWRY_MERCHANT_CODE = process.env.FAWRY_MERCHANT_CODE;
const FAWRY_SECURE_KEY = process.env.FAWRY_SECURE_KEY;
const FAWRY_BASE_URL = process.env.FAWRY_BASE_URL;
const NEXT_PUBLIC_CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL;


/**
 * Initiates a payment with Fawry.
 * @param payload - The payment details.
 * @returns The result of the payment initiation.
 */
export async function initFawryPayment(payload: InitPaymentPayload): Promise<InitPaymentResult> {
  if (!FAWRY_MERCHANT_CODE || !FAWRY_SECURE_KEY || !FAWRY_BASE_URL) {
    throw new Error('Fawry environment variables are not configured.');
  }

  const { items, customer } = payload;
  const orderId = `LAVIE-${Date.now()}`;
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 1. Create the signature for the Fawry request
  const signatureRaw = `${FAWRY_MERCHANT_CODE}${orderId}${totalAmount.toFixed(2)}EGP${FAWRY_SECURE_KEY}`;
  const signature = crypto.createHash('sha256').update(signatureRaw).digest('hex');

  // 2. Prepare the request body for Fawry API
  const requestBody = {
    merchantCode: FAWRY_MERCHANT_CODE,
    merchantRefNum: orderId,
    customerName: customer.name,
    customerMobile: '01234567890', // Placeholder, should be from user profile
    customerEmail: customer.email,
    amount: totalAmount.toFixed(2),
    currencyCode: 'EGP',
    chargeItems: items.map(item => ({
        itemId: item.id,
        description: item.title,
        price: item.price.toFixed(2),
        quantity: item.quantity,
    })),
    signature,
    paymentMethod: 'CARD', // Or 'PAYATFAWRY' for reference code
    description: `Order ${orderId} for ${customer.email}`,
    returnUrl: NEXT_PUBLIC_CALLBACK_URL, // Fawry will redirect here
  };

  try {
    // 3. Make the API call to Fawry
    const { data } = await axios.post(`${FAWRY_BASE_URL}/ECommerceWeb/Fawry/payments/charge`, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // 4. Map the Fawry response to our standard format
    if (data.statusCode !== 200) {
      throw new Error(data.statusDescription || 'Fawry payment initiation failed');
    }

    return {
      provider: 'fawry',
      paymentId: data.merchantRefNumber,
      redirectUrl: data.redirectionUrl,
      referenceCode: data.referenceNumber,
      raw: data,
    };
  } catch (error: any) {
    console.error("Fawry API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.statusDescription || 'Failed to initiate payment with Fawry.');
  }
}
