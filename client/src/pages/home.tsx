import { useLanguageStore } from '../store/language-store';
import { translate } from '../lib/utils';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Heart } from 'lucide-react';

interface HomePageProps {
  onNavigateToMenu: () => void;
}

export function HomePage({ onNavigateToMenu }: HomePageProps) {
  const { language } = useLanguageStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-800/80 to-coffee-600/60"></div>
        <div 
          className="absolute inset-0 bg-center bg-cover" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
            {translate('hero.title', language)}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {translate('hero.subtitle', language)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onNavigateToMenu}
              size="lg"
              className="bg-coffee-500 hover:bg-coffee-600 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all"
            >
              {translate('hero.orderNow', language)}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-coffee-800 px-8 py-4 text-lg font-semibold transition-all"
            >
              {translate('hero.learnMore', language)}
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-coffee-800 mb-6">
                {translate('about.title', language)}
              </h2>
              <p className="text-lg text-coffee-600 mb-6 leading-relaxed">
                {translate('about.description1', language)}
              </p>
              <p className="text-lg text-coffee-600 mb-8 leading-relaxed">
                {translate('about.description2', language)}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-coffee-500 mb-2">1000+</div>
                  <div className="text-coffee-600">{translate('about.happyCustomers', language)}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-coffee-500 mb-2">15+</div>
                  <div className="text-coffee-600">{translate('about.coffeeVarieties', language)}</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Coffee beans" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Latte art" 
                className="rounded-lg shadow-lg mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Fresh pastries" 
                className="rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Coffee shop interior" 
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Advantages Section */}
      <section className="py-20 bg-coffee-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-coffee-800 mb-4">
              {translate('advantages.title', language)}
            </h2>
            <p className="text-xl text-coffee-600 max-w-3xl mx-auto">
              {translate('advantages.subtitle', language)}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-coffee-500" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-4">
                {translate('advantages.fastDelivery', language)}
              </h3>
              <p className="text-coffee-600">
                {translate('advantages.fastDeliveryDesc', language)}
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-coffee-500" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-4">
                {translate('advantages.premiumQuality', language)}
              </h3>
              <p className="text-coffee-600">
                {translate('advantages.premiumQualityDesc', language)}
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-coffee-500" />
              </div>
              <h3 className="text-xl font-semibold text-coffee-800 mb-4">
                {translate('advantages.madeWithLove', language)}
              </h3>
              <p className="text-coffee-600">
                {translate('advantages.madeWithLoveDesc', language)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
