// app/test-bot-token/page.tsx
export default function TestBotToken() {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Bot Token Check</h1>
            <div className="space-y-2">
                <p>Token exists: {token ? '✅ YES' : '❌ NO'}</p>
                <p>Token length: {token?.length || 0} characters</p>
                <p>Token format: {token?.includes(':') ? '✅ Valid format' : '❌ Invalid format'}</p>
                <p className="text-xs text-gray-500">
                    Should be like: 1234567890:ABCdefGHI... (with a colon)
                </p>
            </div>
        </div>
    );
}