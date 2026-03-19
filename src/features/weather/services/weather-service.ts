import { getJson } from '@/core/api/http-client';
import type {
  OpenWeatherCurrentWeatherResponse,
  OpenWeatherForecastResponse,
  OpenWeatherMeasurementUnit,
  WeatherSummary,
} from '../models/weather';
/**
 * Maps OpenWeatherCurrentWeatherResponse to WeatherSummary domain model.
 * @param data OpenWeather API response
 * @returns WeatherSummary
 */
function mapToWeatherSummary(data: OpenWeatherCurrentWeatherResponse): WeatherSummary {
  return {
    city: data.name,
    temperatureC: Math.round(data.main.temp),
    condition: data.weather[0]?.main ?? '',
    humidityPct: data.main.humidity,
    windKph: Math.round(data.wind.speed * 3.6), // m/s to km/h
    updatedAt: new Date(data.dt * 1000).toISOString(),
  };
}

/**
 * Fetches and maps current weather for UI consumption.
 * @param cityName City query used by OpenWeather.
 * @param unit Unit system sent to OpenWeather.
 * @returns WeatherSummary
 */
export async function fetchWeatherSummary(
  cityName = 'Madrid',
  unit: OpenWeatherMeasurementUnit = 'metric',
): Promise<WeatherSummary> {
  const data = await getCurrentWeather(cityName, unit);
  return mapToWeatherSummary(data);
}

const OPEN_WEATHER_BASE_URL = '/api';

/**
 * Creates query params shared by weather and forecast endpoints.
 * @param cityName City query used by OpenWeather.
 * @param unit Unit system sent to OpenWeather.
 * @returns Query string for fetch.
 */
function createCommonQueryParams(cityName: string, unit: OpenWeatherMeasurementUnit): string {
  const params = new URLSearchParams();
  params.set('q', cityName);
  params.set('units', unit);
  // No API key needed for mock, but add here if needed: params.set('appid', ...)
  return params.toString();
}

/**
 * Fetches current weather data for a city.
 * @param cityName City query used by OpenWeather.
 * @param unit Unit system sent to OpenWeather.
 * @returns Current weather response.
 */
export async function getCurrentWeather(
  cityName: string,
  unit: OpenWeatherMeasurementUnit = 'metric',
): Promise<OpenWeatherCurrentWeatherResponse> {
  const query = createCommonQueryParams(cityName, unit);
  return getJson<OpenWeatherCurrentWeatherResponse>(`${OPEN_WEATHER_BASE_URL}/weather?${query}`);
}

/**
 * Fetches 5-day / 3-hour forecast data for a city.
 * @param cityName City query used by OpenWeather.
 * @param unit Unit system sent to OpenWeather.
 * @returns Forecast response.
 */
export async function getForecast(
  cityName: string,
  unit: OpenWeatherMeasurementUnit = 'metric',
): Promise<OpenWeatherForecastResponse> {
  const query = createCommonQueryParams(cityName, unit);
  return getJson<OpenWeatherForecastResponse>(`${OPEN_WEATHER_BASE_URL}/forecast?${query}`);
}

export { createCommonQueryParams };
