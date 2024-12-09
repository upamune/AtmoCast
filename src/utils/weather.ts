import { WeatherData } from '../types/weather';

const WEATHER_API_KEY = import.meta.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchWeatherData(location: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${location}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data for ${location}`);
  }

  const data = await response.json();
  
  return {
    location: data.location.name,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
    timestamp: new Date(data.current.last_updated)
  };
}