import React from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';
import { exportLabels } from '@/utils/exportLabels';
import { CVData, CVFormat, applyFormatRules } from '@/utils/formatHelpers';

interface CVPreviewProps {
  cvData: CVData;
  format: CVFormat;
  className?: string;
}

export default function CVPreview({ cvData, format, className = '' }: CVPreviewProps) {
  const { language } = useSimpleTranslation();
  const labels = exportLabels[language] || exportLabels.en;
  const formattedData = applyFormatRules(cvData, format);

  return (
    <div id="cv-preview" className={`bg-white border border-gray-200 rounded-lg p-8 shadow-sm ${className}`}>
      {/* Header */}
      <div className="mb-8">
        {formattedData.name && (
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {formattedData.name}
          </h1>
        )}
        
        {formattedData.title && (
          <h2 className="text-xl text-primary font-medium mb-4">
            {formattedData.title}
          </h2>
        )}
        
        {formattedData.contact && (
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {formattedData.contact.email && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{formattedData.contact.email}</span>
              </div>
            )}
            {formattedData.contact.phone && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{formattedData.contact.phone}</span>
              </div>
            )}
            {formattedData.contact.address && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{formattedData.contact.address}</span>
              </div>
            )}
            {formattedData.contact.linkedin && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>{formattedData.contact.linkedin}</span>
              </div>
            )}
            {formattedData.contact.website && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>{formattedData.contact.website}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {formattedData.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-3 border-b border-gray-200 pb-1">
            {labels.summary}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {formattedData.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {formattedData.skills && formattedData.skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-3 border-b border-gray-200 pb-1">
            {labels.skills}
          </h3>
          <div className="flex flex-wrap gap-2">
            {formattedData.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {formattedData.experience && formattedData.experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-3 border-b border-gray-200 pb-1">
            {labels.experience}
          </h3>
          <div className="space-y-6">
            {formattedData.experience.map((exp, index) => (
              <div key={index} className="relative pl-6">
                <div className="absolute left-0 top-2 w-2 h-2 bg-primary rounded-full"></div>
                <div className="mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{exp.role}</h4>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600">{exp.dates}</p>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {formattedData.education && formattedData.education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-3 border-b border-gray-200 pb-1">
            {labels.education}
          </h3>
          <div className="space-y-4">
            {formattedData.education.map((edu, index) => (
              <div key={index} className="relative pl-6">
                <div className="absolute left-0 top-2 w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.dates}</p>
                  {edu.description && (
                    <p className="text-gray-700 mt-2">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {formattedData.languages && formattedData.languages.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-3 border-b border-gray-200 pb-1">
            {labels.languages}
          </h3>
          <div className="flex flex-wrap gap-2">
            {formattedData.languages.map((language, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {language.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Additional Information */}
      {formattedData.extra && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-3 border-b border-gray-200 pb-1">
            Additional Information
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {formattedData.extra}
          </p>
        </section>
      )}

      {/* Format indicator */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Generated using {format.replace('_', ' ').toUpperCase()} format
        </p>
      </div>
    </div>
  );
}