'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import ChatBot from '@/components/ChatBot';
import { CVFormat } from '@/components/CVFormatSelector';
import TwoLayerFormatSelector from '@/components/TwoLayerFormatSelector';


import CountryBasedSelector from '@/components/CountryBasedSelector';
import UploadForm from '@/components/UploadForm';
import InlineLanguageSelector from '@/components/InlineLanguageSelector';
import CVReviewer from '@/components/CVReviewer';
import CVPreview from '@/components/CVPreview';
import ExportButtons from '@/components/ExportButtons';
import ExportThemeSelector, { ExportTheme } from '@/components/ExportThemeSelector';
import ExportLanguageSelector, { ExportLanguage } from '@/components/ExportLanguageSelector';
import CVForm from '@/components/CVForm';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';
import Head from 'next/head';
import { CVData, applyFormatRules } from '@/utils/formatHelpers';

export default function HomePage() {
  const { t, language } = useSimpleTranslation();

  const [selectedFormat, setSelectedFormat] = useState<CVFormat>('canada_resume');
  const [selectedJobType, setSelectedJobType] = useState<CVFormat | null>(null);
  const [documentType, setDocumentType] = useState<'cv' | 'motivation_letter' | 'review'>('cv');
  const [simpleStyle, setSimpleStyle] = useState(false);

  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<CVData | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ExportTheme>('clean');
  const [selectedLanguage, setSelectedLanguage] = useState<ExportLanguage>('en');
  const [showForm, setShowForm] = useState(false);

  // Auto-show form when both job type and regional format are selected
  React.useEffect(() => {
    if (selectedJobType && selectedFormat && documentType === 'cv') {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [selectedJobType, selectedFormat, documentType]);

  const handleChatComplete = (generatedData: CVData) => {
    // Store the generated data and set state
    sessionStorage.setItem('generatedCV', JSON.stringify(generatedData));
    sessionStorage.setItem('selectedFormat', selectedFormat);
    sessionStorage.setItem('documentType', documentType);
    setGeneratedData(generatedData);
    
    // Scroll to results section
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = (formData: CVData) => {
    // Store the form data and set state
    sessionStorage.setItem('generatedCV', JSON.stringify(formData));
    sessionStorage.setItem('selectedFormat', selectedFormat);
    sessionStorage.setItem('documentType', documentType);
    setGeneratedData(formData);
    setShowForm(false);
    
    // Scroll to results section
    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    // Reset selections when canceling
    setSelectedJobType(null);
  };

  const handleDocumentTypeChange = (newType: 'cv' | 'motivation_letter' | 'review') => {
    setDocumentType(newType);
    setSimpleStyle(false); // Reset simple style when switching types
  };

  const handleFileProcessed = (data: Partial<CVData>) => {
    setError(null);
    setShowUpload(false);
    // Auto-switch to CV mode when file is uploaded
    setDocumentType('cv');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // Update html lang dynamically for SEO and accessibility
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const isFR = language === 'fr';

  return (
    <div className="min-h-screen bg-gray-50">
        <Head>
          <title>{isFR ? 'SmartCV – Créateur de CV IA pour immigrés, travailleurs et débutants' : 'SmartCV – AI CV Builder for Immigrants, Workers & Career Starters'}</title>
          <meta name="description" content={isFR ? 'Créez un CV professionnel en quelques minutes avec SmartCV. Conçu pour les immigrés, les travailleurs et les primo-demandeurs d\'emploi. Pas d\'expérience ? Aucun problème. Utilisez l\'IA pour créer, traduire et exporter votre CV instantanément.' : 'Create a professional CV in minutes with SmartCV. Tailored for immigrants, workers, and first-time job seekers. No experience? No problem. Use AI to build, translate, and export your CV instantly.'} />
          <meta property="og:title" content={isFR ? 'SmartCV – Créateur de CV IA pour immigrés, travailleurs et débutants' : 'SmartCV – AI CV Builder for Immigrants, Workers & Career Starters'} />
          <meta property="og:description" content={isFR ? 'Créez un CV professionnel avec l\'IA – idéal pour les emplois de service, les débutants ou toute personne ayant besoin d\'un CV rapidement. Traduisez, exportez et adaptez à n\'importe quel pays.' : 'Build a professional CV with AI – perfect for service jobs, first-timers, or anyone who needs a resume fast. Translate, export, and customize for any country.'} />
          <meta property="og:image" content="https://serviceghorba.com/Logo.png" />
          <meta property="og:url" content="https://serviceghorba.com" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={isFR ? 'SmartCV – Créateur de CV IA pour immigrés et travailleurs' : 'SmartCV – AI CV Builder for Immigrants & Workers'} />
          <meta name="twitter:description" content={isFR ? 'Pas d\'expérience ? Aucun problème. Utilisez l\'IA pour créer un CV pour n\'importe quel pays ou emploi. Rapide, traduit et facile à utiliser.' : 'No experience? No problem. Use AI to build a CV for any country or job. Fast, translated, and free to use.'} />
          <meta name="twitter:image" content="https://serviceghorba.com/Logo.png" />
        </Head>
        
        {/* Navigation */}
      <nav className="bg-white">
        <div className="container">
          <div className="header-container flex justify-between items-center h-20">
            <div className="header-logo flex items-center">
              <Link href="/">
                <img src="/Logo.png" alt="Logo" className="h-16 w-auto cursor-pointer" />
              </Link>
            </div>
            <div className="header-nav flex items-center space-x-8">
              <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors font-medium">
                {t('nav.blog')}
              </Link>
              <InlineLanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      <div className="main-container container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
              {t('home.title')}
            </h1>

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
                {t('home.cv_resume')}
              </button>
              <button
                onClick={() => handleDocumentTypeChange('motivation_letter')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  documentType === 'motivation_letter'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('home.cover_letter')}
              </button>
              <button
                onClick={() => handleDocumentTypeChange('review')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  documentType === 'review'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Review CV
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
                    {t('home.simple_style')}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Upload Section */}
          {documentType === 'cv' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{t('home.have_existing')}</h3>
                <button
                  onClick={() => setShowUpload(!showUpload)}
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  {showUpload ? t('home.hide_upload') : t('home.upload_improve')}
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
              <TwoLayerFormatSelector
                selectedFormat={selectedFormat}
                selectedJobType={selectedJobType}
                onFormatChange={setSelectedFormat}
                onJobTypeChange={setSelectedJobType}
              />
            </div>
          )}

          

          {/* CV Form */}
          {documentType === 'cv' && showForm && (
            <CVForm
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
              selectedJobType={selectedJobType ? selectedJobType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : ''}
              selectedFormat={selectedFormat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            />
          )}

          {/* Helper Tools for CV */}
          {documentType === 'cv' && (
            <>
              <CountryBasedSelector
                onCountrySelected={(format) => {
                  setSelectedFormat(format);
                }}
              />
            </>
          )}

          {/* Chat Interface */}
          {documentType !== 'review' && !showForm && (
          <ChatBot
            type={documentType}
            format={selectedFormat}
            simpleStyle={simpleStyle}
            onComplete={handleChatComplete}
            />
          )}

          {/* CV Review Interface */}
          {documentType === 'review' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  AI CV Review
                </h2>
                <p className="text-gray-600">
                  Paste your CV content and get instant AI-powered feedback
                </p>
              </div>
              <CVReviewer />
            </div>
          )}

          {/* Results Section */}
          {generatedData && (
            <div id="results-section" className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Your {documentType === 'cv' ? 'CV' : 'Motivation Letter'} is Ready!
                </h2>
                <p className="text-xl text-gray-600">
                  Review your document below and export it in your preferred format.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-6 self-start">
                  {/* Current Format Display */}
                  {documentType === 'cv' && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Format</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              {selectedJobType && (
                                <div className="text-sm font-medium text-blue-900">
                                  Job Type: {selectedJobType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </div>
                              )}
                              <div className="text-sm font-medium text-blue-900">
                                Regional: {selectedFormat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            </div>
                            <button
                              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Change Format
                            </button>
                          </div>
                          
                          {/* Regional Format Info for Service Workers */}
                          {['basic_worker', 'delivery_driver', 'waiter_service', 'construction_cv', 'kitchen_helper', 'cleaner_cv'].includes(selectedFormat) && (
                            <div className="mt-3 pt-3 border-t border-blue-200">
                              <div className="flex items-start space-x-2">
                                <svg className="w-4 h-4 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-xs text-blue-800">
                                  <p className="font-medium">Regional Format:</p>
                                  <p>This service format adapts to your country&apos;s standards. Consider switching to a specific regional format (Canada, UK, Germany, etc.) for better job applications.</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Theme Selector */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Theme</h3>
                    <ExportThemeSelector
                      value={selectedTheme}
                      onChange={setSelectedTheme}
                    />
                  </div>

                  {/* Language Selector */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Language</h3>
                    <ExportLanguageSelector
                      value={selectedLanguage}
                      onChange={setSelectedLanguage}
                    />
                  </div>

                  {/* Export Options */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <ExportButtons 
                      cvData={applyFormatRules(generatedData, selectedFormat)}
                      theme={selectedTheme}
                      language={selectedLanguage}
                      previewElementId="cv-preview"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setGeneratedData(null);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Create New Document</span>
                      </button>
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
                          <li>• PDF format is best for job applications</li>
                          <li>• Service jobs work great with simple formats</li>
                          <li>• Keep it clean and professional</li>
                          <li>• Ready to download and apply!</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                  <CVPreview cvData={applyFormatRules(generatedData, selectedFormat)} format={selectedFormat} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}