import {GoogleGenAI} from '@google/genai';
import type { WeatherData } from '../weather/types';
import type { SummaryConfig, WeatherSummary, SummaryService } from './types';

export class GeminiSummaryService implements SummaryService {
  private config: SummaryConfig;

  constructor(config: SummaryConfig) {
    this.config = config;
  }

  async generateSummary(weatherData: WeatherData): Promise<WeatherSummary> {
    const genAI = new GoogleGenAI({apiKey: this.config.key});

    const prompt = `以下の天気情報から日本語で下のフォーマットに従ってまとめてください。具体的な風速値は必要ありませんが、朝昼晩の気温がそれぞれ何度であるかは必要です。気温は℃で表記してください。最大で300文字程度にしてください。：
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
    今日は朝{朝の気温}昼{昼の気温}夜{夜の気温}と「{朝昼晩の天気情報からどういう天気の日なのかを分かりやすく}日」です。
    朝は{朝の天気の特徴}で、昼は{昼の天気の特徴}、夜は{夜の天気の特徴}となります。
    {朝・昼・夜のそれぞれの気温を考慮した具体的な服装アドバイスとその服装の理由}。
    {洗濯のタイミングについてのアドバイス}。
    {傘が必要かどうかのアドバイス}。
  `;


    try {
      const result = await genAI.models.generateContent({ 
        model: this.config.model,
        contents: prompt,
      });
      const summary = result.text ?? "";
      
      return {
        location: weatherData.location,
        summary,
        timestamp: new Date(weatherData.timestamp).toISOString(),
        prompt,
      };
    } catch (error) {
      console.error('Error generating summary:', error);
      return {
        location: weatherData.location,
        summary: `${weatherData.location}の天気: ${weatherData.morning.condition}、気温${weatherData.morning.temperature}°C`,
        timestamp: new Date(weatherData.timestamp).toISOString(),
        prompt,
      };
    }
  }
}
