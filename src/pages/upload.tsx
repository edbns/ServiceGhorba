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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upload Your Existing CV
            </h1>
            <p className="text-xl text-gray-600">
              Upload your current CV and we&apos;ll help you improve and reformat it with AI assistance.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-2">
                <span className="text-red-600">❌</span>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upload Section */}
            <div className="space-y-8">
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Step 1: Upload Your CV
                </h2>
                <UploadForm 
                  onFileProcessed={handleFileProcessed}
                  onError={handleError}
                />
              </div>

              {extractedData && (
                <div className="card">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Step 2: Choose Format
                  </h2>
                  <CVFormatSelector
                    value={selectedFormat}
                    onChange={setSelectedFormat}
                  />
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="space-y-8">
              {extractedData ? (
                <div className="card">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Extracted Information
                  </h2>
                  <div className="space-y-4">
                    {extractedData.name && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="text-gray-900">{extractedData.name}</p>
                      </div>
                    )}
                    
                    {extractedData.contact?.email && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">{extractedData.contact.email}</p>
                      </div>
                    )}
                    
                    {extractedData.contact?.phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="text-gray-900">{extractedData.contact.phone}</p>
                      </div>
                    )}
                    
                    {extractedData.skills && extractedData.skills.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <p className="text-gray-900">{extractedData.skills.join(', ')}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 space-y-4">
                    <button
                      onClick={handleGenerateDirectly}
                      disabled={isProcessing}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="w-full btn-secondary"
                    >
                      Review & Edit with Chat
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p>Upload a file to see the extracted information here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}