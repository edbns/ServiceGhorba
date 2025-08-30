import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from 'docx';
import { CVData, ExportTheme } from './formatHelpers';

export function exportAsText(content: string, filename = 'document.txt') {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename);
}

export function exportAsMarkdown(content: string, filename = 'document.md') {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, filename);
}

export function exportAsDocx(cvData: CVData, filename = 'cv.docx') {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Name
        ...(cvData.name ? [new Paragraph({
          children: [new TextRun({ text: cvData.name, bold: true, size: 32 })],
          heading: HeadingLevel.HEADING_1,
        })] : []),
        
        // Title
        ...(cvData.title ? [new Paragraph({
          children: [new TextRun({ text: cvData.title, size: 24 })],
          heading: HeadingLevel.HEADING_2,
        })] : []),
        
        // Contact Information
        ...(cvData.contact ? [
          new Paragraph({
            children: [new TextRun({ text: 'Contact Information', bold: true, size: 20 })],
            heading: HeadingLevel.HEADING_3,
          }),
          ...(cvData.contact.email ? [new Paragraph({
            children: [new TextRun({ text: `Email: ${cvData.contact.email}` })],
          })] : []),
          ...(cvData.contact.phone ? [new Paragraph({
            children: [new TextRun({ text: `Phone: ${cvData.contact.phone}` })],
          })] : []),
          ...(cvData.contact.address ? [new Paragraph({
            children: [new TextRun({ text: `Address: ${cvData.contact.address}` })],
          })] : []),
          new Paragraph({ children: [new TextRun({ text: '' })] }), // Empty line
        ] : []),
        
        // Summary
        ...(cvData.summary ? [
          new Paragraph({
            children: [new TextRun({ text: 'Summary', bold: true, size: 20 })],
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            children: [new TextRun({ text: cvData.summary })],
          }),
          new Paragraph({ children: [new TextRun({ text: '' })] }), // Empty line
        ] : []),
        
        // Skills
        ...(cvData.skills && cvData.skills.length > 0 ? [
          new Paragraph({
            children: [new TextRun({ text: 'Skills', bold: true, size: 20 })],
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            children: [new TextRun({ text: cvData.skills.join(', ') })],
          }),
          new Paragraph({ children: [new TextRun({ text: '' })] }), // Empty line
        ] : []),
        
        // Work Experience
        ...(cvData.experience && cvData.experience.length > 0 ? [
          new Paragraph({
            children: [new TextRun({ text: 'Work Experience', bold: true, size: 20 })],
            heading: HeadingLevel.HEADING_3,
          }),
          ...cvData.experience.flatMap(exp => [
            new Paragraph({
              children: [new TextRun({ text: `${exp.role} at ${exp.company}`, bold: true })],
            }),
            new Paragraph({
              children: [new TextRun({ text: exp.dates, italics: true })],
            }),
            new Paragraph({
              children: [new TextRun({ text: exp.description })],
            }),
            new Paragraph({ children: [new TextRun({ text: '' })] }), // Empty line
          ]),
        ] : []),
        
        // Education
        ...(cvData.education && cvData.education.length > 0 ? [
          new Paragraph({
            children: [new TextRun({ text: 'Education', bold: true, size: 20 })],
            heading: HeadingLevel.HEADING_3,
          }),
          ...cvData.education.flatMap(edu => [
            new Paragraph({
              children: [new TextRun({ text: edu.degree, bold: true })],
            }),
            new Paragraph({
              children: [new TextRun({ text: edu.institution })],
            }),
            new Paragraph({
              children: [new TextRun({ text: edu.dates, italics: true })],
            }),
            ...(edu.description ? [new Paragraph({
              children: [new TextRun({ text: edu.description })],
            })] : []),
            new Paragraph({ children: [new TextRun({ text: '' })] }), // Empty line
          ]),
        ] : []),
        
        // Languages
        ...(cvData.languages && cvData.languages.length > 0 ? [
          new Paragraph({
            children: [new TextRun({ text: 'Languages', bold: true, size: 20 })],
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            children: [new TextRun({ text: cvData.languages.join(', ') })],
          }),
          new Paragraph({ children: [new TextRun({ text: '' })] }), // Empty line
        ] : []),
        
        // Additional Information
        ...(cvData.extra ? [
          new Paragraph({
            children: [new TextRun({ text: 'Additional Information', bold: true, size: 20 })],
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            children: [new TextRun({ text: cvData.extra })],
          }),
        ] : []),
      ],
    }],
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, filename);
  });
}

export async function exportAsPDF(elementId: string, filename = 'cv.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  const imgX = (pdfWidth - imgWidth * ratio) / 2;
  const imgY = 0;

  pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
  pdf.save(filename);
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  saveAs(blob, filename);
}

export function buildExportHTML(data: CVData, theme: ExportTheme): string {
  const baseStyles = `
    <style>
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
        line-height: 1.6; 
        color: #333; 
        max-width: 800px; 
        margin: 0 auto; 
        padding: 20px;
      }
      .header { margin-bottom: 30px; }
      .section { margin-bottom: 25px; }
      .section-title { 
        font-size: 18px; 
        font-weight: 600; 
        margin-bottom: 15px;
        color: #043fff;
      }
      .contact-info { display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px; }
      .contact-item { display: flex; align-items: center; gap: 5px; }
      .skills { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-tag { 
        background: #f0f4ff; 
        color: #043fff; 
        padding: 4px 12px; 
        border-radius: 20px; 
        font-size: 14px; 
      }
      .experience-item, .education-item { margin-bottom: 20px; }
      .job-title { font-weight: 600; font-size: 16px; }
      .company { color: #043fff; font-weight: 500; }
      .date { color: #666; font-size: 14px; }
    </style>
  `;

  switch (theme) {
    case 'clean':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          ${baseStyles}
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 32px; color: #333;">${data.name || 'Your Name'}</h1>
            ${data.title ? `<h2 style="margin: 5px 0 0 0; font-size: 18px; color: #666; font-weight: normal;">${data.title}</h2>` : ''}
          </div>
          ${buildContactSection(data)}
          ${buildSummarySection(data)}
          ${buildSkillsSection(data)}
          ${buildExperienceSection(data)}
          ${buildEducationSection(data)}
          ${buildLanguagesSection(data)}
          ${buildExtrasSection(data)}
        </body>
        </html>
      `;

    case 'blue_boxed':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          ${baseStyles}
          <style>
            .header { 
              background: linear-gradient(135deg, #043fff, #3366ff); 
              color: white; 
              padding: 30px; 
              border-radius: 10px; 
              margin-bottom: 30px; 
            }
            .header h1 { color: white; margin: 0; }
            .header h2 { color: rgba(255,255,255,0.9); margin: 5px 0 0 0; }
            .section { 
              border: 1px solid #e5e7eb; 
              border-radius: 8px; 
              padding: 20px; 
              margin-bottom: 20px; 
            }
            .section-title { 
              background: #043fff; 
              color: white; 
              margin: -20px -20px 15px -20px; 
              padding: 12px 20px; 
              border-radius: 8px 8px 0 0; 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="font-size: 32px;">${data.name || 'Your Name'}</h1>
            ${data.title ? `<h2 style="font-size: 18px; font-weight: normal;">${data.title}</h2>` : ''}
          </div>
          ${buildContactSection(data, true)}
          ${buildSummarySection(data, true)}
          ${buildSkillsSection(data, true)}
          ${buildExperienceSection(data, true)}
          ${buildEducationSection(data, true)}
          ${buildLanguagesSection(data, true)}
          ${buildExtrasSection(data, true)}
        </body>
        </html>
      `;

    case 'sidebar':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          ${baseStyles}
          <style>
            body { display: flex; gap: 30px; max-width: 1000px; }
            .sidebar { 
              width: 300px; 
              background: #f8f9fa; 
              padding: 20px; 
              border-radius: 8px; 
              height: fit-content;
            }
            .main-content { flex: 1; }
            .sidebar .section-title { color: #043fff; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="sidebar">
            ${buildContactSection(data)}
            ${buildSkillsSection(data)}
            ${buildLanguagesSection(data)}
            ${buildExtrasSection(data)}
          </div>
          <div class="main-content">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px; color: #333;">${data.name || 'Your Name'}</h1>
              ${data.title ? `<h2 style="margin: 5px 0 0 0; font-size: 18px; color: #666; font-weight: normal;">${data.title}</h2>` : ''}
            </div>
            ${buildSummarySection(data)}
            ${buildExperienceSection(data)}
            ${buildEducationSection(data)}
          </div>
        </body>
        </html>
      `;

    case 'minimal_line':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          ${baseStyles}
          <style>
            .section { border-bottom: 1px solid #e5e7eb; padding-bottom: 20px; }
            .section:last-child { border-bottom: none; }
            .section-title { 
              border-bottom: 2px solid #043fff; 
              padding-bottom: 5px; 
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 32px; color: #333; border-bottom: 3px solid #043fff; padding-bottom: 10px; display: inline-block;">${data.name || 'Your Name'}</h1>
            ${data.title ? `<h2 style="margin: 10px 0 0 0; font-size: 18px; color: #666; font-weight: normal;">${data.title}</h2>` : ''}
          </div>
          ${buildContactSection(data)}
          ${buildSummarySection(data)}
          ${buildSkillsSection(data)}
          ${buildExperienceSection(data)}
          ${buildEducationSection(data)}
          ${buildLanguagesSection(data)}
          ${buildExtrasSection(data)}
        </body>
        </html>
      `;

    case 'modern_typo':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: 'Georgia', serif; 
              line-height: 1.7; 
              color: #2d3748; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 40px;
            }
            .header { margin-bottom: 40px; text-align: center; }
            .header h1 { 
              font-size: 42px; 
              font-weight: 300; 
              letter-spacing: -1px; 
              margin: 0;
              color: #1a202c;
            }
            .header h2 { 
              font-size: 20px; 
              font-weight: normal; 
              color: #043fff; 
              margin: 10px 0 0 0;
              font-style: italic;
            }
            .section-title { 
              font-size: 24px; 
              font-weight: 300; 
              margin-bottom: 20px;
              color: #043fff;
              letter-spacing: -0.5px;
            }
            .section { margin-bottom: 35px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${data.name || 'Your Name'}</h1>
            ${data.title ? `<h2>${data.title}</h2>` : ''}
          </div>
          ${buildContactSection(data)}
          ${buildSummarySection(data)}
          ${buildSkillsSection(data)}
          ${buildExperienceSection(data)}
          ${buildEducationSection(data)}
          ${buildLanguagesSection(data)}
          ${buildExtrasSection(data)}
        </body>
        </html>
      `;

    case 'euro_cv':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          ${baseStyles}
          <style>
            .header { 
              border: 2px solid #043fff; 
              padding: 20px; 
              margin-bottom: 30px;
              background: #f8f9ff;
            }
            .section-title { 
              background: #043fff; 
              color: white; 
              padding: 8px 15px; 
              margin: 0 -20px 15px -20px;
              font-size: 16px;
            }
            .section { 
              border: 1px solid #ddd; 
              padding: 20px; 
              margin-bottom: 15px;
            }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 8px; border-bottom: 1px solid #eee; vertical-align: top; }
            .label { font-weight: 600; width: 150px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; color: #043fff;">${data.name || 'Your Name'}</h1>
            ${data.title ? `<h2 style="margin: 5px 0 0 0; color: #666;">${data.title}</h2>` : ''}
          </div>
          ${buildContactSection(data, true)}
          ${buildSummarySection(data, true)}
          ${buildSkillsSection(data, true)}
          ${buildExperienceSection(data, true)}
          ${buildEducationSection(data, true)}
          ${buildLanguagesSection(data, true)}
          ${buildExtrasSection(data, true)}
        </body>
        </html>
      `;

    case 'visual':
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          ${baseStyles}
          <style>
            body { background: linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%); }
            .header { 
              background: linear-gradient(135deg, #043fff, #3366ff); 
              color: white; 
              padding: 40px; 
              border-radius: 15px; 
              margin-bottom: 30px;
              text-align: center;
              box-shadow: 0 10px 30px rgba(4, 63, 255, 0.3);
            }
            .section { 
              background: white; 
              border-radius: 10px; 
              padding: 25px; 
              margin-bottom: 20px;
              box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            }
            .section-title { 
              color: #043fff; 
              font-size: 20px;
              margin-bottom: 20px;
              position: relative;
            }
            .section-title::after {
              content: '';
              position: absolute;
              bottom: -5px;
              left: 0;
              width: 50px;
              height: 3px;
              background: linear-gradient(90deg, #043fff, #3366ff);
              border-radius: 2px;
            }
            .skill-tag { 
              background: linear-gradient(135deg, #043fff, #3366ff); 
              color: white; 
              border-radius: 25px;
              box-shadow: 0 2px 8px rgba(4, 63, 255, 0.3);
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="font-size: 36px; margin: 0;">${data.name || 'Your Name'}</h1>
            ${data.title ? `<h2 style="font-size: 20px; margin: 10px 0 0 0; opacity: 0.9;">${data.title}</h2>` : ''}
          </div>
          ${buildContactSection(data)}
          ${buildSummarySection(data)}
          ${buildSkillsSection(data)}
          ${buildExperienceSection(data)}
          ${buildEducationSection(data)}
          ${buildLanguagesSection(data)}
          ${buildExtrasSection(data)}
        </body>
        </html>
      `;

    default:
      return buildExportHTML(data, 'clean');
  }
}

function buildContactSection(data: CVData, boxed = false): string {
  if (!data.contact) return '';
  
  const contacts = [];
  if (data.contact.email) contacts.push(`📧 ${data.contact.email}`);
  if (data.contact.phone) contacts.push(`📞 ${data.contact.phone}`);
  if (data.contact.address) contacts.push(`📍 ${data.contact.address}`);
  if (data.contact.linkedin) contacts.push(`🔗 ${data.contact.linkedin}`);
  if (data.contact.website) contacts.push(`🌐 ${data.contact.website}`);
  if (data.contact.github) contacts.push(`💻 ${data.contact.github}`);
  
  if (contacts.length === 0) return '';
  
  return `
    <div class="section">
      ${boxed ? '<div class="section-title">Contact Information</div>' : ''}
      <div class="contact-info">
        ${contacts.map(contact => `<div class="contact-item">${contact}</div>`).join('')}
      </div>
    </div>
  `;
}

function buildSummarySection(data: CVData, boxed = false): string {
  if (!data.summary) return '';
  
  return `
    <div class="section">
      ${boxed ? '<div class="section-title">Professional Summary</div>' : '<div class="section-title">Summary</div>'}
      <p>${data.summary}</p>
    </div>
  `;
}

function buildSkillsSection(data: CVData, boxed = false): string {
  if (!data.skills || data.skills.length === 0) return '';
  
  return `
    <div class="section">
      ${boxed ? '<div class="section-title">Skills</div>' : '<div class="section-title">Skills</div>'}
      <div class="skills">
        ${data.skills.map(skill => `<span class="skill-tag">${skill.trim()}</span>`).join('')}
      </div>
    </div>
  `;
}

function buildExperienceSection(data: CVData, boxed = false): string {
  if (!data.experience || data.experience.length === 0) return '';
  
  return `
    <div class="section">
      ${boxed ? '<div class="section-title">Work Experience</div>' : '<div class="section-title">Experience</div>'}
      ${data.experience.map(exp => `
        <div class="experience-item">
          <div class="job-title">${exp.role}</div>
          <div class="company">${exp.company}</div>
          <div class="date">${exp.dates}</div>
          <p>${exp.description}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function buildEducationSection(data: CVData, boxed = false): string {
  if (!data.education || data.education.length === 0) return '';
  
  return `
    <div class="section">
      ${boxed ? '<div class="section-title">Education</div>' : '<div class="section-title">Education</div>'}
      ${data.education.map(edu => `
        <div class="education-item">
          <div class="job-title">${edu.degree}</div>
          <div class="company">${edu.institution}</div>
          <div class="date">${edu.dates}</div>
          ${edu.description ? `<p>${edu.description}</p>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function buildLanguagesSection(data: CVData, boxed = false): string {
  if (!data.languages || data.languages.length === 0) return '';
  
  return `
    <div class="section">
      ${boxed ? '<div class="section-title">Languages</div>' : '<div class="section-title">Languages</div>'}
      <div class="skills">
        ${data.languages.map(lang => `<span class="skill-tag">${lang.trim()}</span>`).join('')}
      </div>
    </div>
  `;
}

function buildExtrasSection(data: CVData, boxed = false): string {
  if (!data.extra) return '';
  
  return `
    <div class="section">
      ${boxed ? '<div class="section-title">Additional Information</div>' : '<div class="section-title">Additional</div>'}
      <p>${data.extra}</p>
    </div>
  `;
}