import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const hasImages = post.images && post.images.length > 0

  return (
    <div className={styles.fullpage}>
      {/* Секция 1: заголовок */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
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
        </div>
      </section>

      {/* Секция 2: текст */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br />') }} />
        </div>
      </section>

      {/* Секции 3+: каждая картинка на весь экран */}
      {hasImages &&
        post.images!.map((src, i) => (
          <section key={i} className={styles.sectionImage}>
            <img src={src} alt="" />
          </section>
        ))}
    </div>
  )
}
