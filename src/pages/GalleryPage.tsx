import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { useTranslation } from 'react-i18next'
import { getLocalized } from '../utils/lang'
import { buildGalleryFromPosts, groupGalleryByLocation } from '../data/buildGallery'
import type { ContentData } from '../data/types'
import styles from './GalleryPage.module.css'

interface GalleryPageProps {
  data: ContentData
}

export default function GalleryPage({ data }: GalleryPageProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [searchParams] = useSearchParams()
  const openId = searchParams.get('open')
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const gallery = useMemo(() => buildGalleryFromPosts(data.posts), [data.posts])
  const byLocation = useMemo(
    () => groupGalleryByLocation(gallery, lang),
    [gallery, lang]
  )

  const slides = useMemo(
    () =>
      gallery.map((item) => ({
        src: item.src,
        alt: getLocalized(item.alt, lang),
      })),
    [gallery, lang]
  )

  const openIndex = gallery.findIndex((g) => g.id === openId)

  useEffect(() => {
    if (openId && openIndex >= 0) {
      setLightboxIndex(openIndex)
      setLightboxOpen(true)
    }
  }, [openId, openIndex])

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{t('gallery.title')}</h1>
        <p className={styles.subtitle}>{t('gallery.byLocation')}</p>

        {Array.from(byLocation.entries()).map(([locationLabel, items]) => (
          <section key={locationLabel} className={styles.group}>
            <h2 className={styles.groupTitle}>{locationLabel}</h2>
            <div className={styles.grid}>
              {items.map((item) => {
                const globalIndex = gallery.findIndex((g) => g.id === item.id)
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
                    <img
                      src={item.src}
                      alt={getLocalized(item.alt, lang)}
                      loading="lazy"
                    />
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
