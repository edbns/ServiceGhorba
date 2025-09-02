import React from 'react';
import Link from 'next/link';
import CVReviewer from '@/components/CVReviewer';
import InlineLanguageSelector from '@/components/InlineLanguageSelector';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';

export default function ReviewPage() {
  const { t } = useSimpleTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/" className="text-gray-600 hover:text-primary transition-colors font-medium">
                {t('nav.back')}
              </Link>
              <InlineLanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
              {t('review.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('review.subtitle')}
            </p>
          </div>

          <CVReviewer />

          {/* Additional Help */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mt-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">{t('review.what_reviews')}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-5 rounded-lg border border-gray-200 bg-gray-50">
                  <h4 className="font-medium text-gray-800 mb-3">{t('review.content_quality')}</h4>
                  <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                    <li>{t('review.content_summary')}</li>
                    <li>{t('review.content_achievements')}</li>
                    <li>{t('review.content_metrics')}</li>
                    <li>{t('review.content_keywords')}</li>
                  </ul>
                </div>
                <div className="p-5 rounded-lg border border-gray-200 bg-gray-50">
                  <h4 className="font-medium text-gray-800 mb-3">{t('review.structure_format')}</h4>
                  <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                    <li>{t('review.structure_organization')}</li>
                    <li>{t('review.structure_length')}</li>
                    <li>{t('review.structure_ats')}</li>
                    <li>{t('review.structure_regional')}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
                <h4 className="font-medium text-blue-900 mb-3">{t('review.create_new')}</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/" className="sm:w-auto">
                    <button className="min-w-[200px] bg-primary hover:bg-primary-dark text-white font-medium py-2 px-5 rounded-lg transition-colors">
                      {t('review.create_new_button')}
                    </button>
                  </Link>
                  <Link href="/" className="sm:w-auto">
                    <button className="min-w-[200px] border border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-5 rounded-lg transition-colors">
                      {t('review.upload_improve')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}