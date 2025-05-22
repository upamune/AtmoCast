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

    // forecastdayが存在し、要素が含まれていることを確認
    if (!data.forecast?.forecastday || data.forecast.forecastday.length === 0) {
      throw new Error(`No forecast data available for ${location}`);
    }

    const forecastDay = data.forecast.forecastday[0];

    // hourプロパティが存在することを確認
    if (!forecastDay.hour || forecastDay.hour.length === 0) {
      throw new Error(`No hourly forecast data available for ${location}`);
    }

    const hourlyData = forecastDay.hour;

    // 特定の時間のデータを安全に取得するヘルパー関数
    const getTimeBasedData = (index: number): TimeBasedWeatherData => {
      if (hourlyData.length > index) {
        return {
          temperature: hourlyData[index].temp_c,
          condition: hourlyData[index].condition.text,
          humidity: hourlyData[index].humidity,
          windSpeed: hourlyData[index].wind_kph
        };
      } else {
        // 利用可能な最後のデータを使用
        const lastIndex = hourlyData.length - 1;
        return {
          temperature: hourlyData[lastIndex].temp_c,
          condition: hourlyData[lastIndex].condition.text,
          humidity: hourlyData[lastIndex].humidity,
          windSpeed: hourlyData[lastIndex].wind_kph
        };
      }
    };

    // 朝（8時）、昼（13時）、夜（19時）のデータを取得
    const morning = getTimeBasedData(8);
    const afternoon = getTimeBasedData(13);
    const evening = getTimeBasedData(19);

    return {
      location: cleanLocation,
      morning,
      afternoon,
      evening,
      timestamp: new Date().toISOString()
    };
  }
}
