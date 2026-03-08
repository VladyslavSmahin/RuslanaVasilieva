import { useTranslation } from 'react-i18next'
import type { ContentMeta } from '../data/types'
import styles from './Footer.module.css'

interface FooterProps {
  meta: ContentMeta
}

const SOCIAL_ICONS: Record<string, string> = {
  telegram: '✈',
  instagram: '📷',
  twitter: '🐦',
  facebook: 'f',
}

export default function Footer({ meta }: FooterProps) {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <section className={styles.contact}>
          <h3 className={styles.title}>{t('footer.contact')}</h3>
          <a href={`mailto:${meta.contacts.email}`}>{meta.contacts.email}</a>
        </section>
        <section className={styles.social}>
          <h3 className={styles.title}>{t('footer.follow')}</h3>
          <div className={styles.links}>
            {meta.contacts.social.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                {SOCIAL_ICONS[s.id] ?? s.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  )
}
