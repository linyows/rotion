const postcssImport = require('postcss-import')
const cssnano = require('cssnano')
const removeDark = require('./scripts/postcss-remove-dark.cjs')

module.exports = {
  plugins: [
    postcssImport,
    removeDark(),
    cssnano({
      preset: 'default',
    }),
  ],
}
