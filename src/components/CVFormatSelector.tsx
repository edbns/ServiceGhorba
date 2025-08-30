import React from 'react';

export type CVFormat = 'canada_resume' | 'canada_academic' | 'europass' | 'europe_custom';

const formatLabels: Record<CVFormat, string> = {
  canada_resume: 'Canada Resume (No Photo)',
  canada_academic: 'Canada Academic CV',
  europass: 'Europass (EU Standard)',
  europe_custom: 'Europe Custom Format'
};

const formatDescriptions: Record<CVFormat, string> = {
  canada_resume: 'Professional resume format without personal information like photo, age, or nationality',
  canada_academic: 'Academic CV format for Canadian institutions, focusing on research and publications',
  europass: 'Standard European format that includes all personal and professional information',
  europe_custom: 'Flexible European format with optional personal information fields'
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
        <label htmlFor="cv-format" className="block text-sm font-medium text-gray-700 mb-2">
          Choose CV Format
        </label>
        <select
          id="cv-format"
          value={value}
          onChange={(e) => onChange(e.target.value as CVFormat)}
          className="input-field"
        >
          {Object.entries(formatLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Format Information</h4>
        <p className="text-sm text-blue-800">
          {formatDescriptions[value]}
        </p>
      </div>
    </div>
  );
}