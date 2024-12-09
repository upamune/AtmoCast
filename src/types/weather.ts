export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  timestamp: Date;
}

export interface WeatherSummary {
  location: string;
  summary: string;
  timestamp: Date;
}