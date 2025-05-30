import { defineNuxtPlugin, useNuxtApp } from '#app'
import Api from './api'

export default defineNuxtPlugin({
  name: 'js-junction-nuxt',
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
    // 'app:beforeMount'() {
    //   const nuxtApp = useNuxtApp()
    //   console.log(window.api)
    //   // Reset the API instance on app reload
    //   // nuxtApp.$api = new Api()
    //   nuxtApp.$api.host('http://localhost:3000')
    //   nuxtApp.$api.suffix('/api')
    // }
  }
})
