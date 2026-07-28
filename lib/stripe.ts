import Stripe from 'stripe';

/* ─────────────────────────────────────────────────────────────
   Stripe wiring. Everything here is inert until the environment
   variables are set — isStripeConfigured() is false, the API
   routes return 503, and the site falls back to enquiry-only.
   Nothing breaks; nothing pretends to work.
   ───────────────────────────────────────────────────────────── */

export const TIERS = ['essential', 'signature', 'reserve'] as const;
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
  reserve: {
    monthly: process.env.STRIPE_PRICE_RESERVE_MONTHLY,
    annual: process.env.STRIPE_PRICE_RESERVE_ANNUAL,
  },
};

/* The brief was explicit: scarcity must be real or it becomes a
   liability. This is counted against live subscriptions, never
   hardcoded. */
export const RESERVE_CAP = Number(process.env.RESERVE_CAP ?? 5);

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

/** Live count of active Reserve subscriptions, and whether any remain. */
export async function getReserveAvailability(): Promise<{
  cap: number;
  taken: number;
  remaining: number;
  configured: boolean;
}> {
  if (!isStripeConfigured()) {
    return { cap: RESERVE_CAP, taken: 0, remaining: RESERVE_CAP, configured: false };
  }

  const ids = [PRICE_IDS.reserve.monthly, PRICE_IDS.reserve.annual].filter(Boolean) as string[];
  if (!ids.length) {
    return { cap: RESERVE_CAP, taken: 0, remaining: RESERVE_CAP, configured: false };
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
    cap: RESERVE_CAP,
    taken,
    remaining: Math.max(0, RESERVE_CAP - taken),
    configured: true,
  };
}
