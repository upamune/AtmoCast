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
    
    // 朝（6時）、昼（12時）、夜（21時）のデータを取得
    const morning: TimeBasedWeatherData = {
      temperature: hourlyData[6].temp_c,
      condition: hourlyData[6].condition.text,
      humidity: hourlyData[6].humidity,
      windSpeed: hourlyData[6].wind_kph
    };

    const afternoon: TimeBasedWeatherData = {
      temperature: hourlyData[12].temp_c,
      condition: hourlyData[12].condition.text,
      humidity: hourlyData[12].humidity,
      windSpeed: hourlyData[12].wind_kph
    };

    const evening: TimeBasedWeatherData = {
      temperature: hourlyData[21].temp_c,
      condition: hourlyData[21].condition.text,
      humidity: hourlyData[21].humidity,
      windSpeed: hourlyData[21].wind_kph
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