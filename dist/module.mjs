import { defineNuxtModule, createResolver, addImportsDir, addPlugin } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "js-junction-nuxt",
    configKey: "jsJunctionNuxt",
    dependsOn: ["nuxt-auth-sanctum"]
  },
  defaults: {
    /* default‐opties */
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    nuxt.options.build.transpile.push(resolver.resolve("./"));
    addImportsDir(resolver.resolve("./runtime/composables"));
    addPlugin(resolver.resolve("./runtime/plugin"));
  }
});

export { module as default };
