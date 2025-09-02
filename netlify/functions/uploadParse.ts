import { Handler } from '@netlify/functions';
import pdfParse from 'pdf-parse';

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
    // Parse multipart form data
    const body = event.body;
    const isBase64 = event.isBase64Encoded;
    
    if (!body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No file data received' }),
      };
    }

    // Convert base64 to buffer if needed
    const buffer = isBase64 ? Buffer.from(body, 'base64') : Buffer.from(body);
    
    // Parse PDF
    const pdfData = await pdfParse(buffer);
    const text = pdfData.text;

    if (!text || text.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Could not extract text from PDF' }),
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
        text: text.trim(),
      }),
    };

  } catch (error) {
    console.error('PDF parsing error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to parse PDF',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};