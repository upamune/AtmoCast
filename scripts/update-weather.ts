import { WeatherService } from '../src/services/weather/api';
import { GeminiSummaryService } from '../src/services/summary/gemini';
import { LOCATIONS } from '../src/config/api';
import type { WeatherHistory } from '../src/types/weather-history';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.WEATHER_API_KEY || !process.env.GEMINI_API_KEY) {
  console.error('Required environment variables are not set');
  process.exit(1);
}

const weatherService = new WeatherService({
  key: process.env.WEATHER_API_KEY,
  baseUrl: 'https://api.weatherapi.com/v1'
});

const summaryService = new GeminiSummaryService({
  key: process.env.GEMINI_API_KEY,
  model: 'gemini-1.5-flash'
});

async function loadWeatherHistory(): Promise<WeatherHistory> {
  const historyPath = path.join(__dirname, '..', 'data', 'weather-history.json');
  try {
    const data = await fs.readFile(historyPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

async function updateWeatherData() {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    const history = await loadWeatherHistory();
    const today = format(new Date(), 'yyyy-MM-dd');
    
    history[today] = history[today] || {};
    
    for (const location of LOCATIONS) {
      console.log(`Fetching weather data for ${location}...`);
      const weatherData = await weatherService.getWeatherData(location);
      
      console.log(`Generating summary for ${location}...`);
      const weatherSummary = await summaryService.generateSummary(weatherData);
      
      history[today][location] = weatherSummary;
    }
    
    const historyPath = path.join(dataDir, 'weather-history.json');
    await fs.writeFile(
      historyPath,
      JSON.stringify(history, null, 2)
    );
    console.log('Weather history updated successfully');
  } catch (error) {
    console.error('Error updating weather data:', error);
    process.exit(1);
  }
}

updateWeatherData();
