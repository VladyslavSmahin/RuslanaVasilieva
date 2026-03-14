import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useRef } from 'react'
import { getLocalized, getLocationLabel } from '../utils/lang'
import type { ContentData } from '../data/types'
import styles from './PostPage.module.css'

interface PostPageProps {
  data: ContentData
}

export default function PostPage({ data }: PostPageProps) {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const post = data.posts.find((p) => p.id === slug)
  const [slideIndex, setSlideIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  if (!post) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
        <p>Пост не найден.</p>
        <Link to="/posts">{t('back')}</Link>
      </div>
    )
  }

  const title = getLocalized(post.title, lang)
  const body = getLocalized(post.body, lang)
  const images = post.images ?? []
  const hasImages = images.length > 0

  const goToSlide = (index: number) => {
    const i = Math.max(0, Math.min(index, images.length - 1))
    setSlideIndex(i)
    const el = sliderRef.current
    if (el) el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const el = sliderRef.current
    if (!el || !images.length) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    setSlideIndex(Math.min(index, images.length - 1))
  }

  return (
    <article className={styles.page}>
      <div className="container">
        <Link to="/posts" className={styles.back}>{t('back')}</Link>
        <time dateTime={post.date} className={styles.date}>
          {new Date(post.date).toLocaleDateString(
            lang === 'ru' ? 'ru-RU' : lang === 'de' ? 'de-DE' : 'en-GB',
            { year: 'numeric', month: 'long', day: 'numeric' }
          )}
        </time>
        {post.location && (
          <span className={styles.location}>{getLocationLabel(post.location, lang)}</span>
        )}
        <h1 className={styles.title}>{title}</h1>
{post.tags?.length > 0 && (
            <ul className={styles.tags}>
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
        )}

        {hasImages && (
          <section className={styles.sliderSection}>
            <div
              ref={sliderRef}
              className={styles.slider}
              onScroll={handleScroll}
              role="region"
              aria-label="Фото"
            >
              {images.map((src, i) => (
                <div key={i} className={styles.slide}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
            <div className={styles.sliderNav}>
              <button
                type="button"
                className={styles.sliderBtn}
                onClick={() => goToSlide(slideIndex - 1)}
                disabled={slideIndex === 0}
                aria-label="Предыдущее фото"
              >
                ←
              </button>
              <span className={styles.sliderDots}>
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={slideIndex === i ? styles.sliderDotActive : styles.sliderDot}
                    onClick={() => goToSlide(i)}
                    aria-label={`Фото ${i + 1}`}
                    aria-current={slideIndex === i ? 'true' : undefined}
                  />
                ))}
              </span>
              <button
                type="button"
                className={styles.sliderBtn}
                onClick={() => goToSlide(slideIndex + 1)}
                disabled={slideIndex === images.length - 1}
                aria-label="Следующее фото"
              >
                →
              </button>
            </div>
          </section>
        )}

        <div className={styles.body} dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br />') }} />
      </div>
    </article>
  )
}
