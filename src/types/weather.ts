export interface TimeBasedWeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherData {
  location: string;
  timestamp: string;
  morning: TimeBasedWeatherData;
  afternoon: TimeBasedWeatherData;
  evening: TimeBasedWeatherData;
}

export interface WeatherSummary {
  location: string;
  summary: string;
  timestamp: Date;
}