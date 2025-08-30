import React, { useState } from 'react';
import { CVData, ExportTheme, ExportLanguage } from '@/utils/formatHelpers';
import { exportAsText, exportAsMarkdown, exportAsDocx, exportAsPDF } from '@/utils/exportHelpers';

interface ExportButtonsProps {
  cvData: CVData;
  theme?: ExportTheme;
  language?: ExportLanguage;
  previewElementId?: string;
  className?: string;
}

export default function ExportButtons({ cvData, theme = 'clean', language = 'english', previewElementId = 'cv-preview', className = '' }: ExportButtonsProps) {
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
            body: JSON.stringify({ cvData, exportType: 'txt', theme }),
          });
          const txtResult = await txtResponse.json();
          exportAsText(txtResult.content, 'cv.txt');
          break;
        case 'md':
          // Get formatted markdown from server
          const mdResponse = await fetch('/api/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cvData, exportType: 'md', theme }),
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

  const shareOnWhatsApp = () => {
    const message = `Check out my professional CV! I created it using AI CV Generator. 

Name: ${cvData.name || 'Professional CV'}
${cvData.title ? `Position: ${cvData.title}` : ''}

Create your own CV at: ${window.location.origin}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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

      {/* WhatsApp Share */}
      <div className="mt-6">
        <button
          onClick={shareOnWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
          </svg>
          <span>Share on WhatsApp</span>
        </button>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
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