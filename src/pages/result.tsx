import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CVPreview from '@/components/CVPreview';
import ExportButtons from '@/components/ExportButtons';
import CVFormatSelector, { CVFormat } from '@/components/CVFormatSelector';
import { CVData, applyFormatRules } from '@/utils/formatHelpers';

export default function ResultPage() {
  const router = useRouter();
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<CVFormat>('canada_resume');
  const [documentType, setDocumentType] = useState<'cv' | 'motivation_letter'>('cv');
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<CVData | null>(null);

  useEffect(() => {
    // Load generated data from session storage
    const generatedData = sessionStorage.getItem('generatedCV');
    const savedFormat = sessionStorage.getItem('selectedFormat');
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
    
    if (savedDocType) {
      setDocumentType(savedDocType as 'cv' | 'motivation_letter');
    }
  }, [router]);

  const handleFormatChange = (newFormat: CVFormat) => {
    setSelectedFormat(newFormat);
    sessionStorage.setItem('selectedFormat', newFormat);
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
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold text-primary">AI CV Generator</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/blog" className="text-gray-700 hover:text-primary transition-colors">
                📝 Blog
              </Link>
              <Link href="/" className="btn-secondary">
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

              {/* Export Options */}
              {formattedData && (
                <div className="card">
                  <ExportButtons 
                    cvData={formattedData}
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
                    className="w-full btn-secondary"
                  >
                    {isEditing ? 'Cancel Edit' : '✏️ Edit Content'}
                  </button>
                  
                  <button
                    onClick={handleRegenerateWithAI}
                    className="w-full btn-primary"
                  >
                    🤖 Improve with AI
                  </button>
                  
                  <Link href="/chat" className="block w-full">
                    <button className="w-full btn-secondary">
                      🆕 Create New Document
                    </button>
                  </Link>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Review all sections carefully before exporting</li>
                  <li>• PDF format is best for job applications</li>
                  <li>• Use &quot;Improve with AI&quot; to enhance content</li>
                  <li>• Different formats exclude certain fields</li>
                </ul>
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