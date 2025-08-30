import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    // Update document direction and language when language changes
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="relative">
      <select
        value={i18n.language}
        onChange={changeLang}
        className={`bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          i18n.language === 'ar' ? 'text-right' : 'text-left'
        }`}
      >
        <option value="en">🇺🇸 English</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="ar">🇸🇦 العربية</option>
      </select>
    </div>
  );
}