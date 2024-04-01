/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  async headers() {
    return [
      {
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
