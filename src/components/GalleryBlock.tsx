import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { getLocationLabel } from '../utils/lang'
import type { GalleryItemFromPost } from '../data/types'
import styles from './GalleryBlock.module.css'

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

interface GalleryBlockProps {
  items: GalleryItemFromPost[]
  limit?: number
  lang: string
}

const ROTATE_MS = 5000
const ANIM_MS = 500
const PRELOAD_COUNT = 30

type Animating = { slot: number; oldItem: GalleryItemFromPost; newItem: GalleryItemFromPost }

function preloadImages(items: GalleryItemFromPost[], maxCount: number) {
  items.slice(0, maxCount).forEach((item) => {
    const img = new Image()
    img.src = item.src
  })
}

export default function GalleryBlock({ items, limit = 6, lang }: GalleryBlockProps) {
  const { t } = useTranslation()
  const [displayed, setDisplayed] = useState<GalleryItemFromPost[]>(() =>
    items.length === 0 ? [] : shuffle(items).slice(0, limit)
  )
  const [animating, setAnimating] = useState<Animating | null>(null)
  const slotRef = useRef(0)
  const displayedRef = useRef(displayed)

  displayedRef.current = displayed

  useEffect(() => {
    if (items.length === 0) return
    preloadImages(items, Math.min(items.length, PRELOAD_COUNT))
  }, [items])

  useEffect(() => {
    if (displayed.length === 0) return
    displayed.forEach((item) => {
      const img = new Image()
      img.src = item.src
    })
  }, [displayed])

  useEffect(() => {
    if (items.length === 0) return
    const id = setInterval(() => {
      const current = displayedRef.current
      const slot = slotRef.current % Math.max(1, limit)
      const oldItem = current[slot]
      const available = items.filter((it) => !current.some((d) => d.src === it.src))
      if (!oldItem || available.length === 0) {
        slotRef.current = (slotRef.current + 1) % Math.max(1, limit)
        return
      }
      const newItem = available[Math.floor(Math.random() * available.length)]
      slotRef.current = (slotRef.current + 1) % Math.max(1, limit)
      const img = new Image()
      img.src = newItem.src
      img.decode().then(
        () => setAnimating({ slot, oldItem, newItem }),
        () => setAnimating({ slot, oldItem, newItem })
      )
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [items, limit])

  useEffect(() => {
    if (!animating) return
    const id = setTimeout(() => {
      setDisplayed((prev) =>
        prev.map((item, i) => (i === animating.slot ? animating.newItem : item))
      )
      setAnimating(null)
    }, ANIM_MS)
    return () => clearTimeout(id)
  }, [animating])

  if (displayed.length === 0) return null

  const renderCell = (item: GalleryItemFromPost, index: number) => (
    <Link
      key={`${item.id}-${index}`}
      to={`/gallery?open=${item.id}`}
      className={styles.item}
    >
      <img src={item.src} alt="" loading="lazy" />
      <span className={styles.caption}>{getLocationLabel(item.location, lang)}</span>
    </Link>
  )

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.title}>{t('gallery.title')}</h2>
        <Link to="/gallery" className={styles.link}>{t('home.toGallery')}</Link>
      </div>
      <div className={styles.grid}>
        {displayed.map((item, index) =>
          animating && animating.slot === index ? (
            <div key={`anim-${index}`} className={styles.cell}>
              <div className={styles.cellTrack}>
                <Link
                  to={`/gallery?open=${animating.oldItem.id}`}
                  className={styles.slideOut}
                >
                  <img src={animating.oldItem.src} alt="" />
                  <span className={styles.caption}>
                    {getLocationLabel(animating.oldItem.location, lang)}
                  </span>
                </Link>
                <Link
                  to={`/gallery?open=${animating.newItem.id}`}
                  className={styles.slideIn}
                >
                  <img src={animating.newItem.src} alt="" />
                  <span className={styles.caption}>
                    {getLocationLabel(animating.newItem.location, lang)}
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            renderCell(item, index)
          )
        )}
      </div>
    </section>
  )
}
