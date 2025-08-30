import { Handler } from '@netlify/functions';
import { formatCVAsText, formatCVAsHTML, formatCVAsMarkdown, CVData, ExportTheme } from '../../src/utils/formatHelpers';
import { buildExportHTML } from '../../src/utils/exportHelpers';

export const handler: Handler = async (event) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { cvData, format, exportType, theme } = JSON.parse(event.body || '{}');

    if (!cvData || !exportType) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing cvData or exportType' }),
      };
    }

    let content = '';
    let mimeType = '';
    let filename = '';

    switch (exportType) {
      case 'txt':
        content = formatCVAsText(cvData);
        mimeType = 'text/plain';
        filename = 'cv.txt';
        break;
      
      case 'md':
        content = formatCVAsMarkdown(cvData);
        mimeType = 'text/markdown';
        filename = 'cv.md';
        break;
      
      case 'html':
        content = theme ? buildExportHTML(cvData, theme as ExportTheme) : formatCVAsHTML(cvData);
        mimeType = 'text/html';
        filename = 'cv.html';
        break;
      
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid export type' }),
        };
    }

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        content,
        mimeType,
        filename,
      }),
    };

  } catch (error) {
    console.error('Export error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to export content',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};