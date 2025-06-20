import { useState } from 'react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cart-store';
import { useLanguageStore } from '../../store/language-store';
import { translate, formatPrice } from '../../lib/utils';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { language } = useLanguageStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: translate(product.name, language),
      price: product.price,
      image: product.image
    }, quantity);
    setQuantity(1);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img
        src={product.image}
        alt={translate(product.name, language)}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-coffee-800 mb-2">
          {translate(product.name, language)}
        </h3>
        <p className="text-coffee-600 mb-4 text-sm">
          {translate(product.description, language)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-coffee-500">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseQuantity}
              className="w-8 h-8 rounded-full p-0 border-coffee-200 text-coffee-600 hover:bg-coffee-100"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={increaseQuantity}
              className="w-8 h-8 rounded-full p-0 border-coffee-200 text-coffee-600 hover:bg-coffee-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleAddToCart}
              className="bg-coffee-500 hover:bg-coffee-600 text-white px-4 py-2 ml-2"
            >
              {translate('menu.addToCart', language)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
