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
    key: 'summary', 
    question: 'Please provide a short summary of yourself (2–3 sentences)?',
    type: 'textarea',
    placeholder: 'Describe your professional background and key strengths...'
  },
  { 
    key: 'skills', 
    question: 'What are your key skills? (comma-separated)',
    type: 'textarea',
    placeholder: 'e.g., JavaScript, Python, Project Management, Communication'
  },
  { 
    key: 'experience', 
    question: 'Tell me about your work experience (roles, companies, dates, and key achievements)?',
    type: 'textarea',
    placeholder: 'List your work experience with role, company, dates, and key achievements...'
  },
  { 
    key: 'education', 
    question: 'What is your education history?',
    type: 'textarea',
    placeholder: 'List your degrees, institutions, and graduation dates...'
  },
  { 
    key: 'languages', 
    question: 'What languages do you speak? (optional)',
    type: 'text',
    placeholder: 'e.g., English (Native), Spanish (Fluent), French (Intermediate)'
  },
  { 
    key: 'extra', 
    question: 'Any certifications, hobbies, or additional information you\'d like to include? (optional)',
    type: 'textarea',
    placeholder: 'e.g., AWS Certified, Photography, Volunteer work...'
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