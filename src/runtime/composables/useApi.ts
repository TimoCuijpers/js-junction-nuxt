// src/runtime/composables/useApi.ts
import type { Api } from '../../api'
import { useNuxtApp } from '#app'

export function useApi(): Api {
  // Gebruik nuxtApp om je provided instance te krijgen
  const { $api: api } = useNuxtApp()

  // api.host('http://localhost:8080/')
  return api
}
