"use client"
import { useLanguage } from "@/hooks/use-language"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { useState } from "react"

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const { language, changeLanguage, mounted } = useLanguage()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    if (!mounted) return null

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar
                language={language}
                onLanguageChange={changeLanguage}
                onLoginClick={() => setIsLoginModalOpen(true)}
            />
            <main className="flex-1">{children}</main>
            <Footer language={language} />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                language={language}
            />
        </div>
    )
}