import { useState } from 'react';
import { useLanguageStore } from '../store/language-store';
import { translate } from '../lib/utils';
import { menuData } from '../data/menu-data';
import { ProductCard } from '../components/ui/product-card';
import { Button } from '@/components/ui/button';

export function MenuPage() {
  const { language } = useLanguageStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'menu.allItems' },
    { id: 'hot-drinks', name: 'menu.hotDrinks' },
    { id: 'cold-drinks', name: 'menu.coldDrinks' },
    { id: 'pastries', name: 'menu.pastries' },
    { id: 'desserts', name: 'menu.desserts' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? menuData 
    : menuData.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-coffee-50">
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-coffee-800 mb-4">
              {translate('menu.title', language)}
            </h1>
            <p className="text-xl text-coffee-600 max-w-3xl mx-auto">
              {translate('menu.subtitle', language)}
            </p>
          </div>
          
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-coffee-500 text-white border-coffee-500 hover:bg-coffee-600'
                    : 'border-coffee-200 text-coffee-600 hover:border-coffee-500 hover:text-coffee-500'
                }`}
              >
                {translate(category.name, language)}
              </Button>
            ))}
          </div>
          
          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-coffee-400 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
