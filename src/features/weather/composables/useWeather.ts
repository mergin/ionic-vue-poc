import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

import type { WeatherSummary } from '../models/weather'
import { fetchWeatherSummary } from '../services/weather-service'

interface UseWeatherReturn {
  loading: Ref<boolean>
  error: Ref<string | null>
  summary: Ref<WeatherSummary | null>
  load: () => Promise<void>
}

/** Encapsulates weather loading, error handling, and retry behavior for UI components. */
export function useWeather(): UseWeatherReturn {
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)
  const summary = ref<WeatherSummary | null>(null)

  async function load(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      summary.value = await fetchWeatherSummary()
    } catch {
      error.value = 'error'
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await load()
  })

  return {
    loading,
    error,
    summary,
    load,
  }
}
