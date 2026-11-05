import type { NextConfig } from "next";

// Old and alternate domains that 308-redirect to the canonical site.
const legacyHosts = [
  '(?:www\.)?balaraman\.in',
  '(?:www\.)?ebalaraman\.in',
  '(?:www\.)?balaramanlab\.com',
  'ebalaraman\.com',
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // Patents moved into the Publications page
      { source: '/patents', destination: '/publications#patents', permanent: true },
      ...legacyHosts.map((value) => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value }],
      destination: 'https://www.ebalaraman.com/:path*',
      permanent: true,
    })),
    ];
  },
};

export default nextConfig;
