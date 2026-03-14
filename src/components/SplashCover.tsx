import { useState, useEffect } from 'react'
import styles from './SplashCover.module.css'

const REFLECTION_DURATION_MS = 2000
const REFLECTION_DELAY_MS = 300
const PAUSE_AFTER_MS = 500
const FADEOUT_MS = 600

export default function SplashCover({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const totalBeforeFade = REFLECTION_DELAY_MS + REFLECTION_DURATION_MS + PAUSE_AFTER_MS
    const t = setTimeout(() => setFadeOut(true), totalBeforeFade)
    const t2 = setTimeout(() => onComplete(), totalBeforeFade + FADEOUT_MS)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
    }
  }, [onComplete])

  return (
    <div
      className={`${styles.cover} ${fadeOut ? styles.fadeOut : ''}`}
      aria-hidden="true"
    >
      <div className={styles.glass}>
        <h1 className={styles.name}>Ruslana Vasilieva</h1>
      </div>
    </div>
  )
}
