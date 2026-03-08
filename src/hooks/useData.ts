import { useState, useEffect } from 'react'
import type { ContentData } from '../data/types'

const CONTENT_URL = '/data/content.json'

export function useData(): { data: ContentData | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(CONTENT_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load content')
        return res.json()
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
