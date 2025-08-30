import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ChatBot from '@/components/ChatBot';
import CVFormatSelector, { CVFormat } from '@/components/CVFormatSelector';
import BuddyModeBanner from '@/components/BuddyModeBanner';
import QuickJobSelector, { JobTemplate } from '@/components/QuickJobSelector';
import SkillTranslator from '@/components/SkillTranslator';
import CountryBasedSelector from '@/components/CountryBasedSelector';
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
      {/* Buddy Mode Banner */}
      <BuddyModeBanner />
      
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
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
              {mode === 'improve' ? 'Improve Your CV' : 'AI Assistant'}
            </h1>
            <p className="text-lg text-gray-600">
              {mode === 'improve' 
                ? 'Let our AI help you enhance your existing CV with better formatting and content'
                : 'Tell us about yourself and we\'ll create a professional document for you'
              }
            </p>
          </div>

          {/* Document Type Selector - Inline */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-2 inline-flex">
              <button
                onClick={() => handleDocumentTypeChange('cv')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
                  documentType === 'cv'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                CV / Resume
              </button>
              <button
                onClick={() => handleDocumentTypeChange('motivation_letter')}
                className={`px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
                  documentType === 'motivation_letter'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cover Letter
              </button>

            </div>
          </div>

          {/* Format Selector for CV */}
          {documentType === 'cv' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <CVFormatSelector
                value={selectedFormat}
                onChange={setSelectedFormat}
              />
            </div>
          )}

          {/* Helper Tools */}
          {documentType === 'cv' && (
            <>
              <CountryBasedSelector
                onCountrySelected={(format) => {
                  setSelectedFormat(format);
                  sessionStorage.setItem('selectedFormat', format);
                }}
              />
              
              <QuickJobSelector
                onJobSelected={(template: JobTemplate) => {
                  setInitialData(prev => ({
                    ...prev,
                    title: template.title,
                    summary: template.summary,
                    skills: template.skills
                  }));
                }}
              />
              
              <SkillTranslator
                onTranslated={(skills: string[]) => {
                  setInitialData(prev => ({
                    ...prev,
                    skills: [...(prev.skills || []), ...skills]
                  }));
                }}
              />
            </>
          )}

          {/* Chat Interface */}
          <ChatBot
            type={documentType}
            format={selectedFormat}
            onComplete={handleChatComplete}
            initialData={initialData}
          />

          {/* Help Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mt-12">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Results</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Be specific about your achievements and use numbers when possible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Include relevant keywords from the job description</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Focus on results and impact rather than just duties</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span>You can always edit the generated content before downloading</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}