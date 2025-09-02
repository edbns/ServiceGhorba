import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/blog', label: 'Blog', icon: '📝' },
    { href: '/admin', label: 'Admin', icon: '⚙️' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🤖</span>
            <span className="text-xl font-bold text-primary">AI CV Generator</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  router.pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}