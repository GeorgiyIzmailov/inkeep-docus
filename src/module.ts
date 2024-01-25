import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'inkeep-widgets',
    configKey: 'inkeep'
  },
  defaults: {},
  setup () {
    const { resolve } = createResolver(import.meta.url)

    addPlugin({
      src: resolve('./runtime/inkeep-widget-plugin'),
      name: 'Inkeep Widget'
    });
  }
})
