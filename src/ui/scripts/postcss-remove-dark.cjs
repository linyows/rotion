function removeDark() {
  return {
    postcssPlugin: 'remove-dark',
    Once(root) {
      root.walkAtRules('media', rule => {
        if (rule.params.includes('prefers-color-scheme')) {
          rule.remove()
        }
      })
    }
  }
}

removeDark.postcss = true

module.exports = removeDark
