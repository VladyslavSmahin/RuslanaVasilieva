import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getLocalized } from '../utils/lang'
import type { ContentData, Post } from '../data/types'
import PostCard from '../components/PostCard'
import styles from './PostsList.module.css'

interface PostsListProps {
  data: ContentData
}

function filterPosts(
  posts: Post[],
  lang: string,
  query: string,
  tagFilter: string,
  locationFilter: string
): Post[] {
  let out = [...posts]
  if (query.trim()) {
    const q = query.trim().toLowerCase()
    out = out.filter((p) => {
      const title = getLocalized(p.title, lang).toLowerCase()
      const body = getLocalized(p.body, lang).toLowerCase()
      const excerpt = getLocalized(p.excerpt, lang).toLowerCase()
      const tags = p.tags?.join(' ').toLowerCase() ?? ''
      const loc = [p.location?.city, p.location?.country].filter(Boolean).join(' ').toLowerCase()
      return [title, body, excerpt, tags, loc].some((s) => s.includes(q))
    })
  }
  if (tagFilter) {
    out = out.filter((p) => p.tags?.includes(tagFilter))
  }
  if (locationFilter) {
    out = out.filter(
      (p) =>
        p.location?.city === locationFilter ||
        p.location?.country === locationFilter
    )
  }
  return out
}

export default function PostsList({ data }: PostsListProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [query, setQuery] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')

  const allTags = useMemo(() => {
    const set = new Set<string>()
    data.posts.forEach((p) => p.tags?.forEach((t) => set.add(t)))
    return Array.from(set).sort()
  }, [data.posts])

  const allLocations = useMemo(() => {
    const set = new Set<string>()
    data.posts.forEach((p) => {
      if (p.location?.city) set.add(p.location.city)
      if (p.location?.country) set.add(p.location.country)
    })
    return Array.from(set).sort()
  }, [data.posts])

  const sorted = useMemo(
    () =>
      [...data.posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [data.posts]
  )

  const filtered = useMemo(
    () => filterPosts(sorted, lang, query, tagFilter, locationFilter),
    [sorted, lang, query, tagFilter, locationFilter]
  )

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>{t('nav.posts')}</h1>

        <div className={styles.toolbar}>
          <input
            type="search"
            placeholder={t('posts.search')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
            aria-label={t('posts.search')}
          />
          <div className={styles.filters}>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className={styles.select}
              aria-label={t('posts.filter')}
            >
              <option value="">{t('posts.all')} (теги)</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className={styles.select}
              aria-label="Location"
            >
              <option value="">{t('posts.all')} (места)</option>
              {allLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className={styles.noResults}>{t('posts.noResults')}</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
