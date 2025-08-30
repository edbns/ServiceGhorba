import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CVPreview from '@/components/CVPreview';
import ExportButtons from '@/components/ExportButtons';
import CVFormatSelector, { CVFormat } from '@/components/CVFormatSelector';
import ExportThemeSelector, { ExportTheme } from '@/components/ExportThemeSelector';
import ExportLanguageSelector, { ExportLanguage } from '@/components/ExportLanguageSelector';
import { CVData, applyFormatRules } from '@/utils/formatHelpers';

export default function ResultPage() {
  const router = useRouter();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<CVFormat>('canada_resume');
  const [selectedTheme, setSelectedTheme] = useState<ExportTheme>('clean');
  const [selectedLanguage, setSelectedLanguage] = useState<ExportLanguage>('english');
  const [documentType, setDocumentType] = useState<'cv' | 'motivation_letter'>('cv');
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<CVData | null>(null);

  useEffect(() => {
    // Load generated data from session storage
    const generatedData = sessionStorage.getItem('generatedCV');
    const savedFormat = sessionStorage.getItem('selectedFormat');
    const savedTheme = sessionStorage.getItem('selectedTheme');
    const savedLanguage = sessionStorage.getItem('selectedLanguage');
    const savedDocType = sessionStorage.getItem('documentType');
    
    if (generatedData) {
      const data = JSON.parse(generatedData);
      setCvData(data);
      setEditableData(data);
    } else {
      // Redirect to home if no data
      router.push('/');
    }
    
    if (savedFormat) {
      setSelectedFormat(savedFormat as CVFormat);
    }
    
    if (savedTheme) {
      setSelectedTheme(savedTheme as ExportTheme);
    }
    
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage as ExportLanguage);
    }
    
    if (savedDocType) {
      setDocumentType(savedDocType as 'cv' | 'motivation_letter');
    }
  }, [router]);

  const handleFormatChange = (newFormat: CVFormat) => {
    setSelectedFormat(newFormat);
    sessionStorage.setItem('selectedFormat', newFormat);
  };

  const handleThemeChange = (newTheme: ExportTheme) => {
    setSelectedTheme(newTheme);
    sessionStorage.setItem('selectedTheme', newTheme);
  };

  const handleLanguageChange = (newLanguage: ExportLanguage) => {
    setSelectedLanguage(newLanguage);
    sessionStorage.setItem('selectedLanguage', newLanguage);
  };

  const handleSaveEdits = () => {
    if (editableData) {
      setCvData(editableData);
      sessionStorage.setItem('generatedCV', JSON.stringify(editableData));
      setIsEditing(false);
    }
  };

  const handleCancelEdits = () => {
    setEditableData(cvData);
    setIsEditing(false);
  };

  const handleRegenerateWithAI = async () => {
    if (!cvData) return;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'improve',
          data: { content: JSON.stringify(cvData) },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to improve content');
      }

      const result = await response.json();
      
      if (result.data.content) {
        // Try to parse improved content as JSON, fallback to text
        try {
          const improvedData = JSON.parse(result.data.content);
          setCvData(improvedData);
          setEditableData(improvedData);
          sessionStorage.setItem('generatedCV', JSON.stringify(improvedData));
        } catch {
          // If not JSON, treat as improved text content
          alert('Content improved! The AI has enhanced your document.');
        }
      }
    } catch (error) {
      console.error('Regeneration error:', error);
      alert('Failed to improve content. Please try again.');
    }
  };

  if (!cvData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your document...</p>
        </div>
      </div>
    );
  }

  const displayData = isEditing ? editableData : cvData;
  const formattedData = displayData ? applyFormatRules(displayData, selectedFormat) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white">
        <div className="container">
          <div className="header-container flex justify-between items-center h-20">
            <div className="header-logo flex items-center">
              <Link href="/">
                <img src="/logoTrans.png" alt="Logo" className="h-10 w-auto cursor-pointer" />
              </Link>
            </div>
            <div className="header-nav flex items-center space-x-8">
              <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Blog
              </Link>
              <Link href="/" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Create Another
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your {documentType === 'cv' ? 'CV' : 'Motivation Letter'} is Ready!
            </h1>
            <p className="text-xl text-gray-600">
              Review your document below and export it in your preferred format.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls Sidebar */}
            <div className="space-y-6">
              {/* Format Selector for CV */}
              {documentType === 'cv' && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">CV Format</h3>
                  <CVFormatSelector
                    value={selectedFormat}
                    onChange={handleFormatChange}
                  />
                </div>
              )}

              {/* Theme Selector */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Theme</h3>
                <ExportThemeSelector
                  value={selectedTheme}
                  onChange={handleThemeChange}
                />
              </div>

              {/* Language Selector */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Language</h3>
                <ExportLanguageSelector
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                />
              </div>

              {/* Export Options */}
              {formattedData && (
                <div className="card">
                  <ExportButtons 
                    cvData={formattedData}
                    theme={selectedTheme}
                    language={selectedLanguage}
                    previewElementId="cv-preview"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>{isEditing ? 'Cancel Edit' : 'Edit Content'}</span>
                  </button>
                  
                  <button
                    onClick={handleRegenerateWithAI}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Improve with AI</span>
                  </button>
                  
                  <Link href="/" className="block w-full">
                    <button className="w-full border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Create New Document</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Pro Tips</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Review all sections carefully before exporting</li>
                      <li>• PDF format is best for job applications</li>
                      <li>• Use &quot;Improve with AI&quot; to enhance content</li>
                      <li>• Different formats exclude certain fields</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {isEditing && editableData ? (
                <div className="card">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Edit Your Content</h2>
                    <div className="space-x-3">
                      <button onClick={handleCancelEdits} className="btn-secondary">
                        Cancel
                      </button>
                      <button onClick={handleSaveEdits} className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Editable fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={editableData.name || ''}
                        onChange={(e) => setEditableData(prev => prev ? { ...prev, name: e.target.value } : null)}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={editableData.title || ''}
                        onChange={(e) => setEditableData(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                      <textarea
                        value={editableData.summary || ''}
                        onChange={(e) => setEditableData(prev => prev ? { ...prev, summary: e.target.value } : null)}
                        className="input-field h-32 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                      <textarea
                        value={editableData.skills?.join(', ') || ''}
                        onChange={(e) => setEditableData(prev => prev ? { 
                          ...prev, 
                          skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                        } : null)}
                        className="input-field h-24 resize-none"
                      />
                    </div>

                    {/* Contact Information */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={editableData.contact?.email || ''}
                            onChange={(e) => setEditableData(prev => prev ? {
                              ...prev,
                              contact: { ...prev.contact, email: e.target.value }
                            } : null)}
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={editableData.contact?.phone || ''}
                            onChange={(e) => setEditableData(prev => prev ? {
                              ...prev,
                              contact: { ...prev.contact, phone: e.target.value }
                            } : null)}
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                formattedData && <CVPreview cvData={formattedData} format={selectedFormat} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}