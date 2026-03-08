import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getLocalized } from '../utils/lang'
import { buildGalleryFromPosts } from '../data/buildGallery'
import type { ContentData } from '../data/types'
import PostCard from '../components/PostCard'
import GalleryBlock from '../components/GalleryBlock'
import styles from './Home.module.css'

interface HomeProps {
  data: ContentData
}

export default function Home({ data }: HomeProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const posts = [...data.posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.id !== featured?.id)
  const feedPosts = rest.slice(0, 3)
  const gridPosts = posts.slice(0, 6)
  const galleryFromPosts = useMemo(() => buildGalleryFromPosts(data.posts), [data.posts])

  return (
    <div className={styles.page}>
      {/* 1. Lenta poстов сверху */}
      <section className={styles.feed}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('home.morePosts')}</h2>
          <div className={styles.feedList}>
            {feedPosts.map((post) => (
              <PostCard key={post.id} post={post} variant="feed" />
            ))}
          </div>
          <div className={styles.allLink}>
            <Link to="/posts">{t('home.allPosts')}</Link>
          </div>
        </div>
      </section>

      {/* 2. Главный пост */}
      <section className={styles.featured}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('home.featured')}</h2>
          {featured && <PostCard post={featured} variant="featured" />}
        </div>
      </section>

      {/* 3. Обо мне */}
      <section className={styles.about}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('home.about')}</h2>
          <p className={styles.aboutText}>
            {getLocalized(data.meta.aboutMe, lang)}
          </p>
        </div>
      </section>

      {/* 4. Галерея блок */}
      <section className={styles.gallerySection}>
        <div className="container">
          <GalleryBlock items={galleryFromPosts} limit={6} lang={lang} />
        </div>
      </section>

      {/* 5. Сетка превью постов */}
      <section className={styles.gridSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('home.morePosts')}</h2>
          <div className={styles.postGrid}>
            {gridPosts.map((post) => (
              <PostCard key={post.id} post={post} variant="grid" />
            ))}
          </div>
          <div className={styles.allLink}>
            <Link to="/posts">{t('home.allPosts')}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
