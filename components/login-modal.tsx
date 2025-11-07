// components/LoginModal.tsx (Updated)
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, Send, ArrowRight } from "lucide-react"
import TelegramLoginButton from "./TelegramLoginButton"

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    language: "uz" | "ru" | "en"
}

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

export function LoginModal({ isOpen, onClose, language }: LoginModalProps) {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isTelegramLoading, setIsTelegramLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const t = {
        uz: {
            title: "Kirish",
            subtitle: "Davom etish uchun telefon raqamingizni kiriting",
            phonePlaceholder: "+998 (__) ___-__-__",
            continue: "Davom etish",
            or: "yoki",
            telegramLogin: "Telegram orqali kirish",
            close: "Yopish",
            error: "Xatolik yuz berdi",
            loginSuccess: "Muvaffaqiyatli kirildi"
        },
        ru: {
            title: "Войти",
            subtitle: "Введите номер телефона для продолжения",
            phonePlaceholder: "+998 (__) ___-__-__",
            continue: "Продолжить",
            or: "или",
            telegramLogin: "Войти через Telegram",
            close: "Закрыть",
            error: "Произошла ошибка",
            loginSuccess: "Успешный вход"
        },
        en: {
            title: "Log In",
            subtitle: "Enter your phone number to continue",
            phonePlaceholder: "+998 (__) ___-__-__",
            continue: "Continue",
            or: "or",
            telegramLogin: "Log in with Telegram",
            close: "Close",
            error: "An error occurred",
            loginSuccess: "Login successful"
        }
    }[language]

    const formatPhoneNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, "")
        if (cleaned.length === 0) return ""
        let formatted = "+998"
        if (cleaned.length > 3) formatted += " (" + cleaned.slice(3, 5)
        if (cleaned.length > 5) formatted += ") " + cleaned.slice(5, 8)
        if (cleaned.length > 8) formatted += "-" + cleaned.slice(8, 10)
        if (cleaned.length > 10) formatted += "-" + cleaned.slice(10, 12)
        return formatted
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const cleaned = value.replace(/\D/g, "")
        if (cleaned.length <= 12) setPhoneNumber(formatPhoneNumber(value))
        if (error) setError(null)
    }

    const handlePhoneSubmit = () => {
        if (phoneNumber.length < 10 || isLoading) return
        setIsLoading(true)
        setError(null)

        // Your existing phone login logic here
        setTimeout(() => {
            setIsLoading(false)
            console.log("Phone login:", phoneNumber)
            // Add your phone authentication logic
        }, 1500)
    }

    const handleTelegramAuth = async (user: TelegramUser) => {
        setIsTelegramLoading(true)
        setError(null)
        console.log(user);

        try {
            // Send authentication data to your backend
            const response = await fetch('/api/auth/telegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Authentication failed')
            }

            const data = await response.json()

            if (data.success) {
                console.log('Telegram login successful:', data.user)
                // Store user data in local state or context if needed
                // Redirect or close modal
                setTimeout(() => {
                    onClose()
                    // You can add navigation here, e.g., router.push('/dashboard')
                    window.location.href = '/dashboard'
                }, 500)
            }
        } catch (err) {
            console.error('Telegram login error:', err)
            setError(err instanceof Error ? err.message : t.error)
        } finally {
            setIsTelegramLoading(false)
        }
    }

    const handleTelegramError = (errorMessage: string) => {
        setError(errorMessage)
        setIsTelegramLoading(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && phoneNumber.length >= 10 && !isLoading) handlePhoneSubmit()
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) onClose()
        }
        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
                            aria-label={t.close}
                        >
                            <X className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Header */}
                        <div className="relative bg-gradient-to-br from-[#0057B8] to-blue-700 px-8 pt-12 pb-8">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {t.title}
                                </h2>
                                <p className="text-blue-100 text-sm">{t.subtitle}</p>
                            </motion.div>

                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                        </div>

                        {/* Body */}
                        <div className="px-8 py-8">
                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div
                                        className={`relative group ${
                                            isFocused ? "ring-2 ring-[#0057B8]" : ""
                                        } rounded-2xl transition-all duration-300`}
                                    >
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <Phone
                                                className={`h-5 w-5 transition-colors duration-300 ${
                                                    isFocused ? "text-[#0057B8]" : "text-gray-400"
                                                }`}
                                            />
                                        </div>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={handlePhoneChange}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            onKeyPress={handleKeyPress}
                                            placeholder={t.phonePlaceholder}
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#0057B8] focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-400"
                                        />
                                    </div>
                                </motion.div>

                                <motion.button
                                    type="button"
                                    onClick={handlePhoneSubmit}
                                    disabled={phoneNumber.length < 10 || isLoading}
                                    className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                                        phoneNumber.length < 10 || isLoading
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-[#0057B8] hover:bg-[#004a9e] shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                    }`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isLoading ? (
                                        <motion.div
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                    ) : (
                                        <>
                                            <span>{t.continue}</span>
                                            <ArrowRight className="h-5 w-5" />
                                        </>
                                    )}
                                </motion.button>
                            </div>

                            {/* Divider */}
                            <motion.div
                                className="relative my-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 text-sm text-gray-500 bg-white">
                                        {t.or}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Telegram Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="relative"
                            >
                                {isTelegramLoading && (
                                    <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center z-10">
                                        <motion.div
                                            className="w-6 h-6 border-2 border-[#0057B8] border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>
                                )}
                                <div className="telegram-widget-wrapper w-full flex justify-center py-2">
                                    <TelegramLoginButton
                                        botName={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || ''}
                                        onAuth={handleTelegramAuth}
                                        onError={handleTelegramError}
                                        onClose={onClose}
                                        // buttonSize="large"
                                        // cornerRadius={16}
                                        // requestAccess={true}
                                        // usePic={true}
                                        language={language}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <div className="h-2 bg-gradient-to-r from-[#0057B8] via-blue-600 to-blue-700" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}