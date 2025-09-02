import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogPostEditor, { BlogPost } from '@/components/BlogPostEditor';
import AdminAuth from '@/components/AdminAuth';
import { isAuthenticated, logout } from '@/utils/auth';

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  
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
    // Load from localStorage; seed samples only if empty
    const saved = localStorage.getItem('admin_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as BlogPost[];
        setPosts(parsed);
        return;
      } catch {}
    }
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
    localStorage.setItem('admin_posts', JSON.stringify(samplePosts));
  };

  const handleAuthenticated = () => {
    setIsAuth(true);
    loadBlogPosts();
  };

  const handleLogout = () => {
    logout();
    setIsAuth(false);
  };

  const handleSavePost = async (post: BlogPost) => {
    // In a real implementation, this would save to your CMS
    // For now, we'll just update the local state
    if (editingPost) {
      setPosts(prev => {
        const next = prev.map(p => p.slug === editingPost.slug ? post : p);
        localStorage.setItem('admin_posts', JSON.stringify(next));
        return next;
      });
    } else {
      setPosts(prev => {
        const next = [...prev, post];
        localStorage.setItem('admin_posts', JSON.stringify(next));
        return next;
      });
    }
    
    setEditingPost(null);
    setIsCreating(false);
    alert('Post saved successfully!');
  };

  const handleDeletePost = (slug: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => {
        const next = prev.filter(p => p.slug !== slug);
        localStorage.setItem('admin_posts', JSON.stringify(next));
        return next;
      });
    }
  };

  // Login form
  if (!isAuth) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  // Admin dashboard
  if (isCreating || editingPost) {
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
                <span className="text-gray-600 font-medium">Admin Panel</span>
                <button onClick={handleLogout} className="text-gray-600 hover:text-primary transition-colors font-medium">
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
      <nav className="bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="/logo.png" alt="AI CV Generator" className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Blog
              </Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-primary transition-colors font-medium">
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
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Post</span>
            </button>
          </div>

          {/* Blog Posts Management */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Blog Posts</h2>
            
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
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