import { useState, useEffect } from 'react'
import type { ContentData } from '../data/types'
import type { Post } from '../data/types'
import { imageManifest } from '../data/image-manifest.generated'

const CONTENT_URL = '/data/content.json'

function mergePostImages(post: Post): Post {
  const key = post.id.toLowerCase()
  const images = imageManifest[key] ?? post.images ?? []
  return { ...post, images }
}

export function useData(): { data: ContentData | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(CONTENT_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Failed to load content'))))
      .then((content: ContentData) => {
        const posts = content.posts.map((p) => mergePostImages(p))
        setData({ ...content, posts })
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
