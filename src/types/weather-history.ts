import type { WeatherSummary } from '../services/summary/types';

export interface WeatherHistory {
  [date: string]: {
    [location: string]: WeatherSummary;
  };
}