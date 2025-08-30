import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import { systemPrompts } from '../../src/prompts/cv_chat_prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    const { type, data, format } = JSON.parse(event.body || '{}');

    if (!type || !data) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing type or data' }),
      };
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'cv':
        systemPrompt = systemPrompts.cvGeneration;
        userPrompt = `Generate a professional CV based on this information:\n\n${JSON.stringify(data, null, 2)}\n\nFormat: ${format || 'general'}`;
        break;
      
      case 'motivation_letter':
        systemPrompt = systemPrompts.motivationLetter;
        userPrompt = `Create a compelling motivation letter based on this information:\n\n${JSON.stringify(data, null, 2)}`;
        break;
      
      case 'improve':
        systemPrompt = systemPrompts.contentImprovement;
        userPrompt = `Improve this content:\n\n${data.content}`;
        break;
      
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid type' }),
        };
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const result = completion.choices[0]?.message?.content;

    if (!result) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'No response from AI' }),
      };
    }

    // Try to parse as JSON for CV generation, otherwise return as text
    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch {
      parsedResult = { content: result };
    }

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        data: parsedResult,
        type,
      }),
    };

  } catch (error) {
    console.error('Generation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to generate content',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};