import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLocalized } from '../utils/lang'
import { excerptWords } from '../utils/text'
import type { Post } from '../data/types'
import styles from './PostCard.module.css'

interface PostCardProps {
  post: Post
  variant?: 'feed' | 'grid' | 'featured'
}

const EXCERPT_WORDS_FEED = 35
const EXCERPT_WORDS_GRID = 40
const EXCERPT_WORDS_FEATURED = 280

export default function PostCard({ post, variant = 'grid' }: PostCardProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const title = getLocalized(post.title, lang)
  const excerpt = getLocalized(post.excerpt, lang)
  const body = getLocalized(post.body, lang)
  const maxWords =
    variant === 'featured'
      ? EXCERPT_WORDS_FEATURED
      : variant === 'feed'
        ? EXCERPT_WORDS_FEED
        : EXCERPT_WORDS_GRID
  const text = variant === 'featured' ? excerptWords(body, maxWords) : excerptWords(excerpt || body, maxWords)
  const thumb = post.images?.[0]

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      {thumb && (variant === 'grid' || variant === 'feed') && (
        <Link to={`/posts/${post.id}`} className={styles.thumb}>
          <img src={thumb} alt="" loading="lazy" />
        </Link>
      )}
      <div className={styles.content}>
        <div className={styles.meta}>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : lang === 'de' ? 'de-DE' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          {post.location?.city && <span className={styles.location}>{post.location.city}</span>}
        </div>
        <h2 className={styles.title}>
          <Link to={`/posts/${post.id}`}>{title}</Link>
        </h2>
        <p className={styles.text}>{text}</p>
        {post.tags?.length > 0 && (
          <ul className={styles.tags}>
            {post.tags.slice(0, 4).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        <Link to={`/posts/${post.id}`} className={styles.readMore}>
          {variant === 'featured' ? '…' : ''} {t('readMore')} →
        </Link>
      </div>
    </article>
  )
}
