
import React from 'react';
import { getProductByHandle, getAllProducts } from '@/lib/shopify';
import ProductDetailsClient from '@/components/ProductDetailsClient';
import { notFound } from 'next/navigation';

// This function tells Next.js which dynamic pages to build at export time.
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    id: product.handle,
  }));
}

// This is the Server Component for the product detail page.
export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  // Fetch the specific product for this page using its handle (the 'id' from the URL)
  const product = await getProductByHandle(id);

  // If no product is found for the given handle, show a 404 page.
  if (!product) {
    return notFound();
  }

  // Pass the fetched product data to a Client Component to handle interactions.
  return <ProductDetailsClient product={product} />;
}
