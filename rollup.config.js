import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import external from 'rollup-plugin-peer-deps-external'
import pkg from './package.json'
import babelrc from './src/.babelrc.rollup.js'

export default {
  input: pkg.componentsSrc,
  output: [
    { file: pkg.components, format: 'cjs', sourcemap: true, },
  ],
  plugins: [
    resolve(),
    external(),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
      babelrc: false,
      ...babelrc,
    }),
    typescript({
      tsconfig: './src/tsconfig.rollup.json',
      outputToFilesystem: true,
    }),
  ],
  external: Object.keys(pkg.peerDependencies || {}),
}
