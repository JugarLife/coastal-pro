import { NextResponse } from 'next/server';
import { getPremiumAvailability } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const availability = await getPremiumAvailability();
    return NextResponse.json(availability, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
    });
  } catch (err) {
    console.error('[availability]', err);
    return NextResponse.json({ configured: false }, { status: 200 });
  }
}
