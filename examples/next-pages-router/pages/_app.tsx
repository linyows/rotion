import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { GithubIcon } from 'notionate-ui'
import 'notionate-ui/dist/styles/notionate.css'
import 'notionate-ui/dist/styles/notionate-dark.css'
import styles from '../styles/app.module.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Notionate</title>
      </Head>

      <div className={styles.header}>
        <div className={styles.home}>
          <Link className={styles.link} href="/">
            Notionate
          </Link>
        </div>
        <div className={styles.repo}>
          <a className={styles.link} href="https://github.com/linyows/notionate" target="_blank" rel="noreferrer">
            <GithubIcon />
            GitHub
          </a>
        </div>
      </div>

      <div className={styles.content}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
