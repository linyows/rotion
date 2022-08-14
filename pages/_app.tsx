import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { GithubIcon } from '../src/components/page/icons'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Notionate</title>
      </Head>
      <div className="header">
        <GithubIcon />
        <a className="link" href="https://github.com/linyows/notionate">Notionate</a>
      </div>
      <div className="content">
        <Component {...pageProps} />
      </div>
      <div className="footer">
        &copy; notionate
      </div>
      <style jsx>{`
        .header {
          padding: .5rem 1rem;
        }
        .link {
          color: #000;
          font-size: .8rem;
        }
        .content {
          margin: 0;
          padding: 0;
        }
        .footer {
          padding: 3rem 0 2rem;
          text-align: center;
        }
      `}</style>
    </>
  )
}

export default MyApp
