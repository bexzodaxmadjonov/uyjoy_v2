import translations from "@/i18n/translations.json"

export type Language = "uz" | "ru" | "en"

export const LANGUAGES: { code: Language; name: string }[] = [
  { code: "uz", name: "Oʻzbekcha" },
  { code: "ru", name: "Русский" },
  { code: "en", name: "English" },
]

export const DEFAULT_LANGUAGE: Language = "uz"

export const getTranslation = (key: string, lang: Language = DEFAULT_LANGUAGE): string => {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return typeof value === "string" ? value : key
}

export const t = (key: string, lang?: Language) => getTranslation(key, lang)
