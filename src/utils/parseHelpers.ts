import mammoth from 'mammoth';
import { CVData } from './formatHelpers';

export async function parseDocxFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const result = await mammoth.extractRawText({ arrayBuffer });
        resolve(result.value);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export async function parsePdfFile(file: File): Promise<string> {
  // For PDF parsing, we'll need to use a server-side function
  // This is a placeholder that will send the file to our Netlify function
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch('/api/uploadParse', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to parse PDF');
    }
    
    const result = await response.json();
    return result.text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file');
  }
}

export function extractCVDataFromText(text: string): Partial<CVData> {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const cvData: Partial<CVData> = {};
  
  // Simple extraction logic - this could be enhanced with AI
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /(\+?1?[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/;
  
  // Extract name (usually first line or first significant text)
  if (lines.length > 0) {
    const firstLine = lines[0];
    if (firstLine.length < 50 && !emailRegex.test(firstLine) && !phoneRegex.test(firstLine)) {
      cvData.name = firstLine;
    }
  }
  
  // Extract email
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    cvData.contact = { ...cvData.contact, email: emailMatch[0] };
  }
  
  // Extract phone
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    cvData.contact = { ...cvData.contact, phone: phoneMatch[0] };
  }
  
  // Extract skills (look for common skill section headers)
  const skillsIndex = lines.findIndex(line => 
    /skills?|competenc|technolog|expertise/i.test(line)
  );
  if (skillsIndex !== -1 && skillsIndex + 1 < lines.length) {
    const skillsLine = lines[skillsIndex + 1];
    if (skillsLine.includes(',')) {
      cvData.skills = skillsLine.split(',').map(skill => skill.trim());
    }
  }
  
  // Basic experience extraction
  const experienceKeywords = /experience|employment|work history|professional/i;
  const expIndex = lines.findIndex(line => experienceKeywords.test(line));
  if (expIndex !== -1) {
    const expLines = lines.slice(expIndex + 1, expIndex + 10); // Take next 10 lines
    const experience = [];
    
    for (let i = 0; i < expLines.length; i += 3) {
      if (i + 2 < expLines.length) {
        experience.push({
          role: expLines[i] || '',
          company: expLines[i + 1] || '',
          dates: expLines[i + 2] || '',
          description: expLines[i + 3] || ''
        });
      }
    }
    
    if (experience.length > 0) {
      cvData.experience = experience;
    }
  }
  
  return cvData;
}

export async function parseUploadedFile(file: File): Promise<Partial<CVData>> {
  let text = '';
  
  if (file.type === 'application/pdf') {
    text = await parsePdfFile(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    text = await parseDocxFile(file);
  } else {
    throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
  }
  
  return extractCVDataFromText(text);
}