
export interface Product {
    id: string;
    title: string;
    handle?: string;
    price: number;
    compareAtPrice?: number | null;
    rating?: number;
    reviews?: number;
    image: string;
    hoverImage?: string;
    tags: string[];
    description?: string;
    benefits?: string[];
}
  
export interface VideoContent {
    id: string;
    videoUrl: string;
    poster: string;
    productHandle?: string;
}

export interface CartItem extends Product {
    quantity: number;
}
  
export interface User {
    name: string;
    email: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
