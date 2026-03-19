import { http, HttpResponse } from 'msw';

export const weatherHandlers = [
  http.get('/api/weather', () => {
    return HttpResponse.json({
      city: 'Madrid',
      temperatureC: 24,
      condition: 'Sunny',
      humidityPct: 42,
      windKph: 18,
      updatedAt: '2026-03-18T09:00:00Z',
    });
  }),
];
