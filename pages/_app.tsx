import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { GithubIcon } from '../src/components/page/icons'
import '../src/styles/notionate.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Notionate</title>
      </Head>
      <div className="header">
        <div className="home">
          <Link href="/">
            <a className="link">Notionate</a>
          </Link>
        </div>
        <div className="repo">
          <span className="github-icon">
            <GithubIcon />
          </span>
          <a className="link" href="https://github.com/linyows/notionate">GitHub</a>
        </div>
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
          display: grid;
          grid-template: 50% 1fr / 50% 1fr;
        }
        .home {
          font-weight: bold;
          letter-spacing: -0.5px;
        }
        .repo {
          text-align: right;
        }
        .link {
          color: #000;
          font-size: .8rem;
        }
        .github-icon {
          display: inline-block;
          margin-top: -1px;
          vertical-align: top;
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
