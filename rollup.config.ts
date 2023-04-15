import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import pkg from './package.json' assert { type: 'json' }

export default {
  input: pkg.componentsSrc,
  output: {
    file: pkg.components,
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    resolve(),
    json(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      babelHelpers: 'bundled',
      babelrc: false,
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
      ]
    }),
    typescript({
      tsconfig: 'tsconfig.rollup.json',
    }),
  ],
  external: [
    /^react/,
    /^react-dom/,
  ]
}
