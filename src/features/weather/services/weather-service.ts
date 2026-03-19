import { getJson } from '@/core/api/http-client';
import { AppError } from '@/core/error/app-error';

import type { WeatherSummary } from '../models/weather';

/** Retrieves weather summary from the API contract endpoint. */
export async function fetchWeatherSummary(): Promise<WeatherSummary> {
  try {
    return await getJson<WeatherSummary>('/api/weather');
  } catch (error) {
    throw new AppError('Failed to load weather summary.', error);
  }
}
