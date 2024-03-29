import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'rotion/style.css'
import styles from '@/styles/App.module.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Notionate</title>
      </Head>

      <div className={styles.content}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
