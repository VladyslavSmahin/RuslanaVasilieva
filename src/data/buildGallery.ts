import type { Post } from './types'
import type { GalleryItemFromPost } from './types'
import { getLocalized } from '../utils/lang'

/**
 * Собирает галерею из фото постов. Первоисточник — только посты.
 */
export function buildGalleryFromPosts(posts: Post[]): GalleryItemFromPost[] {
  const items: GalleryItemFromPost[] = []
  for (const post of posts) {
    if (!post.images?.length || !post.location) continue
    post.images.forEach((src, i) => {
      items.push({
        id: `${post.id}-${i}`,
        src,
        alt: post.title,
        location: post.location,
        postId: post.id,
      })
    })
  }
  return items
}

export function groupGalleryByLocation(
  items: GalleryItemFromPost[],
  lang: string
): Map<string, GalleryItemFromPost[]> {
  const map = new Map<string, GalleryItemFromPost[]>()
  items.forEach((item) => {
    const country = getLocalized(item.location.country, lang)
    const city = getLocalized(item.location.city, lang)
    const key = `${country} — ${city}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  })
  return map
}
