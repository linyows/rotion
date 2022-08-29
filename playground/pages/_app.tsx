import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'notionate/dist/styles/notionate.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
