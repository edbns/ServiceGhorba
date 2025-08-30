import React from 'react';

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
  | 'tech_resume';

const formatLabels: Record<CVFormat, string> = {
  canada_resume: 'Canada Resume',
  canada_academic: 'Canada Academic CV',
  us_resume: 'US Resume',
  uk_cv: 'UK CV',
  germany_cv: 'German CV',
  japan_rirekisho: 'Japanese Rirekisho',
  australia_resume: 'Australia Resume',
  europass: 'Europass (EU)',
  europe_custom: 'Europe Custom',
  academic_cv: 'Academic CV',
  creative_portfolio: 'Creative Portfolio',
  tech_resume: 'Tech Resume'
};

const formatDescriptions: Record<CVFormat, string> = {
  canada_resume: 'No photo, 1-2 pages, reverse chronological',
  canada_academic: 'Academic format, research and publications focus',
  us_resume: '1 page preferred, skills-focused, no personal info',
  uk_cv: '2 pages max, achievement-focused, no photo',
  germany_cv: 'Tabular format with photo, personal details included',
  japan_rirekisho: 'Standardized format, photo required, formal structure',
  australia_resume: '2-3 pages, results-oriented, no personal info',
  europass: 'EU standard format, comprehensive and detailed',
  europe_custom: 'Flexible European format, optional personal info',
  academic_cv: 'Comprehensive academic format, publications and research',
  creative_portfolio: 'Visual portfolio format, project showcase',
  tech_resume: 'Technical skills and project focus, GitHub links'
};

interface CVFormatSelectorProps {
  value: CVFormat;
  onChange: (format: CVFormat) => void;
  className?: string;
}

export default function CVFormatSelector({ value, onChange, className = '' }: CVFormatSelectorProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose CV Format
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(formatLabels).map(([key, label]) => (
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
                name="format"
                value={key}
                checked={value === key}
                onChange={(e) => onChange(e.target.value as CVFormat)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">{label}</div>
                <div className="text-xs text-gray-600 mt-1">{formatDescriptions[key as CVFormat]}</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ml-2 ${
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
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Format Information</h4>
            <p className="text-sm text-blue-800">
              {formatDescriptions[value]} Each format follows regional standards and expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}