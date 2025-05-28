import { defineNuxtModule, createResolver, addPlugin, addImportsDir, addTypeTemplate } from "@nuxt/kit";

export interface ModuleOptions {
  /* hier alle opties die je module later krijgt */
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'js-junction-nuxt',
    configKey: 'jsJunctionNuxt',
    dependsOn: ['nuxt-auth-sanctum']
  },
  defaults: {
    /* default‐opties */
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // nuxt.options.build.transpile.push(resolver.resolve('./'))

    addImportsDir(resolver.resolve('./runtime/composables'))

    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
