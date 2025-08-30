import React from 'react';
import Link from 'next/link';
import CVReviewer from '@/components/CVReviewer';
import BuddyModeBanner from '@/components/BuddyModeBanner';

export default function ReviewPage() {
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
              AI CV Review
            </h1>
            <p className="text-lg text-gray-600">
              Get instant feedback on your existing CV and learn how to improve it
            </p>
          </div>

          <CVReviewer />

          {/* Additional Help */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What Our AI Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Content Quality</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Professional summary strength</li>
                      <li>• Achievement vs. duty statements</li>
                      <li>• Quantifiable results and metrics</li>
                      <li>• Industry-relevant keywords</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Structure & Format</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Proper section organization</li>
                      <li>• Appropriate length and spacing</li>
                      <li>• ATS-friendly formatting</li>
                      <li>• Regional compliance</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Want to create a new CV instead?</h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/chat" className="flex-1">
                      <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Create New CV
                      </button>
                    </Link>
                    <Link href="/upload" className="flex-1">
                      <button className="w-full border border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Upload & Improve
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}