"use client"

import type { Language } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLanguage: Language
  onLanguageChange: (lang: Language) => void
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const languages: Array<{ code: Language; name: string }> = [
    { code: "uz", name: "O'zbekcha" },
    { code: "ru", name: "Русский" },
    { code: "en", name: "English" },
  ]

  return (
    <select
      value={currentLanguage}
      onChange={(e) => onLanguageChange(e.target.value as Language)}
      className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 hover:border-gray-400 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  )
}
