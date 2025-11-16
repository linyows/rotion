import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import { plugin } from 'postcss'
import path from 'path'

// Remove Darkmode styles
const removeDark = plugin('remove-dark', () => {
  return (root) => {
    root.walkAtRules('media', rule => {
      if (rule.params.includes('prefers-color-scheme:')) {
        rule.remove()
      }
    })
  }
})

export default [
  {
    input: './src/ui/index.ts',
    output: [
      {
        intro: "'use client';",
        file: './dist/ui/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
        globals: { react: 'React', mermaid: 'mermaid', prismjs: 'Prism' },
      },
      {
        intro: "'use client';",
        file: './dist/ui/esm/index.js',
        format: 'esm',
        sourcemap: true,
        globals: { react: 'React', mermaid: 'mermaid', prismjs: 'Prism' },
      },
      {
        intro: "'use client';",
        file: './dist/ui/umd/index.js',
        format: 'umd',
        name: 'NotionateUI',
        sourcemap: true,
        globals: { react: 'React', mermaid: 'mermaid', prismjs: 'Prism' },
      },
    ],
    plugins: [
      del({ targets: './dist/ui/*' }),
      peerDepsExternal(),
      resolve(),
      json(),
      commonjs(),
      typescript({
        declaration: false,
        declarationDir: undefined,
      }),
      terser(),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
    external: [
      'react',
      'react-dom',
      'prismjs',
      'mermaid',
      'pdfjs-dist',
    ],
  },
  {
    input: './src/ui/index.ts',
    output: [{
      file: './dist/ui/types.d.ts',
      format: 'esm',
    }],
    plugins: [
      dts(),
      postcss({
        extract: path.resolve('dist/ui/style-without-dark.css'),
        minimize: true,
        plugins: [removeDark],
      }),
    ],
  },
]
