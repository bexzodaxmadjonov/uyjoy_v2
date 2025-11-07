"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { Globe, Menu, Home, Search, PlusCircle, User, LogIn, UserPlus, Info, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image";

import { LoginModal } from "@/components/login-modal";

interface NavbarProps {
  language: Language
  onLanguageChange: (lang: Language) => void
  onLoginClick: () => void
}

export function Navbar({ language, onLanguageChange, onLoginClick }: NavbarProps) {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isLanguageChanging, setIsLanguageChanging] = useState(false)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const languages = [
    { code: "uz" as Language, name: "O'zbekcha" },
    { code: "ru" as Language, name: "Русский" },
    { code: "en" as Language, name: "English" },
  ]

  // Navigation items with proper translation handling
  const navItems = [
    {
      href: "/",
      label: "nav.home",
      icon: Home
    },
    {
      href: "/users/profile",
      label: "nav.profile",
      icon: User,
    }
    // {
    //   href: "/search",
    //   label: "nav.search",
    //   icon: Search
    // // },
    // {
    //   href: "/about",
    //   label: "nav.about",
    //   icon: Info
    // },
    // {
    //   href: "/contact",
    //   label: "nav.contact",
    //   icon: Phone
    // },
  ]

  // Menu items
  const menuItems = [
    { href: "/login", label: "nav.login", icon: LogIn, highlight: true, display: "flex" },
    { href: "/", label: "nav.logout", icon: LogIn, highlight: true, display: "none" },

    // { href: "/register", label: "nav.signup", icon: UserPlus, highlight: true },
  ]

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdowns when clicking outside or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false)
        setIsMenuOpen(false)
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLanguageDropdownOpen(false)
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  // Optimized language change handler with persistence
  const handleLanguageChange = async (newLanguage: Language) => {
    if (newLanguage === language || isLanguageChanging) return

    setIsLanguageChanging(true)
    setIsLanguageDropdownOpen(false)

    try {
      // Store current scroll position to prevent jumps
      const scrollY = window.scrollY

      // Add a class to body to prevent layout shifts during language change
      document.body.classList.add('language-changing')

      // Save to localStorage immediately
      localStorage.setItem('truehome-language', newLanguage)

      // Change the language in state
      onLanguageChange(newLanguage)

      // Restore scroll position to prevent jumps
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: 'auto' })
      })

    } catch (error) {
      console.error('Language change error:', error)
    } finally {
      // Reset loading state after a delay to ensure smooth transition
      setTimeout(() => {
        setIsLanguageChanging(false)
        document.body.classList.remove('language-changing')
      }, 300)
    }
  }

  // Optimized smooth navigation handler - FIXED to preserve language
  const handleNavigation = async (href: string) => {
    if (isNavigating || href === pathname) {
      setIsMenuOpen(false)
      setIsLanguageDropdownOpen(false)
      if (href === pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    setIsNavigating(true)
    setIsMenuOpen(false)
    setIsLanguageDropdownOpen(false)

    document.body.style.setProperty('scroll-behavior', 'smooth')

    try {
      // Navigate WITHOUT affecting language state
      await router.push(href)
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      setTimeout(() => {
        setIsNavigating(false)
        document.body.style.removeProperty('scroll-behavior')
      }, 300)
    }
  }

  // Function for dynamic active link style
  const getLinkClass = (path: string) => {
    const isActive = pathname === path
    return `text-sm font-medium transition-all duration-300 transform ${
        isActive
            ? "text-blue-600 font-semibold scale-105"
            : "text-gray-700 hover:text-gray-900 hover:scale-105"
    } ${isNavigating || isLanguageChanging ? 'opacity-70 pointer-events-none' : ''}`
  }

  const getMobileLinkClass = (path: string) => {
    const isActive = pathname === path
    return `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 ${
        isActive
            ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600 translate-x-1"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:translate-x-1"
    } ${isNavigating || isLanguageChanging ? 'opacity-70 pointer-events-none' : ''}`
  }

  // Memoized translation function
  const safeTranslate = (key: string, lang: Language) => {
    const fallbacks: Record<string, Record<Language, string>> = {
      "nav.home": { en: "Home", uz: "Bosh sahifa", ru: "Главная" },
      // "nav.search": { en: "Search", uz: "Qidirish", ru: "Поиск" },
      "nav.about": { en: "About", uz: "Biz haqimizda", ru: "О нас" },
      "nav.contact": { en: "Contact", uz: "Bog'lanish", ru: "Контакты" },
      "nav.profile": { en: "Profile", uz: "Profil", ru: "Профиль" },
      "nav.login": { en: "Log in", uz: "Kirish", ru: "Войти" },
      "nav.logout": { en: "Log out", uz: "Chiqish", ru: "Выйти" },
      "nav.signup": { en: "Sign up", uz: "Ro'yxatdan o'tish", ru: "Регистрация" }
    }
    return fallbacks[key]?.[lang] || key
  }

  // Static translations for consistent rendering
  const getAddListingText = (lang: Language) => {
    return lang === "uz" ? "Uy joylash" :
        lang === "ru" ? "Разместить дом" :
            "Become a host"
  }

  return (
      <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
          isScrolled
              ? "border-gray-300 bg-white/95 backdrop-blur-xl shadow-sm"
              : "border-gray-200 bg-white/90 backdrop-blur-md"
      } ${isLanguageChanging ? 'pointer-events-none' : ''}`}>
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">

          {/* Logo */}
          <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0 group"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/")
              }}
          >
            <Image src={"/assets/logo.png"} alt="Uyjoy" width={120} height={120}/>
          </Link>

          {/* Spacer for layout */}
          <div className="flex-1"></div>

          {/* Right side */}
          <div className="flex items-center gap-2">

            {/* Add Listing Button - All Devices */}
            <Link
                href="/add-listing"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/add-listing")
                }}
                className="flex items-center gap-2 bg-gradient-to-r text-white px-4 py-2 rounded-xl hover:text-white-500 hover:to-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 transform"
                style={{ background: "#0057B8" }}
            >
              <PlusCircle className="h-4 w-4 transition-transform duration-300 hover:rotate-90" />
              <span className="text-sm font-sans">
              {getAddListingText(language)}
            </span>
            </Link>

            {/* Language Selector */}
            <div className="relative" ref={dropdownRef} onClick={() => setIsMenuOpen(false)}>
              <button
                  className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 group hover:scale-105"
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  disabled={isNavigating || isLanguageChanging}
              >
                <Globe className="h-4 w-4 text-gray-600 group-hover:text-gray-800 transition-colors duration-300" />
                <span className="hidden sm:inline text-sm font-medium text-gray-700 uppercase">
                {language}
                  {isLanguageChanging && (
                      <motion.span
                          className="ml-1 inline-block w-1 h-1 bg-blue-500 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                      />
                  )}
              </span>
              </button>

              {isLanguageDropdownOpen && (
                  <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                  >
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center justify-between hover:scale-105 transform ${
                                language === lang.code
                                    ? "bg-blue-50 text-blue-600 font-semibold"
                                    : "text-gray-700 hover:bg-gray-50"
                            } ${isLanguageChanging ? 'opacity-50 pointer-events-none' : ''}`}
                            onClick={() => handleLanguageChange(lang.code)}
                            disabled={isLanguageChanging}
                        >
                          <span>{lang.name}</span>
                          {language === lang.code && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full transition-all duration-300" />
                          )}
                        </button>
                    ))}
                  </motion.div>
              )}
            </div>

            {/* Menu Button - All Devices */}
            <div className="relative" ref={menuRef}>
              <button
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  disabled={isNavigating || isLanguageChanging}
              >
                <Menu className="h-5 w-5 text-gray-700 transition-transform duration-300" />
              </button>

              {isMenuOpen && (
                  <motion.div
                      className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                  >
                    {/* Navigation Links */}
                    <div className="p-2 border-b border-gray-100">
                      {navItems.map((item) => (
                          <Link
                              key={item.href}
                              href={item.href}
                              className={getMobileLinkClass(item.href)}
                              onClick={(e) => {
                                e.preventDefault()
                                handleNavigation(item.href)
                              }}
                          >
                            {item.icon && <item.icon className="h-4 w-4 transition-transform duration-300" />}
                            {safeTranslate(item.label, language)}
                          </Link>
                      ))}
                    </div>

                    {/* User Menu Items */}
                    <div className="p-2">
                      {menuItems.map((item) => {
                        const isProfilePage = pathname === "/users/profile"
                        const shouldHide =
                            (isProfilePage && item.label === "nav.login") ||
                            (!isProfilePage && item.label === "nav.logout")

                        if (shouldHide) return null

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 hover:translate-x-1 ${
                                    item.highlight
                                        ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault()
                                  if (item.label === "nav.login") {
                                    onLoginClick()
                                    setIsMenuOpen(false)
                                  } else {
                                    handleNavigation(item.href)
                                  }
                                }}
                            >
                              <item.icon className="h-4 w-4 transition-transform duration-300" />
                              {safeTranslate(item.label, language)}
                            </Link>
                        )
                      })}
                    </div>
                  </motion.div>
              )}
            </div>

          </div>
        </div>

        {/* Navigation Loading Indicator */}
        {isNavigating && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-600">
              <motion.div
                  className="h-full bg-white/30"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
        )}

        {/* Language Changing Overlay */}
        {/*{isLanguageChanging && (*/}
        {/*    <motion.div*/}
        {/*        className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center"*/}
        {/*        initial={{ opacity: 0 }}*/}
        {/*        animate={{ opacity: 1 }}*/}
        {/*        exit={{ opacity: 0 }}*/}
        {/*    >*/}
        {/*      <motion.div*/}
        {/*          className="w-4 h-4 bg-blue-500 rounded-full"*/}
        {/*          animate={{ scale: [1, 1.2, 1] }}*/}
        {/*          transition={{ duration: 1, repeat: Infinity }}*/}
        {/*      />*/}
        {/*    </motion.div>*/}
        {/*)}*/}

        <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} language={language} />
      </nav>
  )
}