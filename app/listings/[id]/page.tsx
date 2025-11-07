"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useLanguage } from "@/hooks/use-language"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Heart, Star, MapPin, Share } from "lucide-react"
import { Listing, getListingById, getLocalizedListing } from "@/lib/listings"

import translations from "@/i18n/translations.json";

export default function ListingDetailPage() {
  const { language, changeLanguage, mounted } = useLanguage()
  const params = useParams()
  const id = params.id as string

  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    // Fetch the listing data using the ID parameter
    const fetchListing = async () => {
      setLoading(true)
      try {
        // In a real application, you would fetch from an API
        // const response = await fetch(`/api/listings/${id}`)
        // const data = await response.json()

        // Get the listing data from our utility function
        const listingData = getListingById(id)

        // Localize the listing data
        const localizedListing = listingData ? getLocalizedListing(listingData, language) : null

        // Set the listing data
        setListing(localizedListing)
      } catch (error) {
        console.error("Error fetching listing:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchListing()
    }
  }, [id, language])

  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-1 flex items-center justify-center">
          <p>Listing not found</p>
        </main>
      </div>
    )
  }

  const t = translations[language].listingDetails;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Listing Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>

          {/* Listing Meta */}
          <div className="flex flex-wrap items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="ml-1 font-semibold">{listing.rating}</span>
                <span className="mx-1 text-gray-500">·</span>
                <span className="text-gray-500 underline">{listing.reviews} {t.reviews}</span>
              </div>
              <span className="text-gray-500">·</span>
              <div className="flex items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {listing.location}
              </div>
            </div>

            <div className="flex gap-3 mt-2 sm:mt-0">
              <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                <Share className="h-4 w-4" />
                <span>{t.share}</span>
              </button>
              <button 
                onClick={() => setIsFavorited(!isFavorited)}
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                <span>{t.save}</span>
              </button>
            </div>
          </div>

          {/* Listing Images */}
          <div className="rounded-xl overflow-hidden mb-8">
            <img 
              src={listing.image} 
              alt={listing.title} 
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Listing Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Host Info */}
              {listing.host && (
                <div className="flex justify-between items-center pb-6 border-b mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {t.hostedBy} {listing.host.name}
                    </h2>
                    <p className="text-gray-500">{t.joined} {listing.host.joinedDate}</p>
                  </div>
                  <img 
                    src={listing.host.image} 
                    alt={listing.host.name}
                    className="w-14 h-14 rounded-full object-cover" 
                  />
                </div>
              )}

              {/* Description */}
              <div className="pb-6 border-b mb-6">
                <h2 className="text-xl font-semibold mb-4">{t.aboutPlace}</h2>
                <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
              </div>

              {/* Amenities */}
              {listing.amenities && listing.amenities.length > 0 && (
                <div className="pb-6 border-b mb-6">
                  <h2 className="text-xl font-semibold mb-4">{t.whatOffers}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {listing.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                          {/* You can add specific icons for each amenity type */}
                          <span className="text-gray-600 text-sm">✓</span>
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 border rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xl font-bold">{listing.price}</span>
                    <span className="text-gray-500"> / {listing.nights} {t.nights}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="ml-1">{listing.rating}</span>
                    <span className="mx-1 text-gray-500">·</span>
                    <span className="text-gray-500">{listing.reviews} {t.reviews}</span>
                  </div>
                </div>

                {/* Date Picker would go here */}
                <div className="border rounded-lg mb-4">
                  <div className="grid grid-cols-2 divide-x">
                    <div className="p-3">
                      <p className="text-xs font-semibold">{t.checkIn}</p>
                      <p>{t.addDate}</p>
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold">{t.checkOut}</p>
                      <p>{t.addDate}</p>
                    </div>
                  </div>
                  <div className="border-t p-3">
                    <p className="text-xs font-semibold">{t.guests}</p>
                    <p>1 guest</p>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                  {t.reserve}
                </button>

                <div className="mt-4 text-center text-gray-500 text-sm">
                  {t.noCharge}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="underline">{listing.price} x 5 {t.nights}</span>
                    <span>${parseInt(listing.price.replace('$', '')) * 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">{t.cleaningFee}</span>
                    <span>$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">{t.serviceFee}</span>
                    <span>$85</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between font-semibold">
                    <span>{t.totalBeforeTaxes}</span>
                    <span>${parseInt(listing.price.replace('$', '')) * 5 + 50 + 85}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
