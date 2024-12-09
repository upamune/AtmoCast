import type { APIRoute } from 'astro';
import { LOCATIONS } from '../../config/api';
import { loadWeatherData } from '../../utils/data';
import { generateRSSFeed } from '../../utils/rss';

export const getStaticPaths = () => {
  return LOCATIONS.map(location => ({
    params: { location: location.toLowerCase() }
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const location = params.location?.charAt(0).toUpperCase() + params.location?.slice(1);
  
  if (!location || !LOCATIONS.includes(location as any)) {
    return new Response('Invalid location', { status: 404 });
  }

  try {
    const weatherSummary = await loadWeatherData(location);
    const rssFeed = generateRSSFeed(weatherSummary);

    return new Response(rssFeed, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('Error generating weather feed:', error);
    return new Response('Error generating weather feed', { status: 500 });
  }
};