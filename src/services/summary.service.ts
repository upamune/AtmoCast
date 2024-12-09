import { GoogleGenerativeAI } from '@google/generative-ai';
import type { WeatherData, WeatherSummary } from '../types/weather';

interface GeminiConfig {
  key: string;
  model: string;
}

export async function generateSummary(weatherData: WeatherData): Promise<WeatherSummary> {
  const config = (generateSummary as any).config as GeminiConfig;
  const genAI = new GoogleGenerativeAI(config.key);
  const model = genAI.getGenerativeModel({ model: config.model });

  const prompt = `
    以下の天気情報を日本語で簡潔にまとめてください：
    場所: ${weatherData.location}
    気温: ${weatherData.temperature}°C
    天候: ${weatherData.condition}
    湿度: ${weatherData.humidity}%
    風速: ${weatherData.windSpeed}km/h
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