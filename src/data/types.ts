export type Lang = 'ru' | 'en' | 'de'

export type Multilang<T extends string> = Record<Lang, T>

export type LocationMultilang = {
  city: Multilang<string>
  country: Multilang<string>
}

export interface Post {
  id: string
  type: 'article' | 'articleWithPhotos'
  title: Multilang<string>
  excerpt: Multilang<string>
  body: Multilang<string>
  /** URL фото: из манифеста (папка = id поста в public/images/) или из JSON. После загрузки всегда заполнено в приложении. */
  images?: string[]
  tags: string[]
  location: LocationMultilang
  date: string
  featured: boolean
}

/** Элемент галереи, собранный из постов (первоисточник — посты). */
export interface GalleryItemFromPost {
  id: string
  src: string
  alt: Multilang<string>
  location: LocationMultilang
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
}
