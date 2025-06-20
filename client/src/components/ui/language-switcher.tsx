import { useLanguageStore } from '../../store/language-store';
import { Language } from '../../types';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded font-medium transition-colors ${
          language === 'en'
            ? 'bg-coffee-100 text-coffee-600'
            : 'text-coffee-400 hover:text-coffee-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ru')}
        className={`px-2 py-1 rounded font-medium transition-colors ${
          language === 'ru'
            ? 'bg-coffee-100 text-coffee-600'
            : 'text-coffee-400 hover:text-coffee-600'
        }`}
      >
        RU
      </button>
    </div>
  );
}
