import { useCartStore } from '../../store/cart-store';
import { useLanguageStore } from '../../store/language-store';
import { translate, formatPrice } from '../../lib/utils';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingCartProps {
  onNavigateToCart: () => void;
}

export function FloatingCart({ onNavigateToCart }: FloatingCartProps) {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const { language } = useLanguageStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-coffee-600 text-white p-4 shadow-lg z-40 transform transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-coffee-500 rounded-full p-2">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold">
              {totalItems} {translate('floatingCart.itemsAdded', language)}
            </div>
            <div className="text-coffee-200 text-sm">
              {translate('floatingCart.readyForCheckout', language)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="font-bold text-lg">{formatPrice(totalPrice)}</div>
            <div className="text-coffee-200 text-sm">
              {translate('floatingCart.plusDelivery', language)}
            </div>
          </div>
          <Button
            onClick={onNavigateToCart}
            className="bg-white text-coffee-600 hover:bg-coffee-50 px-6 py-3 font-semibold"
          >
            {translate('floatingCart.viewOrder', language)}
          </Button>
        </div>
      </div>
    </div>
  );
}
