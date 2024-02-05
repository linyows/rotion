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

const DARK = '@media (prefers-color-scheme: dark)'

interface Color {
  [index:string]: string
}

interface ColorWithMediaQuery {
  [index:string]: {
    default: string
    [index:string]: string
  }
}

const lightColor: Color = {
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
}

const darkColor: Color = {
  default: 'rgb(255, 255, 255, 0.804)',
  bgDefault: 'rgb(55, 55, 55)',
  gray: 'rgb(255, 255, 255, 0.804)',
  bgGray: 'rgb(90, 90, 90)',
  brown: 'rgba(255, 255, 255, 0.804)',
  bgBrown: 'rgb(96, 59, 44)',
  orage: 'rgba(255, 255, 255, 0.804)',
  bgOrage: 'rgb(133, 76, 29)',
  yellow: 'rgba(255, 255, 255, 0.804)',
  bgYellow: 'rgb(137, 99, 42)',
  green: 'rgba(255, 255, 255, 0.804)',
  bgGreen: 'rgb(43, 89, 63)',
  blue: 'rgba(255, 255, 255, 0.804)',
  bgBlue: 'rgb(40, 69, 108)',
  purple: 'rgba(255, 255, 255, 0.804)',
  bgPurple: 'rgb(73, 47, 100)',
  pink: 'rgba(255, 255, 255, 0.804)',
  bgPink: 'rgb(105, 49, 76)',
  red: 'rgba(255, 255, 255, 0.804)',
  bgRed: 'rgb(110, 54, 48)',
}

export const color = Stylex.defineVars(lightColor)

const lightAndDark: ColorWithMediaQuery = {}
for (const key in lightColor) {
  lightAndDark[key] = {
    default: lightColor[key],
    [DARK]: darkColor[key],
  }
}

export const withDarkColor = Stylex.defineVars(lightAndDark)
