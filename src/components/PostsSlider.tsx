import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Post } from '../data/types'
import PostCard from './PostCard'
import styles from './PostsSlider.module.css'

interface PostsSliderProps {
  posts: Post[]
}

export default function PostsSlider({ posts }: PostsSliderProps) {
  const { t } = useTranslation()
  const [centralIndex, setCentralIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const dragRef = useRef({ isDragging: false, startX: 0, startScrollLeft: 0, didDrag: false })

  if (posts.length === 0) return null

  const onDocMouseMove = useRef((e: MouseEvent) => {
    if (!dragRef.current.isDragging) return
    const el = sliderRef.current
    if (!el) return
    const dx = dragRef.current.startX - e.clientX
    if (Math.abs(dx) > 3) dragRef.current.didDrag = true
    el.scrollLeft = dragRef.current.startScrollLeft + dx
  }).current

  const onDocMouseUp = useRef(() => {
    if (!dragRef.current.isDragging) return
    dragRef.current.isDragging = false
    document.removeEventListener('mousemove', onDocMouseMove)
    document.removeEventListener('mouseup', onDocMouseUp)
  }).current

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current
    if (!el) return
    e.preventDefault()
    dragRef.current = { isDragging: true, startX: e.clientX, startScrollLeft: el.scrollLeft, didDrag: false }
    document.addEventListener('mousemove', onDocMouseMove)
    document.addEventListener('mouseup', onDocMouseUp)
  }

  const handleWrapClick = (e: React.MouseEvent) => {
    if (dragRef.current.didDrag) {
      e.preventDefault()
      e.stopPropagation()
      dragRef.current.didDrag = false
    }
  }

  function getTrackMetrics() {
    const el = sliderRef.current
    if (!el || !posts.length) return null
    const track = el.querySelector('[data-slider-track]') as HTMLElement | null
    const firstSlide = el.querySelector('[data-slide]') as HTMLElement | null
    if (!track || !firstSlide) return null
    const style = getComputedStyle(track)
    const paddingLeft = parseFloat(style.paddingLeft) || 0
    const gap = parseFloat(style.gap) || 16
    const slideWidth = firstSlide.offsetWidth
    return { paddingLeft, gap, slideWidth, step: slideWidth + gap }
  }

  const goToSlide = (index: number) => {
    const i = Math.max(0, Math.min(index, posts.length - 1))
    const el = sliderRef.current
    if (!el || !posts.length) return
    const m = getTrackMetrics()
    let targetScroll: number
    if (m) {
      targetScroll = m.paddingLeft + i * m.step + m.slideWidth / 2 - el.clientWidth / 2
    } else {
      const step = el.scrollWidth / posts.length
      targetScroll = (i + 0.5) * step - el.clientWidth / 2
    }
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
    el.scrollTo({
      left: Math.max(0, Math.min(targetScroll, maxScroll)),
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    const el = sliderRef.current
    if (!el || !posts.length) return
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const viewportCenter = el.scrollLeft + el.clientWidth / 2
      const m = getTrackMetrics()
      let index: number
      if (m) {
        index = Math.round((viewportCenter - m.paddingLeft - m.slideWidth / 2) / m.step)
      } else {
        const step = el.scrollWidth / posts.length
        index = Math.round(viewportCenter / step - 0.5)
      }
      setCentralIndex(Math.min(posts.length - 1, Math.max(0, index)))
    })
  }

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', onDocMouseMove)
      document.removeEventListener('mouseup', onDocMouseUp)
    }
  }, [onDocMouseMove, onDocMouseUp])

  useEffect(() => {
    const el = sliderRef.current
    if (!el || !posts.length) return
    const onUpdate = () => {
      const viewportCenter = el.scrollLeft + el.clientWidth / 2
      const m = getTrackMetrics()
      if (m) {
        const index = Math.round((viewportCenter - m.paddingLeft - m.slideWidth / 2) / m.step)
        setCentralIndex(Math.min(posts.length - 1, Math.max(0, index)))
      }
    }
    const t = setTimeout(onUpdate, 0)
    window.addEventListener('resize', onUpdate)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onUpdate)
    }
  }, [posts.length])

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{t('home.morePosts')}</h2>
      </div>
      <div
        className={styles.sliderWrap}
        onMouseDown={handleMouseDown}
        onClickCapture={handleWrapClick}
      >
        <div
          ref={sliderRef}
          className={styles.slider}
          onScroll={handleScroll}
          role="region"
          aria-label={t('home.morePosts')}
        >
          <div className={styles.sliderTrack} data-slider-track>
          {posts.map((post, index) => (
            <div
              key={post.id}
              data-slide
              className={`${styles.slide} ${index === centralIndex ? styles.slideCentral : ''}`}
            >
              <PostCard post={post} variant="grid" />
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className="container">
        <div className={styles.nav}>
          <button
            type="button"
            className={styles.btn}
            onClick={() => goToSlide(centralIndex - 1)}
            disabled={centralIndex === 0}
            aria-label="Предыдущий"
          >
            ←
          </button>
          <div className={styles.dots}>
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                className={centralIndex === i ? styles.dotActive : styles.dot}
                onClick={() => goToSlide(i)}
                aria-label={`Пост ${i + 1}`}
                aria-current={centralIndex === i ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.btn}
            onClick={() => goToSlide(centralIndex + 1)}
            disabled={centralIndex === posts.length - 1}
            aria-label="Следующий"
          >
            →
          </button>
        </div>
        <div className={styles.allLink}>
          <Link to="/posts">{t('home.allPosts')}</Link>
        </div>
      </div>
    </section>
  )
}
