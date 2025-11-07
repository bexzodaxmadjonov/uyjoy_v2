// "use client"
// import { useState, useMemo } from "react"
// import { useLanguage } from "@/hooks/use-language"
// import { Navbar } from "@/components/navbar"
// import { Footer } from "@/components/footer"
// import { almaty_homes, dubai_homes, getLocalizedListing } from "@/lib/listings"
// import { Search, MapPin, DollarSign, Home, Users, Bed, Bath, Maximize, SlidersHorizontal } from "lucide-react"
//
// export default function SearchPage() {
//   const { language, changeLanguage, mounted } = useLanguage()
//
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCity, setSelectedCity] = useState("all")
//   const [priceRange, setPriceRange] = useState({ min: "", max: "" })
//   const [bedrooms, setBedrooms] = useState("all")
//   const [propertyType, setPropertyType] = useState("all")
//   const [showFilters, setShowFilters] = useState(false)
//
//   // Combine all listings
//   const allListings = [...almaty_homes, ...dubai_homes]
//
//   // Translations
//   const translations = {
//     uz: {
//       title: "Uylarni qidirish",
//       subtitle: "O'zingizga mos uyni toping",
//       searchPlaceholder: "Qidirish (joy, narx, turi...)",
//       filters: "Filtrlar",
//       city: "Shahar",
//       allCities: "Barcha shaharlar",
//       priceRange: "Narx oralig'i",
//       minPrice: "Min narx",
//       maxPrice: "Max narx",
//       bedrooms: "Yotoq xonalar",
//       allBedrooms: "Hammasi",
//       propertyType: "Uy turi",
//       allTypes: "Barcha turlar",
//       apartment: "Kvartira",
//       house: "Uy",
//       villa: "Villa",
//       results: "natija topildi",
//       noResults: "Hech narsa topilmadi",
//       noResultsDesc: "Iltimos, boshqa qidiruv so'rovini yoki filtrlari sinab ko'ring",
//       perMonth: "/oyiga",
//       clearFilters: "Filtrlarni tozalash"
//     },
//     ru: {
//       title: "Поиск домов",
//       subtitle: "Найдите свой идеальный дом",
//       searchPlaceholder: "Поиск (место, цена, тип...)",
//       filters: "Фильтры",
//       city: "Город",
//       allCities: "Все города",
//       priceRange: "Диапазон цен",
//       minPrice: "Мин. цена",
//       maxPrice: "Макс. цена",
//       bedrooms: "Спальни",
//       allBedrooms: "Все",
//       propertyType: "Тип недвижимости",
//       allTypes: "Все типы",
//       apartment: "Квартира",
//       house: "Дом",
//       villa: "Вилла",
//       results: "результатов найдено",
//       noResults: "Ничего не найдено",
//       noResultsDesc: "Попробуйте изменить поисковый запрос или фильтры",
//       perMonth: "/месяц",
//       clearFilters: "Очистить фильтры"
//     },
//     en: {
//       title: "Search Homes",
//       subtitle: "Find your perfect home",
//       searchPlaceholder: "Search (location, price, type...)",
//       filters: "Filters",
//       city: "City",
//       allCities: "All cities",
//       priceRange: "Price Range",
//       minPrice: "Min price",
//       maxPrice: "Max price",
//       bedrooms: "Bedrooms",
//       allBedrooms: "All",
//       propertyType: "Property Type",
//       allTypes: "All types",
//       apartment: "Apartment",
//       house: "House",
//       villa: "Villa",
//       results: "results found",
//       noResults: "No results found",
//       noResultsDesc: "Try adjusting your search or filters",
//       perMonth: "/month",
//       clearFilters: "Clear filters"
//     }
//   }
//
//   const t = translations[language]
//
//   // Filter listings
//   const filteredListings = useMemo(() => {
//     return allListings.filter(listing => {
//       const localizedListing = getLocalizedListing(listing, language)
//
//       // Search query filter
//       if (searchQuery) {
//         const query = searchQuery.toLowerCase()
//         const searchableText = `${localizedListing.title} ${localizedListing.location} ${localizedListing.type}`.toLowerCase()
//         if (!searchableText.includes(query)) return false
//       }
//
//       // City filter
//       if (selectedCity !== "all" && listing.city !== selectedCity) return false
//
//       // Price range filter
//       if (priceRange.min && listing.price < parseInt(priceRange.min)) return false
//       if (priceRange.max && listing.price > parseInt(priceRange.max)) return false
//
//       // Bedrooms filter
//       if (bedrooms !== "all" && listing.bedrooms !== parseInt(bedrooms)) return false
//
//       // Property type filter
//       if (propertyType !== "all" && listing.type !== propertyType) return false
//
//       return true
//     }).map(listing => getLocalizedListing(listing, language))
//   }, [allListings, searchQuery, selectedCity, priceRange, bedrooms, propertyType, language])
//
//   // Clear all filters
//   const clearFilters = () => {
//     setSearchQuery("")
//     setSelectedCity("all")
//     setPriceRange({ min: "", max: "" })
//     setBedrooms("all")
//     setPropertyType("all")
//   }
//
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//
//       <main className={`flex-1 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-16">
//           <div className="container mx-auto max-w-7xl px-4 md:px-8">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
//             <p className="text-xl text-red-50">{t.subtitle}</p>
//           </div>
//         </div>
//
//         {/* Search and Filters */}
//         <div className="container mx-auto max-w-7xl px-4 md:px-8 -mt-8">
//           <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//             {/* Search Bar */}
//             <div className="flex flex-col md:flex-row gap-4 mb-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder={t.searchPlaceholder}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
//                 />
//               </div>
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all font-medium"
//               >
//                 <SlidersHorizontal className="h-5 w-5" />
//                 {t.filters}
//               </button>
//             </div>
//
//             {/* Filters Panel */}
//             {showFilters && (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
//                 {/* City Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <MapPin className="h-4 w-4 inline mr-1" />
//                     {t.city}
//                   </label>
//                   <select
//                     value={selectedCity}
//                     onChange={(e) => setSelectedCity(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   >
//                     <option value="all">{t.allCities}</option>
//                     <option value="almaty">Almaty</option>
//                     <option value="dubai">Dubai</option>
//                   </select>
//                 </div>
//
//                 {/* Bedrooms Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Bed className="h-4 w-4 inline mr-1" />
//                     {t.bedrooms}
//                   </label>
//                   <select
//                     value={bedrooms}
//                     onChange={(e) => setBedrooms(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   >
//                     <option value="all">{t.allBedrooms}</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4+</option>
//                   </select>
//                 </div>
//
//                 {/* Property Type Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <Home className="h-4 w-4 inline mr-1" />
//                     {t.propertyType}
//                   </label>
//                   <select
//                     value={propertyType}
//                     onChange={(e) => setPropertyType(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                   >
//                     <option value="all">{t.allTypes}</option>
//                     <option value="apartment">{t.apartment}</option>
//                     <option value="house">{t.house}</option>
//                     <option value="villa">{t.villa}</option>
//                   </select>
//                 </div>
//
//                 {/* Price Range */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <DollarSign className="h-4 w-4 inline mr-1" />
//                     {t.priceRange}
//                   </label>
//                   <div className="flex gap-2">
//                     <input
//                       type="number"
//                       placeholder={t.minPrice}
//                       value={priceRange.min}
//                       onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
//                       className="w-1/2 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
//                     />
//                     <input
//                       type="number"
//                       placeholder={t.maxPrice}
//                       value={priceRange.max}
//                       onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
//                       className="w-1/2 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//
//             {/* Results Count and Clear Button */}
//             <div className="flex items-center justify-between mt-4 pt-4 border-t">
//               <p className="text-gray-600">
//                 <span className="font-semibold text-gray-900">{filteredListings.length}</span> {t.results}
//               </p>
//               {(searchQuery || selectedCity !== "all" || priceRange.min || priceRange.max || bedrooms !== "all" || propertyType !== "all") && (
//                 <button
//                   onClick={clearFilters}
//                   className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
//                 >
//                   {t.clearFilters}
//                 </button>
//               )}
//             </div>
//           </div>
//
//           {/* Results Grid */}
//           {filteredListings.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
//               {filteredListings.map((listing) => (
//                 <div
//                   key={listing.id}
//                   className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
//                 >
//                   <div className="relative h-64 overflow-hidden">
//                     <img
//                       src={listing.image}
//                       alt={listing.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
//                       ${listing.price.toLocaleString()}{t.perMonth}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
//                       {listing.title}
//                     </h3>
//                     <p className="text-gray-600 flex items-center gap-2 mb-4">
//                       <MapPin className="h-4 w-4" />
//                       {listing.location}
//                     </p>
//                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                       <span className="flex items-center gap-1">
//                         <Bed className="h-4 w-4" />
//                         {listing.bedrooms}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Bath className="h-4 w-4" />
//                         {listing.bathrooms}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Maximize className="h-4 w-4" />
//                         {listing.area}m²
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.noResults}</h3>
//               <p className="text-gray-600 mb-6">{t.noResultsDesc}</p>
//               <button
//                 onClick={clearFilters}
//                 className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-medium"
//               >
//                 {t.clearFilters}
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//
//     </div>
//   )
// }

export default function Page() {
  return (
      <div>Search Page</div>
  )
}