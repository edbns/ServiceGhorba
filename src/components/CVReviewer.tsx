import React, { useState } from 'react';
import { useSimpleTranslation } from '@/hooks/useSimpleTranslation';

interface CVReviewProps {
  className?: string;
}

interface ReviewResult {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  overall_score: number;
}

export default function CVReviewer({ className = '' }: CVReviewProps) {
  const { t } = useSimpleTranslation();
  const [cvText, setCvText] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null);

  const reviewCV = async () => {
    if (!cvText.trim()) return;

    setIsReviewing(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'cv_review',
          data: { content: cvText },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to review CV');
      }

      const result = await response.json();
      
      // Parse the AI response
      try {
        const review = JSON.parse(result.data.content);
        setReviewResult(review);
      } catch {
        // Fallback if not JSON
        setReviewResult({
          strengths: ['Your CV has been reviewed'],
          weaknesses: ['Check the detailed feedback below'],
          suggestions: [result.data.content || 'General improvements suggested'],
          overall_score: 7
        });
      }
    } catch (error) {
      console.error('CV review error:', error);
      alert('Unable to review CV. Please try again.');
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-start space-x-3 mb-4">
        <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('review.title')}</h3>
          <p className="text-sm text-gray-600">
            {t('review.description')}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('review.paste_placeholder')}
          </label>
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder={t('review.paste_description')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={8}
          />
        </div>

        <button
          onClick={reviewCV}
          disabled={!cvText.trim() || isReviewing}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isReviewing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>AI is reviewing your CV...</span>
            </div>
          ) : (
            t('review.button')
          )}
        </button>

        {reviewResult && (
          <div className="space-y-4">
            {/* Overall Score */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">Overall Score</h4>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-blue-900">{reviewResult.overall_score}</div>
                  <div className="text-sm text-blue-700">/10</div>
                </div>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${reviewResult.overall_score * 10}%` }}
                ></div>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-3">What&apos;s Working Well</h4>
              <ul className="space-y-2">
                {reviewResult.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-800 text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-3">Areas for Improvement</h4>
              <ul className="space-y-2">
                {reviewResult.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-orange-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-orange-800 text-sm">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-3">Improvement Suggestions</h4>
              <ul className="space-y-2">
                {reviewResult.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-purple-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-purple-800 text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}