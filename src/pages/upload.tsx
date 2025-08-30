import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UploadForm from '@/components/UploadForm';
import CVFormatSelector, { CVFormat } from '@/components/CVFormatSelector';
import { CVData } from '@/utils/formatHelpers';

export default function UploadPage() {
  const router = useRouter();
  const [selectedFormat, setSelectedFormat] = useState<CVFormat>('canada_resume');
  const [extractedData, setExtractedData] = useState<Partial<CVData> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileProcessed = (data: Partial<CVData>) => {
    setExtractedData(data);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setExtractedData(null);
  };

  const handleProceedToChat = () => {
    // Store data in session storage and navigate to chat
    if (extractedData) {
      sessionStorage.setItem('uploadedCVData', JSON.stringify(extractedData));
      sessionStorage.setItem('selectedFormat', selectedFormat);
      router.push('/chat?mode=improve');
    }
  };

  const handleGenerateDirectly = async () => {
    if (!extractedData) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'cv',
          data: extractedData,
          format: selectedFormat,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate CV');
      }

      const result = await response.json();
      
      // Store result and navigate to result page
      sessionStorage.setItem('generatedCV', JSON.stringify(result.data));
      sessionStorage.setItem('selectedFormat', selectedFormat);
      router.push('/result');
    } catch (error) {
      console.error('Generation error:', error);
      setError('Failed to generate CV. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="/logo.svg" alt="AI CV Generator" className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-8">
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Upload Your CV
            </h1>
            <p className="text-lg text-gray-600">
              Upload your existing CV and we&apos;ll help you improve and reformat it
            </p>
          </div>

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

          {/* Upload Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <UploadForm 
              onFileProcessed={handleFileProcessed}
              onError={handleError}
            />
          </div>

          {/* Format Selection - Inline Radio Buttons */}
          {extractedData && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
              <CVFormatSelector
                value={selectedFormat}
                onChange={setSelectedFormat}
              />
            </div>
          )}

          {/* Extracted Data Preview */}
          {extractedData && (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Extracted Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {extractedData.name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900">{extractedData.name}</p>
                  </div>
                )}
                
                {extractedData.contact?.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{extractedData.contact.email}</p>
                  </div>
                )}
                
                {extractedData.contact?.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900">{extractedData.contact.phone}</p>
                  </div>
                )}
                
                {extractedData.skills && extractedData.skills.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                    <p className="text-gray-900">{extractedData.skills.join(', ')}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGenerateDirectly}
                  disabled={isProcessing}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    'Generate CV Now'
                  )}
                </button>
                
                <button
                  onClick={handleProceedToChat}
                  className="flex-1 border border-gray-300 hover:border-primary text-gray-700 hover:text-primary font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Review with AI Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}