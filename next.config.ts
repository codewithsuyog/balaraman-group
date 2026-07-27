import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?:www\\.)?balaraman\\.in',
          },
        ],
        destination: 'https://www.ebalaraman.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?:www\\.)?ebalaraman\\.in',
          },
        ],
        destination: 'https://www.ebalaraman.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'ebalaraman\\.com',
          },
        ],
        destination: 'https://www.ebalaraman.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
