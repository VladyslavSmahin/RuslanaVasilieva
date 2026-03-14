import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  ru: {
    translation: {
      nav: { home: 'Главная', posts: 'Посты', gallery: 'Галерея' },
      home: {
        featured: 'Главный пост',
        about: 'Обо мне',
        morePostsDescription: 'Недавние записи из поездок и впечатления.',
        viewAllPosts: 'Смотреть все посты',
        toGallery: 'В галерею',
      },
      posts: { search: 'Поиск...', filter: 'Фильтр', all: 'Все', noResults: 'Ничего не найдено' },
      gallery: { title: 'Галерея', byLocation: 'По местам' },
      footer: { contact: 'Контакты', follow: 'Подписаться' },
      theme: { light: 'Светлая тема', dark: 'Тёмная тема' },
      readMore: 'Читать далее',
      back: 'Назад',
    },
  },
  en: {
    translation: {
      nav: { home: 'Home', posts: 'Posts', gallery: 'Gallery' },
      home: {
        featured: 'Featured post',
        about: 'About me',
        morePostsDescription: 'Recent travel notes and impressions.',
        viewAllPosts: 'View all posts',
        toGallery: 'To gallery',
      },
      posts: { search: 'Search...', filter: 'Filter', all: 'All', noResults: 'No results' },
      gallery: { title: 'Gallery', byLocation: 'By location' },
      footer: { contact: 'Contact', follow: 'Follow' },
      theme: { light: 'Light theme', dark: 'Dark theme' },
      readMore: 'Read more',
      back: 'Back',
    },
  },
  de: {
    translation: {
      nav: { home: 'Start', posts: 'Beiträge', gallery: 'Galerie' },
      home: {
        featured: 'Hauptbeitrag',
        about: 'Über mich',
        morePostsDescription: 'Aktuelle Reiseeindrücke und Notizen.',
        viewAllPosts: 'Alle Beiträge ansehen',
        toGallery: 'Zur Galerie',
      },
      posts: { search: 'Suchen...', filter: 'Filter', all: 'Alle', noResults: 'Nichts gefunden' },
      gallery: { title: 'Galerie', byLocation: 'Nach Ort' },
      footer: { contact: 'Kontakt', follow: 'Folgen' },
      theme: { light: 'Hell', dark: 'Dunkel' },
      readMore: 'Weiterlesen',
      back: 'Zurück',
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'en', 'de'],
    interpolation: { escapeValue: false },
  })

export default i18n
