import { defineNuxtModule, createResolver, addImports, addPlugin } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "js-junction-nuxt",
    configKey: "jsJunctionNuxt"
  },
  defaults: {
    /* default‐opties */
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    nuxt.options.build.transpile.push("js-junction-nuxt");
    addImports({
      name: "useApi",
      as: "useApi",
      from: resolve("./runtime/composables/useApi")
    });
    addPlugin(resolve("./runtime/plugin"));
  }
});

export { module as default };
