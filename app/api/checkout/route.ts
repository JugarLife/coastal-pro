import { NextResponse } from 'next/server';
import {
  TIERS,
  type Tier,
  PRICE_IDS,
  isStripeConfigured,
  getStripe,
  getReserveAvailability,
} from '@/lib/stripe';

/* Creates a Checkout Session. Per the brief this is NOT linked from the
   pricing cards — Signature and Reserve go through consultation first.
   It exists so a reviewed applicant can be sent a direct link, and so
   Essential can be given a fast lane later if wanted. */

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Payments are not configured yet.' },
      { status: 503 },
    );
  }

  let body: { tier?: string; interval?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }

  const tier = body.tier as Tier;
  if (!TIERS.includes(tier)) {
    return NextResponse.json({ ok: false, error: 'Unknown membership tier.' }, { status: 400 });
  }

  const interval = body.interval === 'annual' ? 'annual' : 'monthly';
  const price = PRICE_IDS[tier][interval];
  if (!price) {
    return NextResponse.json(
      { ok: false, error: `No ${interval} price configured for ${tier}.` },
      { status: 503 },
    );
  }

  // Enforce the Reserve cap server-side. A client-side check would be
  // trivially bypassed by anyone holding the link.
  if (tier === 'reserve') {
    const { remaining } = await getReserveAvailability();
    if (remaining <= 0) {
      return NextResponse.json(
        { ok: false, error: 'Reserve is fully subscribed.', waitlist: true },
        { status: 409 },
      );
    }
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get('origin') ||
    'https://coastalpropertycare.net.au';

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      customer_email: body.email,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      success_url: `${origin}/enquire?checkout=complete`,
      cancel_url: `${origin}/#memberships`,
      subscription_data: { metadata: { tier, interval } },
      metadata: { tier, interval },
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    console.error('[checkout]', err);
    return NextResponse.json({ ok: false, error: 'Could not start checkout.' }, { status: 500 });
  }
}
