/** Represents the weather card shown in the Weather tab. */
export interface WeatherSummary {
  city: string;
  temperatureC: number;
  condition: string;
  humidityPct: number;
  windKph: number;
  updatedAt: string;
}
