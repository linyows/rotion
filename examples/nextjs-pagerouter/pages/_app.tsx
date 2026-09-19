import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'rotion/style.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rotion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  )
}
