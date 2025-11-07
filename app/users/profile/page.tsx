"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"
import {
    User, Calendar, MapPin, Edit2, Camera,
    Home, Users, Star, LogOut, Briefcase
} from "lucide-react"

export default function TravelerProfilePage() {
    const { language, changeLanguage, mounted } = useLanguage()
    const [activeTab, setActiveTab] = useState("about")

    const translations = {
        uz: {
            profile: "Profil",
            aboutMe: "Haqimda",
            pastTrips: "Ijara tarixi",
            connections: "Aloqalar",
            completeProfile: "Profilni to‘ldiring",
            completeText:
                "Profilingiz sayohatlar va ijaralar uchun muhim. To‘liq ma'lumot kiritish orqali mehmonlar sizni yaxshiroq tanishadi.",
            getStarted: "Boshlash",
            reviews: "Men yozgan sharhlar",
            guest: "Mehmon",
            joined: "Qo‘shilgan sana",
            logout: "Chiqish",
            edit: "Tahrirlash",
        },
        ru: {
            profile: "Профиль",
            aboutMe: "Обо мне",
            pastTrips: "История аренды",
            connections: "Контакты",
            completeProfile: "Заполните профиль",
            completeText:
                "Ваш профиль важен для путешествий и аренды. Заполнив все данные, гости смогут лучше вас узнать.",
            getStarted: "Начать",
            reviews: "Мои отзывы",
            guest: "Гость",
            joined: "Дата регистрации",
            logout: "Выйти",
            edit: "Редактировать",
        },
        en: {
            profile: "Profile",
            aboutMe: "About Me",
            pastTrips: "Past Trips",
            connections: "Connections",
            completeProfile: "Complete your profile",
            completeText:
                "Your profile helps hosts and guests get to know you better. Fill it out to make every trip easier.",
            getStarted: "Get started",
            reviews: "Reviews I’ve written",
            guest: "Guest",
            joined: "Member since",
            logout: "Log Out",
            edit: "Edit",
        },
    }

    const t = translations[language] || translations.en

    const user = {
        name: "Bexzod",
        avatar: "/placeholder-user.jpg",
        joined: "March 2024",
    }

    const tabs = [
        { id: "about", label: t.aboutMe, icon: User },
        { id: "trips", label: t.pastTrips, icon: Briefcase },
        { id: "connections", label: t.connections, icon: Users },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main
                className={`flex-1 transition-opacity duration-300 ${
                    mounted ? "opacity-100" : "opacity-0"
                }`}
            >
                <div className="container mx-auto max-w-7xl px-4 md:px-8 py-8">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        {t.profile}
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-1/4 space-y-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 w-full text-left p-4 rounded-2xl font-medium transition-all ${
                                        activeTab === tab.id
                                            ? "bg-blue-50 text-[#0057B8]"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    <tab.icon
                                        className={`h-5 w-5 ${
                                            activeTab === tab.id ? "text-[#0057B8]" : "text-gray-400"
                                        }`}
                                    />
                                    {tab.label}
                                </button>
                            ))}

                            <button className="flex items-center gap-3 w-full text-left p-4 rounded-2xl text-red-600 hover:bg-red-50 transition-all font-medium">
                                <LogOut className="h-5 w-5" />
                                {t.logout}
                            </button>
                        </aside>

                        {/* Main Section */}
                        <section className="flex-1 bg-white rounded-3xl shadow-sm p-8">
                            {activeTab === "about" && (
                                <div>
                                    <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                                        <div className="relative group">
                                            <div className="w-32 h-32 rounded-full border-4 border-[#0057B8]/10 shadow-lg overflow-hidden bg-white">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button className="absolute bottom-0 right-0 bg-[#0057B8] text-white p-3 rounded-full shadow-md hover:scale-110 transition-transform">
                                                <Camera className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="text-center md:text-left flex-1">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                                {user.name}
                                            </h2>
                                            <p className="text-gray-500">{t.guest}</p>
                                            <p className="text-gray-400 text-sm mt-2">
                                                {t.joined}: {user.joined}
                                            </p>
                                        </div>

                                        <button className="bg-[#0057B8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md">
                                            <Edit2 className="h-5 w-5" />
                                            {t.edit}
                                        </button>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8">
                                        {/* About card */}
                                        <div className="bg-gray-50 rounded-2xl p-6 flex-1">
                                            <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                                {t.completeProfile}
                                            </h3>
                                            <p className="text-gray-600 mb-6">{t.completeText}</p>
                                            <button className="bg-[#0057B8] text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-medium">
                                                {t.getStarted}
                                            </button>
                                        </div>

                                        {/* Simple stats */}
                                        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                                            <Star className="h-10 w-10 text-[#0057B8] mb-3" />
                                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                                {t.reviews}
                                            </h4>
                                            <p className="text-gray-500">No reviews yet</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "trips" && (
                                <div className="text-center py-20">
                                    <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {t.pastTrips}
                                    </h3>
                                    <p className="text-gray-600">
                                        You haven’t taken any trips yet.
                                    </p>
                                </div>
                            )}

                            {activeTab === "connections" && (
                                <div className="text-center py-20">
                                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {t.connections}
                                    </h3>
                                    <p className="text-gray-600">
                                        No connections yet. Start your first trip to connect with
                                        others!
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>

        </div>
    )
}
