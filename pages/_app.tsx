import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { GithubIcon } from '../src/components/page/icons'
import '../src/styles/notionate.css'
import '../src/styles/notionate-dark.css'
import styles from '../styles/app.module.css'

function MyApp ({ Component, pageProps }: AppProps) {
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

export default MyApp
