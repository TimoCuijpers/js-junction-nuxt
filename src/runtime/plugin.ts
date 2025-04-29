import { defineNuxtPlugin } from '#app'
import Model from './builder/model'
export default defineNuxtPlugin((nuxtApp) => {
  const testJunction = 'testJunction'

 return {
   provide: {
     Model,
     testJunction
   }
 }
})
