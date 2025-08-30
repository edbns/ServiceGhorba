import React from 'react';
import { CVData, CVFormat, applyFormatRules } from '@/utils/formatHelpers';

interface CVPreviewProps {
  cvData: CVData;
  format: CVFormat;
  className?: string;
}

export default function CVPreview({ cvData, format, className = '' }: CVPreviewProps) {
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
              <span>📧 {formattedData.contact.email}</span>
            )}
            {formattedData.contact.phone && (
              <span>📞 {formattedData.contact.phone}</span>
            )}
            {formattedData.contact.address && (
              <span>📍 {formattedData.contact.address}</span>
            )}
            {formattedData.contact.linkedin && (
              <span>🔗 {formattedData.contact.linkedin}</span>
            )}
            {formattedData.contact.website && (
              <span>🌐 {formattedData.contact.website}</span>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {formattedData.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-primary mb-3 border-b border-gray-200 pb-1">
            Professional Summary
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
            Skills
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
            Work Experience
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
            Education
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
            Languages
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