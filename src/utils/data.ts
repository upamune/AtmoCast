import fs from 'fs/promises';
import path from 'path';
import { format } from 'date-fns';
import type { WeatherSummary } from '../services/summary/types';
import type { WeatherHistory } from '../types/weather-history';

export async function loadWeatherData(location: string): Promise<WeatherSummary> {
  try {
    const historyPath = path.join(process.cwd(), 'data', 'weather-history.json');
    const data = await fs.readFile(historyPath, 'utf-8');
    const history: WeatherHistory = JSON.parse(data);
    
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayData = history[today];
    
    if (!todayData || !todayData[location]) {
      throw new Error(`No weather data found for ${location} today`);
    }
    
    return {
      ...todayData[location],
      timestamp: new Date(todayData[location].timestamp)
    };
  } catch (error) {
    throw new Error(`Failed to load weather data for ${location}: ${error}`);
  }
}