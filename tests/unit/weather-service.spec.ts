import { describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';

import { fetchWeatherSummary } from '@/features/weather/services/weather-service';
import { mswServer } from '../msw-server';

describe('fetchWeatherSummary', () => {
  test('returns typed weather data from the service endpoint', async () => {
    // ARRANGE
    // ACT
    const result = await fetchWeatherSummary();

    // ASSERT
    expect(result.city).toBe('Madrid');
    expect(result.temperatureC).toBe(24);
    expect(result.humidityPct).toBe(42);
    expect(result.windKph).toBe(18);
  });

  test('throws AppError when the endpoint fails', async () => {
    // ARRANGE
    mswServer.use(
      http.get('/api/weather', () => {
        return HttpResponse.json({ message: 'failure' }, { status: 500 });
      }),
    );

    // ACT
    const action = fetchWeatherSummary();

    // ASSERT
    await expect(action).rejects.toThrow('Failed to load weather summary.');
  });
});
