import React, { useState, useCallback } from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';
import { parseUploadedFile } from '@/utils/parseHelpers';
import { CVData } from '@/utils/formatHelpers';

interface UploadFormProps {
  onFileProcessed: (data: Partial<CVData>) => void;
  onError: (error: string) => void;
}

export default function UploadForm({ onFileProcessed, onError }: UploadFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { t } = useSimpleTranslation();

  const handleFile = useCallback(async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      onError('Please upload a PDF or DOCX file only.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      onError('File size must be less than 10MB.');
      return;
    }

    setIsProcessing(true);

    try {
      const extractedData = await parseUploadedFile(file);
      onFileProcessed(extractedData);
    } catch (error) {
      console.error('File processing error:', error);
      onError(error instanceof Error ? error.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileProcessed, onError]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
          ${dragActive 
            ? 'border-primary bg-blue-50' 
            : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }
          ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isProcessing ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600">Processing your file...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {t('upload.drop_here')}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {t('upload.or_browse')}
              </p>
            </div>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="btn-primary cursor-pointer inline-block"
            >
              {t('upload.choose_file')}
            </label>
            <p className="text-xs text-gray-500">
              {t('upload.supports')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}