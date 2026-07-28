import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';

export type Clause = { heading: string; body: ReactNode };

export default function LegalPage({
  title,
  updated,
  intro,
  clauses,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  clauses: Clause[];
}) {
  return (
    <>
      <header className="border-b rule">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 h-[74px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5">
            <Image src="/logo-mark-navy.png" alt="" width={280} height={150} className="h-[30px] w-auto" />
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

      <main id="top" className="mx-auto max-w-[820px] px-6 lg:px-10 py-16 lg:py-24">
        {/* Draft notice — remove once a solicitor has settled the text. */}
        <div className="border-l-2 border-brass pl-6 py-1 mb-14">
          <p className="label text-brass mb-2">Draft — not yet reviewed</p>
          <p className="text-[15px] leading-[1.65] text-muted">
            This document was prepared as a starting point and has not been reviewed by a
            lawyer. It is not legal advice. Have it settled by an Australian solicitor before
            the site goes live — particularly the clauses covering keys, access and liability.
            Text in <span className="text-navy">[square brackets]</span> still needs your input.
          </p>
        </div>

        <h1 className="display display-light d2 text-navy mb-4">{title}</h1>
        <p className="label text-muted mb-12">Last updated {updated}</p>

        <div className="lede text-muted mb-16 pb-16 border-b rule">{intro}</div>

        <ol className="list-none">
          {clauses.map((c, i) => (
            <li key={c.heading} className="grid grid-cols-[auto_1fr] gap-x-7 pb-11 mb-11 border-b rule last:border-0">
              <span className="numeral text-[15px] text-navy/32 pt-1.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="display d4 text-navy mb-4">{c.heading}</h2>
                <div className="space-y-4 text-[16px] leading-[1.7] text-muted">{c.body}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 pt-12 border-t rule flex flex-col sm:flex-row gap-3.5">
          <Link href="/" className="px-8 py-[14px] bg-navy text-paper text-[14px] font-medium text-center hover:bg-navy-deep transition-colors">
            Return to the site
          </Link>
          <Link href="/enquire" className="px-8 py-[14px] border border-navy text-navy text-[14px] font-medium text-center hover:bg-navy hover:text-paper transition-colors">
            Enquire about a membership
          </Link>
        </div>
      </main>

      <footer className="bg-navy-deep text-white/45">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px]">© 2026 Coastal Pro Property Care</span>
          <div className="flex gap-8">
            <Link href="/terms" className="text-[13px] hover:text-paper transition-colors">Terms</Link>
            <Link href="/privacy" className="text-[13px] hover:text-paper transition-colors">Privacy</Link>
            <Link href="/" className="text-[13px] hover:text-paper transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
