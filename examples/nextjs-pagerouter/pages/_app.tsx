import type { AppProps } from 'next/app'
import 'rotion/style.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <head>
        <title>Rotion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  )
}
