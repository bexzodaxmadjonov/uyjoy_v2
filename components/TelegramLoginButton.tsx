// components/TelegramLoginButtonCustom.tsx
'use client';

import { useState } from 'react';
import { redirect } from "next/navigation";

interface TelegramLoginButtonCustomProps {
    botName: string;
    onAuth: (user: any) => Promise<void>;
    onError?: (error: string) => void;
    onClose: () => void;
    language?: 'uz' | 'ru' | 'en';
}

export default function TelegramLoginButtonCustom({
                                                      botName,
                                                      onAuth,
                                                      onError,
                                                      onClose,
                                                      language = 'en',
                                                  }: TelegramLoginButtonCustomProps) {
    const [isLoading, setIsLoading] = useState(false);

    const translations = {
        uz: {
            button: 'Telegram orqali kirish',
            loading: 'Yuklanmoqda...',
        },
        ru: {
            button: 'Войти через Telegram',
            loading: 'Загрузка...',
        },
        en: {
            button: 'Log in with Telegram',
            loading: 'Loading...',
        },
    };

    const t = translations[language];

    const handleTelegramLogin = () => {
        if (!botName || botName.trim() === '') {
            const error = 'Bot name is not configured';
            console.error(error);
            if (onError) onError(error);
            return;
        }

        setIsLoading(true);

        const cleanBotName = botName.replace('@', '').trim();
        const authUrl = `https://oauth.telegram.org/auth?bot_id=${process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID}&origin=${encodeURIComponent(window.location.origin)}&request_access=write`;

        // Open popup window
        const width = 550;
        const height = 470;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        const popup = window.open(
            authUrl,
            'telegram_oauth',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );

        if (!popup) {
            setIsLoading(false);
            const error = 'Popup was blocked. Please allow popups for this site.';
            if (onError) onError(error);
            return;
        }

        // Listen for message from popup
        const handleMessage = async (event: MessageEvent) => {
            // Verify origin
            if (event.origin !== 'https://oauth.telegram.org') {
                return;
            }

            if (event.data && event.data.event === 'auth_result') {
                window.removeEventListener('message', handleMessage);

                if (event.data.result) {
                    try {
                        await onAuth(event.data.result);
                    } catch (error) {
                        console.error('Auth error:', error);
                        if (onError) {
                            onError(error instanceof Error ? error.message : 'Authentication failed');
                        }
                    }
                } else {
                    if (onError) {
                        onError('Authentication was cancelled or failed');
                    }
                }

                setIsLoading(false);
                popup.close();
            }
        };

        window.addEventListener('message', handleMessage);

        // Check if popup was closed
        const checkPopupClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkPopupClosed);
                window.removeEventListener('message', handleMessage);
                setIsLoading(false);
            }
        }, 500);
        onClose();
    };

    return (
        <button
            onClick={handleTelegramLogin}
            disabled={isLoading}
            className="w-full py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:border-[#0057B8] bg-white hover:bg-blue-50 text-gray-700 hover:text-[#0057B8] transition-all duration-300 flex items-center justify-center gap-3 group shadow-sm hover:shadow-md transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
        >
            <svg
                className="h-6 w-6 text-[#0057B8] group-hover:scale-110 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.306.02.472z" />
            </svg>
            <span>{isLoading ? t.loading : t.button}</span>
            {!isLoading && (
                <svg
                    className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            )}
        </button>
    );
}