"use client"

import React, { useState, useEffect, useContext, createContext, useCallback } from "react";

export type Language = "uz" | "ru" | "en";
const DEFAULT_LANGUAGE = "uz";

interface LanguageContextType {
  language: Language
  changeLanguage: (lang: Language) => void
  mounted: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = () : Language => {
  if(typeof window === "undefined") return DEFAULT_LANGUAGE

  try {
    const stored = localStorage.getItem("uyjoy-language") as Language;
    if(stored && ["uz", "ru", "en"].includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.error("Error reading language from localStorage:", error)
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("uyjoy-language") as Language;
    if (stored && ["uz", "ru", "en"].includes(stored) && stored !== language) {
      setLanguage(stored);
    }
  }, [])

  const changeLanguage = useCallback((lang: Language) => {
    if(lang === language) return

    setLanguage(lang);
    try {
      localStorage.setItem("uyjoy-language", lang);
    } catch (error) {
      console.error("Error saving language to localStorage: ", error);
    }
  }, [language])

  return (
      <LanguageContext.Provider value={{ language, changeLanguage, mounted }}>
        {children}
      </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if(context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}