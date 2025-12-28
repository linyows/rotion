import postcssImport from 'postcss-import'
import cssnano from 'cssnano'

export default {
  plugins: [
    postcssImport,
    cssnano({
      preset: 'default',
    }),
  ],
}
