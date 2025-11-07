"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RegisterPage() {
    const { language, changeLanguage } = useLanguage()

    const translations = {
        uz: {
            title: "Ro‘yxatdan o‘tish",
            name: "Ism",
            email: "Elektron pochta",
            password: "Parol",
            confirmPassword: "Parolni tasdiqlang",
            button: "Ro‘yxatdan o‘tish",
            haveAccount: "Hisobingiz bormi?",
            login: "Kirish",
            success: "Hisob muvaffaqiyatli yaratildi!",
        },
        ru: {
            title: "Регистрация",
            name: "Имя",
            email: "Электронная почта",
            password: "Пароль",
            confirmPassword: "Подтвердите пароль",
            button: "Зарегистрироваться",
            haveAccount: "Уже есть аккаунт?",
            login: "Войти",
            success: "Аккаунт успешно создан!",
        },
        en: {
            title: "Register",
            name: "Name",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            button: "Create Account",
            haveAccount: "Already have an account?",
            login: "Login",
            success: "Account created successfully!",
        },
    }

    const t = translations[language]

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [message, setMessage] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match")
            return
        }

        // Mock user registration
        console.log("User registered:", form)
        setMessage(t.success)
        setForm({ name: "", email: "", password: "", confirmPassword: "" })
    }

    return (
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6">{t.title}</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">{t.name}</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-gray-300"
                        />
                    </div>

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

                    <div>
                        <label className="block text-sm font-medium mb-1">{t.confirmPassword}</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
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
                    {t.haveAccount}{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        {t.login}
                    </Link>
                </p>
            </div>
        </div>
        </>
    )
}
