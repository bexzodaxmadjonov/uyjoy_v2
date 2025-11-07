// app/test-api/page.tsx
'use client';

import { useState } from 'react';

export default function TestAPI() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testAPI = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/auth/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: 123456789,
                    first_name: 'Test',
                    last_name: 'User',
                    auth_date: Math.floor(Date.now() / 1000),
                    hash: 'fake_hash_will_fail',
                }),
            });

            const data = await response.json();
            setResult({ status: response.status, data });
        } catch (error) {
            setResult({ error: String(error) });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Test API Route</h1>
            <button
                onClick={testAPI}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                {loading ? 'Testing...' : 'Test /api/auth/telegram'}
            </button>

            {result && (
                <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
            )}
        </div>
    );
}