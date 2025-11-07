"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Users, SlidersHorizontal, Home, CalendarDays } from "lucide-react"

type Language = "uz" | "ru" | "en"

interface HeroSectionProps {
  language: Language
}

export function HeroSection({ language }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<"long" | "short">("long")
  const [isSearching, setIsSearching] = useState(false)

  const translations = {
    uz: {
      longTerm: "Uzoq muddat",
      shortTerm: "Qisqa muddat",
      // Long-term fields
      location: "Joylashuv",
      locationPlaceholder: "Shahar yoki tumanni kiriting",
      moveInDate: "Kirish sanasi",
      moveInPlaceholder: "Sanani tanlang",
      // Short-term fields
      destination: "Manzil",
      destinationPlaceholder: "Qayerga bormoqchisiz?",
      checkIn: "Kirish",
      checkInPlaceholder: "Kirish sanasi",
      checkOut: "Chiqish",
      checkOutPlaceholder: "Chiqish sanasi",
      guests: "Mehmonlar",
      guestsPlaceholder: "Necha kishi?",
      // Common
      search: "Qidirish",
      searching: "Qidirilmoqda...",
      advancedFilters: "Kengaytirilgan filtrlar"
    },
    ru: {
      longTerm: "Долгосрочная",
      shortTerm: "Краткосрочная",
      // Long-term fields
      location: "Местоположение",
      locationPlaceholder: "Введите город или район",
      moveInDate: "Дата въезда",
      moveInPlaceholder: "Выберите дату",
      // Short-term fields
      destination: "Направление",
      destinationPlaceholder: "Куда вы едете?",
      checkIn: "Заезд",
      checkInPlaceholder: "Дата заезда",
      checkOut: "Выезд",
      checkOutPlaceholder: "Дата выезда",
      guests: "Гости",
      guestsPlaceholder: "Сколько человек?",
      // Common
      search: "Искать",
      searching: "Поиск...",
      advancedFilters: "Расширенные фильтры"
    },
    en: {
      longTerm: "Long-term",
      shortTerm: "Short-term",
      // Long-term fields
      location: "Location",
      locationPlaceholder: "Enter city or district",
      moveInDate: "Move-in date",
      moveInPlaceholder: "Select date",
      // Short-term fields
      destination: "Destination",
      destinationPlaceholder: "Where are you going?",
      checkIn: "Check-in",
      checkInPlaceholder: "Check-in date",
      checkOut: "Check-out",
      checkOutPlaceholder: "Check-out date",
      guests: "Guests",
      guestsPlaceholder: "How many?",
      // Common
      search: "Search",
      searching: "Searching...",
      advancedFilters: "Advanced filters"
    }
  }

  const t = translations[language]

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 2000)
  }

  return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-8 pb-12 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="container mx-auto max-w-2xl px-4 md:px-6 relative z-10">

          {/* Search Card */}
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">

            {/* Toggle Switch */}
            <div className="flex gap-2 mb-4">
              <button
                  onClick={() => setActiveTab("long")}
                  className={`flex-1 py-2 px-3 rounded-lg font-sans transition-all duration-300 flex items-center justify-center gap-1.5 text-sm ${
                      activeTab === "long"
                          ? "text-white shadow-md scale-[1.02]"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={activeTab === "long" ? { background: '#0057B8' } : {}}
              >
                <Home className="h-4 w-4" />
                {t.longTerm}
              </button>
              <button
                  onClick={() => setActiveTab("short")}
                  className={`flex-1 py-2 px-3 rounded-lg font-sans transition-all duration-300 flex items-center justify-center gap-1.5 text-sm ${
                      activeTab === "short"
                          ? "text-white shadow-md scale-[1.02]"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={activeTab === "short" ? { background: '#0057B8' } : {}}
              >
                <CalendarDays className="h-4 w-4" />
                {t.shortTerm}
              </button>
            </div>

            {/* Long-term Search Form */}
            {activeTab === "long" && (
                <div className="space-y-2.5">
                  <div className="flex flex-col md:flex-row gap-2.5">
                    {/* Location */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all group border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-sans text-gray-700">{t.location}</p>
                      </div>
                      <input
                          type="text"
                          placeholder={t.locationPlaceholder}
                          className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none font-sans text-base"
                      />
                    </div>

                    {/* Move-in Date */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all group border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-sans text-gray-700">{t.moveInDate}</p>
                      </div>
                      <input
                          type="date"
                          placeholder={t.moveInPlaceholder}
                          className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none font-sans text-base"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2.5">
                    <button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="flex-1 text-white rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 font-sans text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 hover:scale-[1.02] transform"
                        style={{ background: '#0057B8' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#004494'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#0057B8'}
                    >
                      {isSearching ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t.searching}
                          </>
                      ) : (
                          <>
                            <Search className="h-4 w-4" />
                            {t.search}
                          </>
                      )}
                    </button>

                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 font-sans text-sm transition-all hover:scale-[1.02] transform border border-gray-200">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span className="hidden sm:inline">{t.advancedFilters}</span>
                    </button>
                  </div>
                </div>
            )}

            {/* Short-term Search Form */}
            {activeTab === "short" && (
                <div className="space-y-2.5">
                  {/* Destination */}
                  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all group border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-sans text-gray-700">{t.destination}</p>
                    </div>
                    <input
                        type="text"
                        placeholder={t.destinationPlaceholder}
                        className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none font-sans text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {/* Check-in */}
                    <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all group border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-sans text-gray-700">{t.checkIn}</p>
                      </div>
                      <input
                          type="date"
                          placeholder={t.checkInPlaceholder}
                          className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none font-sans text-base"
                      />
                    </div>

                    {/* Check-out */}
                    <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all group border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-sans text-gray-700">{t.checkOut}</p>
                      </div>
                      <input
                          type="date"
                          placeholder={t.checkOutPlaceholder}
                          className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none font-sans text-base"
                      />
                    </div>

                    {/* Guests */}
                    <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all group border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <p className="text-sm font-sans text-gray-700">{t.guests}</p>
                      </div>
                      <input
                          type="number"
                          min="1"
                          placeholder={t.guestsPlaceholder}
                          className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none font-sans text-base"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2.5">
                    <button
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="flex-1 text-white rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 font-sans text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 hover:scale-[1.02] transform"
                        style={{ background: '#0057B8' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#004494'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#0057B8'}
                    >
                      {isSearching ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t.searching}
                          </>
                      ) : (
                          <>
                            <Search className="h-4 w-4" />
                            {t.search}
                          </>
                      )}
                    </button>

                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 font-sans text-sm transition-all hover:scale-[1.02] transform border border-gray-200">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span className="hidden sm:inline">{t.advancedFilters}</span>
                    </button>
                  </div>
                </div>
            )}

          </div>
        </div>
      </section>
  )
}
