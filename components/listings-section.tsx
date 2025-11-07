"use client"

import type { Language } from "@/lib/i18n"
import { ListingCard } from "@/components/listing-card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface ListingsSectionProps {
  language: Language
  title: string
  description?: string
  listings: Array<{
    id: string
    image: string
    title: string
    location: string
    rating: number
    reviews: number
    price: string
    priceLabel: string
    badge?: string
    badgeColor?: "amber" | "red" | "blue"
  }>
}

export function ListingsSection({ language, title, description, listings }: ListingsSectionProps) {
  return (
      <section className="py-2 overflow-auto scrollbar-hide listingsSection">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Link href="/search">
              <div className="flex items-center cursor-pointer">
                <h2 className="text-2xl md:text-xl font-bold text-gray-900">{title}</h2>
                <ChevronRight className="h-6 w-6 mt-1.5" />
              </div>
            </Link>
            <button className="text-gray-900 hover:text-gray-600 transition p-2">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
            {listings.map((listing) => (
                <Link
                    href={`/listings/${listing.id}`}
                    key={listing.id}
                    className="flex-shrink-0 w-50 snap-start"
                >
                  <ListingCard {...listing} />
                </Link>
            ))}
          </div>
        </div>
      </section>
  )
}
