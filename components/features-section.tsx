"use client"

import { type Language, t } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Lock, TrendingUp, Zap } from "lucide-react"

interface FeaturesSectionProps {
  language: Language
}

const features = [
  { key: "verified", icon: CheckCircle2 },
  { key: "safe", icon: Lock },
  { key: "fair", icon: TrendingUp },
  { key: "easy", icon: Zap },
]

export function FeaturesSection({ language }: FeaturesSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "uz"
              ? "Nima TrueHome-ni boshqalardan farq qiladi"
              : language === "ru"
                ? "Что отличает TrueHome"
                : "Why TrueHome"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            const key = `features.${feature.key}`
            return (
              <Card key={feature.key} className="border-0 bg-background">
                <CardHeader>
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{t(`${key}.title`, language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{t(`${key}.description`, language)}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
