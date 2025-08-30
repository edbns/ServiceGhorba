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

Return the improved content in the same format as provided.`
};