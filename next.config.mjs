/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://finance-api-v2-tau.vercel.app/api" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ],
        source: '/api/random',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Basic redirect
      {
        source: '/api/random',
        destination: '/api/all/random/1',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
