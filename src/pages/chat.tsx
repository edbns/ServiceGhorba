import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ChatBot from '@/components/ChatBot';
import CVFormatSelector, { CVFormat } from '@/components/CVFormatSelector';
import { CVData } from '@/utils/formatHelpers';

export default function ChatPage() {
  const router = useRouter();
  const { mode, type } = router.query;
  const [selectedFormat, setSelectedFormat] = useState<CVFormat>('canada_resume');
  const [documentType, setDocumentType] = useState<'cv' | 'motivation_letter'>('cv');
  const [initialData, setInitialData] = useState<Partial<CVData>>({});


  useEffect(() => {
    // Check for uploaded data
    const uploadedData = sessionStorage.getItem('uploadedCVData');
    const savedFormat = sessionStorage.getItem('selectedFormat');
    
    if (uploadedData) {
      setInitialData(JSON.parse(uploadedData));
    }
    
    if (savedFormat) {
      setSelectedFormat(savedFormat as CVFormat);
    }
    
    // Set document type from query params
    if (type === 'motivation_letter') {
      setDocumentType('motivation_letter');
    }
  }, [type]);

  const handleChatComplete = (generatedData: CVData) => {
    // Store the generated data and navigate to result page
    sessionStorage.setItem('generatedCV', JSON.stringify(generatedData));
    sessionStorage.setItem('selectedFormat', selectedFormat);
    sessionStorage.setItem('documentType', documentType);
    router.push('/result');
  };

  const handleDocumentTypeChange = (newType: 'cv' | 'motivation_letter') => {
    setDocumentType(newType);
    // Clear any existing data when switching types
    setInitialData({});
    sessionStorage.removeItem('uploadedCVData');
  };

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
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {mode === 'improve' ? 'Improve Your CV' : 'Create Your Document'}
            </h1>
            <p className="text-xl text-gray-600">
              {mode === 'improve' 
                ? 'Let our AI help you enhance your existing CV with better formatting and content.'
                : 'Answer a few questions and let our AI create a professional document for you.'
              }
            </p>
          </div>

          {/* Document Type Selector */}
          <div className="card max-w-2xl mx-auto mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What would you like to create?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleDocumentTypeChange('cv')}
                className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                  documentType === 'cv'
                    ? 'border-primary bg-blue-50 text-primary'
                    : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h3 className="font-semibold">CV / Resume</h3>
                    <p className="text-sm opacity-75">Professional resume or curriculum vitae</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleDocumentTypeChange('motivation_letter')}
                className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                  documentType === 'motivation_letter'
                    ? 'border-primary bg-blue-50 text-primary'
                    : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h3 className="font-semibold">Motivation Letter</h3>
                    <p className="text-sm opacity-75">Cover letter or motivation letter</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Format Selector for CV */}
          {documentType === 'cv' && (
            <div className="card max-w-2xl mx-auto mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your CV Format</h2>
              <CVFormatSelector
                value={selectedFormat}
                onChange={setSelectedFormat}
              />
            </div>
          )}



          {/* Chat Interface */}
          <ChatBot
            type={documentType}
            onComplete={handleChatComplete}
            initialData={initialData}
          />

          {/* Help Section */}
          <div className="card max-w-2xl mx-auto mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips for Better Results</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Be specific about your achievements and use numbers when possible</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Include relevant keywords from the job description</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Focus on results and impact rather than just duties</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>You can always edit the generated content before downloading</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}