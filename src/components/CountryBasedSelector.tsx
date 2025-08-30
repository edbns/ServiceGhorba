import React, { useState } from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';
import { CVFormat } from './CVFormatSelector';



const popularCountries: Array<{ code: string; name: string; flag: string; format: CVFormat }> = [
  { code: 'canada', name: 'Canada', flag: '🇨🇦', format: 'canada_resume' },
  { code: 'united-states', name: 'United States', flag: '🇺🇸', format: 'us_resume' },
  { code: 'united-kingdom', name: 'United Kingdom', flag: '🇬🇧', format: 'uk_cv' },
  { code: 'germany', name: 'Germany', flag: '🇩🇪', format: 'germany_cv' },
  { code: 'australia', name: 'Australia', flag: '🇦🇺', format: 'australia_resume' },
  { code: 'france', name: 'France', flag: '🇫🇷', format: 'europass' },
  { code: 'spain', name: 'Spain', flag: '🇪🇸', format: 'europass' },
  { code: 'netherlands', name: 'Netherlands', flag: '🇳🇱', format: 'europass' }
];

interface CountryBasedSelectorProps {
  onCountrySelected: (format: CVFormat, country: string) => void;
  className?: string;
}

export default function CountryBasedSelector({ onCountrySelected, className = '' }: CountryBasedSelectorProps) {
  const { t } = useSimpleTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountrySelect = (country: { code: string; name: string; format: CVFormat }) => {
    setSelectedCountry(country.code);
    onCountrySelected(country.format as CVFormat, country.name);
  };

  const filteredCountries = popularCountries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 mb-6 ${className}`}>
      <div className="flex items-start space-x-3 mb-4">
        <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t('tools.country_selector')}</h3>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search for your country
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type country name..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountrySelect(country)}
              className={`p-3 border rounded-lg text-left transition-colors ${
                selectedCountry === country.code
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{country.flag}</span>
                <div className="font-medium text-sm text-gray-900">{country.name}</div>
              </div>
            </button>
          ))}
        </div>

        {selectedCountry && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-green-900 mb-2">Perfect! Format Selected</h4>
                <p className="text-sm text-green-800">
                  We&apos;ve automatically selected the best CV format for {popularCountries.find(c => c.code === selectedCountry)?.name}. 
                  You can change this later if needed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}