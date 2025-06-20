import { ShoppingCart, Menu } from "lucide-react";
import { useCartStore } from "../../store/cart-store";
import { useLanguageStore } from "../../store/language-store";
import { translate } from "../../lib/utils";
import { LanguageSwitcher } from "../ui/language-switcher";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { getTotalItems } = useCartStore();
  const { language } = useLanguageStore();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-coffee-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-display font-bold text-coffee-600">
                Cafede Paris
              </h1>
              <span className="text-sm text-coffee-400 font-medium">
                Coffee
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => onNavigate("home")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === "home"
                    ? "text-coffee-500"
                    : "text-coffee-700 hover:text-coffee-500"
                }`}
              >
                {translate("nav.home", language)}
              </button>
              <button
                onClick={() => onNavigate("menu")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === "menu"
                    ? "text-coffee-500"
                    : "text-coffee-700 hover:text-coffee-500"
                }`}
              >
                {translate("nav.menu", language)}
              </button>
              <button
                onClick={() => onNavigate("cart")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === "cart"
                    ? "text-coffee-500"
                    : "text-coffee-700 hover:text-coffee-500"
                }`}
              >
                {translate("nav.cart", language)}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("cart")}
              className="relative p-2 text-coffee-600 hover:text-coffee-500"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-coffee-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
