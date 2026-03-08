import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLocationLabel } from '../utils/lang'
import type { GalleryItemFromPost } from '../data/types'
import styles from './GalleryBlock.module.css'

interface GalleryBlockProps {
  items: GalleryItemFromPost[]
  limit?: number
  lang: string
}

export default function GalleryBlock({ items, limit = 6, lang }: GalleryBlockProps) {
  const { t } = useTranslation()
  const show = items.slice(0, limit)

  if (show.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{t('gallery.title')}</h2>
        <Link to="/gallery" className={styles.link}>{t('home.toGallery')}</Link>
      </div>
      <div className={styles.grid}>
        {show.map((item) => (
          <Link
            key={item.id}
            to={`/gallery?open=${item.id}`}
            className={styles.item}
          >
            <img src={item.src} alt="" loading="lazy" />
            <span className={styles.caption}>{getLocationLabel(item.location, lang)}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
