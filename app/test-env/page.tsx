// app/test-env/page.tsx
export default function TestEnv() {
    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Environment Variables Check</h1>
            <div className="space-y-2">
                <p>BOT_NAME: {process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || '❌ NOT SET'}</p>
                <p>BOT_ID: {process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID || '❌ NOT SET'}</p>
                <p>APP_URL: {process.env.NEXT_PUBLIC_APP_URL || '❌ NOT SET'}</p>
                <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || '❌ NOT SET'}</p>
                <p>Has ANON Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ YES' : '❌ NO'}</p>
            </div>
        </div>
    );
}