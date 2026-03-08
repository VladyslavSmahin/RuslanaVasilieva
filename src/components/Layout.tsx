import type { ContentData } from '../data/types'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  data: ContentData
  children: React.ReactNode
}

export default function Layout({ data, children }: LayoutProps) {
  return (
    <>
      <Header siteName={data.meta.siteName} />
      <main className="main">{children}</main>
      <Footer meta={data.meta} />
    </>
  )
}
