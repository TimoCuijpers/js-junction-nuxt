import { defineNuxtPlugin } from '#app'
import Api from './api'

export default defineNuxtPlugin({
  name: 'js-junction-nuxt',
  parallel: true,
  setup (nuxtApp)  {
    const api = new Api()

    api.host(nuxtApp.$config.public.apiBaseUrl || 'http://localhost:3000')
    api.suffix('/api')

   return {
     provide: {
       api,
     }
   }
  },
  hooks: {
    'app:beforeMount'(nuxtApp) {
      // Reset the API instance on app reload
      const api = new Api()
      api.host(nuxtApp.$config.public.apiBaseUrl || 'http://localhost:3000')
      api.suffix('/api')
      nuxtApp.provide('api', api)
    }
  }
})
