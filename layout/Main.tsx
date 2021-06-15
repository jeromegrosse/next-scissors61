import Head from 'next/head'

export const DEFAULT_FURIGANA_PROPS = {
  opacity: 1,
  spacingUnit: 10
}

const Main = ({ children, title = '' }) => (
  <>
    <Head>
      <title>Hudson River, two years ago. { title }</title>
    </Head>
    
    <main>
      { children }
    </main>
  </>
);

export default Main;