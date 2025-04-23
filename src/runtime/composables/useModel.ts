import { useNuxtApp } from '#app'

export function useModel() {
  const { $Model } = useNuxtApp()

  return $Model
}
