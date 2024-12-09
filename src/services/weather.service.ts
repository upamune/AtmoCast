import { fetchAPI } from '../utils/api';
import type { WeatherData } from '../types/weather';

interface WeatherAPIResponse {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
    last_updated: string;
  };
}

interface WeatherConfig {
  key: string;
  baseUrl: string;
}

export async function getWeatherData(location: string): Promise<WeatherData> {
  const config = (getWeatherData as any).config as WeatherConfig;
  const url = `${config.baseUrl}/current.json?key=${config.key}&q=${location}`;
  const data = await fetchAPI<WeatherAPIResponse>(url);
  
  const cleanLocation = data.location.name.replace(/-shi$/i, '');
  
  return {
    location: cleanLocation,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
    timestamp: new Date(data.current.last_updated)
  };
}