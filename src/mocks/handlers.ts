import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/weather', () => {
    return HttpResponse.json({
      city: 'Madrid',
      temperatureC: 24,
      condition: 'Sunny',
      humidityPct: 42,
      windKph: 18,
      updatedAt: '2026-03-18T09:00:00Z',
    })
  }),
  http.get('/api/gallery', () => {
    return HttpResponse.json({
      images: [
        { id: 'img-1', title: 'Mountain', url: 'https://picsum.photos/id/1018/400/300' },
        { id: 'img-2', title: 'Ocean', url: 'https://picsum.photos/id/1015/400/300' },
      ],
    })
  }),
  http.get('/api/social', () => {
    return HttpResponse.json({
      posts: [
        { id: 'post-1', author: 'Ana', message: 'Migration baseline ready.' },
        { id: 'post-2', author: 'Luis', message: 'Parity checklist in progress.' },
      ],
    })
  }),
]
