# @inkeep/docus

Inkeep ✨

[![Nuxt][nuxt-src]][nuxt-href]

## Quick Setup

To test locally, clone the repository and run the following commands

```bash
# Install dependencies
npm install

# For testing in the built-in playground
npm run dev

# Build an npm package
npm run prepack

# Publish the npm package locally
npm link
```

## Use in Docus

In the Docus documentation, run the following command:

```bash
npm link @inkeep/docus
```

Add the installed package to the modules in the `nuxt.config.ts` file:

```js
export default defineNuxtConfig({
  modules: ["@inkeep/docus"],
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      inkeepConfig: {
        chatButtonType: "ICON_TEXT",
        componentType: "ChatButton", // ChatButton, SearchBar, ChatButton&SearchBar
        baseSettings: {
          apiKey: "YOUR_API_KEY", // required
          integrationId: "YOUR_INTEGRATION_ID", // required
          organizationId: "YOUR_ORGANIZATION_ID", // required
          primaryBrandColor: "#26D6FF", // required -- your brand color, the widget color scheme is derived from this
          organizationDisplayName: "Inkeep",
          // ...optional settings
        },
        modalSettings: {
          // optional settings
        },
        searchSettings: {
          // optional settings
        },
        aiChatSettings: {
          // optional settings
          // botAvatarSrcUrl: "/img/logo.svg", // optional -- use your own bot avatar
          quickQuestions: [
            "Example question 1?",
            "Example question 2?",
            "Example question 3?",
          ],
        },
      },
    },
  },
});
```

## How to build npm package?

```bash
# Running the linter
npm run lint

# Running unit, integration, and e2e tests
npm run test

# Building the module
npm run prepack

# Publish
npm run release (npm publish)
```

<!-- Badges -->

[npm-downloads-href]: https://npmjs.com/package/my-module
[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/my-module
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
