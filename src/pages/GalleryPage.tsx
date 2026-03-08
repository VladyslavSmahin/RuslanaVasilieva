import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useTranslation } from 'react-i18next'
import { getLocalized } from '../utils/lang'
import type { ContentData, GalleryItem } from '../data/types'
import styles from './GalleryPage.module.css'

interface GalleryPageProps {
  data: ContentData
}

function groupByLocation(items: GalleryItem[]): Map<string, GalleryItem[]> {
  const map = new Map<string, GalleryItem[]>()
  items.forEach((item) => {
    const key = `${item.location.country} — ${item.location.city}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  })
  return map
}

export default function GalleryPage({ data }: GalleryPageProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [searchParams] = useSearchParams()
  const openId = searchParams.get('open')
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const slides = data.gallery.map((item) => ({
    src: item.src,
    alt: getLocalized(item.alt, lang),
  }))

  const openIndex = data.gallery.findIndex((g) => g.id === openId)

  useEffect(() => {
    if (openId && openIndex >= 0) {
      setLightboxIndex(openIndex)
      setLightboxOpen(true)
    }
  }, [openId, openIndex])

  const byLocation = groupByLocation(data.gallery)

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{t('gallery.title')}</h1>
        <p className={styles.subtitle}>{t('gallery.byLocation')}</p>

        {Array.from(byLocation.entries()).map(([location, items]) => (
          <section key={location} className={styles.group}>
            <h2 className={styles.groupTitle}>{location}</h2>
            <div className={styles.grid}>
              {items.map((item) => {
                const globalIndex = data.gallery.findIndex((g) => g.id === item.id)
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.thumb}
                    onClick={() => {
                      setLightboxIndex(globalIndex)
                      setLightboxOpen(true)
                    }}
                  >
                    <img src={item.src} alt={getLocalized(item.alt, lang)} loading="lazy" />
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </div>
  )
}
