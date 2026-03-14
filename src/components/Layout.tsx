import type { ContentData } from '../data/types'
import Header from './Header'
import Footer from './Footer'
import styles from './Layout.module.css'

interface LayoutProps {
  data: ContentData
  children: React.ReactNode
}

export default function Layout({ data, children }: LayoutProps) {
  return (
    <>
      <Header siteName={data.meta.siteName} />
      <main className="main">
        <section className={styles.siteTitleSection} aria-label="Имя автора">
          <h1 className={styles.siteTitle}>Ruslana Vasilieva</h1>
        </section>
        {children}
      </main>
      <Footer meta={data.meta} />
    </>
  )
}
