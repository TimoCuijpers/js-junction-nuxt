import {defineNuxtModule, createResolver, addPlugin, addImports} from '@nuxt/kit'

export interface ModuleOptions {
  /* hier alle opties die je module later krijgt */
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'js-junction-nuxt',
    configKey: 'jsJunctionNuxt',
  },
  defaults: {
    /* default‐opties */
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // transpile je fork als dat nodig is:
    nuxt.options.build.transpile.push('js-junction-nuxt')

    addImports({
      name: 'useApi',
      as: 'useApi',
      from: resolve('./runtime/composables/useApi'),
    })

    // in plaats van `nuxt.addPlugin`, doe je dit:
    // nuxt.hook('app:resolve', () => {
      addPlugin(resolve('./runtime/plugin'))
    // })
  }
})
