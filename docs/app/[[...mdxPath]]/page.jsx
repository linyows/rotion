import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { contentPathOf, localeOf } from '../_locale.js'
import { useMDXComponents as getMDXComponents } from '../../mdx-components.js'

const forEachLocale = generateStaticParamsFor('mdxPath')

export const generateStaticParams = async () =>
  (await forEachLocale()).map(({ lang, mdxPath }) => ({
    mdxPath: lang === 'ja' ? ['ja', ...mdxPath] : mdxPath
  }))

const page = async params =>
  importPage(contentPathOf(params.mdxPath), localeOf(params.mdxPath))

// Next.js applies a layout's title template to the segments below it, and the
// layout here is the one this page is in rather than one above it, so the site
// name is put on the end where the title is made.
export async function generateMetadata(props) {
  const { metadata } = await page(await props.params)
  const title = typeof metadata.title === 'string' ? metadata.title : null
  return { ...metadata, title: title ? `${title} | Rotion` : 'Rotion' }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
  const params = await props.params
  const { default: MDXContent, toc, metadata, sourceCode } = await page(params)
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
