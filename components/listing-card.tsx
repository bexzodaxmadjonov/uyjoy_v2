"use client"

import { Heart } from "lucide-react"
import { useState } from "react"

interface ListingCardProps {
  image: string
  title: string
  location: string
  rating: number
  reviews: number
  price: string
  priceLabel: string
  badge?: string
  badgeColor?: "amber" | "red" | "blue"
}

export function ListingCard({
  image,
  title,
  location,
  rating,
  reviews,
  price,
  priceLabel,
  badge,
  badgeColor = "amber",
}: ListingCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const badgeColors = {
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  }

  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg mb-3 aspect-square">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full rounded-2xl object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold ${badgeColors[badgeColor]}`}>
            {badge}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition"
        >
          <Heart className={`h-5 w-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </button>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">{title}</h3>
        <p className="text-gray-600 text-sm">{location}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-sm">
          <span className="font-semibold text-gray-900">★ {rating}</span>
          <span className="text-gray-600">({reviews})</span>
        </div>

        {/* Price */}
        <p className="mt-2">
          <span className="font-semibold text-gray-900">{price}</span>
          <span className="text-gray-600 text-sm"> {priceLabel}</span>
        </p>
      </div>
    </div>
  )
}
