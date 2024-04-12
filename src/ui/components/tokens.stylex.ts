import Stylex from '@stylexjs/stylex'

// const DARK = '@media (prefers-color-scheme: dark)'

export const tokens = Stylex.defineVars({
  fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
  borderRadius: '4px',
  lineHeight: '1.5',
  borderColor: {
    default: 'rgba(220, 220, 220, 0.8)',
    '@media (prefers-color-scheme: dark)': 'rgba(80, 80, 80, 0.8)',
  },
  border: {
    default: '1px solid rgb(230, 230, 230)',
    '@media (prefers-color-scheme: dark)': '1px solid rgb(70, 70, 70)',
  },
  primaryText: {
    default: 'rgb(35, 45, 55)',
    '@media (prefers-color-scheme: dark)': 'rgb(230, 230, 230)',
  },
  secondaryText: {
    default: 'rgb(130, 140, 150)',
    '@media (prefers-color-scheme: dark)': 'rgb(130, 130, 130)',
  },
  thirdText: {
    default: 'rgb(160, 170, 180)',
    '@media (prefers-color-scheme: dark)': 'rgb(100, 100, 100)',
  },
  codeBgColor: {
    default: '#f5f2f0',
    '@media (prefers-color-scheme: dark)': '#2d2d2d',
  },
  tableHeaderBgColor: {
    default: 'rgba(150, 150, 150, 0.1)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.15)',
  },
})

export const table = Stylex.defineVars({
  border: {
    default: '1px solid rgba(55, 53, 47, 0.09)',
    '@media (prefers-color-scheme: dark)': '1px solid rgb(47, 47, 47)',
  },
  iconFill: {
    default: 'rgba(55, 53, 47, 0.45)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 253, 247, 0.45)',
  },
  boxShadow: {
    default: 'white -3px 0px 0px, rgb(233 233 231) 0px 1px 0px',
    '@media (prefers-color-scheme: dark)': 'rgb(25, 25, 25) -3px 0px 0px, rgb(47, 47, 47) 0px 1px 0px',
  },
  linkBgHover: {
    default: 'rgb(227, 226, 224) none repeat scroll 0% 0%',
    '@media (prefers-color-scheme: dark)': 'rgb(28, 29, 31) none repeat scroll 0% 0%',
  },
})

export const link = Stylex.defineVars({
  color: {
    default: 'rgb(50, 48, 44)',
    '@media (prefers-color-scheme: dark)': 'rgb(225, 223, 219)',
  },
  colorHover: {
    default: 'rgba(50, 48, 44, 0.6)',
    '@media (prefers-color-scheme: dark)': 'rgba(225, 223, 219, 0.6)',
  },
  borderBottom: {
    default: '1px solid rgba(50, 48, 44, 0.4)',
    '@media (prefers-color-scheme: dark)': '1px solid rgba(205, 203, 199, 0.4)',
  },
  borderBottomHover: {
    default: '1px solid rgba(50, 48, 44, 0.2)',
    '@media (prefers-color-scheme: dark)': '1px solid rgba(205, 203, 199, 0.2)',
  },
  bgColor: 'inherit',
  bgColorHover: {
    default: 'rgba(150, 150, 150, 0.1)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.15)',
  },
  textDecoration: 'none',
  cursor: 'pointer',
})

// used by Page/RichText/Annotation/Annotation.tsx
export const callout = Stylex.defineVars({
  border: {
    default: '1px solid rgba(50, 48, 44, 0.3)',
    '@media (prefers-color-scheme: dark)': '1px solid rgba(205, 203, 199, 0.3)',
  },
  default: {
    default: 'rgb(50, 48, 44)',
    '@media (prefers-color-scheme: dark)': 'rgb(235, 233, 228)',
  },
  bgDefault: {
    default: 'rgba(227, 226, 224, 0.5)',
    '@media (prefers-color-scheme: dark)': 'rgb(55, 55, 55)',
  },
  gray: {
    default: 'rgb(50, 48, 44)',
    '@media (prefers-color-scheme: dark)': 'rgb(155, 155, 155)',
  },
  bgGray: {
    default: 'rgb(155, 155, 155)',
    '@media (prefers-color-scheme: dark)': 'rgb(47, 47, 47)',
  },
  brown: {
    default: 'rgb(68, 42, 30)',
    '@media (prefers-color-scheme: dark)': 'rgb(186, 133, 111)',
  },
  bgBrown: {
    default: 'rgb(238, 224, 218)',
    '@media (prefers-color-scheme: dark)': 'rgb(74, 50, 40)',
  },
  orange: {
    default: 'rgb(73, 41, 14)',
    '@media (prefers-color-scheme: dark)': 'rgb(199, 125, 72)',
  },
  bgOrange: {
    default: 'rgb(250, 222, 201)',
    '@media (prefers-color-scheme: dark)': 'rgb(92, 59, 35)',
  },
  yellow: {
    default: 'rgb(64, 44, 27)',
    '@media (prefers-color-scheme: dark)': 'rgb(202, 152, 73)',
  },
  bgYellow: {
    default: 'rgb(253, 236, 200)',
    '@media (prefers-color-scheme: dark)': 'rgb(86, 67, 40)',
  },
  green: {
    default: 'rgb(28, 56, 41)',
    '@media (prefers-color-scheme: dark)': 'rgb(82, 158, 114)',
  },
  bgGreen: {
    default: 'rgb(219, 237, 219)',
    '@media (prefers-color-scheme: dark)': 'rgb(36, 61, 48)',
  },
  blue: {
    default: 'rgb(24, 51, 71)',
    '@media (prefers-color-scheme: dark)': 'rgb(94, 135, 201)',
  },
  bgBlue: {
    default: 'rgb(211, 229, 239)',
    '@media (prefers-color-scheme: dark)': 'rgb(20, 58, 78)',
  },
  purple: {
    default: 'rgb(65, 36, 84)',
    '@media (prefers-color-scheme: dark)': 'rgb(157, 104, 211)',
  },
  bgPurple: {
    default: 'rgb(232, 222, 238)',
    '@media (prefers-color-scheme: dark)': 'rgb(60, 45, 73)',
  },
  pink: {
    default: 'rgb(76, 35, 55)',
    '@media (prefers-color-scheme: dark)': 'rgb(209, 87, 150)',
  },
  bgPink: {
    default: 'rgb(245, 224, 233)',
    '@media (prefers-color-scheme: dark)': 'rgb(78, 44, 60)',
  },
  red: {
    default: 'rgb(93, 23, 21)',
    '@media (prefers-color-scheme: dark)': 'rgb(223, 84, 82)',
  },
  bgRed: {
    default: 'rgb(255, 226, 221)',
    '@media (prefers-color-scheme: dark)': 'rgb(82, 46, 42)',
  },
})

export const tag = Stylex.defineVars({
  // light gray
  default: {
    default: 'rgb(50, 48, 44)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  // background light gray
  bgDefault: {
    default: 'rgba(227, 226, 224, 0.5)',
    '@media (prefers-color-scheme: dark)': 'rgb(55, 55, 55)',
  },
  gray: {
    default: 'rgb(50, 48, 44)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  bgGray: {
    default: 'rgb(227, 226, 224)',
    '@media (prefers-color-scheme: dark)': 'rgb(90, 90, 90)',
  },
  brown: {
    default: 'rgb(68, 42, 30)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  bgBrown: {
    default: 'rgb(238, 224, 218)',
    '@media (prefers-color-scheme: dark)': 'rgb(96, 59, 44)',
  },
  orange: {
    default: 'rgb(73, 41, 14)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  bgOrange: {
    default: 'rgb(250, 222, 201)',
    '@media (prefers-color-scheme: dark)': 'rgb(133, 76, 29)',
  },
  yellow: {
    default: 'rgb(64, 44, 27)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  bgYellow: {
    default: 'rgb(253, 236, 200)',
    '@media (prefers-color-scheme: dark)': 'rgb(137, 99, 42)',
  },
  green: {
    default: 'rgb(28, 56, 41)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  bgGreen: {
    default: 'rgb(219, 237, 219)',
    '@media (prefers-color-scheme: dark)': 'rgb(43, 89, 63)',
  },
  blue: {
    default: 'rgb(24, 51, 71)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  bgBlue: {
    default: 'rgb(211, 229, 239)',
    '@media (prefers-color-scheme: dark)': 'rgb(40, 69, 108)',
  },
  purple: {
    default: 'rgb(65, 36, 84)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  bgPurple: {
    default: 'rgb(232, 222, 238)',
    '@media (prefers-color-scheme: dark)': 'rgb(73, 47, 100)',
  },
  pink: {
    default: 'rgb(76, 35, 55)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  bgPink: {
    default: 'rgb(245, 224, 233)',
    '@media (prefers-color-scheme: dark)': 'rgb(105, 49, 76)',
  },
  red: {
    default: 'rgb(93, 23, 21)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.804)',
  },
  bgRed: {
    default: 'rgb(255, 226, 221)',
    '@media (prefers-color-scheme: dark)': 'rgb(110, 54, 48)',
  },
})

export const gallery = Stylex.defineVars({
  boxShadow: {
    default: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px',
    '@media (prefers-color-scheme: dark)': 'rgba(15, 15, 15, 0.2) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 2px 4px',
  },
  background: {
    default: 'rgba(55, 53, 47, 0.005)',
    '@media (prefers-color-scheme: dark)': 'rgba(255, 255, 255, 0.1)',
  },
  backgroundHover: {
    default: 'rgba(55, 53, 47, 0.03)',
    '@media (prefers-color-scheme: dark)': 'rgb(47, 47, 47)',
  },
  imageBorderBottom: {
    default: '1px solid rgba(55, 53, 47, 0.1)',
    '@media (prefers-color-scheme: dark)': '1px solid rgba(255, 255, 255, 0.1)',
  },
  gridTemplateColumnsSmall: 'repeat(auto-fill, minmax(180px, 1fr))',
  gridTemplateColumnsMedium: 'repeat(auto-fill, minmax(260px, 1fr))',
  gridTemplateColumnsLarge: 'repeat(auto-fill, minmax(320px, 1fr))',
})
