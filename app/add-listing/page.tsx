"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { useState } from "react"
import { t } from "@/lib/i18n"
import { useLanguage } from "@/hooks/use-language"
import Contact from "../contact/page";

export default function AddListingPage() {
    const [ isLoginModalOpen, setIsLoginModalOpen ] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        price: "",
        description: "",
        photos: [] as File[],
    })

    const { language, mounted, changeLanguage } = useLanguage()
    const [success, setSuccess] = useState(false)
    if(!mounted) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : []
        setFormData((prev) => ({ ...prev, photos: files }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Listing submitted:", formData)
        setSuccess(true)
        setFormData({
            name: "",
            location: "",
            price: "",
            description: "",
            photos: [],
        })
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10 mb-10">
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    {t("addListing.title", language)}
                </h1>
    
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("addListing.name", language)}
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>
    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("addListing.location", language)}
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>
    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("addListing.price", language)}
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>
    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("addListing.description", language)}
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>
    
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("addListing.photos", language)}
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                    </div>
    
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        {t("addListing.submit", language)}
                    </button>
                </form>
    
                {success && (
                    <p className="mt-4 text-green-600 text-center font-medium">
                        {t("addListing.success", language)}
                    </p>
                )}
            </div>
        </div>
        )
    }
