import React from 'react';

export type ExportLanguage = 'english' | 'spanish' | 'french' | 'arabic' | 'tagalog' | 'bengali' | 'indonesian';

const languageLabels: Record<ExportLanguage, string> = {
  english: 'English',
  spanish: 'Español (Spanish)',
  french: 'Français (French)',
  arabic: 'العربية (Arabic)',
  tagalog: 'Tagalog (Filipino)',
  bengali: 'বাংলা (Bengali)',
  indonesian: 'Bahasa Indonesia'
};

const languageFlags: Record<ExportLanguage, string> = {
  english: '🇺🇸',
  spanish: '🇪🇸',
  french: '🇫🇷',
  arabic: '🇸🇦',
  tagalog: '🇵🇭',
  bengali: '🇧🇩',
  indonesian: '🇮🇩'
};

interface ExportLanguageSelectorProps {
  value: ExportLanguage;
  onChange: (language: ExportLanguage) => void;
  className?: string;
}

export default function ExportLanguageSelector({ value, onChange, className = '' }: ExportLanguageSelectorProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose Export Language
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(languageLabels).map(([key, label]) => (
            <label
              key={key}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                value === key
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="language"
                value={key}
                checked={value === key}
                onChange={(e) => onChange(e.target.value as ExportLanguage)}
                className="sr-only"
              />
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-lg">{languageFlags[key as ExportLanguage]}</span>
                <div className="font-medium text-gray-900 text-sm">{label}</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                value === key
                  ? 'border-primary bg-primary'
                  : 'border-gray-300'
              }`}>
                {value === key && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <div>
            <h4 className="font-medium text-green-900 mb-2">Language Support</h4>
            <p className="text-sm text-green-800">
              Your CV headers and section titles will be translated to {languageLabels[value]}. 
              Content you provide will remain in the language you write it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}