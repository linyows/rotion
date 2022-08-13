/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  build: {
    extend(c, ctx) {
      c.node = {
        fs: 'empty'
      }
    }
  }
}
