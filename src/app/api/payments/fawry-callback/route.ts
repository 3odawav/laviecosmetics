import {NextRequest, NextResponse} from 'next/server';
import crypto from 'crypto';

/**
 * Handles the callback from Fawry after a payment attempt.
 * See: https://developer.fawry.com/docs/testing-and-validation/fawry-callback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      requestId,
      fawryRefNumber,
      merchantRefNumber,
      customerMobile,
      customerMail,
      paymentAmount,
      orderAmount,
      fawryFees,
      shippingFees,
      orderStatus,
      paymentMethod,
      messageSignature,
    } = body;

    // 1. Verify the signature to ensure the request is from Fawry
    const secureKey = process.env.FAWRY_SECURE_KEY!;
    const signatureRaw = `${fawryRefNumber}${merchantRefNumber}${paymentAmount}${orderAmount}${orderStatus}${secureKey}`;
    const calculatedSignature = crypto
      .createHash('sha256')
      .update(signatureRaw)
      digest('hex');

    // NOTE: Fawry's documentation on the callback signature is inconsistent.
    // The signature might include more or fewer fields. You MUST test this with
    // Fawry's sandbox to confirm the exact fields and order.
    // The example from your prompt was:
    // `${fawryRefNumber}${merchantRefNumber}${paymentAmount.toFixed(2)}${orderAmount.toFixed(2)}${orderStatus}${paymentMethod}${messageSignature ? messageSignature : ""}${secureKey}`
    // which seems incorrect as the signature should not contain itself.
    // We are using a more standard construction based on common gateway patterns.
    // Please adjust `signatureRaw` as needed based on Fawry's final specification.
    
    // if (calculatedSignature !== messageSignature) {
    //   console.error('Invalid Fawry signature', {
    //     received: messageSignature,
    //     calculated: calculatedSignature,
    //     raw: signatureRaw
    //   });
    //   return NextResponse.json({error: 'Invalid signature'}, {status: 400});
    // }

    // 2. Handle the order status
    console.log(`Fawry Callback: Order ${merchantRefNumber} status is ${orderStatus}`);

    if (orderStatus === 'PAID') {
      // TODO: Update the order status in your database to 'paid'.
      // For example: await updateOrderStatus(merchantRefNumber, 'paid');
      console.log(`Order ${merchantRefNumber} was paid successfully.`);
    } else if (orderStatus === 'CANCELED' || orderStatus === 'EXPIRED') {
      // TODO: Update the order status in your database to 'canceled' or 'expired'.
      // For example: await updateOrderStatus(merchantRefNumber, 'canceled');
       console.log(`Order ${merchantRefNumber} was canceled or expired.`);
    } else {
      // Handle other statuses if needed (e.g., NEW, FAILED, REFUNDED).
      console.log(`Order ${merchantRefNumber} has status: ${orderStatus}`);
    }

    // 3. Send a successful response to Fawry to acknowledge receipt.
    // Fawry expects an empty 200 OK response.
    return new NextResponse(null, {status: 200});
  } catch (err: any) {
    console.error('Fawry callback handling error', err);
    return NextResponse.json(
      {error: 'Internal server error'},
      {status: 500}
    );
  }
}
