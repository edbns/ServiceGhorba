import React, { useState } from 'react';

export interface BlogPost {
  title: string;
  date: string;
  author: string;
  image?: string;
  description: string;
  content: string;
  slug: string;
  embeds?: Array<{ url: string; title: string; image?: string }>;
}

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

export default function BlogPostEditor({ post, onSave, onCancel }: BlogPostEditorProps) {
  const [formData, setFormData] = useState<BlogPost>({
    title: post?.title || '',
    date: post?.date || new Date().toISOString().split('T')[0],
    author: post?.author || 'Admin',
    image: post?.image || '',
    description: post?.description || '',
    content: post?.content || '',
    slug: post?.slug || '',
    embeds: post?.embeds || [],
  });

  const [isSaving, setIsSaving] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      alert('Title and content are required');
      return;
    }

    setIsSaving(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save post');
    } finally {
      setIsSaving(false);
    }
  };

  const addEmbed = () => {
    setFormData(prev => ({
      ...prev,
      embeds: [...(prev.embeds || []), { url: '', title: '', image: '' }]
    }));
  };

  const removeEmbed = (index: number) => {
    setFormData(prev => ({
      ...prev,
      embeds: (prev.embeds || []).filter((_, i) => i !== index)
    }));
  };

  const getYouTubeThumbnail = (url: string): string | undefined => {
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtube.com')) {
        const v = u.searchParams.get('v');
        if (v) return `https://img.youtube.com/vi/${v}/hqdefault.jpg`;
      }
      if (u.hostname === 'youtu.be') {
        const id = u.pathname.slice(1);
        if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      }
    } catch {
      // ignore
    }
    return undefined;
  };

  const updateEmbed = (index: number, field: 'url' | 'title' | 'image', value: string) => {
    setFormData(prev => {
      const list = [...(prev.embeds || [])];
      const item: { url: string; title: string; image?: string } = { ...(list[index] || { url: '', title: '', image: '' }) };
      if (field === 'url') item.url = value;
      if (field === 'title') item.title = value;
      if (field === 'image') item.image = value;
      if (field === 'url' && !item.image) {
        const yt = getYouTubeThumbnail(value);
        if (yt) item.image = yt;
      }
      list[index] = item;
      return { ...prev, embeds: list };
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {post ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="input-field"
                placeholder="Enter post title..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="input-field"
                placeholder="url-friendly-slug"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                className="input-field"
                placeholder="Author name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    setFormData(prev => ({ ...prev, image: reader.result as string }));
                  };
                  reader.readAsDataURL(file);
                }}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {formData.image && (
                <div className="flex items-center space-x-2">
                  <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">PNG, JPG up to ~1–2MB. Stored as data URL.</p>
          </div>

          {/* Link Embeds */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Link Embeds (optional)
              </label>
              <button type="button" onClick={addEmbed} className="btn-secondary">Add Link</button>
            </div>

            {(formData.embeds || []).length > 0 && (
              <div className="space-y-4">
                {(formData.embeds || []).map((embed, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">URL</label>
                        <input
                          type="url"
                          value={embed.url}
                          onChange={(e) => updateEmbed(index, 'url', e.target.value)}
                          className="input-field"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Image</label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files && e.target.files[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = () => {
                                updateEmbed(index, 'image', reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          {embed.image && (
                            <img src={embed.image} alt="Preview" className="w-14 h-14 object-cover rounded" />
                          )}
                        </div>
                      </div>
                      <div className="mt-3 text-right">
                        <button type="button" onClick={() => removeEmbed(index)} className="text-sm text-red-600 hover:text-red-800">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-field h-24 resize-none"
              placeholder="Brief description of the post..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content * (Markdown)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="input-field h-96 resize-none font-mono text-sm"
              placeholder="Write your blog post content in Markdown..."
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Post'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Markdown Preview */}
      <div className="card mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        <div className="prose max-w-none">
          <h1>{formData.title}</h1>
          <p className="text-gray-600">By {formData.author} on {formData.date}</p>
          {formData.image && (
            <img src={formData.image} alt={formData.title} className="w-full h-48 object-cover rounded-lg" />
          )}
          <p className="text-lg text-gray-700">{formData.description}</p>
          {(formData.embeds && formData.embeds.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              {formData.embeds.map((embed, idx) => (
                <a key={idx} href={embed.url} target="_blank" rel="noopener noreferrer" className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow transition-shadow">
                  {embed.image && (
                    <img src={embed.image} alt={embed.title || 'Link'} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-3">
                    <div className="font-medium text-gray-900 text-sm truncate">{embed.title || embed.url}</div>
                    <div className="text-xs text-gray-500 truncate">{embed.url}</div>
                  </div>
                </a>
              ))}
            </div>
          )}
          <div className="whitespace-pre-wrap">
            {formData.content}
          </div>
        </div>
      </div>
    </div>
  );
}