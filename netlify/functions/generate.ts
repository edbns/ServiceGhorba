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
    const { type, data, format, language } = JSON.parse(event.body || '{}');

    if (!type || !data) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing type or data' }),
      };
    }

    const targetLanguage = language === 'fr' ? 'fr' : 'en';
    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'cv':
        systemPrompt = systemPrompts.cvGeneration + `\n\nOutput language: ${targetLanguage === 'fr' ? 'French' : 'English'}.`;
        userPrompt = `${targetLanguage === 'fr' ? 'Générez un CV professionnel basé sur ces informations' : 'Generate a professional CV based on this information'}:\n\n${JSON.stringify(data, null, 2)}\n\n${targetLanguage === 'fr' ? 'Format' : 'Format'}: ${format || 'general'}`;
        break;
      
      case 'motivation_letter':
        systemPrompt = systemPrompts.motivationLetter + `\n\nOutput language: ${targetLanguage === 'fr' ? 'French' : 'English'}.`;
        userPrompt = `${targetLanguage === 'fr' ? 'Rédigez une lettre de motivation convaincante à partir de ces informations' : 'Create a compelling motivation letter based on this information'}:\n\n${JSON.stringify(data, null, 2)}`;
        break;
      
      case 'basic_motivation':
        systemPrompt = systemPrompts.simpleLetter + `\n\nOutput language: ${targetLanguage === 'fr' ? 'French' : 'English'}.`;
        userPrompt = `${targetLanguage === 'fr' ? 'Rédigez une lettre simple et facile à comprendre à partir de ces informations' : 'Create a simple, easy-to-understand motivation letter based on this information'}:\n\n${JSON.stringify(data, null, 2)}`;
        break;
      
      case 'improve':
        systemPrompt = systemPrompts.contentImprovement + `\n\nOutput language: ${targetLanguage === 'fr' ? 'French' : 'English'}.`;
        userPrompt = `${targetLanguage === 'fr' ? 'Améliorez ce contenu' : 'Improve this content'}:\n\n${data.content}`;
        break;
      
      case 'skill_translation':
        systemPrompt = systemPrompts.skillTranslation + `\n\nOutput language: ${targetLanguage === 'fr' ? 'French' : 'English'}.`;
        userPrompt = `${targetLanguage === 'fr' ? 'Convertissez cette description de poste en 3 à 5 points de CV professionnels' : 'Convert this job description into 3-5 professional CV bullet points'}:\n\n"${data.jobDescription}"`;
        break;
      

      
      case 'cv_review':
        systemPrompt = systemPrompts.cvReview + `\n\nOutput language: ${targetLanguage === 'fr' ? 'French' : 'English'}.`;
        userPrompt = `${targetLanguage === 'fr' ? 'Analysez ce CV et fournissez un retour' : 'Review this CV and provide feedback'}:\n\n${data.content}`;
        break;
      
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid type' }),
        };
    }

    const defaultModel = process.env.OPENAI_MODEL_DEFAULT || 'gpt-4o';
    const lightModel = process.env.OPENAI_MODEL_LIGHT || 'gpt-3.5-turbo';
    const lightTypes = new Set(['skill_translation', 'cv_review', 'improve']);
    const selectedModel = lightTypes.has(type) ? lightModel : defaultModel;

    const completion = await openai.chat.completions.create({
      model: selectedModel,
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

    // Robust parsing: try JSON; try extracting JSON blocks; coerce shapes per type
    const tryParse = (text: string): unknown | null => {
      try {
        return JSON.parse(text);
      } catch {
        // try extract code fence
        const fence = text.match(/```json[\s\S]*?```/i) || text.match(/```[\s\S]*?```/i);
        if (fence && fence[0]) {
          const inner = fence[0].replace(/```json|```/g, '').trim();
          try { return JSON.parse(inner); } catch {}
        }
        // try extract first JSON object/array
        const objMatch = text.match(/\{[\s\S]*\}/);
        if (objMatch) {
          try { return JSON.parse(objMatch[0]); } catch {}
        }
        const arrMatch = text.match(/\[[\s\S]*\]/);
        if (arrMatch) {
          try { return JSON.parse(arrMatch[0]); } catch {}
        }
        return null;
      }
    };

    let parsedResult: unknown | null = tryParse(result);

    // Normalize per type
    if (type === 'skill_translation') {
      if (Array.isArray(parsedResult)) {
        parsedResult = { skills: parsedResult };
      } else if (parsedResult && typeof parsedResult === 'object' && (parsedResult as any).skills) {
        // ok
      } else {
        // fallback: split lines into bullets
        const skills = result.split(/\n|\r/).map(s => s.replace(/^[-•]\s*/, '').trim()).filter(Boolean).slice(0, 5);
        parsedResult = { skills };
      }
    } else if (type === 'cv_review') {
      if (!parsedResult || typeof parsedResult !== 'object') {
        parsedResult = { content: result };
      }
    } else if (type === 'cv') {
      if (!parsedResult || typeof parsedResult !== 'object') {
        parsedResult = { content: result };
      }
    } else {
      if (!parsedResult) parsedResult = { content: result };
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