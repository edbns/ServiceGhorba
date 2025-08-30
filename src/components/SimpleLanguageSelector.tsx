import React, { useState, useEffect } from 'react';

export type SimpleLanguage = 'en' | 'fr' | 'ar';

export default function SimpleLanguageSelector() {
  const [language, setLanguage] = useState<SimpleLanguage>('en');

  useEffect(() => {
    // Load saved language
    const saved = localStorage.getItem('ui_language') as SimpleLanguage;
    if (saved && ['en', 'fr', 'ar'].includes(saved)) {
      setLanguage(saved);
      updateDocument(saved);
    }
  }, []);

  const updateDocument = (lang: SimpleLanguage) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  };

  const handleLanguageChange = (newLang: SimpleLanguage) => {
    setLanguage(newLang);
    localStorage.setItem('ui_language', newLang);
    updateDocument(newLang);
  };

  const languages = [
    { code: 'en' as SimpleLanguage, label: 'English', flag: '🇺🇸' },
    { code: 'fr' as SimpleLanguage, label: 'Français', flag: '🇫🇷' },
    { code: 'ar' as SimpleLanguage, label: 'العربية', flag: '🇸🇦' }
  ];

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value as SimpleLanguage)}
        className={`bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          language === 'ar' ? 'text-right' : 'text-left'
        }`}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}