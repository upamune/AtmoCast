import { fetchAPI } from '../../utils/api';
import type { WeatherConfig, WeatherAPIResponse, WeatherData } from './types';

export class WeatherService {
  private config: WeatherConfig;

  constructor(config: WeatherConfig) {
    this.config = config;
  }

  async getWeatherData(location: string): Promise<WeatherData> {
    const url = `${this.config.baseUrl}/current.json?key=${this.config.key}&q=${location}`;
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
}