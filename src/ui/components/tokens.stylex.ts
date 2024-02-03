import Stylex from '@stylexjs/stylex'

export const fontFamily = Stylex.defineVars({
  sansserif: [
    'ui-sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Helvetica',
    '"Apple Color Emoji"',
    'Arial',
    'sans-serif',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
})

export const color = Stylex.defineVars({
  default: 'rgb(50, 48, 44)',
  bgDefault: 'rgba(227, 226, 224, 0.5)',
  gray: 'rgb(50, 48, 44)',
  bgGray: 'rgb(227, 226, 224)',
  brown: 'rgb(68, 42, 30)',
  bgBrown: 'rgb(238, 224, 218)',
  orange: 'rgb(73, 41, 14)',
  bgOrange: 'rgb(250, 222, 201)',
  yellow: 'rgb(64, 44, 27)',
  bgYellow: 'rgb(253, 236, 200)',
  green: 'rgb(28, 56, 41)',
  bgGreen: 'rgb(219, 237, 219)',
  blue: 'rgb(24, 51, 71)',
  bgBlue: 'rgb(211, 229, 239)',
  purple: 'rgb(65, 36, 84)',
  bgPurple: 'rgb(232, 222, 238)',
  pink: 'rgb(76, 35, 55)',
  bgPink: 'rgb(245, 224, 233)',
  red: 'rgb(93, 23, 21)',
  bgRed: 'rgb(255, 226, 221)',
})
