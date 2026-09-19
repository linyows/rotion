import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  // The documentation is the content directory itself, so its pages sit at
  // the root of each locale: /caching rather than /docs/caching.
  contentDirBasePath: '/',
  // Put the locale in front of the links the sidebar and the navbar build.
  // Nextra otherwise expects a middleware to do it, which a static export
  // has no room for.
  unstable_shouldAddLocaleToLinks: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: { light: 'github-light-high-contrast', dark: 'github-dark' }
    }
  }
})

// Nextra removes the i18n key before Next.js sees the config -- it only reads
// it to learn which locale directories exist -- so this is compatible with a
// static export.
export default withNextra({
  output: 'export',
  images: { unoptimized: true },
  // Next.js otherwise writes an AGENTS.md and a CLAUDE.md into this directory
  // on every run, which this repository has not asked for.
  agentRules: false,
  reactStrictMode: true,
  // The showcase pages fetch from the Notion API, and a page with mentions or
  // bookmarks also fetches every site it links to, which on a cold cache takes
  // longer than the minute Next.js allows a page by default.
  staticPageGenerationTimeout: 300,
  turbopack: {
    root: import.meta.dirname
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en'
  }
})
