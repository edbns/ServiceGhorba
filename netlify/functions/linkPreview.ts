import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { url } = JSON.parse(event.body || '{}');
    if (!url) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing url' }) };
    }

    const resp = await fetch(url, { redirect: 'follow' });
    const html = await resp.text();

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const ogTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    const ogDescMatch = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i);
    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);

    const data = {
      title: (ogTitleMatch && ogTitleMatch[1]) || (titleMatch && titleMatch[1]) || '',
      description: (ogDescMatch && ogDescMatch[1]) || '',
      image: (ogImageMatch && ogImageMatch[1]) || '',
    };

    return { statusCode: 200, headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ success: true, data }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Preview fetch failed' }) };
  }
};

