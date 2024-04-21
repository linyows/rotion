import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'

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
      typescript(),
      terser(),
    ],
    external: [
      'react',
      'react-dom',
      'prismjs',
      'mermaid',
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
    ],
  },
]
