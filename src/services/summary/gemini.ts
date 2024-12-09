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
      あなたは天気予報士です。以下の天気情報を元に、下のフォーマットに従って日本語でまとめてください。フォーマットは必ず使用してください。 {{}} の中には天気情報を元に適切な値を入れてください。

      --- 天気情報 ---
      場所: ${weatherData.location}
      気温: ${weatherData.temperature}°C
      天候: ${weatherData.condition}
      湿度: ${weatherData.humidity}%
      風速: ${weatherData.windSpeed}km/h

      --- フォーマット ---
      今日は{{今日の気温のサマリ}}「{{天気情報を元にどういう天気の日か}}」です。服は{{天気情報を元におすすめの服装を2~3個}}}。{{洗濯日和かどうか}}
      {{天気で気をつけるべきことがあれば注意事項}}
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const summary = response.text();
      
      return {
        location: weatherData.location,
        summary,
        timestamp: weatherData.timestamp
      };
    } catch (error) {
      console.error('Error generating summary:', error);
      return {
        location: weatherData.location,
        summary: `${weatherData.location}の天気: ${weatherData.condition}、気温${weatherData.temperature}°C`,
        timestamp: weatherData.timestamp
      };
    }
  }
}