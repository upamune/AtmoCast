import { fetchAPI } from '../../utils/api';
import type { WeatherConfig, WeatherAPIResponse, WeatherData, TimeBasedWeatherData } from './types';

export class WeatherService {
  private config: WeatherConfig;

  constructor(config: WeatherConfig) {
    this.config = config;
  }

  async getWeatherData(location: string): Promise<WeatherData> {
    const cleanLocation = location.replace(/-shi$/i, '');
    const url = `${this.config.baseUrl}/forecast.json?key=${this.config.key}&q=${location}&days=1`;
    
    const data = await fetchAPI<WeatherAPIResponse>(url);
    const hourlyData = data.forecast.forecastday[0].hour;
    // console.log(JSON.stringify(hourlyData, null, 2));
    
    // 朝（8時）、昼（13時）、夜（19時）のデータを取得
    const morning: TimeBasedWeatherData = {
      temperature: hourlyData[8].temp_c,
      condition: hourlyData[8].condition.text,
      humidity: hourlyData[8].humidity,
      windSpeed: hourlyData[8].wind_kph
    };

    const afternoon: TimeBasedWeatherData = {
      temperature: hourlyData[13].temp_c,
      condition: hourlyData[13].condition.text,
      humidity: hourlyData[13].humidity,
      windSpeed: hourlyData[13].wind_kph
    };

    const evening: TimeBasedWeatherData = {
      temperature: hourlyData[19].temp_c,
      condition: hourlyData[19].condition.text,
      humidity: hourlyData[19].humidity,
      windSpeed: hourlyData[19].wind_kph
    };

    return {
      location: cleanLocation,
      morning,
      afternoon,
      evening,
      timestamp: new Date().toISOString()
    };
  }
}