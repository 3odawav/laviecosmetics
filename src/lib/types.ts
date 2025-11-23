
export interface Product {
    id: string;
    title: string;
    handle: string;
    price: number;
    description?: string;
    image: string;
    images?: string[];
    tags: string[];
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
