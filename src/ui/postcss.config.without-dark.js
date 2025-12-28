import postcssImport from 'postcss-import'
import cssnano from 'cssnano'
import removeDark from './scripts/postcss-remove-dark.js'

export default {
  plugins: [
    postcssImport,
    removeDark,
    cssnano({
      preset: 'default',
    }),
  ],
}
