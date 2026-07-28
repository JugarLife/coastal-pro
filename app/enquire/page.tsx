import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import EnquireForm from './EnquireForm';

export const metadata: Metadata = {
  title: 'Enquire about a membership',
  description:
    'Tell us about your Mornington Peninsula property. We call within one business day and attend at no charge before anything is agreed.',
  robots: { index: false, follow: true },
};

export default function EnquirePage() {
  return (
    <>
      <header className="border-b rule">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 h-[74px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5">
            <Image
              src="/logo-mark-navy.png"
              alt=""
              width={280}
              height={150}
              priority
              className="h-[30px] w-auto"
            />
            <span className="hidden sm:block h-7 w-px bg-[color:var(--rule)]" />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="display text-[19px] text-navy tracking-[-0.02em]">Coastal Pro</span>
              <span className="label text-muted mt-[3px] text-[9.5px]">Property Care</span>
            </span>
          </Link>
          <a href="tel:0417349071" className="text-[14px] text-navy hover:text-blue transition-colors">
            0417 349 071
          </a>
        </div>
      </header>

      <main id="top">
        <Suspense
          fallback={
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-24">
              <p className="label text-muted">Loading…</p>
            </div>
          }
        >
          <EnquireForm />
        </Suspense>
      </main>

      <footer className="bg-navy-deep text-white/45 mt-auto">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px]">© 2026 Coastal Pro Property Care</span>
          <div className="flex gap-8">
            <Link href="/" className="text-[13px] hover:text-paper transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
