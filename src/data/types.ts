export type Lang = 'ru' | 'en' | 'de'

export type Multilang<T extends string> = Record<Lang, T>

export interface Post {
  id: string
  type: 'article' | 'articleWithPhotos'
  title: Multilang<string>
  excerpt: Multilang<string>
  body: Multilang<string>
  images: string[]
  tags: string[]
  location: { city: string; country: string }
  date: string
  featured: boolean
}

export interface GalleryItem {
  id: string
  src: string
  alt: Multilang<string>
  location: { city: string; country: string }
  postId: string
}

export interface ContentMeta {
  siteName: Multilang<string>
  aboutMe: Multilang<string>
  contacts: {
    email: string
    social: { id: string; url: string; label: string }[]
  }
}

export interface ContentData {
  meta: ContentMeta
  posts: Post[]
  gallery: GalleryItem[]
}
