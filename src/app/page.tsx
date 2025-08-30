import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <span className="text-xl font-bold text-primary">AI CV Generator</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/blog" className="text-gray-700 hover:text-primary transition-colors">
                📝 Blog
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-primary transition-colors">
                ⚙️ Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Professional CVs with 
            <span className="text-primary"> AI Assistance</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Generate stunning CVs, resumes, cover letters, and motivation letters in minutes. 
            Upload your existing CV or create one from scratch with our AI-powered chat interface.
          </p>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Upload Option */}
            <Link href="/upload" className="group">
              <div className="card hover:shadow-lg transition-shadow duration-300 group-hover:border-primary">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Existing CV</h3>
                  <p className="text-gray-600">
                    Have a CV already? Upload your PDF or Word document and we&apos;ll help you improve and reformat it.
                  </p>
                </div>
              </div>
            </Link>

            {/* Chat Option */}
            <Link href="/chat" className="group">
              <div className="card hover:shadow-lg transition-shadow duration-300 group-hover:border-primary">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Create from Scratch</h3>
                  <p className="text-gray-600">
                    Start fresh with our AI-powered chat interface. We&apos;ll guide you through creating a professional CV step by step.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Our AI CV Generator?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🌍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Regional Formats</h3>
                <p className="text-gray-600">
                  Choose from Canadian, European, Europass, and other regional CV formats that comply with local standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">📄</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h3>
                <p className="text-gray-600">
                  Export your CV as PDF, Word document, plain text, or Markdown. Perfect for any application process.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Download</h3>
                <p className="text-gray-600">
                  No sign-up required. Create your CV and download it immediately. Your privacy is our priority.
                </p>
              </div>
            </div>
          </div>

          {/* Document Types */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">What Can You Create?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">CV / Resume</h3>
                <p className="text-gray-600">
                  Professional CVs and resumes tailored to your target country and industry.
                </p>
              </div>

              <div className="card text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cover Letter</h3>
                <p className="text-gray-600">
                  Compelling cover letters that highlight your qualifications and enthusiasm.
                </p>
              </div>

              <div className="card text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Motivation Letter</h3>
                <p className="text-gray-600">
                  Personalized motivation letters for academic programs and special applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container text-center">
          <p className="text-gray-600">
            Built with ❤️ using AI technology. Create professional documents in minutes.
          </p>
          <div className="mt-4 space-x-6">
            <Link href="/blog" className="text-primary hover:text-primary-dark transition-colors">
              Blog
            </Link>
            <Link href="/admin" className="text-primary hover:text-primary-dark transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}