import { describe, expect, test } from 'vitest';

import { getCurrentWeather } from '@/features/weather/services/weather-service';

describe('getCurrentWeather', () => {
  test('returns OpenWeather API response for city', async () => {
    // ARRANGE
    const city = 'Madrid';
    // ACT
    const result = await getCurrentWeather(city);

    // ASSERT
    expect(result).toHaveProperty('name', 'Madrid');
    expect(result).toHaveProperty('main');
    expect(result.main).toHaveProperty('temp');
    expect(result).toHaveProperty('weather');
    expect(Array.isArray(result.weather)).toBe(true);
    expect(result.weather[0]).toHaveProperty('main');
    expect(result).toHaveProperty('wind');
  });

  test('returns 404 for error city', async () => {
    // ARRANGE
    const city = 'error-city';

    // ACT & ASSERT
    await expect(getCurrentWeather(city)).rejects.toThrow('Request failed with status 404');
  });
});
