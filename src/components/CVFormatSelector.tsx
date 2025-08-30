import React from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';

export type CVFormat =
  | 'canada_resume'
  | 'canada_academic'
  | 'europass'
  | 'europe_custom'
  | 'us_resume'
  | 'uk_cv'
  | 'germany_cv'
  | 'japan_rirekisho'
  | 'australia_resume'
  | 'academic_cv'
  | 'creative_portfolio'
  | 'tech_resume'
  | 'basic_worker'
  | 'delivery_driver'
  | 'waiter_service'
  | 'construction_cv'
  | 'kitchen_helper'
  | 'cleaner_cv';

// We'll get the labels from translations now
const getFormatLabel = (format: CVFormat, t: (key: string) => string): string => {
  return t(`format.${format}`);
};

const formatDescriptions: Record<CVFormat, string> = {
  // Regional Formats
  canada_resume: 'No photo, 1-2 pages, reverse chronological',
  canada_academic: 'Academic format, research and publications focus',
  us_resume: '1 page preferred, skills-focused, no personal info',
  uk_cv: '2 pages max, achievement-focused, no photo',
  germany_cv: 'Tabular format with photo, personal details included',
  japan_rirekisho: 'Standardized format, photo required, formal structure',
  australia_resume: '2-3 pages, results-oriented, no personal info',
  europass: 'EU standard format, comprehensive and detailed',
  europe_custom: 'Flexible European format, optional personal info',
  // Specialized Formats
  academic_cv: 'Comprehensive academic format, publications and research',
  creative_portfolio: 'Visual portfolio format, project showcase',
  tech_resume: 'Technical skills and project focus, GitHub links',
  // Service Worker Formats
  basic_worker: 'Simple format, easy to read, for any entry-level job',
  delivery_driver: 'Focus on driving record, reliability, and availability',
  waiter_service: 'Emphasizes customer service, teamwork, and flexibility',
  construction_cv: 'Highlights safety training, physical capabilities, and experience',
  kitchen_helper: 'Food safety focus, teamwork, and kitchen experience',
  cleaner_cv: 'Emphasizes reliability, attention to detail, and trustworthiness'
};

interface CVFormatSelectorProps {
  value: CVFormat;
  onChange: (format: CVFormat) => void;
  className?: string;
}

export default function CVFormatSelector({ value, onChange, className = '' }: CVFormatSelectorProps) {
  const { t } = useSimpleTranslation();
  const formatCategories = {
    'Service & Entry Level': ['basic_worker', 'delivery_driver', 'waiter_service', 'construction_cv', 'kitchen_helper', 'cleaner_cv'],
    'Regional Formats': ['canada_resume', 'us_resume', 'uk_cv', 'germany_cv', 'japan_rirekisho', 'australia_resume', 'europass', 'europe_custom'],
    'Specialized': ['canada_academic', 'academic_cv', 'creative_portfolio', 'tech_resume']
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          {t('formats.choose_format')}
        </label>
        
        {Object.entries(formatCategories).map(([category, formats]) => (
          <div key={category} className="mb-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 px-2">{category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formats.map((formatKey) => (
                <label
                  key={formatKey}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    value === formatKey
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={formatKey}
                    checked={value === formatKey}
                    onChange={(e) => onChange(e.target.value as CVFormat)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{getFormatLabel(formatKey as CVFormat, t)}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ml-2 ${
                    value === formatKey
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}>
                    {value === formatKey && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}