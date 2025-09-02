import React, { useEffect, useMemo, useRef, useState } from 'react';

export type ExportLanguage = string;

const popularLanguages: Array<{ code: string; label: string; flag?: string }> = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' }
];

interface ExportLanguageSelectorProps {
  value: ExportLanguage;
  onChange: (language: ExportLanguage) => void;
  className?: string;
}

export default function ExportLanguageSelector({ value, onChange, className = '' }: ExportLanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);
  const options = useMemo(() => {
    const base = popularLanguages;
    if (!query) return base;
    const q = query.toLowerCase();
    return base.filter(l => l.label.toLowerCase().includes(q) || l.code.toLowerCase().includes(q));
  }, [query]);

  const current = popularLanguages.find(l => l.code === value);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className={`space-y-4 ${className}`} ref={ref}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose Export Language
        </label>
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <span className="text-sm text-gray-800">{current ? current.label : 'Select language'}</span>
          <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        {isOpen && (
          <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="p-2 border-b">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search language..."
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="max-h-56 overflow-auto">
              {options.map(opt => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => { onChange(opt.code); setIsOpen(false); }}
                  className={`w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-gray-50 ${value === opt.code ? 'bg-blue-50' : ''}`}
                >
                  <span className="text-lg">{opt.flag || ''}</span>
                  <span className="text-sm text-gray-800">{opt.label}</span>
                  <span className="ml-auto text-xs text-gray-500">{opt.code}</span>
                </button>
              ))}
              {options.length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500">No matches</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <div>
            <h4 className="font-medium text-green-900 mb-2">Language Support</h4>
            <p className="text-sm text-green-800">
              Your CV headers and section titles will be translated to {current ? current.label : value}. Content you provide will remain in the language you write it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}