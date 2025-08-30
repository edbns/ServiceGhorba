import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from 'docx';
import { CVData } from './formatHelpers';

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