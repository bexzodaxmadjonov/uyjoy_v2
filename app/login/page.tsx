"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LoginPage() {
    const { language, changeLanguage } = useLanguage()

    const translations = {
        uz: {
            title: "Kirish",
            email: "Elektron pochta",
            password: "Parol",
            button: "Kirish",
            noAccount: "Hisobingiz yo‘qmi?",
            register: "Ro‘yxatdan o‘tish",
            success: "Muvaffaqiyatli kirdingiz!",
        },
        ru: {
            title: "Вход",
            email: "Электронная почта",
            password: "Пароль",
            button: "Войти",
            noAccount: "Нет аккаунта?",
            register: "Зарегистрироваться",
            success: "Вы успешно вошли!",
        },
        en: {
            title: "Login",
            email: "Email",
            password: "Password",
            button: "Sign In",
            noAccount: "Don’t have an account?",
            register: "Register",
            success: "Logged in successfully!",
        },
    }

    const t = translations[language]
    const [form, setForm] = useState({ email: "", password: "" })
    const [message, setMessage] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Temporary mock authentication
        if (form.email && form.password) {
            setMessage(t.success)
        }
    }

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6">{t.title}</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t.email}</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">{t.password}</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-gray-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        {t.button}
                    </button>
                </form>

                {message && (
                    <p className="text-green-600 mt-4 text-center font-medium">{message}</p>
                )}

                <p className="text-center text-sm mt-4">
                    {t.noAccount}{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        {t.register}
                    </Link>
                </p>
            </div>
        </div>
        </>
    )
}
