import React, { useState } from 'react';
import { CVData } from '@/utils/formatHelpers';
import { exportAsText, exportAsMarkdown, exportAsDocx, exportAsPDF } from '@/utils/exportHelpers';

interface ExportButtonsProps {
  cvData: CVData;
  previewElementId?: string;
  className?: string;
}

export default function ExportButtons({ cvData, previewElementId = 'cv-preview', className = '' }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExport = async (type: 'pdf' | 'docx' | 'txt' | 'md') => {
    setIsExporting(type);
    
    try {
      switch (type) {
        case 'pdf':
          await exportAsPDF(previewElementId, 'cv.pdf');
          break;
        case 'docx':
          exportAsDocx(cvData, 'cv.docx');
          break;
        case 'txt':
          // Get formatted text from server
          const txtResponse = await fetch('/api/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cvData, exportType: 'txt' }),
          });
          const txtResult = await txtResponse.json();
          exportAsText(txtResult.content, 'cv.txt');
          break;
        case 'md':
          // Get formatted markdown from server
          const mdResponse = await fetch('/api/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cvData, exportType: 'md' }),
          });
          const mdResult = await mdResponse.json();
          exportAsMarkdown(mdResult.content, 'cv.md');
          break;
      }
    } catch (error) {
      console.error(`Export error (${type}):`, error);
      alert(`Failed to export as ${type.toUpperCase()}. Please try again.`);
    } finally {
      setIsExporting(null);
    }
  };

  const exportOptions = [
    { 
      type: 'pdf' as const, 
      label: 'PDF', 
      description: 'Best for printing and sharing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      type: 'docx' as const, 
      label: 'Word', 
      description: 'Editable document format',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    { 
      type: 'txt' as const, 
      label: 'Text', 
      description: 'Plain text format',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      type: 'md' as const, 
      label: 'Markdown', 
      description: 'Markdown format for developers',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">Export Your CV</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {exportOptions.map(({ type, label, icon, description }) => (
          <button
            key={type}
            onClick={() => handleExport(type)}
            disabled={isExporting === type}
            className="relative p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting === type && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="text-primary">{icon}</div>
              <div>
                <h4 className="font-medium text-gray-900">{label}</h4>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-blue-900">Export Tips</h4>
            <ul className="text-sm text-blue-800 mt-1 space-y-1">
              <li>• PDF is recommended for job applications</li>
              <li>• Word format allows for easy editing</li>
              <li>• All formats are ATS-friendly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}