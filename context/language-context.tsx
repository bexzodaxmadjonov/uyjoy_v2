import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

type Language = "uz" | "ru" | "en"
const DEFAULT_LANGUAGE: Language = "uz"

interface LanguageContextType {
    language: Language
    changeLanguage: (lang: Language) => void
    mounted: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Read language synchronously before React renders
const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE

    try {
        const stored = localStorage.getItem("truehome-language") as Language
        if (stored && ["uz", "ru", "en"].includes(stored)) {
            return stored
        }
    } catch (error) {
        console.error('Error reading language from localStorage:', error)
    }

    return DEFAULT_LANGUAGE
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>(getInitialLanguage)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Double-check on mount in case initial read failed
        const stored = localStorage.getItem("truehome-language") as Language
        if (stored && ["uz", "ru", "en"].includes(stored) && stored !== language) {
            setLanguage(stored)
        }
    }, [])

    const changeLanguage = useCallback((lang: Language) => {
        if (lang === language) return

        setLanguage(lang)
        try {
            localStorage.setItem("truehome-language", lang)
        } catch (error) {
            console.error('Error saving language to localStorage:', error)
        }
    }, [language])

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, mounted }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}