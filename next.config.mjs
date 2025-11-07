// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // Only apply CSP in production
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://va.vercel-scripts.com",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: https: blob:",
                "font-src 'self' data:",
                "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://telegram.org https://vitals.vercel-insights.com",
                "frame-src 'self' https://oauth.telegram.org https://telegram.org",
                "child-src 'self' https://oauth.telegram.org",
              ].join('; '),
            },
          ],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
