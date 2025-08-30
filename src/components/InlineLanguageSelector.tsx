import React from 'react';
import { useSimpleTranslation, SimpleLanguage } from '@/hooks/useSimpleTranslation';

export default function InlineLanguageSelector() {
  const { language } = useSimpleTranslation();

  const handleLanguageChange = (newLanguage: SimpleLanguage) => {
    localStorage.setItem('ui_language', newLanguage);
    document.documentElement.lang = newLanguage;
    
    // Remove RTL since we only have LTR languages now
    document.documentElement.removeAttribute('dir');
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('languageChange'));
  };

  return (
    <div className="flex items-center space-x-1 text-sm">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 rounded transition-colors ${
          language === 'en'
            ? 'bg-primary text-white'
            : 'text-gray-600 hover:text-primary'
        }`}
      >
        EN
      </button>

      <button
        onClick={() => handleLanguageChange('fr')}
        className={`px-2 py-1 rounded transition-colors ${
          language === 'fr'
            ? 'bg-primary text-white'
            : 'text-gray-600 hover:text-primary'
        }`}
      >
        FR
      </button>
    </div>
  );
}