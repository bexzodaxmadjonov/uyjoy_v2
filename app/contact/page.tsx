"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"
import { useState } from "react"
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock,
    Send,
    MessageCircle,
    CheckCircle2,
    Star,
    Headphones,
    Zap,
    Shield,
    Globe,
    Users,
    ThumbsUp,
    TrendingUp,
    Award,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    MessageSquare
} from "lucide-react"

export default function ContactPage() {
    const { language, changeLanguage, mounted } = useLanguage()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "general",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const translations = {
        uz: {
            title: "Biz bilan bog'laning",
            subtitle: "24/7 professional yordam. Har qanday savolingiz bo'lsa, biz yordamga tayyormiz.",
            description: "50,000+ mijozlar bizga ishondi. Endi sizning navbatingiz.",
            formTitle: "Xabar yuborish",
            name: "To'liq ism",
            email: "Email manzil",
            phone: "Telefon raqam",
            subject: "Mavzu",
            category: "Kategoriya",
            message: "Sizning xabaringiz",
            send: "Xabarni yuborish",
            sending: "Yuborilmoqda...",
            success: "Ajoyib! Xabaringiz yuborildi",
            successDesc: "Jamoamiz 2 soat ichida siz bilan bog'lanadi. Tez orada ko'rishguncha!",
            contactInfo: "Aloqa ma'lumotlari",
            visitUs: "Bizni tashrif buyuring",
            officeHours: "Ish vaqti",
            quickResponse: "Tezkor javob",
            support: "Qo'llab-quvvatlash",
            address: "Toshkent, Yunusobod tumani, Amir Temur ko'chasi 129",
            hours: "Dush-Juma: 09:00 - 18:00, Shanba: 10:00 - 15:00",
            phoneNum: "+998 90 123 45 67",
            emailAddr: "info@truehome.uz",
            getDirections: "Yo'nalish olish",
            connectWithUs: "Biz bilan bog'laning",
            liveChat: "Jonli chat",
            emergency: "Favqulodda yordam 24/7",
            whyContactUs: "Nima uchun bizga murojaat qilish kerak?",
            fastResponse: "Tezkor javob",
            fastResponseDesc: "O'rtacha 2 soatda javob beramiz",
            expertTeam: "Mutaxassis jamoa",
            expertTeamDesc: "10+ yillik tajribaga ega",
            available247: "24/7 mavjud",
            available247Desc: "Doimo sizning xizmatingizdamiz",
            satisfaction: "100% qoniqish",
            satisfactionDesc: "Yoki pulni qaytaramiz",
            categories: {
                general: "Umumiy savol",
                property: "Mulk haqida",
                technical: "Texnik yordam",
                partnership: "Hamkorlik",
                other: "Boshqa"
            },
            stats: {
                response: "O'rtacha javob vaqti",
                satisfied: "Qoniqarli mijozlar",
                messages: "Oylik xabarlar",
                rating: "Mijoz reytingi"
            },
            socialTitle: "Ijtimoiy tarmoqlarda kuzating",
            newMessage: "Boshqa xabar yuborish"
        },
        ru: {
            title: "Свяжитесь с нами",
            subtitle: "Профессиональная помощь 24/7. Мы готовы помочь с любым вопросом.",
            description: "50,000+ клиентов доверились нам. Теперь ваша очередь.",
            formTitle: "Отправить сообщение",
            name: "Полное имя",
            email: "Email адрес",
            phone: "Номер телефона",
            subject: "Тема",
            category: "Категория",
            message: "Ваше сообщение",
            send: "Отправить сообщение",
            sending: "Отправка...",
            success: "Отлично! Сообщение отправлено",
            successDesc: "Наша команда свяжется с вами в течение 2 часов. До скорой встречи!",
            contactInfo: "Контактная информация",
            visitUs: "Посетите нас",
            officeHours: "Часы работы",
            quickResponse: "Быстрый ответ",
            support: "Поддержка",
            address: "Ташкент, Юнусабадский район, ул. Амира Темура 129",
            hours: "Пн-Пт: 09:00 - 18:00, Сб: 10:00 - 15:00",
            phoneNum: "+998 90 123 45 67",
            emailAddr: "info@truehome.uz",
            getDirections: "Проложить маршрут",
            connectWithUs: "Свяжитесь с нами",
            liveChat: "Онлайн-чат",
            emergency: "Экстренная помощь 24/7",
            whyContactUs: "Почему стоит обратиться к нам?",
            fastResponse: "Быстрый ответ",
            fastResponseDesc: "Отвечаем в среднем за 2 часа",
            expertTeam: "Команда экспертов",
            expertTeamDesc: "Более 10 лет опыта",
            available247: "Доступны 24/7",
            available247Desc: "Всегда к вашим услугам",
            satisfaction: "100% удовлетворение",
            satisfactionDesc: "Или вернем деньги",
            categories: {
                general: "Общий вопрос",
                property: "О недвижимости",
                technical: "Техподдержка",
                partnership: "Партнерство",
                other: "Другое"
            },
            stats: {
                response: "Среднее время ответа",
                satisfied: "Довольных клиентов",
                messages: "Сообщений в месяц",
                rating: "Рейтинг клиентов"
            },
            socialTitle: "Следите в соцсетях",
            newMessage: "Отправить новое сообщение"
        },
        en: {
            title: "Get in Touch",
            subtitle: "24/7 professional support. We're ready to help with any question.",
            description: "50,000+ clients trusted us. Now it's your turn.",
            formTitle: "Send a Message",
            name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            subject: "Subject",
            category: "Category",
            message: "Your Message",
            send: "Send Message",
            sending: "Sending...",
            success: "Awesome! Message Sent",
            successDesc: "Our team will contact you within 2 hours. See you soon!",
            contactInfo: "Contact Information",
            visitUs: "Visit Us",
            officeHours: "Office Hours",
            quickResponse: "Quick Response",
            support: "Support",
            address: "Tashkent, Yunusabad District, Amir Temur Street 129",
            hours: "Mon-Fri: 09:00 - 18:00, Sat: 10:00 - 15:00",
            phoneNum: "+998 90 123 45 67",
            emailAddr: "info@truehome.uz",
            getDirections: "Get Directions",
            connectWithUs: "Connect With Us",
            liveChat: "Live Chat",
            emergency: "Emergency Support 24/7",
            whyContactUs: "Why Contact Us?",
            fastResponse: "Fast Response",
            fastResponseDesc: "Average 2 hour response time",
            expertTeam: "Expert Team",
            expertTeamDesc: "10+ years of experience",
            available247: "Available 24/7",
            available247Desc: "Always at your service",
            satisfaction: "100% Satisfaction",
            satisfactionDesc: "Or money back guarantee",
            categories: {
                general: "General Inquiry",
                property: "About Property",
                technical: "Technical Support",
                partnership: "Partnership",
                other: "Other"
            },
            stats: {
                response: "Avg Response Time",
                satisfied: "Satisfied Clients",
                messages: "Messages Per Month",
                rating: "Client Rating"
            },
            socialTitle: "Follow on Social",
            newMessage: "Send Another Message"
        }
    }

    const t = translations[language]

    const contactMethods = [
        {
            icon: Phone,
            title: t.quickResponse,
            description: t.phoneNum,
            action: "tel:+998901234567",
            color: "from-green-500 to-emerald-600",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        },
        {
            icon: Mail,
            title: t.support,
            description: t.emailAddr,
            action: "mailto:info@truehome.uz",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
        },
        {
            icon: MapPin,
            title: t.visitUs,
            description: t.address,
            action: "#map",
            color: "from-red-500 to-pink-600",
            bgColor: "bg-red-50",
            textColor: "text-red-600"
        },
        {
            icon: Clock,
            title: t.officeHours,
            description: t.hours,
            action: "#",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600"
        }
    ]

    const features = [
        { icon: Zap, title: t.fastResponse, description: t.fastResponseDesc, color: "yellow" },
        { icon: Award, title: t.expertTeam, description: t.expertTeamDesc, color: "blue" },
        { icon: Clock, title: t.available247, description: t.available247Desc, color: "green" },
        { icon: ThumbsUp, title: t.satisfaction, description: t.satisfactionDesc, color: "red" }
    ]

    const stats = [
        { value: "< 2h", label: t.stats.response, icon: Zap },
        { value: "98%", label: t.stats.satisfied, icon: ThumbsUp },
        { value: "5K+", label: t.stats.messages, icon: MessageSquare },
        { value: "4.9/5", label: t.stats.rating, icon: Star }
    ]

    const socials = [
        { icon: Facebook, color: "hover:bg-blue-600", url: "#" },
        { icon: Instagram, color: "hover:bg-pink-600", url: "#" },
        { icon: Twitter, color: "hover:bg-sky-500", url: "#" },
        { icon: Linkedin, color: "hover:bg-blue-700", url: "#" }
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setIsSubmitting(false)
        setIsSubmitted(true)
        
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({ name: "", email: "", phone: "", subject: "", category: "general", message: "" })
        }, 5000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className={`flex-1 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-red-500 via-red-600 to-pink-600 text-white py-20 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
                    </div>

                    <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                                <Headphones className="h-5 w-5" />
                                <span className="text-sm font-medium">{t.available247}</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.title}</h1>
                            <p className="text-xl text-red-100 mb-4">{t.subtitle}</p>
                            <p className="text-lg text-red-50">{t.description}</p>
                        </div>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="bg-white border-b border-gray-200 py-8">
                    <div className="container mx-auto max-w-7xl px-4 md:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <stat.icon className="h-5 w-5 text-red-600" />
                                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16">
                    <div className="container mx-auto max-w-7xl px-4 md:px-8">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Contact Info Sidebar */}
                            <div className="space-y-6">
                                {/* Contact Methods */}
                                {contactMethods.map((method, index) => (
                                    <div
                                        key={index}
                                        className={`${method.bgColor} border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 bg-gradient-to-br ${method.color} rounded-xl text-white group-hover:scale-110 transition-transform`}>
                                                <method.icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                                                <p className={`${method.textColor} text-sm font-medium`}>
                                                    {method.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Live Chat Card */}
                                <div className="bg-gradient-to-br from-red-600 to-pink-600 text-white rounded-2xl p-6 shadow-xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                            <MessageCircle className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{t.liveChat}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                <span className="text-sm text-red-100">Online now</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-red-100 text-sm mb-4">{t.emergency}</p>
                                    <button className="w-full bg-white text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all">
                                        {t.connectWithUs}
                                    </button>
                                </div>

                                {/* Social Media */}
                                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-4">{t.socialTitle}</h3>
                                    <div className="flex gap-3">
                                        {socials.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                className={`p-3 bg-gray-100 rounded-xl ${social.color} hover:text-white transition-all hover:scale-110 transform`}
                                            >
                                                <social.icon className="h-5 w-5" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                                    {isSubmitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle2 className="h-10 w-10 text-green-600" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-3">{t.success}</h3>
                                            <p className="text-gray-600 text-lg mb-8">{t.successDesc}</p>
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all"
                                            >
                                                {t.newMessage}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-3 bg-red-100 rounded-xl">
                                                    <Send className="h-6 w-6 text-red-600" />
                                                </div>
                                                <h2 className="text-3xl font-bold text-gray-900">{t.formTitle}</h2>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            {t.name} *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                                                            placeholder="John Doe"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            {t.email} *
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                                                            placeholder="john@example.com"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            {t.phone}
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                                                            placeholder="+998 90 123 45 67"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            {t.category} *
                                                        </label>
                                                        <select
                                                            name="category"
                                                            value={formData.category}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                                                        >
                                                            <option value="general">{t.categories.general}</option>
                                                            <option value="property">{t.categories.property}</option>
                                                            <option value="technical">{t.categories.technical}</option>
                                                            <option value="partnership">{t.categories.partnership}</option>
                                                            <option value="other">{t.categories.other}</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        {t.subject} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                                                        placeholder="How can we help you?"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        {t.message} *
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                        rows={6}
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                                                        placeholder="Tell us more about your inquiry..."
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                                            {t.sending}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="h-5 w-5" />
                                                            {t.send}
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </>
                                    )}
                                </div>

                                {/* Features Grid */}
                                <div className="grid md:grid-cols-2 gap-4 mt-6">
                                    {features.map((feature, index) => (
                                        <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                                            <div className="flex items-start gap-3">
                                                <feature.icon className={`h-6 w-6 text-${feature.color}-600 flex-shrink-0 mt-1`} />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Contact Us Section */}
                <section className="py-16 bg-white border-t border-gray-200">
                    <div className="container mx-auto max-w-7xl px-4 md:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.whyContactUs}</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="text-center">
                                    <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                        <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}