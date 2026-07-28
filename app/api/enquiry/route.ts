import { NextResponse } from 'next/server';

/* ─────────────────────────────────────────────────────────────
   Enquiry handler.

   DELIVERY IS NOT YET CONFIGURED. Without RESEND_API_KEY set, an
   enquiry is validated and written to the server log only — it is
   NOT emailed to anyone. The response reports delivered:false so
   this can never be mistaken for a working inbox. Set RESEND_API_KEY
   and ENQUIRY_TO in the Vercel project before launch.
   ───────────────────────────────────────────────────────────── */

const PLANS = new Set(['essential', 'signature', 'reserve', 'undecided']);

type Field = { key: string; label: string; required: boolean; max: number };

const FIELDS: Field[] = [
  { key: 'name', label: 'Full name', required: true, max: 120 },
  { key: 'email', label: 'Email', required: true, max: 200 },
  { key: 'phone', label: 'Phone', required: true, max: 40 },
  { key: 'address', label: 'Property address', required: true, max: 240 },
  { key: 'suburb', label: 'Suburb', required: true, max: 80 },
  { key: 'propertyType', label: 'Property type', required: false, max: 80 },
  { key: 'occupancy', label: 'Occupancy', required: false, max: 80 },
  { key: 'contactMethod', label: 'Preferred contact', required: false, max: 40 },
  { key: 'contactTime', label: 'Preferred time', required: false, max: 80 },
  { key: 'notes', label: 'Notes', required: false, max: 2000 },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-\s]{8,20}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }

  const data: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const f of FIELDS) {
    const raw = typeof body[f.key] === 'string' ? (body[f.key] as string).trim() : '';
    if (f.required && !raw) {
      errors[f.key] = `${f.label} is required.`;
      continue;
    }
    if (raw.length > f.max) {
      errors[f.key] = `${f.label} is too long.`;
      continue;
    }
    data[f.key] = raw;
  }

  if (data.email && !EMAIL_RE.test(data.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (data.phone && !PHONE_RE.test(data.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  const plan = typeof body.plan === 'string' && PLANS.has(body.plan) ? body.plan : 'undecided';

  // Honeypot — real people leave this empty.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true, delivered: false, reference: 'CP-000000' });
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const reference = `CP-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const submittedAt = new Date().toISOString();

  const summary = [
    `Reference:  ${reference}`,
    `Plan:       ${plan}`,
    `Submitted:  ${submittedAt}`,
    '',
    ...FIELDS.map((f) => `${f.label.padEnd(18)} ${data[f.key] || '—'}`),
  ].join('\n');

  const to = process.env.ENQUIRY_TO;
  const key = process.env.RESEND_API_KEY;
  let delivered = false;

  if (key && to) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM || 'Coastal Pro <onboarding@resend.dev>',
          to: [to],
          reply_to: data.email,
          subject: `Membership enquiry — ${data.suburb} — ${plan} (${reference})`,
          text: summary,
        }),
      });
      delivered = res.ok;
      if (!res.ok) {
        console.error('[enquiry] delivery failed', res.status, await res.text());
      }
    } catch (err) {
      console.error('[enquiry] delivery threw', err);
    }
  } else {
    console.warn(
      '[enquiry] RESEND_API_KEY / ENQUIRY_TO not set — enquiry logged only, NOT delivered.',
    );
  }

  console.log(`[enquiry]\n${summary}\ndelivered=${delivered}`);

  return NextResponse.json({ ok: true, delivered, reference });
}
