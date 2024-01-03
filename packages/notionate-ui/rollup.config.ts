import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import pkg from './package.json' assert { type: 'json' }

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        intro: "'use client';",
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        intro: "'use client';",
        file: pkg.module,
        format: 'esm',
        sourcemap: true
      },
      {
        intro: "'use client';",
        file: pkg.umd,
        format: 'umd',
        name: 'Notionate UI',
        sourcemap: true,
      },
    ],
    plugins: [
      del({ targets: 'dist/*' }),
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
    ],
  },
  {
    input: 'src/index.ts',
    output: [{
      file: 'dist/types.d.ts',
      format: 'esm'
    }],
    plugins: [
      dts()
    ],
  },
]
