# 🚀 Deployment Guide

## Netlify Deployment

### 1. Prerequisites
- GitHub repository with your code
- Netlify account
- OpenAI API key
- Email account for SMTP (Gmail recommended)

### 2. Environment Variables
Set these in your Netlify dashboard under Site Settings > Environment Variables:

```bash
# Required
OPENAI_API_KEY=sk-your-openai-api-key-here
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAILS=admin@yoursite.com,another@yoursite.com
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Optional (defaults shown)
SMTP_FROM=your-email@gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

### 3. Gmail Setup for SMTP
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
   - Use this password as `SMTP_PASS`

### 4. Deploy Steps
1. **Connect Repository:**
   - Login to Netlify
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Functions directory: `netlify/functions`

3. **Environment Variables:**
   - Add all variables from step 2
   - Deploy the site

4. **Custom Domain (Optional):**
   - Add your domain in Site Settings > Domain management
   - Update DNS records as instructed

### 5. Testing Deployment
1. **Test file upload:** Try uploading a PDF/DOCX
2. **Test chat generation:** Create a CV from scratch
3. **Test exports:** Download in different formats
4. **Test admin login:** Use OTP authentication
5. **Test blog:** View and create blog posts

### 6. Monitoring
- Check function logs in Netlify dashboard
- Monitor OpenAI API usage and costs
- Set up alerts for function errors

## Local Development

### Setup
```bash
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

### Testing Functions Locally
```bash
npm install -g netlify-cli
netlify dev
```

## Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version (18+ required)
- Verify all environment variables are set
- Review function logs for errors

**OpenAI Errors:**
- Verify API key is valid and has credits
- Check rate limits
- Monitor usage dashboard

**Email Issues:**
- Confirm Gmail app password is correct
- Check spam folders for OTP emails
- Verify ADMIN_EMAILS list is correct

**File Upload Issues:**
- Check file size limits (10MB max)
- Verify file types (PDF/DOCX only)
- Test with different browsers

### Performance Optimization
- Enable Netlify Analytics
- Set up CDN caching headers
- Monitor Core Web Vitals
- Optimize images and assets

### Security Best Practices
- Use strong JWT secrets (32+ characters)
- Regularly rotate API keys
- Monitor admin access logs
- Keep dependencies updated

## Production Checklist

- [ ] All environment variables configured
- [ ] OpenAI API key with sufficient credits
- [ ] SMTP email configuration tested
- [ ] Admin email addresses added
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Function logs monitoring set up
- [ ] Backup strategy for blog content
- [ ] Error tracking configured
- [ ] Performance monitoring active

## Scaling Considerations

### High Traffic
- Monitor Netlify function execution limits
- Consider caching strategies for blog content
- Implement rate limiting for AI generation
- Monitor OpenAI API costs

### Content Management
- Consider migrating to a headless CMS for blog
- Implement content versioning
- Add content approval workflows
- Set up automated backups

### Feature Enhancements
- Add user accounts and saved documents
- Implement document templates
- Add collaboration features
- Integrate with job boards
- Add analytics and A/B testing

---

🎉 **Your AI CV Generator is ready for production!**