import { NextResponse } from 'next/server';

/* ─────────────────────────────────────────────────────────────
   TEMPORARY. Triggers Resend's domain verification server-side,
   using the key already configured in this deployment so it is
   never exposed. Guarded by a one-time token and REMOVED as soon
   as the domain verifies — see the commit that deletes it.
   ───────────────────────────────────────────────────────────── */

const GUARD = 'cp-verify-2026';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get('token') !== GUARD) {
    return NextResponse.json({ ok: false, error: 'Forbidden.' }, { status: 403 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: 'No API key configured.' }, { status: 503 });
  }

  const h = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };

  // Find the domain
  const listRes = await fetch('https://api.resend.com/domains', { headers: h });
  if (!listRes.ok) {
    return NextResponse.json(
      { ok: false, step: 'list', status: listRes.status, body: (await listRes.text()).slice(0, 300) },
      { status: 502 },
    );
  }
  const list = await listRes.json();
  const domain = (list.data || []).find(
    (d: { name: string }) => d.name === 'coastalpropropertycare.com',
  );
  if (!domain) {
    return NextResponse.json(
      { ok: false, error: 'Domain not found on this account.', seen: (list.data || []).map((d: { name: string }) => d.name) },
      { status: 404 },
    );
  }

  // Ask Resend to run the DNS check
  const verifyRes = await fetch(`https://api.resend.com/domains/${domain.id}/verify`, {
    method: 'POST',
    headers: h,
  });
  const verifyBody = await verifyRes.text();

  // Read the status back
  const afterRes = await fetch(`https://api.resend.com/domains/${domain.id}`, { headers: h });
  const after = afterRes.ok ? await afterRes.json() : null;

  return NextResponse.json({
    ok: verifyRes.ok,
    triggered: verifyRes.status,
    verifyBody: verifyBody.slice(0, 300),
    statusBefore: domain.status,
    statusAfter: after?.status ?? 'unknown',
    records: (after?.records || []).map((r: { record: string; name: string; status: string }) => ({
      record: r.record, name: r.name, status: r.status,
    })),
  });
}
