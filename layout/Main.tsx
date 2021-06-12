import Head from 'next/head'

export const DEFAULT_FURIGANA_PROPS = {
  opacity: 1,
  spacingUnit: 10
}

export default ({ children, title = 'This is the default title' }) => (
  <>
    <Head>
      <title>{ title }</title>
    </Head>
    
    <main>
      { children }
    </main>
  </>
)