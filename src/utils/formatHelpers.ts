export type CVFormat =
  | 'canada_resume'
  | 'canada_academic'
  | 'europass'
  | 'europe_custom'
  | 'us_resume'
  | 'uk_cv'
  | 'germany_cv'
  | 'japan_rirekisho'
  | 'australia_resume'
  | 'academic_cv'
  | 'creative_portfolio'
  | 'tech_resume';

export type ExportTheme =
  | 'clean'
  | 'blue_boxed'
  | 'sidebar'
  | 'minimal_line'
  | 'modern_typo'
  | 'euro_cv'
  | 'visual';

export interface CVData {
  name?: string;
  title?: string;
  summary?: string;
  skills?: string[];
  experience?: Array<{
    role: string;
    company: string;
    dates: string;
    description: string;
    location?: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    dates: string;
    description?: string;
    gpa?: string;
    location?: string;
  }>;
  languages?: string[];
  extra?: string;
  photo?: string;
  gender?: string;
  dateOfBirth?: string;
  nationality?: string;
  maritalStatus?: string;
  militaryService?: string;
  certifications?: string[];
  publications?: string[];
  awards?: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies?: string[];
    url?: string;
  }>;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    website?: string;
    github?: string;
    portfolio?: string;
  };
  requirePhoto?: boolean;
  preferredFormat?: string;
}

export function applyFormatRules(cvData: CVData, format: CVFormat): CVData {
  const clone = { ...cvData };
  
  switch (format) {
    case 'canada_resume': {
      // Canadian resumes exclude personal information
      delete clone.photo;
      delete clone.gender;
      delete clone.dateOfBirth;
      delete clone.nationality;
      delete clone.maritalStatus;
      clone.preferredFormat = 'Reverse chronological, 1-2 pages max';
      break;
    }
    case 'canada_academic': {
      // Canadian academic CVs exclude personal information but allow longer format
      delete clone.photo;
      delete clone.gender;
      delete clone.dateOfBirth;
      delete clone.nationality;
      delete clone.maritalStatus;
      clone.preferredFormat = 'Academic format, publications and research focus';
      break;
    }
    case 'us_resume': {
      // US resumes are very strict about personal information
      delete clone.photo;
      delete clone.gender;
      delete clone.dateOfBirth;
      delete clone.nationality;
      delete clone.maritalStatus;
      clone.preferredFormat = '1 page preferred, skills-focused';
      break;
    }
    case 'uk_cv': {
      // UK CVs exclude personal information but allow longer format
      delete clone.photo;
      delete clone.gender;
      delete clone.dateOfBirth;
      delete clone.nationality;
      delete clone.maritalStatus;
      clone.preferredFormat = '2 pages max, achievement-focused';
      break;
    }
    case 'germany_cv': {
      // German CVs traditionally include personal information and photo
      clone.requirePhoto = true;
      clone.preferredFormat = 'Tabular format with photo, personal details required';
      break;
    }
    case 'japan_rirekisho': {
      // Japanese Rirekisho format is very specific
      clone.requirePhoto = true;
      clone.preferredFormat = 'Standardized format, handwritten preferred, photo required';
      break;
    }
    case 'australia_resume': {
      // Australian resumes similar to UK/Canada
      delete clone.photo;
      delete clone.gender;
      delete clone.dateOfBirth;
      delete clone.nationality;
      delete clone.maritalStatus;
      clone.preferredFormat = '2-3 pages, results-oriented';
      break;
    }
    case 'academic_cv': {
      // Academic CVs are comprehensive and detailed
      clone.preferredFormat = 'Comprehensive academic format, publications and research';
      break;
    }
    case 'creative_portfolio': {
      // Creative portfolios focus on visual work
      clone.preferredFormat = 'Visual portfolio format, project showcase';
      break;
    }
    case 'tech_resume': {
      // Tech resumes focus on skills and projects
      delete clone.photo;
      delete clone.gender;
      delete clone.dateOfBirth;
      delete clone.nationality;
      delete clone.maritalStatus;
      clone.preferredFormat = 'Technical skills and project focus';
      break;
    }
    case 'europass': {
      // Europass format keeps all fields
      clone.preferredFormat = 'EU standard format, comprehensive';
      break;
    }
    case 'europe_custom': {
      // European custom format - all fields optional
      clone.preferredFormat = 'Flexible European format';
      break;
    }
    default: 
      break;
  }
  
  return clone;
}

export function formatCVAsText(cvData: CVData): string {
  let text = '';
  
  if (cvData.name) {
    text += `${cvData.name}\n`;
    text += '='.repeat(cvData.name.length) + '\n\n';
  }
  
  if (cvData.title) {
    text += `${cvData.title}\n\n`;
  }
  
  if (cvData.contact) {
    text += 'CONTACT INFORMATION\n';
    text += '-------------------\n';
    if (cvData.contact.email) text += `Email: ${cvData.contact.email}\n`;
    if (cvData.contact.phone) text += `Phone: ${cvData.contact.phone}\n`;
    if (cvData.contact.address) text += `Address: ${cvData.contact.address}\n`;
    if (cvData.contact.linkedin) text += `LinkedIn: ${cvData.contact.linkedin}\n`;
    if (cvData.contact.website) text += `Website: ${cvData.contact.website}\n`;
    text += '\n';
  }
  
  if (cvData.summary) {
    text += 'SUMMARY\n';
    text += '-------\n';
    text += `${cvData.summary}\n\n`;
  }
  
  if (cvData.skills && cvData.skills.length > 0) {
    text += 'SKILLS\n';
    text += '------\n';
    text += cvData.skills.join(', ') + '\n\n';
  }
  
  if (cvData.experience && cvData.experience.length > 0) {
    text += 'WORK EXPERIENCE\n';
    text += '---------------\n';
    cvData.experience.forEach(exp => {
      text += `${exp.role} at ${exp.company}\n`;
      text += `${exp.dates}\n`;
      text += `${exp.description}\n\n`;
    });
  }
  
  if (cvData.education && cvData.education.length > 0) {
    text += 'EDUCATION\n';
    text += '---------\n';
    cvData.education.forEach(edu => {
      text += `${edu.degree}\n`;
      text += `${edu.institution}\n`;
      text += `${edu.dates}\n`;
      if (edu.description) text += `${edu.description}\n`;
      text += '\n';
    });
  }
  
  if (cvData.languages && cvData.languages.length > 0) {
    text += 'LANGUAGES\n';
    text += '---------\n';
    text += cvData.languages.join(', ') + '\n\n';
  }
  
  if (cvData.extra) {
    text += 'ADDITIONAL INFORMATION\n';
    text += '----------------------\n';
    text += `${cvData.extra}\n\n`;
  }
  
  return text;
}

export function formatCVAsHTML(cvData: CVData): string {
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6;">
  `;
  
  if (cvData.name) {
    html += `<h1 style="color: #043fff; margin-bottom: 10px; border-bottom: 2px solid #043fff; padding-bottom: 10px;">${cvData.name}</h1>`;
  }
  
  if (cvData.title) {
    html += `<h2 style="color: #666; margin-bottom: 20px; font-weight: normal;">${cvData.title}</h2>`;
  }
  
  if (cvData.contact) {
    html += `<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">`;
    html += `<h3 style="color: #043fff; margin-bottom: 10px;">Contact Information</h3>`;
    if (cvData.contact.email) html += `<p><strong>Email:</strong> ${cvData.contact.email}</p>`;
    if (cvData.contact.phone) html += `<p><strong>Phone:</strong> ${cvData.contact.phone}</p>`;
    if (cvData.contact.address) html += `<p><strong>Address:</strong> ${cvData.contact.address}</p>`;
    if (cvData.contact.linkedin) html += `<p><strong>LinkedIn:</strong> ${cvData.contact.linkedin}</p>`;
    if (cvData.contact.website) html += `<p><strong>Website:</strong> ${cvData.contact.website}</p>`;
    html += `</div>`;
  }
  
  if (cvData.summary) {
    html += `<div style="margin-bottom: 20px;">`;
    html += `<h3 style="color: #043fff; margin-bottom: 10px;">Summary</h3>`;
    html += `<p>${cvData.summary}</p>`;
    html += `</div>`;
  }
  
  if (cvData.skills && cvData.skills.length > 0) {
    html += `<div style="margin-bottom: 20px;">`;
    html += `<h3 style="color: #043fff; margin-bottom: 10px;">Skills</h3>`;
    html += `<p>${cvData.skills.join(', ')}</p>`;
    html += `</div>`;
  }
  
  if (cvData.experience && cvData.experience.length > 0) {
    html += `<div style="margin-bottom: 20px;">`;
    html += `<h3 style="color: #043fff; margin-bottom: 10px;">Work Experience</h3>`;
    cvData.experience.forEach(exp => {
      html += `<div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #043fff; background: #f8f9fa;">`;
      html += `<h4 style="margin-bottom: 5px;">${exp.role} at ${exp.company}</h4>`;
      html += `<p style="color: #666; margin-bottom: 5px;">${exp.dates}</p>`;
      html += `<p>${exp.description}</p>`;
      html += `</div>`;
    });
    html += `</div>`;
  }
  
  if (cvData.education && cvData.education.length > 0) {
    html += `<div style="margin-bottom: 20px;">`;
    html += `<h3 style="color: #043fff; margin-bottom: 10px;">Education</h3>`;
    cvData.education.forEach(edu => {
      html += `<div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #043fff; background: #f8f9fa;">`;
      html += `<h4 style="margin-bottom: 5px;">${edu.degree}</h4>`;
      html += `<p style="color: #666; margin-bottom: 5px;">${edu.institution}</p>`;
      html += `<p style="color: #666; margin-bottom: 5px;">${edu.dates}</p>`;
      if (edu.description) html += `<p>${edu.description}</p>`;
      html += `</div>`;
    });
    html += `</div>`;
  }
  
  if (cvData.languages && cvData.languages.length > 0) {
    html += `<div style="margin-bottom: 20px;">`;
    html += `<h3 style="color: #043fff; margin-bottom: 10px;">Languages</h3>`;
    html += `<p>${cvData.languages.join(', ')}</p>`;
    html += `</div>`;
  }
  
  if (cvData.extra) {
    html += `<div style="margin-bottom: 20px;">`;
    html += `<h3 style="color: #043fff; margin-bottom: 10px;">Additional Information</h3>`;
    html += `<p>${cvData.extra}</p>`;
    html += `</div>`;
  }
  
  html += `</div>`;
  return html;
}

export function formatCVAsMarkdown(cvData: CVData): string {
  let md = '';
  
  if (cvData.name) {
    md += `# ${cvData.name}\n\n`;
  }
  
  if (cvData.title) {
    md += `## ${cvData.title}\n\n`;
  }
  
  if (cvData.contact) {
    md += `## Contact Information\n\n`;
    if (cvData.contact.email) md += `**Email:** ${cvData.contact.email}  \n`;
    if (cvData.contact.phone) md += `**Phone:** ${cvData.contact.phone}  \n`;
    if (cvData.contact.address) md += `**Address:** ${cvData.contact.address}  \n`;
    if (cvData.contact.linkedin) md += `**LinkedIn:** ${cvData.contact.linkedin}  \n`;
    if (cvData.contact.website) md += `**Website:** ${cvData.contact.website}  \n`;
    md += '\n';
  }
  
  if (cvData.summary) {
    md += `## Summary\n\n${cvData.summary}\n\n`;
  }
  
  if (cvData.skills && cvData.skills.length > 0) {
    md += `## Skills\n\n${cvData.skills.join(', ')}\n\n`;
  }
  
  if (cvData.experience && cvData.experience.length > 0) {
    md += `## Work Experience\n\n`;
    cvData.experience.forEach(exp => {
      md += `### ${exp.role} at ${exp.company}\n`;
      md += `*${exp.dates}*\n\n`;
      md += `${exp.description}\n\n`;
    });
  }
  
  if (cvData.education && cvData.education.length > 0) {
    md += `## Education\n\n`;
    cvData.education.forEach(edu => {
      md += `### ${edu.degree}\n`;
      md += `${edu.institution}  \n`;
      md += `*${edu.dates}*\n\n`;
      if (edu.description) md += `${edu.description}\n\n`;
    });
  }
  
  if (cvData.languages && cvData.languages.length > 0) {
    md += `## Languages\n\n${cvData.languages.join(', ')}\n\n`;
  }
  
  if (cvData.extra) {
    md += `## Additional Information\n\n${cvData.extra}\n\n`;
  }
  
  return md;
}