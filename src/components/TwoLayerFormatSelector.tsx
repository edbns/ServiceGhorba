import React from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';
import { CVFormat } from './CVFormatSelector';

interface TwoLayerFormatSelectorProps {
  selectedFormat: CVFormat;
  selectedJobType: CVFormat | null;
  onFormatChange: (format: CVFormat) => void;
  onJobTypeChange: (jobType: CVFormat | null) => void;
  className?: string;
}

const serviceJobTypes: CVFormat[] = [
  'basic_worker',
  'delivery_driver', 
  'waiter_service',
  'construction_cv',
  'kitchen_helper',
  'cleaner_cv'
];

const regionalFormats: CVFormat[] = [
  'canada_resume',
  'us_resume',
  'uk_cv',
  'germany_cv',
  'japan_rirekisho',
  'australia_resume',
  'europass',
  'europe_custom'
];

export default function TwoLayerFormatSelector({ 
  selectedFormat, 
  selectedJobType, 
  onFormatChange, 
  onJobTypeChange,
  className = '' 
}: TwoLayerFormatSelectorProps) {
  const { t } = useSimpleTranslation();

  const getFormatLabel = (format: CVFormat): string => {
    return t(`format.${format}`);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Step 1: Job Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Step 1: Choose Your Job Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {serviceJobTypes.map((jobType) => (
            <button
              key={jobType}
              type="button"
              onClick={() => onJobTypeChange(selectedJobType === jobType ? null : jobType)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                selectedJobType === jobType
                  ? 'border-primary bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="font-medium text-gray-900 text-sm">
                  {getFormatLabel(jobType)}
                </div>
                {selectedJobType === jobType && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px]">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Regional Format Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Step 2: Choose Regional Format
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {regionalFormats.map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => onFormatChange(format)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                selectedFormat === format
                  ? 'border-primary bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="font-medium text-gray-900 text-sm">
                  {getFormatLabel(format)}
                </div>
                {selectedFormat === format && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[10px]">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Auto-trigger form when both selections are made */}
      {selectedJobType && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Ready to Create Your CV!</h4>
              <p className="text-sm text-blue-800">
                <span className="font-medium">{getFormatLabel(selectedJobType)}</span> format optimized for <span className="font-medium">{getFormatLabel(selectedFormat)}</span> standards
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
