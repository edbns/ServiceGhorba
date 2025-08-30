import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BlogPost {
  title: string;
  date: string;
  author: string;
  image?: string;
  description: string;
  content: string;
  slug: string;
}

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  useEffect(() => {
    if (slug && posts.length > 0) {
      const post = posts.find(p => p.slug === slug);
      setCurrentPost(post || null);
    } else {
      setCurrentPost(null);
    }
  }, [slug, posts]);

  const loadBlogPosts = async () => {
    try {
      // In a real implementation, this would load from your content management system
      // For now, we'll use hardcoded sample posts
      const samplePosts: BlogPost[] = [
        {
          title: "How to Write a Killer CV in 2025",
          date: "2025-01-15",
          author: "AI CV Expert",
          image: "/images/cv-tips.jpg",
          description: "Our top tips to make your resume stand out in today's competitive job market.",
          content: `# How to Write a Killer CV in 2025

The job market in 2025 is more competitive than ever. With AI tools becoming mainstream and remote work changing hiring practices, your CV needs to stand out from the crowd. Here are our top strategies for creating a compelling resume that gets noticed.

## 1. Optimize for ATS (Applicant Tracking Systems)

Most companies now use ATS to filter resumes before human eyes see them. To pass these systems:

- Use standard section headings (Experience, Education, Skills)
- Include relevant keywords from the job description
- Avoid complex formatting, tables, or graphics
- Use a clean, simple font like Arial or Calibri
- Save as both PDF and Word formats

## 2. Lead with Impact, Not Duties

Instead of listing what you did, focus on what you achieved:

**Before:** "Responsible for managing social media accounts"
**After:** "Increased social media engagement by 150% and grew follower base from 1K to 15K in 6 months"

## 3. Quantify Everything

Numbers grab attention and provide concrete evidence of your value:

- Revenue generated or saved
- Percentage improvements
- Team sizes managed
- Projects completed
- Deadlines met

## 4. Tailor for Each Application

Generic CVs don't work anymore. For each application:

- Research the company and role
- Match your experience to their requirements
- Use their language and terminology
- Highlight relevant achievements
- Adjust your professional summary

## 5. Keep It Concise

Recruiters spend 6-10 seconds scanning a CV initially:

- 1-2 pages maximum for most roles
- Use bullet points, not paragraphs
- Prioritize recent and relevant experience
- Remove outdated skills and irrelevant jobs

## 6. Modern Design Principles

Your CV should look professional and modern:

- Plenty of white space
- Consistent formatting
- Clear hierarchy with headings
- Professional color scheme (like our signature #043fff)
- Easy-to-read fonts

## 7. Include a Strong Professional Summary

Your summary is prime real estate - make it count:

- 2-3 sentences maximum
- Include your years of experience
- Mention key skills and achievements
- Align with the target role

## Conclusion

Creating a standout CV in 2025 requires balancing ATS optimization with human appeal. Focus on achievements, use data to tell your story, and always tailor your content to the specific role and company.

Ready to create your killer CV? Use our AI-powered generator to implement these strategies automatically!`,
          slug: "killer-cv-2025"
        },
        {
          title: "The Art of Writing Compelling Motivation Letters",
          date: "2025-01-10",
          author: "Career Coach AI",
          description: "Learn how to craft motivation letters that capture attention and showcase your passion.",
          content: `# The Art of Writing Compelling Motivation Letters

A motivation letter is your chance to show personality, passion, and fit beyond what your CV can convey. Whether you're applying for a job, university program, or scholarship, here's how to write a letter that resonates.

## Understanding the Purpose

Unlike a cover letter that focuses on qualifications, a motivation letter should:

- Explain your passion and drive
- Show cultural and personal fit
- Demonstrate knowledge of the organization
- Tell your unique story
- Connect your goals with their mission

## Structure That Works

### Opening Hook (First Paragraph)
Start with something memorable:
- A relevant personal story
- An impressive achievement
- Your connection to their mission
- A thought-provoking question

### Body Paragraphs (2-3 paragraphs)
- **Paragraph 1:** Why this organization/program excites you
- **Paragraph 2:** What you bring (experiences, skills, perspective)
- **Paragraph 3:** How you'll contribute and grow

### Strong Closing
- Reiterate your enthusiasm
- Include a call to action
- Express gratitude for consideration

## Writing Tips

1. **Research Thoroughly**
   - Company values and culture
   - Recent news and developments
   - Key people and their backgrounds
   - Specific programs or initiatives

2. **Show, Don't Tell**
   - Use specific examples
   - Include concrete details
   - Avoid generic statements
   - Provide evidence for claims

3. **Match Their Tone**
   - Formal for traditional industries
   - More casual for startups
   - Academic for universities
   - Professional but warm for nonprofits

## Common Mistakes to Avoid

- Generic templates that could apply anywhere
- Focusing too much on what you want vs. what you offer
- Repeating information from your CV
- Being too modest or too boastful
- Ignoring the word limit
- Poor grammar and spelling

## Sample Opening Lines

**For a Tech Startup:**
"When I built my first app at age 16 and saw it help local businesses during the pandemic, I knew technology could be a force for positive change - exactly the mission that drives [Company Name]."

**For Graduate School:**
"Growing up in a family of teachers, I witnessed firsthand how education can transform lives, sparking my passion to research innovative learning methodologies through your Educational Psychology program."

**For a Nonprofit:**
"Volunteering at the local food bank taught me that sustainable change requires both compassion and strategic thinking - qualities I'm excited to bring to [Organization Name]'s mission."

## Final Checklist

Before submitting your motivation letter:

- [ ] Addresses the specific organization/program
- [ ] Shows genuine enthusiasm and knowledge
- [ ] Includes specific examples and achievements
- [ ] Maintains appropriate tone and length
- [ ] Has been proofread multiple times
- [ ] Connects your goals with their mission
- [ ] Tells a compelling personal story

Remember: A great motivation letter doesn't just list qualifications - it makes the reader excited to meet you and learn more about your potential contribution.

Use our AI generator to craft a personalized motivation letter that captures your unique story and aligns perfectly with your target opportunity!`,
          slug: "motivation-letters-guide"
        }
      ];
      
      setPosts(samplePosts);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Single post view
  if (currentPost) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-100">
          <div className="container">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <img src="/logo.svg" alt="AI CV Generator" className="h-8 w-auto" />
              </div>
              <div className="flex items-center space-x-8">
                <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors font-medium">
                  Back to Blog
                </Link>
                <Link href="/" className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Create CV
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Article */}
        <article className="container py-12">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {currentPost.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-gray-600">
                <span>By {currentPost.author}</span>
                <span>•</span>
                <span>{new Date(currentPost.date).toLocaleDateString()}</span>
              </div>
              {currentPost.image && (
                <img 
                  src={currentPost.image} 
                  alt={currentPost.title}
                  className="w-full h-64 object-cover rounded-lg mt-8"
                />
              )}
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {currentPost.content}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-primary rounded-lg text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Create Your Perfect CV?</h3>
              <p className="text-lg mb-6 opacity-90">
                Put these tips into practice with our AI-powered CV generator.
              </p>
              <Link href="/" className="inline-block bg-white text-primary font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                Start Creating →
              </Link>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Blog listing view
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img src="/logo.svg" alt="AI CV Generator" className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-primary transition-colors font-medium">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Career Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Expert insights and proven strategies to help you craft compelling CVs and advance your career
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No articles yet</h3>
              <p className="text-gray-600">Check back soon for expert career advice and CV writing tips</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog?slug=${post.slug}`}>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300">
                      {post.image && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                          <time>{new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</time>
                          <span>•</span>
                          <span>{post.author}</span>
                        </div>
                        
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h2>
                        
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {post.description}
                        </p>
                        
                        <div className="flex items-center text-primary font-medium text-sm group-hover:text-primary-dark transition-colors">
                          <span>Read Article</span>
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-20">
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-12 text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Create Your Perfect CV?</h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Apply these expert insights with our AI-powered CV generator and land your dream job
              </p>
              <Link href="/" className="inline-flex items-center bg-white text-primary font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}