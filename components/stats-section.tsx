"use client"

import { type Language, t } from "@/lib/i18n"

interface StatsSectionProps {
  language: Language
}

const stats = [
  { key: "owners", value: "12.5K" },
  { key: "properties", value: "45K+" },
  { key: "chats", value: "50K+" },
  { key: "savedListings", value: "150K+" },
]

export function StatsSection({ language }: StatsSectionProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <p className="text-sm md:text-base text-muted-foreground">{t(`stats.${stat.key}`, language)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
