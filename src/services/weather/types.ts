export interface WeatherConfig {
  key: string;
  baseUrl: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface HourForecast {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  is_day: number;
  vis_km: number;
  vis_miles: number;
  chance_of_rain: number;
  chance_of_snow: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

export interface DayForecast {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  condition: WeatherCondition;
  uv: number;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: DayForecast;
  hour: HourForecast[];
}

export interface WeatherAPIResponse {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    condition: WeatherCondition;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

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