import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'rotion/style.css'
import styles from '@/styles/App.module.css'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rotion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>

      <div className={styles.content}>
        <Component {...pageProps} />
      </div>

      <Footer />
    </>
  )
}
