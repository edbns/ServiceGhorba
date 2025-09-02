import React from 'react';
import { useLanguage, UILanguage } from '@/contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage, isRTL } = useLanguage();

  const languages: Array<{ code: UILanguage; label: string; flag: string }> = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' }
  ];

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as UILanguage)}
        className={`bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          isRTL ? 'text-right' : 'text-left'
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