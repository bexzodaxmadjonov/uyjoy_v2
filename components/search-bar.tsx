"use client"

import type { Language } from "@/lib/i18n"
import { Search } from "lucide-react"

interface SearchBarProps {
  language: Language
}

export function SearchBar({ language }: SearchBarProps) {
  const placeholders = {
    uz: { where: "Qayerga?", when: "Qachon?", who: "Kim?" },
    ru: { where: "Куда?", when: "Когда?", who: "Кто?" },
    en: { where: "Where", when: "When", who: "Who" },
  }

  const labels = {
    uz: { where: "Qayerga", when: "Qachon", who: "Kim" },
    ru: { where: "Куда", when: "Когда", who: "Кто" },
    en: { where: "Where", when: "When", who: "Who" },
  }

  const p = placeholders[language]
  const l = labels[language]

  return (
    <div className="bg-white rounded-full shadow-lg p-2 flex items-center gap-2 max-w-4xl mx-auto">
      {/* Where */}
      <div className="flex-1 px-4 py-3 border-r border-gray-200">
        <p className="text-xs font-semibold text-gray-900">{l.where}</p>
        <input
          type="text"
          placeholder={p.where}
          className="w-full bg-transparent text-sm placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* When */}
      <div className="flex-1 px-4 py-3 border-r border-gray-200 hidden sm:block">
        <p className="text-xs font-semibold text-gray-900">{l.when}</p>
        <input
          type="text"
          placeholder={p.when}
          className="w-full bg-transparent text-sm placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Who */}
      <div className="flex-1 px-4 py-3 border-r border-gray-200 hidden md:block">
        <p className="text-xs font-semibold text-gray-900">{l.who}</p>
        <input
          type="text"
          placeholder={p.who}
          className="w-full bg-transparent text-sm placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Search Button */}
      <button className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 flex items-center justify-center transition flex-shrink-0">
        <Search className="h-5 w-5" />
      </button>
    </div>
  )
}
