export interface ChatPrompt {
  key: string;
  question: string;
  type?: 'text' | 'textarea' | 'array';
  placeholder?: string;
}

export const guidedCVPrompts: ChatPrompt[] = [
  { 
    key: 'name', 
    question: 'What is your full name?',
    type: 'text',
    placeholder: 'e.g., John Smith'
  },
  { 
    key: 'title', 
    question: 'What is your target job title or position?',
    type: 'text',
    placeholder: 'e.g., Software Engineer, Marketing Manager'
  },
  { 
    key: 'email', 
    question: 'What is your email address?',
    type: 'text',
    placeholder: 'e.g., john.smith@email.com'
  },
  { 
    key: 'phone', 
    question: 'What is your phone number?',
    type: 'text',
    placeholder: 'e.g., +1 (555) 123-4567'
  },
  { 
    key: 'location', 
    question: 'What is your current location (city, country)?',
    type: 'text',
    placeholder: 'e.g., Toronto, Canada or Berlin, Germany'
  },
  { 
    key: 'summary', 
    question: 'Please provide a professional summary (2–3 sentences)?',
    type: 'textarea',
    placeholder: 'Describe your professional background, key strengths, and career goals...'
  },
  { 
    key: 'skills', 
    question: 'What are your key skills and competencies? (comma-separated)',
    type: 'textarea',
    placeholder: 'e.g., JavaScript, Python, Project Management, Communication, Data Analysis'
  },
  { 
    key: 'experience', 
    question: 'Tell me about your work experience (include roles, companies, dates, locations, and key achievements)?',
    type: 'textarea',
    placeholder: 'List each position with: Job Title at Company Name (Start Date - End Date), Location, and 2-3 bullet points of achievements...'
  },
  { 
    key: 'education', 
    question: 'What is your education background?',
    type: 'textarea',
    placeholder: 'List degrees, institutions, graduation dates, GPAs (if strong), and relevant coursework...'
  },
  { 
    key: 'certifications', 
    question: 'Do you have any professional certifications or licenses? (optional)',
    type: 'textarea',
    placeholder: 'e.g., AWS Certified Solutions Architect, PMP, Google Analytics Certified...'
  },
  { 
    key: 'projects', 
    question: 'Any notable projects or portfolio items to highlight? (optional)',
    type: 'textarea',
    placeholder: 'Describe 2-3 key projects with technologies used and outcomes achieved...'
  },
  { 
    key: 'languages', 
    question: 'What languages do you speak and at what proficiency level? (optional)',
    type: 'text',
    placeholder: 'e.g., English (Native), Spanish (Fluent), French (Intermediate), German (Basic)'
  },
  { 
    key: 'extra', 
    question: 'Any additional information like awards, publications, or volunteer work? (optional)',
    type: 'textarea',
    placeholder: 'e.g., Dean\'s List, Published research papers, Volunteer coordinator...'
  }
];

export const basicWorkerPrompts: ChatPrompt[] = [
  { 
    key: 'name', 
    question: 'What is your full name?',
    type: 'text',
    placeholder: 'e.g., Maria Garcia'
  },
  { 
    key: 'phone', 
    question: 'What is your phone number?',
    type: 'text',
    placeholder: 'e.g., (555) 123-4567'
  },
  { 
    key: 'email', 
    question: 'What is your email address?',
    type: 'text',
    placeholder: 'e.g., maria.garcia@email.com'
  },
  { 
    key: 'location', 
    question: 'Where do you live? (City and state/province)',
    type: 'text',
    placeholder: 'e.g., Toronto, ON or Los Angeles, CA'
  },
  { 
    key: 'job_wanted', 
    question: 'What type of job are you looking for?',
    type: 'text',
    placeholder: 'e.g., Restaurant Server, Delivery Driver, Construction Worker'
  },
  { 
    key: 'work_experience', 
    question: 'Tell me about your work experience. What jobs have you had?',
    type: 'textarea',
    placeholder: 'List your jobs: Job title, where you worked, how long, and what you did well...'
  },
  { 
    key: 'skills', 
    question: 'What are you good at? (work skills)',
    type: 'textarea',
    placeholder: 'e.g., Good with customers, Fast learner, Reliable, Good at teamwork, Can lift heavy things'
  },
  { 
    key: 'availability', 
    question: 'When can you work?',
    type: 'text',
    placeholder: 'e.g., Any time, Weekends only, Monday to Friday, Flexible schedule'
  },
  { 
    key: 'transportation', 
    question: 'How do you get to work?',
    type: 'text',
    placeholder: 'e.g., Own car, Public transport, Bicycle, Can get rides'
  },
  { 
    key: 'languages', 
    question: 'What languages do you speak? (optional)',
    type: 'text',
    placeholder: 'e.g., English and Spanish, Tagalog and English'
  },
  { 
    key: 'reference', 
    question: 'Do you have a reference from a previous job? (optional)',
    type: 'textarea',
    placeholder: 'Name, job title, company, phone number, and how they know your work...'
  }
];

export const guidedMotivationPrompts: ChatPrompt[] = [
  { 
    key: 'intro', 
    question: 'Tell us a little about yourself.',
    type: 'textarea',
    placeholder: 'Share a bit about who you are and what kind of person you are...'
  },
  { 
    key: 'why', 
    question: 'Why are you interested in this job?',
    type: 'textarea',
    placeholder: 'What attracts you to this position or company?'
  },
  { 
    key: 'pride', 
    question: 'What\'s something you\'re proud of from a past job?',
    type: 'textarea',
    placeholder: 'Share an achievement or moment when you did really well at work...'
  },
  { 
    key: 'reliable', 
    question: 'What makes you reliable or easy to work with?',
    type: 'textarea',
    placeholder: 'Describe your work style and what makes you a good team member...'
  },
  { 
    key: 'commitment', 
    question: 'Why should we hire you for this position?',
    type: 'textarea',
    placeholder: 'What makes you the right person for this job?'
  }
];

export const motivationLetterPrompts: ChatPrompt[] = [
  {
    key: 'company',
    question: 'What company are you applying to?',
    type: 'text',
    placeholder: 'e.g., Google, Microsoft, Local Startup'
  },
  {
    key: 'position',
    question: 'What position are you applying for?',
    type: 'text',
    placeholder: 'e.g., Software Engineer, Marketing Manager'
  },
  {
    key: 'why_company',
    question: 'Why are you interested in this company?',
    type: 'textarea',
    placeholder: 'What attracts you to this specific company?'
  },
  {
    key: 'why_position',
    question: 'Why are you interested in this position?',
    type: 'textarea',
    placeholder: 'What makes this role appealing to you?'
  },
  {
    key: 'qualifications',
    question: 'What makes you qualified for this role?',
    type: 'textarea',
    placeholder: 'Highlight your relevant experience and skills...'
  },
  {
    key: 'achievements',
    question: 'What are your key achievements or accomplishments?',
    type: 'textarea',
    placeholder: 'Describe specific achievements that demonstrate your value...'
  }
];

export const systemPrompts = {
  cvGeneration: `You are an expert CV/Resume writer. Create a professional, well-structured CV based on the provided information. 

Key guidelines:
- Use clear, professional language
- Highlight achievements with specific metrics when possible
- Tailor the content to be relevant and impactful
- Ensure proper formatting and structure
- Focus on results and value delivered
- Use action verbs and quantifiable achievements

Return the CV data in the following JSON structure:
{
  "name": "string",
  "title": "string", 
  "contact": {
    "email": "string",
    "phone": "string",
    "address": "string",
    "linkedin": "string",
    "website": "string"
  },
  "summary": "string",
  "skills": ["string"],
  "experience": [
    {
      "role": "string",
      "company": "string", 
      "dates": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "dates": "string",
      "description": "string"
    }
  ],
  "languages": ["string"],
  "extra": "string"
}`,

  motivationLetter: `You are an expert cover letter and motivation letter writer. Create a compelling, personalized motivation letter based on the provided information.

Key guidelines:
- Start with a strong opening that grabs attention
- Clearly explain why you're interested in the company and position
- Highlight relevant qualifications and achievements
- Show enthusiasm and cultural fit
- End with a strong call to action
- Keep it concise but impactful (1-2 pages max)
- Use professional but engaging tone

Structure the letter with:
1. Header with contact information
2. Date and company address
3. Professional greeting
4. Opening paragraph - hook and purpose
5. Body paragraphs - qualifications and fit
6. Closing paragraph - call to action
7. Professional sign-off

Return the letter as formatted text ready for use.`,

  contentImprovement: `You are an expert content editor. Improve the provided CV or motivation letter content while maintaining the original structure and key information.

Focus on:
- Enhancing clarity and readability
- Strengthening impact statements
- Improving professional tone
- Adding quantifiable achievements where appropriate
- Ensuring consistency in formatting
- Removing redundancy
- Optimizing for ATS (Applicant Tracking Systems)

Return the improved content in the same format as provided.`,

  simpleLetter: `You are an expert at writing simple, heartfelt motivation letters for everyday jobs. Create a warm, genuine letter that shows the person's character and work ethic.

Guidelines:
- Use simple, clear language that anyone can understand
- Focus on reliability, hard work, and positive attitude
- Show enthusiasm for the specific job
- Mention relevant experience in simple terms
- Keep it personal but professional
- Avoid complex vocabulary or corporate jargon
- Make it genuine and authentic

Structure: Brief introduction, why you want the job, what you bring, closing with enthusiasm.`,

  skillTranslation: `You are an expert at translating everyday work into professional CV language. Take basic job descriptions and convert them into impressive, achievement-focused bullet points.

Guidelines:
- Transform duties into achievements
- Add quantifiable metrics when logical
- Use strong action verbs
- Focus on transferable skills
- Make it sound professional but not inflated
- Highlight customer service, teamwork, reliability, and problem-solving
- Return exactly 3-5 bullet points
- Format as a simple array of strings

Example input: "I cleaned hotel rooms"
Example output: ["Maintained cleanliness standards for 15+ hotel rooms daily", "Ensured guest satisfaction through attention to detail and quality service", "Followed safety protocols and used cleaning equipment efficiently"]`,

  cvReview: `You are an expert CV reviewer. Analyze the provided CV and give constructive feedback.

Provide feedback in this JSON format:
{
  "overall_score": 7,
  "strengths": ["List 2-3 things that work well"],
  "weaknesses": ["List 2-3 areas that need improvement"],
  "suggestions": ["List 3-5 specific improvement recommendations"]
}

Focus on:
- Content quality and achievement focus
- Professional presentation and formatting
- ATS optimization and keyword usage
- Appropriate length and structure
- Industry relevance and impact statements
- Missing sections or information gaps

Be encouraging but honest. Provide actionable advice that helps improve their job prospects.`
};