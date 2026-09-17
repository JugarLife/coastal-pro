import type { NextConfig } from 'next';

const CANONICAL = 'coastalpropropertycare.com';

/* www folds into the bare host with a 308 so search engines consolidate
   onto one hostname rather than splitting authority across two. */
const ALIASES = [`www.${CANONICAL}`];

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
