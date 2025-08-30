'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ChatBot from '@/components/ChatBot';
import CVFormatSelector, { CVFormat } from '@/components/CVFormatSelector';
import BuddyModeBanner from '@/components/BuddyModeBanner';
import QuickJobSelector, { JobTemplate } from '@/components/QuickJobSelector';
import SkillTranslator from '@/components/SkillTranslator';
import CountryBasedSelector from '@/components/CountryBasedSelector';
import UploadForm from '@/components/UploadForm';
import { CVData } from '@/utils/formatHelpers';

export default function HomePage() {
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState<CVFormat>('canada_resume');
  const [documentType, setDocumentType] = useState<'cv' | 'motivation_letter'>('cv');
  const [simpleStyle, setSimpleStyle] = useState(false);
  const [initialData, setInitialData] = useState<Partial<CVData>>({});
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChatComplete = (generatedData: CVData) => {
    // Store the generated data and navigate to result page
    sessionStorage.setItem('generatedCV', JSON.stringify(generatedData));
    sessionStorage.setItem('selectedFormat', selectedFormat);
    sessionStorage.setItem('documentType', documentType);
    router.push('/result');
  };

  const handleDocumentTypeChange = (newType: 'cv' | 'motivation_letter') => {
    setDocumentType(newType);
    setInitialData({});
    setSimpleStyle(false); // Reset simple style when switching types
  };

  const handleFileProcessed = (data: Partial<CVData>) => {
    setInitialData(data);
    setError(null);
    setShowUpload(false);
    // Auto-switch to CV mode when file is uploaded
    setDocumentType('cv');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Buddy Mode Banner */}
      <BuddyModeBanner />
      
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/review" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Review CV
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Blog
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Create Your Professional Documents
            </h1>
            <p className="text-lg text-gray-600">
              Build CVs, cover letters, and motivation letters with AI assistance
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Document Type Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-2 inline-flex">
              <button
                onClick={() => handleDocumentTypeChange('cv')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  documentType === 'cv'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                CV / Resume
              </button>
              <button
                onClick={() => handleDocumentTypeChange('motivation_letter')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  documentType === 'motivation_letter'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cover Letter
              </button>
            </div>
          </div>

          {/* Simple Style Toggle for Cover Letters */}
          {documentType === 'motivation_letter' && (
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simpleStyle}
                    onChange={(e) => setSimpleStyle(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Keep it simple (for everyday jobs and easy reading)
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Upload Section */}
          {documentType === 'cv' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Have an existing CV?</h3>
                <button
                  onClick={() => setShowUpload(!showUpload)}
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  {showUpload ? 'Hide Upload' : 'Upload & Improve'}
                </button>
              </div>
              
              {showUpload && (
                <UploadForm 
                  onFileProcessed={handleFileProcessed}
                  onError={handleError}
                />
              )}
            </div>
          )}

          {/* Format Selector for CV */}
          {documentType === 'cv' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <CVFormatSelector
                value={selectedFormat}
                onChange={setSelectedFormat}
              />
            </div>
          )}

          {/* Helper Tools for CV */}
          {documentType === 'cv' && (
            <>
              <CountryBasedSelector
                onCountrySelected={(format) => {
                  setSelectedFormat(format);
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
            simpleStyle={simpleStyle}
            onComplete={handleChatComplete}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
}