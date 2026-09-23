import {
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Noto_Sans_JP
} from 'next/font/google'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Logo } from '../_components/logo.jsx'
import { LocaleSwitch } from '../_components/locale-switch.jsx'
import { localeOf, unprefix } from '../_locale.js'
import 'nextra-theme-docs/style.css'
import 'rotion/style-without-dark.css'
import './styles.css'

const SITE = 'https://rotion.linyo.ws'

// A geometric sans to stand beside the roundel in the logo, a monospace for
// anything typed, and Noto Sans JP behind
// both for the kana and kanji neither of them carries.
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap'
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap'
})

const japanese = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jp',
  display: 'swap'
})

const DICTIONARY = {
  en: {
    description:
      'Rotion turns Notion pages and databases into a website with React.',
    editPage: 'Edit this page on GitHub',
    lastUpdated: 'Last updated on',
    backToTop: 'Scroll to top',
    light: 'Light',
    dark: 'Dark',
    system: 'System'
  },
  ja: {
    description:
      'Rotion は Notion のページとデータベースを React で Web サイトにします。',
    editPage: 'GitHub でこのページを編集',
    lastUpdated: '最終更新',
    backToTop: '先頭に戻る',
    light: 'ライト',
    dark: 'ダーク',
    system: 'システム'
  }
}

export async function generateMetadata({ params }) {
  const lang = localeOf((await params).mdxPath)
  return {
    title: 'Rotion',
    description: DICTIONARY[lang].description,
    metadataBase: new URL(SITE),
    icons: { icon: '/logo.svg' },
    openGraph: { siteName: 'Rotion', type: 'website' }
  }
}

const SINCE = 2023

const Copyright = () => {
  const now = new Date().getFullYear()
  return (
    <span>
      © {now > SINCE ? `${SINCE}-${now}` : SINCE}{' '}
      <a href="https://tomohisaoda.com/projects" target="_blank" rel="noreferrer">
        linyows
      </a>
    </span>
  )
}

export default async function RootLayout({ children, params }) {
  const lang = localeOf((await params).mdxPath)
  const dictionary = DICTIONARY[lang]
  const pageMap = await getPageMap(`/${lang}`)

  return (
    <html
      lang={lang}
      dir="ltr"
      className={`${sans.variable} ${mono.variable} ${japanese.variable}`}
      suppressHydrationWarning
    >
      {/* Cream with wine ink in the light, and a deep wine with cream ink in
          the dark. The primary is the wine itself on cream, and the yellow on
          the dark ground, where the wine would not read. */}
      <Head
        backgroundColor={{ light: '#f7efda', dark: '#2e1015' }}
        color={{
          hue: { light: 352, dark: 61 },
          saturation: { light: 46, dark: 87 },
          lightness: { light: 29, dark: 68 }
        }}
      />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<Logo className="rotion-logo" />}
              logoLink={lang === 'ja' ? '/ja' : '/'}
              projectLink="https://github.com/linyows/rotion"
            >
              <LocaleSwitch labels={{ en: 'English', ja: '日本語' }} />
            </Navbar>
          }
          footer={
            <Footer>
              <Copyright />
            </Footer>
          }
          docsRepositoryBase="https://github.com/linyows/rotion/blob/main/docs"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ backToTop: dictionary.backToTop }}
          editLink={dictionary.editPage}
          themeSwitch={{
            light: dictionary.light,
            dark: dictionary.dark,
            system: dictionary.system
          }}
          pageMap={lang === 'ja' ? pageMap : unprefix(pageMap)}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
