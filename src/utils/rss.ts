import { Feed } from 'feed';
import type { WeatherSummary } from '../services/summary/types';

export function generateRSSFeed(weatherSummary: WeatherSummary): string {
  const cleanLocation = weatherSummary.location.replace(/-shi$/i, '');
  
  const feed = new Feed({
    title: `${cleanLocation}の天気情報`,
    description: '毎日の天気情報をお届けします',
    id: `https://tenki.serizawa.dev/tenki/${cleanLocation.toLowerCase()}`,
    link: `https://tenki.serizawa.dev/tenki/${cleanLocation.toLowerCase()}`,
    language: 'ja',
    updated: weatherSummary.timestamp,
    copyright: '© 2024 AtomCast'
  });

  feed.addItem({
    title: `${cleanLocation}の天気 - ${weatherSummary.timestamp.toLocaleDateString('ja-JP')}`,
    id: `${cleanLocation.toLowerCase()}-${weatherSummary.timestamp.toISOString()}`,
    link: `https://tenki.serizawa.dev/tenki/${cleanLocation.toLowerCase()}`,
    description: weatherSummary.summary,
    date: weatherSummary.timestamp
  });

  return feed.rss2();
}