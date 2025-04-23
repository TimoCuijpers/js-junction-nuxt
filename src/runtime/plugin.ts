import { defineNuxtPlugin } from '#app'
import Api from '../api'
import Model from "../builder/model";

// maak één enkele instance
const api = new Api()

api.host('http://localhost:8000/')

export default defineNuxtPlugin({
  dependsOn: ['nuxt-auth-sanctum'],
  provide: {
    api,
    Model
  },
})
