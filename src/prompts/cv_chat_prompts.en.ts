export interface ChatPrompt {
  key: string;
  question: string;
  type?: 'text' | 'textarea' | 'array';
  placeholder?: string;
}

export const guidedCVPrompts_en: ChatPrompt[] = [
  { 
    key: 'name', 
    question: 'What is your full name?',
    type: 'text',
    placeholder: 'e.g., John Smith'
  },
  { 
    key: 'title', 
    question: 'What job title or role are you aiming for?',
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
    question: 'Write a short summary of yourself (2-3 sentences).',
    type: 'textarea',
    placeholder: 'Describe your professional background, key strengths, and career goals...'
  },
  { 
    key: 'skills', 
    question: 'List your key skills (comma-separated).',
    type: 'textarea',
    placeholder: 'e.g., JavaScript, Python, Project Management, Communication, Data Analysis'
  },
  { 
    key: 'experience', 
    question: 'Describe your work experience. You can copy from LinkedIn.',
    type: 'textarea',
    placeholder: 'List each position with: Job Title at Company Name (Start Date - End Date), Location, and 2-3 bullet points of achievements...'
  },
  { 
    key: 'education', 
    question: 'List your education, school names, degrees and dates.',
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
    question: 'Languages you speak (optional).',
    type: 'text',
    placeholder: 'e.g., English (Native), Spanish (Fluent), French (Intermediate), German (Basic)'
  },
  { 
    key: 'extra', 
    question: 'Anything else? Certifications, hobbies, etc. (optional)',
    type: 'textarea',
    placeholder: 'e.g., Dean\'s List, Published research papers, Volunteer coordinator...'
  }
];