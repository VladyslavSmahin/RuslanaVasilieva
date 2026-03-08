import type { Lang, LocationMultilang } from '../data/types'

export function normalizeLang(lang: string): Lang {
  const l = lang.slice(0, 2).toLowerCase()
  if (l === 'en' || l === 'de') return l
  return 'ru'
}

export function getLocalized(obj: Record<Lang, string>, lang: string): string {
  const key = normalizeLang(lang)
  return obj[key] ?? obj.ru
}

export function getLocationLabel(location: LocationMultilang, lang: string): string {
  const country = getLocalized(location.country, lang)
  const city = getLocalized(location.city, lang)
  return `${country} — ${city}`
}
