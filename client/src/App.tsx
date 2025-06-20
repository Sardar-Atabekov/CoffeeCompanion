import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import { FloatingCart } from "./components/layout/floating-cart";
import { HomePage } from "./pages/home";
import { MenuPage } from "./pages/menu";
import { CartPage } from "./pages/cart";
import { scrollToTop } from "./lib/utils";

type Page = 'home' | 'menu' | 'cart';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  useEffect(() => {
    // Set page title and meta description based on current page
    const titles = {
      home: 'Paris Coffee - Fresh Coffee & Desserts Delivery | Кофейня Арома',
      menu: 'Menu - Paris Coffee | Premium Coffee & Pastries',
      cart: 'Your Cart - Paris Coffee | Complete Your Order'
    };

    const descriptions = {
      home: 'Premium coffee shop in Bishkek. Order fresh coffee, desserts, and pastries with fast delivery. Кофейня с доставкой свежего кофе и десертов.',
      menu: 'Explore our menu of premium coffee, cold drinks, fresh pastries, and delicious desserts. Order online for fast delivery in Bishkek.',
      cart: 'Review your order and complete checkout for fresh coffee and pastries delivered to your door in Bishkek.'
    };

    document.title = titles[currentPage];
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[currentPage]);
    }
  }, [currentPage]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-coffee-50">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        
        <main>
          {currentPage === 'home' && (
            <HomePage onNavigateToMenu={() => handleNavigate('menu')} />
          )}
          {currentPage === 'menu' && <MenuPage />}
          {currentPage === 'cart' && (
            <CartPage 
              onNavigateToMenu={() => handleNavigate('menu')}
              onNavigateToHome={() => handleNavigate('home')}
            />
          )}
        </main>

        <FloatingCart onNavigateToCart={() => handleNavigate('cart')} />
        <Footer />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
