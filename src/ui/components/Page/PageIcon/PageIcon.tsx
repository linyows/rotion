import React from 'react'
import Stylex from '@stylexjs/stylex'

const style = Stylex.create({
  github: {
    fill: '#000',
  },
  file: {
    fill: 'inherit',
  }
})

export interface PageIconProps {
  name: 'figma' | 'slack' | 'github' | 'file' | 'link'
  width?: string
  height?: string
  className?: string
}

const PageIcon = ({ name, width, height, className }: PageIconProps) => {
  switch (name) {
    case 'figma':
      return (
        <svg className={`rotion-icons-figma ${className}`} version="1.0" xmlns="http://www.w3.org/2000/svg" width={width || '12px'} height={height || '18px'} viewBox="0 0 200 300">
          <path d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z" fill="#0acf83"/>
          <path d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" fill="#a259ff"/>
          <path d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z" fill="#f24e1e"/>
          <path d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" fill="#ff7262"/>
          <path d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z" fill="#1abcfe"/>
        </svg>
      )
    case 'slack':
      return (
        <svg className={`rotion-icons-slack ${className}`} version="1.0" xmlns="http://www.w3.org/2000/svg" width={width || '20px'} height={height || '20px'} viewBox="0 0 140 140">
          <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A"/>
          <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0"/>
          <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D"/>
          <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E"/>
        </svg>
      )
    case 'github':
      return (
        <svg className={`rotion-icons-github ${Stylex(style.github)} ${className}`} version="1.0" xmlns="http://www.w3.org/2000/svg" width={width || '20px'} height={height || '20px'} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)" stroke="none">
            <path d="M899 1910 c-314 -38 -586 -232 -720 -515 -63 -133 -80 -205 -86 -356 -6 -144 10 -245 57 -367 88 -226 287 -429 503 -512 110 -43 117 -38 117 88 l0 97 -98 0 c-89 0 -102 2 -138 26 -27 18 -49 46 -72 90 -37 74 -54 96 -99 127 -39 28 -42 49 -9 58 43 10 110 -28 155 -90 46 -61 71 -82 122 -96 45 -13 138 5 145 28 3 10 15 38 28 63 l22 46 -76 17 c-220 47 -330 188 -330 425 0 81 19 150 59 213 29 45 30 51 21 100 -10 52 -7 95 12 157 10 33 11 33 56 28 25 -3 82 -24 128 -47 l82 -42 59 13 c79 16 232 17 324 0 76 -13 76 -13 116 13 50 34 148 68 182 64 20 -2 28 -11 37 -43 15 -49 17 -135 4 -169 -8 -21 -4 -34 25 -76 45 -67 57 -116 57 -225 -2 -235 -118 -376 -344 -416 -64 -12 -67 -13 -52 -30 34 -38 43 -91 44 -256 0 -133 3 -164 16 -177 21 -22 25 -21 115 18 147 64 292 181 385 311 50 70 109 196 136 290 19 68 23 104 23 235 0 188 -13 248 -90 405 -92 185 -230 325 -411 415 -144 72 -349 108 -505 90z"/>
          </g>
        </svg>
      )
    case 'file':
      return (
        <svg className={`rotion-icons-file ${Stylex(style.file)} ${className}`} width={width || '20px'} height={height || '20px'} viewBox="0 0 16 16">
          <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM8.59473 12.7266V10.6279L8.54004 9.56152L9.06641 10.1152L9.59277 10.6484C9.68848 10.7646 9.8457 10.833 9.98926 10.833C10.2969 10.833 10.5293 10.6143 10.5293 10.3066C10.5293 10.1357 10.4678 10.0127 10.3379 9.90332L8.45117 8.16699C8.29395 8.02344 8.16406 7.96191 7.99316 7.96191C7.8291 7.96191 7.69922 8.02344 7.54199 8.16699L5.65527 9.90332C5.52539 10.0127 5.46387 10.1357 5.46387 10.3066C5.46387 10.6143 5.68945 10.833 6.00391 10.833C6.14746 10.833 6.29785 10.7646 6.40039 10.6484L6.92676 10.1152L7.45312 9.56152L7.39844 10.6279V12.7266C7.39844 13.0547 7.67188 13.3008 7.99316 13.3008C8.32129 13.3008 8.59473 13.0547 8.59473 12.7266Z">
          </path>
        </svg>
      )
    case 'link':
      return (
        <svg className={`rotion-icons-link ${className}`} version="1.0" xmlns="http://www.w3.org/2000/svg" width="13px" height="13px" viewBox="0 0 13 13" role="graphics-symbol">
          <path d="M6.30826 4.43292L1.76184 8.98454C1.76176 8.98462 1.76169 8.9847 1.76161 8.98477C1.76158 8.9848 1.76156 8.98482 1.76154 8.98484C1.46068 9.28584 1.25 9.6914 1.25 10.1565C1.25 10.6117 1.45865 11.0119 1.73417 11.2886C2.01014 11.5658 2.41107 11.7773 2.87078 11.7773C3.34169 11.7773 3.73758 11.5617 4.03477 11.2733L4.03482 11.2734L4.04244 11.2657L8.58864 6.72474V8.667C8.58864 9.51956 9.22729 10.2935 10.1521 10.2935C11.0528 10.2935 11.75 9.54534 11.75 8.66127V2.92671C11.75 2.48722 11.5981 2.06381 11.2838 1.74808C10.9689 1.43182 10.5446 1.27728 10.1006 1.27728H4.36028C3.46161 1.27728 2.72804 1.97749 2.72804 2.86942C2.72804 3.79734 3.51104 4.43292 4.35455 4.43292H6.30826Z" fill="#3E3C38" stroke="white" strokeWidth="1.5">
          </path>
        </svg>
      )
  }
}

export default PageIcon
