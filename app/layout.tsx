import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ClientLayout } from "@/components/client-layout"
import { LanguageProvider } from "@/hooks/use-language"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Uyjoy - Qulay uylar, baxtli onlar.",
    description: "Find verified properties directly from owners. No middlemen, no scams.",
    icons: {
        icon: [
            { url: "/assets/img.png", sizes: "192x192",},
        ],
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {

    // app/layout.tsx or _app.tsx
    return (
        <html lang="en">
        <body className={`font-sans antialiased min-h-screen`}>
        <LanguageProvider>
            <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
        <Analytics />
        </body>
        </html>
    )
}