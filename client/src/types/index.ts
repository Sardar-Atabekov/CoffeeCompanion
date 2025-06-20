export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'hot-drinks' | 'cold-drinks' | 'pastries' | 'desserts';
  image: string;
  available: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderForm {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address: string;
  specialInstructions?: string;
}

export type Language = 'en' | 'ru';

export type Page = 'home' | 'menu' | 'cart';

export interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}
