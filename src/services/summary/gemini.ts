import { GoogleGenerativeAI } from '@google/generative-ai';
import type { WeatherData } from '../weather/types';
import type { SummaryConfig, WeatherSummary, SummaryService } from './types';

export class GeminiSummaryService implements SummaryService {
  private config: SummaryConfig;

  constructor(config: SummaryConfig) {
    this.config = config;
  }

  async generateSummary(weatherData: WeatherData): Promise<WeatherSummary> {
    const genAI = new GoogleGenerativeAI(this.config.key);
    const model = genAI.getGenerativeModel({ model: this.config.model });

    const prompt = `
    以下の天気情報からを日本語で下のフォーマットに従って、にまとめてください。具体的な風速値は必要ありませんが、朝昼晩の気温がそれぞれ何度であるかは必要です。最大で300文字程度にしてください。：
    ---
    天気情報
    場所: ${weatherData.location}

    朝の天気:
    気温: ${weatherData.morning.temperature}°C
    天候: ${weatherData.morning.condition}
    湿度: ${weatherData.morning.humidity}%
    風速: ${weatherData.morning.windSpeed}km/h

    昼の天気:
    気温: ${weatherData.afternoon.temperature}°C
    天候: ${weatherData.afternoon.condition}
    湿度: ${weatherData.afternoon.humidity}%
    風速: ${weatherData.afternoon.windSpeed}km/h

    夜の天気:
    気温: ${weatherData.evening.temperature}°C
    天候: ${weatherData.evening.condition}
    湿度: ${weatherData.evening.humidity}%
    風速: ${weatherData.evening.windSpeed}km/h
    ---
    フォーマット
    今日は「{天気情報からどういう日なのか}日」です。
    朝は{朝の天気の特徴}で、昼は{昼の天気の特徴}、夜は{夜の天気の特徴}となります。
    服装は{朝・昼・夜の気温差を考慮した具体的な服装アドバイス}。
    {洗濯のタイミングについてのアドバイス}。
    {傘が必要かどうかのアドバイス}。
  `;


    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const summary = response.text();
      
      return {
        location: weatherData.location,
        summary,
        timestamp: new Date(weatherData.timestamp).toISOString()
      };
    } catch (error) {
      console.error('Error generating summary:', error);
      return {
        location: weatherData.location,
        summary: `${weatherData.location}の天気: ${weatherData.morning.condition}、気温${weatherData.morning.temperature}°C`,
        timestamp: new Date(weatherData.timestamp).toISOString()
      };
    }
  }
}
