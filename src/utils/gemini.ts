import { GoogleGenerativeAI } from '@google/generative-ai';
import type { WeatherData, WeatherSummary } from '../types/weather';

const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function generateWeatherSummary(weatherData: WeatherData): Promise<WeatherSummary> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = `
    以下の天気情報からを日本語で下のフォーマットに従って、にまとめてください：
    ---
    天気情報
    場所: ${weatherData.location}
    気温: ${weatherData.temperature}°C
    天候: ${weatherData.condition}
    湿度: ${weatherData.humidity}%
    風速: ${weatherData.windSpeed}km/h
    ---
    フォーマット
    今日は「{天気情報からどういう日なのか}日」です。服は{天気情報を元におすすめの服装}。{洗濯日和かどうか}。
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const summary = response.text();

  return {
    location: weatherData.location,
    summary,
    timestamp: weatherData.timestamp
  };
}