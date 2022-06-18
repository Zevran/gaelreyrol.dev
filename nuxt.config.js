const metaTitle = 'Gaël Reyrol'
const metaDescription =
  'Je suis développeur autodidacte, passionné de web principalement'

const createSitemapRoutes = async () => {
  const { $content } = require('@nuxt/content')
  const pages = await $content()
    .where({ slug: { $ne: 'index' } })
    .only(['path', 'updatedAt'])
    .fetch()

  const projects = await $content('projects')
    .only(['path', 'updatedAt'])
    .fetch()

  const routes = pages.concat(projects)

  return routes.map((route) => ({
    url: route.path,
    lastmod: route.updatedAt
  }))
}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: metaTitle,
    titleTemplate: `%s - ${metaTitle}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: metaDescription
      },
      // Open Graph
      { hid: 'og:title', property: 'og:title', content: metaTitle },
      {
        hid: 'og:description',
        property: 'og:description',
        content: metaDescription
      },
      // Twitter Card
      { hid: 'twitter:title', name: 'twitter:title', content: metaTitle },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: metaDescription
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    htmlAttrs: {
      class: 'h-full'
    },
    bodyAttrs: {
      class: 'h-full'
    }
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],

  // See https://github.com/nuxt-community/tailwindcss-module/issues/480
  devServerHandlers: [],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  tailwindcss: {
    config: {
      content: ['content/**/**.md']
    }
  },

  sitemap: {
    hostname: 'https://gaelreyrol.dev',
    routes: createSitemapRoutes
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = await $content({ deep: true }).only(['path']).fetch()

      return files.map((file) => (file.path === '/index' ? '/' : file.path))
    }
  }
}
