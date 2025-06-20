import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { translations } from '../data/translations';
import { Language } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translate(key: string, language: Language): string {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translation[language] || translation.en || key;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
