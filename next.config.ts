import type { NextConfig } from 'next';

const CANONICAL = 'coastalpropropertycare.com';

/* Every other hostname we own folds into the canonical one with a 308,
   so the .net.au keeps working for anything already printed or linked,
   and search engines consolidate onto a single host. */
const ALIASES = [
  `www.${CANONICAL}`,
  'coastalpropertycare.net.au',
  'www.coastalpropertycare.net.au',
];

const nextConfig: NextConfig = {
  async redirects() {
    return ALIASES.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value: host }],
      destination: `https://${CANONICAL}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
