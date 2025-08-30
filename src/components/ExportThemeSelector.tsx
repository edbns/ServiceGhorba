import React from 'react';

export type ExportTheme = 'clean' | 'blue_boxed' | 'sidebar' | 'minimal_line' | 'modern_typo' | 'euro_cv' | 'visual' | 'basic_worker_layout';

const themeLabels: Record<ExportTheme, string> = {
  clean: 'Minimal Clean',
  blue_boxed: 'Boxed Blue',
  sidebar: 'Sidebar Layout',
  minimal_line: 'Minimal Line',
  modern_typo: 'Modern Typography',
  euro_cv: 'European Style',
  visual: 'Visual Portfolio',
  basic_worker_layout: 'Easy to Read'
};

const themeDescriptions: Record<ExportTheme, string> = {
  clean: 'Simple, clean design with plenty of white space',
  blue_boxed: 'Professional boxed layout with blue accents',
  sidebar: 'Two-column layout with sidebar for key information',
  minimal_line: 'Minimal design with subtle line separators',
  modern_typo: 'Typography-focused modern design',
  euro_cv: 'Traditional European CV styling',
  visual: 'Creative visual layout for portfolios',
  basic_worker_layout: 'Large fonts, simple layout, print-friendly for any job'
};

interface ExportThemeSelectorProps {
  value: ExportTheme;
  onChange: (theme: ExportTheme) => void;
  className?: string;
}

export default function ExportThemeSelector({ value, onChange, className = '' }: ExportThemeSelectorProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="export-theme" className="block text-sm font-medium text-gray-700 mb-2">
          Choose Export Theme
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(themeLabels).map(([key, label]) => (
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
                name="theme"
                value={key}
                checked={value === key}
                onChange={(e) => onChange(e.target.value as ExportTheme)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">{label}</div>
                <div className="text-xs text-gray-600">{themeDescriptions[key as ExportTheme]}</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
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
            <h4 className="font-medium text-blue-900 mb-2">Theme Information</h4>
            <p className="text-sm text-blue-800">
              {themeDescriptions[value]} Different themes work better for different industries and regions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}