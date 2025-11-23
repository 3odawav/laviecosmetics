// src/lib/shopify.ts

import type { Product } from './types';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

interface ShopifyError {
  message: string;
}

interface ShopifyResponse<T> {
  data: T;
  errors?: ShopifyError[];
}

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<ShopifyResponse<T>> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_ACCESS_TOKEN) {
    throw new Error(
      'Shopify domain or access token is not configured in environment variables. Please check your .env.local file.'
    );
  }

  if (SHOPIFY_ACCESS_TOKEN === 'YOUR_ACCESS_TOKEN_HERE') {
    throw new Error(
      'Shopify Access Token is not configured. Please replace "YOUR_ACCESS_TOKEN_HERE" in your .env.local file with a valid Storefront API access token.'
    );
  }

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store', // Use 'no-store' for dynamic data, or configure revalidation
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Shopify Errors:', result.errors);
      throw new Error(
        `Shopify request failed: ${result.errors.map((e: ShopifyError) => e.message).join(', ')}`
      );
    }

    return result;
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw error;
  }
}

const AllProductsQuery = `
  query getProducts {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          tags
          descriptionHtml
        }
      }
    }
  }
`;

const ProductByHandleQuery = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      tags
      descriptionHtml
    }
  }
`;

const mapShopifyProduct = (edge: any): Product => {
  const { node } = edge;
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    image: node.images.edges[0]?.node.url || '/placeholder.png',
    tags: node.tags || [],
    description: node.descriptionHtml,
    images: node.images.edges.map((edge: any) => edge.node.url),
  };
};

export async function getAllProducts(): Promise<Product[]> {
  try {
      const response = await shopifyFetch<{ products: { edges: any[] } }>({
        query: AllProductsQuery,
      });

      if (!response.data.products) {
        return [];
      }

      return response.data.products.edges.map(mapShopifyProduct);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    // In a real app, you might want to return a default/empty state
    // or re-throw the error to be handled by an error boundary.
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
    try {
        const response = await shopifyFetch<{ product: any }>({
            query: ProductByHandleQuery,
            variables: { handle },
        });

        if (!response.data.product) {
            return null;
        }

        const { product } = response.data;
        
        return {
            id: product.id,
            title: product.title,
            handle: product.handle,
            price: parseFloat(product.priceRange.minVariantPrice.amount),
            image: product.images.edges[0]?.node.url || '/placeholder.png',
            images: product.images.edges.map((edge: any) => edge.node.url),
            tags: product.tags || [],
            description: product.descriptionHtml,
        };
    } catch (error) {
        console.error(`Error in getProductByHandle for handle ${handle}:`, error);
        return null;
    }
}