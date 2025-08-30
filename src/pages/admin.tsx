import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogPostEditor, { BlogPost } from '@/components/BlogPostEditor';
import { isAuthenticated, login, logout } from '@/utils/auth';

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Blog management state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
    if (isAuthenticated()) {
      loadBlogPosts();
    }
  }, []);

  const loadBlogPosts = () => {
    // In a real implementation, this would load from your CMS
    // For now, using the same sample posts as in blog.tsx
    const samplePosts: BlogPost[] = [
      {
        title: "How to Write a Killer CV in 2025",
        date: "2025-01-15",
        author: "AI CV Expert",
        image: "/images/cv-tips.jpg",
        description: "Our top tips to make your resume stand out in today's competitive job market.",
        content: "# How to Write a Killer CV in 2025\n\nThe job market in 2025 is more competitive than ever...",
        slug: "killer-cv-2025"
      },
      {
        title: "The Art of Writing Compelling Motivation Letters",
        date: "2025-01-10",
        author: "Career Coach AI",
        description: "Learn how to craft motivation letters that capture attention and showcase your passion.",
        content: "# The Art of Writing Compelling Motivation Letters\n\nA motivation letter is your chance to show personality...",
        slug: "motivation-letters-guide"
      }
    ];
    setPosts(samplePosts);
  };

  const handleSendOTP = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send_otp',
          email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStep('otp');
      } else {
        setError(result.error || 'Failed to send OTP');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify_otp',
          email,
          otp,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.token);
        setIsAuth(true);
        loadBlogPosts();
      } else {
        setError(result.error || 'Invalid OTP');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setEmail('');
    setOtp('');
    setStep('email');
    setError('');
  };

  const handleSavePost = async (post: BlogPost) => {
    // In a real implementation, this would save to your CMS
    // For now, we'll just update the local state
    if (editingPost) {
      setPosts(prev => prev.map(p => p.slug === editingPost.slug ? post : p));
    } else {
      setPosts(prev => [...prev, post]);
    }
    
    setEditingPost(null);
    setIsCreating(false);
    alert('Post saved successfully!');
  };

  const handleDeletePost = (slug: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(p => p.slug !== slug));
    }
  };

  // Login form
  if (!isAuth) {
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
          <div className="max-w-md mx-auto">
            <div className="card">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔐</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                <p className="text-gray-600 mt-2">
                  {step === 'email' 
                    ? 'Enter your email to receive a login code'
                    : 'Enter the code sent to your email'
                  }
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                {step === 'email' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        placeholder="admin@example.com"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()}
                      />
                    </div>
                    <button
                      onClick={handleSendOTP}
                      disabled={isLoading || !email}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Sending...' : 'Send Login Code'}
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter 6-digit code
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="input-field text-center text-2xl tracking-widest"
                        placeholder="123456"
                        maxLength={6}
                        onKeyPress={(e) => e.key === 'Enter' && handleVerifyOTP()}
                      />
                    </div>
                    <button
                      onClick={handleVerifyOTP}
                      disabled={isLoading || otp.length !== 6}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Verifying...' : 'Login'}
                    </button>
                    <button
                      onClick={() => {
                        setStep('email');
                        setOtp('');
                        setError('');
                      }}
                      className="w-full btn-secondary"
                    >
                      ← Back to Email
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  if (isCreating || editingPost) {
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
                <span className="text-gray-700">Admin Panel</span>
                <button onClick={handleLogout} className="btn-secondary">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="container py-12">
          <BlogPostEditor
            post={editingPost || undefined}
            onSave={handleSavePost}
            onCancel={() => {
              setEditingPost(null);
              setIsCreating(false);
            }}
          />
        </div>
      </div>
    );
  }

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
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage blog posts and content</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="btn-primary"
            >
              ➕ New Post
            </button>
          </div>

          {/* Blog Posts Management */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Blog Posts</h2>
            
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-gray-600">No blog posts yet. Create your first post!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Author</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.slug} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{post.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{post.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(post.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {post.author}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Link
                              href={`/blog?slug=${post.slug}`}
                              className="text-primary hover:text-primary-dark text-sm"
                              target="_blank"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => setEditingPost(post)}
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.slug)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">{posts.length}</div>
              <p className="text-gray-600">Total Posts</p>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {posts.filter(p => new Date(p.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
              <p className="text-gray-600">Posts This Month</p>
            </div>
            
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {new Set(posts.map(p => p.author)).size}
              </div>
              <p className="text-gray-600">Authors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}