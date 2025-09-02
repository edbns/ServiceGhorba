# 🤖 AI CV & Motivation Letter Generator

A lightweight, production-ready web app that lets users create CVs, resumes, cover letters, and motivation letters via AI, with support for file upload, chat-based generation, format export, regional compliance, and markdown-based blogging — all hosted on Netlify with no database.

## ✨ Features

✅ **Upload existing CV** (PDF/DOCX) and convert  
✅ **Chat-based CV & letter generation** with guided prompts  
✅ **Export to PDF, DOCX, Markdown, or TXT**  
✅ **Choose regional formats:** Canada, Europass, EU Custom, Academic  
✅ **Minimal design** — white background + #043fff theme  
✅ **Public blog** with markdown posts  
✅ **Admin panel** with OTP-based login (JWT)  
✅ **Hosted 100% on Netlify** (functions + frontend)  

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <your-repo>
cd ai-cv-generator
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Configure your environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `SMTP_*`: Email configuration for OTP login
- `ADMIN_EMAILS`: Comma-separated list of admin emails
- `JWT_SECRET`: Secret key for JWT tokens

### 3. Development
```bash
npm run dev
```

### 4. Deploy to Netlify
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on git push

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── pages/
│   ├── _app.tsx            # Next.js app wrapper
│   ├── upload.tsx          # Upload existing CV
│   ├── chat.tsx            # Chat-based creation
│   ├── result.tsx          # Preview + download
│   ├── blog.tsx            # Public blog list & viewer
│   └── admin.tsx           # Admin panel for blog
├── components/
│   ├── ChatBot.tsx         # Guided chat interface
│   ├── UploadForm.tsx      # File upload component
│   ├── CVFormatSelector.tsx # Regional format picker
│   ├── CVPreview.tsx       # Document preview
│   ├── ExportButtons.tsx   # Export functionality
│   └── BlogPostEditor.tsx  # Admin blog editor
├── utils/
│   ├── formatHelpers.ts    # CV formatting logic
│   ├── exportHelpers.ts    # Export utilities
│   ├── parseHelpers.ts     # File parsing
│   └── auth.ts             # Authentication helpers
├── prompts/
│   └── cv_chat_prompts.ts  # AI prompts and chat flow
├── content/
│   └── blog/               # Markdown blog posts
└── styles/
    └── globals.css         # Global styles + Tailwind

netlify/
└── functions/
    ├── generate.ts         # OpenAI CV generation
    ├── uploadParse.ts      # PDF/DOCX parsing
    ├── export.ts           # Server-side export
    └── auth.ts             # OTP authentication
```

## 🤖 AI Integration

### OpenAI GPT-4o Integration
- **Endpoint:** `POST /api/generate`
- **Features:** CV generation, content improvement, motivation letters
- **Cost:** Pay-as-you-go with OpenAI

### Supported Document Types
- **CV/Resume:** Professional resumes with regional formatting
- **Motivation Letters:** Personalized cover letters
- **Content Improvement:** AI-enhanced existing documents

## 🌍 Regional Formats

### Canada Resume
- No photo, age, or nationality
- 1-2 pages maximum
- Focus on achievements and skills
- ATS-optimized

### Canada Academic
- Longer format (2-4 pages)
- Research and publications
- Teaching experience
- Grants and awards

### Europass (EU Standard)
- Official EU format
- Comprehensive personal information
- Language proficiency levels
- Digital competence section

### Europe Custom
- Flexible European format
- Optional personal information
- Modern design options
- Country-specific adaptations

## 📤 Export Options

### Supported Formats
- **PDF:** Best for applications (uses html2canvas + jsPDF)
- **DOCX:** Editable format (uses docx library)
- **TXT:** Plain text version
- **Markdown:** Developer-friendly format

### Export Features
- Instant download (no account required)
- Format-specific optimization
- Professional styling
- ATS-friendly output

## 🔐 Admin Authentication

### OTP-Based Login
- Email-based one-time passwords
- JWT token management
- Session persistence
- Secure admin routes

### Blog Management
- Create/edit/delete posts
- Markdown editor with preview
- Image upload support
- SEO-friendly slugs

## 🎨 Design System

### Color Palette
- **Primary:** #043fff (Brand blue)
- **Primary Dark:** #0235cc
- **Primary Light:** #3366ff
- **Background:** #ffffff (White)
- **Text:** #171717 (Dark gray)

### Components
- Consistent button styles
- Form input styling
- Card layouts
- Responsive design
- Mobile-first approach

## 🛠️ Technical Stack

### Frontend
- **Next.js 15** with TypeScript
- **Tailwind CSS** for styling
- **React 19** with hooks
- **File handling** with multiple libraries

### Backend
- **Netlify Functions** (serverless)
- **OpenAI API** for AI generation
- **Nodemailer** for email sending
- **JWT** for authentication

### File Processing
- **PDF parsing:** pdf-parse
- **DOCX parsing:** mammoth
- **Export generation:** jspdf, docx, file-saver

## 🚀 Deployment

### Netlify Configuration
```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "out"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### Environment Variables
Set these in your Netlify dashboard:
- `OPENAI_API_KEY`
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`
- `ADMIN_EMAILS`
- `JWT_SECRET`

### Build Process
1. Next.js static export
2. Netlify Functions deployment
3. Environment variable injection
4. CDN distribution

## 📱 Usage Flow

### Upload Flow
1. User uploads PDF/DOCX
2. Server parses file content
3. AI extracts structured data
4. User reviews and selects format
5. AI generates optimized CV
6. User exports in preferred format

### Chat Flow
1. User selects document type
2. Guided chat interface collects information
3. AI generates professional document
4. User reviews and edits if needed
5. Export in multiple formats

### Blog Flow
1. Public blog with SEO-optimized posts
2. Admin login with OTP verification
3. CRUD operations for blog posts
4. Markdown editing with live preview

## 🔧 Customization

### Adding New Formats
1. Update `CVFormat` type in `formatHelpers.ts`
2. Add format rules in `applyFormatRules()`
3. Update `CVFormatSelector` component
4. Test with sample data

### Adding New Prompts
1. Modify `guidedCVPrompts` array
2. Update chat flow logic
3. Adjust AI prompts accordingly
4. Test conversation flow

### Styling Changes
1. Update Tailwind config
2. Modify CSS custom properties
3. Update component classes
4. Test responsive design

## 🐛 Troubleshooting

### Common Issues

**OpenAI API Errors:**
- Check API key validity
- Verify account billing status
- Monitor rate limits

**File Upload Issues:**
- Check file size limits (10MB max)
- Verify MIME types
- Test with different file formats

**Email Delivery:**
- Verify SMTP credentials
- Check spam folders
- Confirm authorized email addresses

**Build Failures:**
- Check Node.js version (18+)
- Verify all dependencies installed
- Review TypeScript errors

## 📈 Performance

### Optimization Features
- Static site generation
- CDN delivery via Netlify
- Optimized images
- Code splitting
- Lazy loading

### Monitoring
- Function execution logs in Netlify
- Client-side error tracking
- Performance metrics
- User analytics (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
1. Check this README
2. Review the troubleshooting section
3. Open a GitHub issue
4. Contact the development team

---

**Built with ❤️ using AI technology. Create professional documents in minutes.**