"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"
import { useState } from "react"
import { 
  Building2, 
  Target, 
  Eye, 
  Users, 
  Shield, 
  Sparkles,
  ArrowRight,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Zap,
  CheckCircle2,
  Star,
  Rocket,
  Clock,
  MessageCircle
} from "lucide-react"

export default function AboutPage() {
    const { language, changeLanguage, mounted } = useLanguage()
    const [activeValue, setActiveValue] = useState(0)

    const translations = {
        uz: {
            title: "Biz haqimizda",
            subtitle: "Uy-joy bozorini inqilob qilish orqali hayotlarni o'zgartirmoqdamiz",
            description: "TrueHome - bu odamlarni bevosita uy egalari bilan bog'laydigan platforma. Biz maklerlarsiz, qo'shimcha to'lovsiz, shaffof va oson uy topish tajribasini taqdim etamiz.",
            missionTitle: "Bizning maqsadimiz",
            missionText: "Har bir odam o'z orzusidagi uyni topishi mumkin bo'lgan ochiq va adolatli bozor yaratish. Biz texnologiya orqali uy-joy bozorini demokratlashtirmoqdamiz.",
            visionTitle: "Bizning qarashimiz",
            visionText: "Markaziy Osiyo va Yevropada eng ishonchli va innovatsion uy-joy platformasiga aylanish. 2025 yilga qadar 50 shaharda faoliyat ko'rsatish.",
            valuesTitle: "Bizning qadriyatlarimiz",
            trust: "Ishonch va shaffoflik",
            trustDesc: "Har bir e'lon tekshiriladi. Yashirin to'lovlar yo'q. Faqat haqiqiy uy egalari.",
            innovation: "Innovatsiya",
            innovationDesc: "Sun'iy intellekt va zamonaviy texnologiyalar yordamida eng yaxshi tajribani taqdim etamiz.",
            community: "Jamiyat",
            communityDesc: "Biz faqat platforma emas - bu odamlar orzularini ro'yobga chiqaradigan jamiyat.",
            simplicity: "Soddalik",
            simplicityDesc: "Uy topish murakkab bo'lishi shart emas. Biz buni 3 bosqichda amalga oshiramiz.",
            speed: "Tezkorlik",
            speedDesc: "Darhol javoblar. Tez bitimlar. Vaqtingizni tejang.",
            support: "Qo'llab-quvvatlash",
            supportDesc: "24/7 professional yordam. Har bir qadamda yoningizda.",
            stats: {
                users: "Faol foydalanuvchilar",
                properties: "Tekshirilgan uylar",
                cities: "Shaharlar",
                satisfaction: "Mijozlar mamnunligi",
                reviews: "5 yulduzli sharhlar",
                deals: "Muvaffaqiyatli bitimlar",
                response: "O'rtacha javob vaqti",
                saved: "O'rtacha tejam"
            },
            cta: "Platformani boshlash",
            ctaSecondary: "Biz bilan bog'lanish",
            whyChooseUs: "Nima uchun TrueHome?",
            ourStory: "Bizning hikoyamiz",
            storyText: "2023 yilda biz oddiy savol bilan boshladik: 'Nima uchun uy topish bu qadar qiyin?' Maklerlarga ming dollarlab pul to'lash, yashirin to'lovlar, ishonchsiz e'lonlar... Biz buni o'zgartirishga qaror qildik.",
            storyText2: "Bugun TrueHome - 50,000+ odam o'z uylarini topgan platforma. Biz faqat texnologik kompaniya emas - biz hayotlarni o'zgartiruvchi missiyaga ega jamiyatmiz.",
            team: "Bizning jamoa",
            teamDesc: "Uy-joy, texnologiya va dizayn bo'yicha mutaxassislar jamoasi",
            joinUs: "Jamoaga qo'shiling"
        },
        ru: {
            title: "О нас",
            subtitle: "Меняем жизни, революционизируя рынок недвижимости",
            description: "TrueHome - это платформа, которая напрямую связывает людей с владельцами жилья. Мы предлагаем прозрачный и простой опыт поиска жилья без агентов и скрытых комиссий.",
            missionTitle: "Наша миссия",
            missionText: "Создать открытый и справедливый рынок, где каждый может найти дом своей мечты. Мы демократизируем рынок недвижимости через технологии.",
            visionTitle: "Наше видение",
            visionText: "Стать самой надежной и инновационной платформой недвижимости в Центральной Азии и Европе. Работать в 50 городах к 2025 году.",
            valuesTitle: "Наши ценности",
            trust: "Доверие и прозрачность",
            trustDesc: "Каждое объявление проверено. Никаких скрытых платежей. Только реальные владельцы.",
            innovation: "Инновации",
            innovationDesc: "Используем ИИ и современные технологии для лучшего опыта.",
            community: "Сообщество",
            communityDesc: "Мы не просто платформа - это сообщество, воплощающее мечты людей.",
            simplicity: "Простота",
            simplicityDesc: "Поиск жилья не должен быть сложным. Мы делаем это за 3 шага.",
            speed: "Скорость",
            speedDesc: "Мгновенные ответы. Быстрые сделки. Экономьте время.",
            support: "Поддержка",
            supportDesc: "Профессиональная помощь 24/7. Мы с вами на каждом шаге.",
            stats: {
                users: "Активные пользователи",
                properties: "Проверенные объекты",
                cities: "Города",
                satisfaction: "Удовлетворенность клиентов",
                reviews: "5-звездочные отзывы",
                deals: "Успешные сделки",
                response: "Среднее время ответа",
                saved: "Средняя экономия"
            },
            cta: "Начать сейчас",
            ctaSecondary: "Связаться с нами",
            whyChooseUs: "Почему TrueHome?",
            ourStory: "Наша история",
            storyText: "В 2023 году мы начали с простого вопроса: 'Почему поиск жилья так сложен?' Тысячи долларов агентам, скрытые комиссии, недостоверные объявления... Мы решили это изменить.",
            storyText2: "Сегодня TrueHome - платформа, где 50,000+ человек нашли свои дома. Мы не просто технологическая компания - мы сообщество с миссией изменить жизни.",
            team: "Наша команда",
            teamDesc: "Команда экспертов в недвижимости, технологиях и дизайне",
            joinUs: "Присоединиться к команде"
        },
        en: {
            title: "About Us",
            subtitle: "Transforming lives by revolutionizing the housing market",
            description: "TrueHome is a platform that directly connects people with property owners. We offer a transparent and simple home-finding experience without agents and hidden fees.",
            missionTitle: "Our Mission",
            missionText: "Create an open and fair marketplace where everyone can find their dream home. We're democratizing real estate through technology.",
            visionTitle: "Our Vision",
            visionText: "Become the most trusted and innovative housing platform in Central Asia and Europe. Operating in 50 cities by 2025.",
            valuesTitle: "Our Values",
            trust: "Trust & Transparency",
            trustDesc: "Every listing is verified. No hidden fees. Only real owners.",
            innovation: "Innovation",
            innovationDesc: "Using AI and modern tech to deliver the best experience.",
            community: "Community",
            communityDesc: "We're not just a platform - we're a community making dreams come true.",
            simplicity: "Simplicity",
            simplicityDesc: "Finding a home shouldn't be complex. We make it happen in 3 steps.",
            speed: "Speed",
            speedDesc: "Instant responses. Fast deals. Save your time.",
            support: "Support",
            supportDesc: "24/7 professional help. We're with you every step.",
            stats: {
                users: "Active Users",
                properties: "Verified Properties",
                cities: "Cities",
                satisfaction: "Client Satisfaction",
                reviews: "5-Star Reviews",
                deals: "Successful Deals",
                response: "Avg Response Time",
                saved: "Average Savings"
            },
            cta: "Get Started",
            ctaSecondary: "Contact Us",
            whyChooseUs: "Why TrueHome?",
            ourStory: "Our Story",
            storyText: "In 2023, we started with a simple question: 'Why is finding a home so difficult?' Thousands to agents, hidden fees, unreliable listings... We decided to change that.",
            storyText2: "Today, TrueHome is a platform where 50,000+ people found their homes. We're not just a tech company - we're a community on a mission to transform lives.",
            team: "Our Team",
            teamDesc: "A team of experts in real estate, technology, and design",
            joinUs: "Join the Team"
        }
    }

    const t = translations[language]

    const stats = [
        { value: "50K+", label: t.stats.users, icon: Users, color: "blue" },
        { value: "25K+", label: t.stats.properties, icon: Building2, color: "red" },
        { value: "15+", label: t.stats.cities, icon: Globe, color: "green" },
        { value: "98%", label: t.stats.satisfaction, icon: Star, color: "yellow" },
        { value: "12K+", label: t.stats.reviews, icon: MessageCircle, color: "purple" },
        { value: "8K+", label: t.stats.deals, icon: Award, color: "pink" },
        { value: "< 2h", label: t.stats.response, icon: Clock, color: "indigo" },
        { value: "$2.5K", label: t.stats.saved, icon: TrendingUp, color: "emerald" }
    ]

    const values = [
        { icon: Shield, title: t.trust, description: t.trustDesc, color: "blue" },
        { icon: Sparkles, title: t.innovation, description: t.innovationDesc, color: "purple" },
        { icon: Heart, title: t.community, description: t.communityDesc, color: "red" },
        { icon: Zap, title: t.simplicity, description: t.simplicityDesc, color: "yellow" },
        { icon: Rocket, title: t.speed, description: t.speedDesc, color: "green" },
        { icon: MessageCircle, title: t.support, description: t.supportDesc, color: "pink" }
    ]

    const features = [
        { icon: CheckCircle2, text: language === "uz" ? "Bepul ro'yxatdan o'tish" : language === "ru" ? "Бесплатная регистрация" : "Free registration" },
        { icon: CheckCircle2, text: language === "uz" ? "Tekshirilgan uy egalari" : language === "ru" ? "Проверенные владельцы" : "Verified owners" },
        { icon: CheckCircle2, text: language === "uz" ? "Yashirin to'lovlar yo'q" : language === "ru" ? "Без скрытых комиссий" : "No hidden fees" },
        { icon: CheckCircle2, text: language === "uz" ? "24/7 yordam" : language === "ru" ? "Поддержка 24/7" : "24/7 support" },
        { icon: CheckCircle2, text: language === "uz" ? "Mobil ilova" : language === "ru" ? "Мобильное приложение" : "Mobile app" },
        { icon: CheckCircle2, text: language === "uz" ? "Virtual ko'rishlar" : language === "ru" ? "Виртуальные просмотры" : "Virtual tours" }
    ]

    const colorMap: Record<string, string> = {
        blue: "from-blue-500 to-blue-600",
        red: "from-red-500 to-red-600",
        green: "from-green-500 to-green-600",
        yellow: "from-yellow-500 to-yellow-600",
        purple: "from-purple-500 to-purple-600",
        pink: "from-pink-500 to-pink-600",
        indigo: "from-indigo-500 to-indigo-600",
        emerald: "from-emerald-500 to-emerald-600"
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">

            <main className={`flex-1 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-red-500 via-red-600 to-pink-600 text-white py-20 md:py-32 overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                                <Sparkles className="h-5 w-5" />
                                <span className="text-sm font-medium">TrueHome Platform</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                {t.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-red-100 mb-8 leading-relaxed">
                                {t.subtitle}
                            </p>
                            <p className="text-lg text-red-50 mb-12 max-w-3xl mx-auto">
                                {t.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center justify-center gap-2">
                                    {t.cta}
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                                <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                    {t.ctaSecondary}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto max-w-7xl px-4 md:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${colorMap[stat.color]} rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <stat.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-20">
                    <div className="container mx-auto max-w-7xl px-4 md:px-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-blue-500 rounded-2xl">
                                        <Target className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        {t.missionTitle}
                                    </h2>
                                </div>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {t.missionText}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 md:p-12 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-green-500 rounded-2xl">
                                        <Eye className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        {t.visionTitle}
                                    </h2>
                                </div>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    {t.visionText}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto max-w-5xl px-4 md:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.ourStory}</h2>
                        </div>
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                {t.storyText}
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {t.storyText2}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20">
                    <div className="container mx-auto max-w-7xl px-4 md:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.valuesTitle}</h2>
                            <p className="text-xl text-gray-600">{t.whyChooseUs}</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                                        activeValue === index ? 'ring-2 ring-red-500' : ''
                                    }`}
                                    onMouseEnter={() => setActiveValue(index)}
                                >
                                    <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[value.color]} rounded-2xl flex items-center justify-center mb-6`}>
                                        <value.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Checklist */}
                <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
                    <div className="container mx-auto max-w-5xl px-4 md:px-8">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.whyChooseUs}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors">
                                        <feature.icon className="h-6 w-6 text-red-600 flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600 text-white">
                    <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {language === "uz" ? "Bugun boshlang" : language === "ru" ? "Начните сегодня" : "Start Today"}
                        </h2>
                        <p className="text-xl text-red-100 mb-10">
                            {language === "uz" ? "50,000+ odam bizga ishondi. Endi sizning navbatingiz." : 
                             language === "ru" ? "50,000+ человек доверились нам. Теперь ваша очередь." : 
                             "50,000+ people trusted us. Now it's your turn."}
                        </p>
                        <button className="bg-white text-red-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-red-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 transform">
                            {t.cta}
                        </button>
                    </div>
                </section>
            </main>

        </div>
    )
}