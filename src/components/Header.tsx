import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'
import { getLocalized } from '../utils/lang'
import type { Multilang } from '../data/types'
import styles from './Header.module.css'

interface HeaderProps {
  siteName: Multilang<string>
}

const LANGS = ['ru', 'en', 'de'] as const

export default function Header({ siteName }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const [theme, toggleTheme] = useTheme()
  const lang = i18n.language

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          {getLocalized(siteName, lang)}
        </Link>
        <nav className={styles.nav}>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/posts">{t('nav.posts')}</Link>
          <Link to="/gallery">{t('nav.gallery')}</Link>
        </nav>
        <div className={styles.controls}>
          <div className={styles.lang}>
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                className={lang.startsWith(l) ? styles.langActive : ''}
                onClick={() => i18n.changeLanguage(l)}
                aria-label={l.toUpperCase()}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t('theme.dark') : t('theme.light')}
            title={theme === 'light' ? t('theme.dark') : t('theme.light')}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  )
}
