import { useState } from 'react';
import { useCartStore } from '../store/cart-store';
import { useLanguageStore } from '../store/language-store';
import { translate, formatPrice } from '../lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartPageProps {
  onNavigateToMenu: () => void;
  onNavigateToHome: () => void;
}

export function CartPage({ onNavigateToMenu, onNavigateToHome }: CartPageProps) {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  const { language } = useLanguageStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    specialInstructions: ''
  });

  const deliveryFee = 2.99;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation call within 10 minutes."
    });

    clearCart();
    onNavigateToHome();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-coffee-50">
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-display font-bold text-coffee-800 mb-4">
                {translate('cart.title', language)}
              </h1>
              <p className="text-xl text-coffee-600">
                {translate('cart.subtitle', language)}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center py-12 text-coffee-400">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">{translate('cart.empty', language)}</p>
                <p className="text-sm mt-2">{translate('cart.emptyDesc', language)}</p>
                <Button
                  onClick={onNavigateToMenu}
                  className="mt-4 bg-coffee-500 hover:bg-coffee-600 text-white px-6 py-3"
                >
                  {translate('cart.browseMenu', language)}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50">
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-coffee-800 mb-4">
              {translate('cart.title', language)}
            </h1>
            <p className="text-xl text-coffee-600">
              {translate('cart.subtitle', language)}
            </p>
          </div>
          
          {/* Cart Items */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-coffee-800 mb-6">
              {translate('cart.orderItems', language)}
            </h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-coffee-100 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-coffee-800">{item.name}</h3>
                    <p className="text-coffee-600">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full p-0 border-coffee-200 text-coffee-600 hover:bg-coffee-100"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full p-0 border-coffee-200 text-coffee-600 hover:bg-coffee-100"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-coffee-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="border-t border-coffee-100 pt-6 mt-6">
              <div className="flex justify-between items-center text-lg mb-2">
                <span className="text-coffee-600">{translate('cart.subtotal', language)}</span>
                <span className="font-semibold text-coffee-800">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-lg mb-2">
                <span className="text-coffee-600">{translate('cart.delivery', language)}</span>
                <span className="font-semibold text-coffee-800">{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between items-center text-xl border-t border-coffee-100 pt-4">
                <span className="font-bold text-coffee-800">{translate('cart.total', language)}</span>
                <span className="font-bold text-coffee-500">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-coffee-800 mb-6">
              {translate('cart.deliveryInfo', language)}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="block text-sm font-medium text-coffee-700 mb-2">
                    {translate('cart.firstName', language)}
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="block text-sm font-medium text-coffee-700 mb-2">
                    {translate('cart.lastName', language)}
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-coffee-700 mb-2">
                  {translate('cart.phone', language)}
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500"
                />
              </div>
              
              <div>
                <Label htmlFor="address" className="block text-sm font-medium text-coffee-700 mb-2">
                  {translate('cart.address', language)}
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  rows={3}
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={translate('cart.addressPlaceholder', language)}
                  className="w-full border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500"
                />
              </div>
              
              <div>
                <Label htmlFor="specialInstructions" className="block text-sm font-medium text-coffee-700 mb-2">
                  {translate('cart.specialInstructions', language)}
                </Label>
                <Textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  rows={2}
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  placeholder={translate('cart.instructionsPlaceholder', language)}
                  className="w-full border-coffee-200 focus:ring-coffee-500 focus:border-coffee-500"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-coffee-500 hover:bg-coffee-600 text-white py-4 text-lg font-semibold"
              >
                {translate('cart.placeOrder', language)}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
