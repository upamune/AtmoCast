export interface WeatherConfig {
  key: string;
  baseUrl: string;
}

export interface WeatherAPIResponse {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
    last_updated: string;
  };
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  timestamp: Date;
}