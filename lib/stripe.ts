import Stripe from 'stripe';

/* ─────────────────────────────────────────────────────────────
   Stripe wiring. Everything here is inert until the environment
   variables are set — isStripeConfigured() is false, the API
   routes return 503, and the site falls back to enquiry-only.
   Nothing breaks; nothing pretends to work.
   ───────────────────────────────────────────────────────────── */

export const TIERS = ['essential', 'signature', 'premium'] as const;
export type Tier = (typeof TIERS)[number];

export const PRICE_IDS: Record<Tier, { monthly?: string; annual?: string }> = {
  essential: {
    monthly: process.env.STRIPE_PRICE_ESSENTIAL_MONTHLY,
    annual: process.env.STRIPE_PRICE_ESSENTIAL_ANNUAL,
  },
  signature: {
    monthly: process.env.STRIPE_PRICE_SIGNATURE_MONTHLY,
    annual: process.env.STRIPE_PRICE_SIGNATURE_ANNUAL,
  },
  premium: {
    monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
    annual: process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
  },
};

/* The brief was explicit: scarcity must be real or it becomes a
   liability. This is counted against live subscriptions, never
   hardcoded. */
export const PREMIUM_CAP = Number(process.env.PREMIUM_CAP ?? 5);

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set.');
  if (!cached) cached = new Stripe(key);
  return cached;
}

/** Live count of active Premium subscriptions, and whether any remain. */
export async function getPremiumAvailability(): Promise<{
  cap: number;
  taken: number;
  remaining: number;
  configured: boolean;
}> {
  if (!isStripeConfigured()) {
    return { cap: PREMIUM_CAP, taken: 0, remaining: PREMIUM_CAP, configured: false };
  }

  const ids = [PRICE_IDS.premium.monthly, PRICE_IDS.premium.annual].filter(Boolean) as string[];
  if (!ids.length) {
    return { cap: PREMIUM_CAP, taken: 0, remaining: PREMIUM_CAP, configured: false };
  }

  const stripe = getStripe();
  const seen = new Set<string>();

  for (const price of ids) {
    // 'active' excludes cancelled and past_due, so a lapsed member
    // frees their place automatically.
    for await (const sub of stripe.subscriptions.list({ price, status: 'active', limit: 100 })) {
      seen.add(sub.id);
    }
  }

  const taken = seen.size;
  return {
    cap: PREMIUM_CAP,
    taken,
    remaining: Math.max(0, PREMIUM_CAP - taken),
    configured: true,
  };
}
