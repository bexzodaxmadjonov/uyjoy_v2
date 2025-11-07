"use client"

import type { Language } from "@/lib/i18n"

interface FooterProps {
  language: Language
}

export function Footer({ language }: FooterProps) {
  const footerText = {
    uz: {
      support: "Qo'llab-quvvatlash",
      community: "Jamiyat",
      hosting: "Uy joylash",
      about: "Haqida",
      contact: "Aloqa",
      privacy: "Maxfiylik siyosati",
      terms: "Foydalanish shartlari",
      copyright: "© 2025 TrueHome. Barcha huquqlar himoyalangan.",
    },
    ru: {
      support: "Поддержка",
      community: "Сообщество",
      hosting: "Размещение на сайте",
      about: "О Нас",
      contact: "Контакт",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      copyright: "© 2025 TrueHome. Все права защищены.",
    },
    en: {
      support: "Support",
      community: "Community",
      hosting: "Hosting",
      about: "About",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "© 2025 TrueHome. All rights reserved.",
    },
  }

  const t = footerText[language]

  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">{t.support}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">{t.community}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  {t.about}
                </a>
              </li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">{t.hosting}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  {language === "uz" ? "Uy joylash" : language === "ru" ? "Стать хозяином" : "Become a host"}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">
              {language === "uz" ? "Qonun" : language === "ru" ? "Документы" : "Legal"}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  {t.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                  {t.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600">{t.copyright}</p>
          <p className="text-sm text-gray-600 mt-4 md:mt-0">
            {language === "uz"
              ? "TrueHome - Haqiqiy uylar, haqiqiy egalardan"
              : language === "ru"
                ? "TrueHome - Настоящие дома от настоящих хозяев"
                : "TrueHome - Real homes from real owners"}
          </p>
        </div>
      </div>
    </footer>
  )
}
