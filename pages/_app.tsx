import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
//import 'prismjs/themes/prism-tomorrow.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <div className="content">
        <Component {...pageProps} />
      </div>
      <style jsx>{`
        .content {
          padding: 10rem;
        }
      `}</style>
    </>
  )
}

export default MyApp
