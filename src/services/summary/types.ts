import type { WeatherData } from '../weather/types';

export interface SummaryConfig {
  key: string;
  model: string;
}

export interface WeatherSummary {
  location: string;
  summary: string;
  timestamp: string;
  prompt: string;
}

export interface SummaryService {
  generateSummary(weatherData: WeatherData): Promise<WeatherSummary>;
}