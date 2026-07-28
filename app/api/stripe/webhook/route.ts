import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe, isStripeConfigured } from '@/lib/stripe';

/* Signature verification needs the raw body, so this route must not
   let the body be parsed or cached. */
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!isStripeConfigured() || !secret) {
    return NextResponse.json({ ok: false, error: 'Not configured.' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ ok: false, error: 'Missing signature.' }, { status: 400 });
  }

  const raw = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, signature, secret);
  } catch (err) {
    // Never trust an unverified payload — this is the whole point.
    console.error('[webhook] signature verification failed', err);
    return NextResponse.json({ ok: false, error: 'Invalid signature.' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const s = event.data.object as Stripe.Checkout.Session;
      // TODO: send the welcome email and the onboarding form
      // (property details and access arrangements live there, not on
      // the public enquiry form).
      console.log('[webhook] new member', s.id, s.customer_email, s.metadata?.tier);
      break;
    }

    case 'customer.subscription.deleted':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      // Reserve availability is counted live from Stripe, so a lapse
      // frees the place with no bookkeeping here.
      console.log('[webhook] subscription', event.type, sub.id, sub.status);
      break;
    }

    case 'invoice.payment_failed': {
      const inv = event.data.object as Stripe.Invoice;
      console.warn('[webhook] payment failed', inv.id, inv.customer_email);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
