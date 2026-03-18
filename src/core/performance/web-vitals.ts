import { onCLS, onINP, onLCP, onTTFB } from 'web-vitals'

/**
 * Reports production web-vitals to the browser console.
 * Replace this sink with a backend endpoint when available.
 */
export function setupWebVitalsReporting(): void {
  if (!import.meta.env.PROD) {
    return
  }

  onCLS((metric) => {
    console.info('[web-vitals]', metric.name, metric.value)
  })
  onINP((metric) => {
    console.info('[web-vitals]', metric.name, metric.value)
  })
  onLCP((metric) => {
    console.info('[web-vitals]', metric.name, metric.value)
  })
  onTTFB((metric) => {
    console.info('[web-vitals]', metric.name, metric.value)
  })
}
