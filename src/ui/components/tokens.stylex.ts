import Stylex from '@stylexjs/stylex'

interface Color {
  [index:string]: string
}

interface ColorWithMediaQuery {
  [index:string]: {
    default: string
    [index:string]: string
  }
}

const DARK = '@media (prefers-color-scheme: dark)'

const sansSerifFamily = [
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
].join(',')

export const tokens = Stylex.defineVars({
  fontFamily: sansSerifFamily,
  borderRadius: '4px',
  lineHeight: '1.5',
  borderColor: {
    default: 'rgba(220, 220, 220, 0.8)',
    [DARK]: 'rgba(80, 80, 80, 0.8)',
  },
  border: {
    default: '1px solid rgb(230, 230, 230)',
    [DARK]: '1px solid rgb(70, 70, 70)',
  },
  primaryText: {
    default: 'rgb(35, 45, 55)',
    [DARK]: 'rgb(230, 230, 230)',
  },
  secondaryText: {
    default: 'rgb(130, 140, 150)',
    [DARK]: 'rgb(130, 130, 130)',
  },
  thirdText: {
    default: 'rgb(160, 170, 180)',
    [DARK]: 'rgb(100, 100, 100)',
  },
})

export const code = Stylex.defineVars({
  backgroundColor: {
    default: '#f5f2f0',
    [DARK]: '#2d2d2d',
  },
})

export const table = Stylex.defineVars({
  headerBackgroundColor: {
    default: 'rgba(150, 150, 150, 0.1)',
    [DARK]: 'rgba(255, 255, 255, 0.15)',
  },
  border: {
    default: '1px solid rgba(55, 53, 47, 0.09)',
    [DARK]: '1px solid rgb(47, 47, 47)',
  },
  iconFill: {
    default: 'rgba(55, 53, 47, 0.45)',
    [DARK]: 'rgba(255, 253, 247, 0.45)',
  },
  boxShadow: {
    default: 'white -3px 0px 0px, rgb(233 233 231) 0px 1px 0px',
    [DARK]: 'rgb(25, 25, 25) -3px 0px 0px, rgb(47, 47, 47) 0px 1px 0px',
  },
  linkBgHover: {
    default: 'rgb(227, 226, 224) none repeat scroll 0% 0%',
    [DARK]: 'rgb(28, 29, 31) none repeat scroll 0% 0%',
  },
})

export const link = Stylex.defineVars({
  color: {
    default: 'rgb(50, 48, 44)',
    [DARK]: 'rgb(225, 223, 219)',
  },
  colorHover: {
    default: 'rgba(50, 48, 44, 0.6)',
    [DARK]: 'rgba(225, 223, 219, 0.6)',
  },
  borderBottom: {
    default: '1px solid rgba(50, 48, 44, 0.4)',
    [DARK]: '1px solid rgba(205, 203, 199, 0.4)',
  },
  borderBottomHover: {
    default: '1px solid rgba(50, 48, 44, 0.2)',
    [DARK]: '1px solid rgba(205, 203, 199, 0.2)',
  },
  backgroundColor: 'inherit',
  backgroundColorHover: {
    default: 'rgba(150, 150, 150, 0.1)',
    [DARK]: 'rgba(255, 255, 255, 0.15)',
  },
  textDecoration: 'none',
  cursor: 'pointer',
})

export const colors = Stylex.defineVars({
  default: {
    default: 'rgb(50, 48, 44)',
    [DARK]: 'rgb(235, 233, 228)',
  },
  border: {
    default: '1px solid rgba(50, 48, 44, 0.3)',
    [DARK]: '1px solid rgba(205, 203, 199, 0.3)',
  },
  bgDefault: {
    default: 'rgba(227, 226, 224, 0.5)',
    [DARK]: 'rgb(55, 55, 55)',
  },
  gray: {
    default: 'rgb(50, 48, 44)',
    [DARK]: 'rgb(155, 155, 155)',
  },
  bgGray: {
    default: 'rgb(155, 155, 155)',
    [DARK]: 'rgb(47, 47, 47)',
  },
  brown: {
    default: 'rgb(68, 42, 30)',
    [DARK]: 'rgb(186, 133, 111)',
  },
  bgBrown: {
    default: 'rgb(238, 224, 218)',
    [DARK]: 'rgb(74, 50, 40)',
  },
  orange: {
    default: 'rgb(73, 41, 14)',
    [DARK]: 'rgb(199, 125, 72)',
  },
  bgOrange: {
    default: 'rgb(250, 222, 201)',
    [DARK]: 'rgb(92, 59, 35)',
  },
  yellow: {
    default: 'rgb(64, 44, 27)',
    [DARK]: 'rgb(202, 152, 73)',
  },
  bgYellow: {
    default: 'rgb(253, 236, 200)',
    [DARK]: 'rgb(86, 67, 40)',
  },
  green: {
    default: 'rgb(28, 56, 41)',
    [DARK]: 'rgb(82, 158, 114)',
  },
  bgGreen: {
    default: 'rgb(219, 237, 219)',
    [DARK]: 'rgb(36, 61, 48)',
  },
  blue: {
    default: 'rgb(24, 51, 71)',
    [DARK]: 'rgb(94, 135, 201)',
  },
  bgBlue: {
    default: 'rgb(211, 229, 239)',
    [DARK]: 'rgb(20, 58, 78)',
  },
  purple: {
    default: 'rgb(65, 36, 84)',
    [DARK]: 'rgb(157, 104, 211)',
  },
  bgPurple: {
    default: 'rgb(232, 222, 238)',
    [DARK]: 'rgb(60, 45, 73)',
  },
  pink: {
    default: 'rgb(76, 35, 55)',
    [DARK]: 'rgb(209, 87, 150)',
  },
  bgPink: {
    default: 'rgb(245, 224, 233)',
    [DARK]: 'rgb(78, 44, 60)',
  },
  red: {
    default: 'rgb(93, 23, 21)',
    [DARK]: 'rgb(223, 84, 82)',
  },
  bgRed: {
    default: 'rgb(255, 226, 221)',
    [DARK]: 'rgb(82, 46, 42)',
  },
})

export const gallery = Stylex.defineVars({
  boxShadow: {
    default: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px',
    [DARK]: 'rgba(15, 15, 15, 0.2) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 2px 4px',
  },
  background: {
    default: 'rgba(55, 53, 47, 0.005)',
    [DARK]: 'rgba(255, 255, 255, 0.1)',
  },
  backgroundHover: {
    default: 'rgba(55, 53, 47, 0.03)',
    [DARK]:  'rgb(47, 47, 47)',
  },
  imageBorderBottom: {
    default: '1px solid rgba(55, 53, 47, 0.1)',
    [DARK]: '1px solid rgba(255, 255, 255, 0.1)',
  },
  gridTemplateColumnsSmall: 'repeat(auto-fill, minmax(180px, 1fr))',
  gridTemplateColumnsMedium: 'repeat(auto-fill, minmax(260px, 1fr))',
  gridTemplateColumnsLarge: 'repeat(auto-fill, minmax(320px, 1fr))',
})
