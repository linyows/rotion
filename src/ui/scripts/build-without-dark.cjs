const postcss = require('postcss')
const fs = require('fs')
const config = require('../postcss.config.without-dark.cjs')

const css = fs.readFileSync('src/ui/index.css', 'utf8')

postcss(config.plugins)
  .process(css, { from: 'src/ui/index.css', to: 'dist/ui/index-without-dark.css' })
  .then(result => {
    fs.writeFileSync('dist/ui/index-without-dark.css', result.css)
    console.log('✓ Built index-without-dark.css')
    console.log('Size:', result.css.length, 'bytes')
  })
  .catch(error => {
    console.error('Error:', error)
    process.exit(1)
  })
