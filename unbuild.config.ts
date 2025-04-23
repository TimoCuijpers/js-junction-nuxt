// unbuild.config.ts
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/module',                    // → dist/module.{mjs,cjs}.js
    'src/runtime/plugin',            // → dist/runtime/plugin.{mjs,cjs}.js
    'src/runtime/composables/useApi' // → dist/runtime/composables/useApi.{mjs,cjs}.js
  ],
  formats: ['esm','cjs'],  // produceer beide
  externals: [
    "#app",
    "#imports",
    "vue",
    "globby",
    "unicorn-magic",
    "@nuxt/kit",
    "@nuxt/schema"
  ],
  failOnWarn: false
})
