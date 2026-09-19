// Grouped by what a reader is doing: getting a first page on screen, fitting
// rotion into a site, looking something up, or seeing what a block becomes.
export default {
  index: {
    title: 'Home',
    display: 'hidden',
    theme: {
      layout: 'full',
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
      timestamp: false,
      copyPage: false
    }
  },
  '-- start': { type: 'separator', title: 'Getting started' },
  introduction: 'Introduction',
  'getting-started': 'Quick start',
  examples: 'Examples',
  '-- guides': { type: 'separator', title: 'Guides' },
  'app-router': 'Next.js App Router',
  'pages-router': 'Next.js Pages Router',
  'database-views': 'Database views',
  caching: 'Caching and files',
  '-- reference': { type: 'separator', title: 'Reference' },
  api: 'Fetch API',
  components: 'Components',
  configuration: 'Environment variables',
  '-- showcase': { type: 'separator', title: 'Showcase' },
  blocks: 'Blocks',
  views: 'Database views'
}
