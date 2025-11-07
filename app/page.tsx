"use client"
import { useLanguage } from "@/hooks/use-language"
import { HeroSection } from "@/components/hero-section"
import { ListingsSection } from "@/components/listings-section"
import { almaty_homes, dubai_homes, getLocalizedListing } from "@/lib/listings"

export default function Home() {
  const { language, mounted } = useLanguage()

  const titles = {
    uz: {
      longTerm: "Uzoq muddatli mashxur uylar",
      shortTerm: "Qisqa muddatli mashxur uylar",
    },
    ru: {
      longTerm: "Популярные дома для долгосрочной аренды",
      shortTerm: "Популярные дома для Краткосрочной аренды",
    },
    en: {
      longTerm: "Long-term popular homes",
      shortTerm: "Short-term popular homes",
    },
  }

  const t = titles[language]

  return (
      <main className={`transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection language={language} />
        <ListingsSection
            language={language}
            title={t.longTerm}
            listings={almaty_homes.map(listing => getLocalizedListing(listing, language))}
        />
        <ListingsSection
            language={language}
            title={t.shortTerm}
            listings={dubai_homes.map(listing => getLocalizedListing(listing, language))}
        />
      </main>
  )
}