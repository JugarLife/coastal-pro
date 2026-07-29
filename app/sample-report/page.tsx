import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sample Property Care Report',
  description: 'An example of the written report delivered after every scheduled attendance.',
  robots: { index: false, follow: true },
};

const TONE = { amber: 'var(--amber)', stone: 'var(--stone)', sage: 'var(--sage)' } as const;

const AREAS = [
  { area: 'Roofline and gutters', rating: 'Attention', tone: 'amber' as const, pct: 42,
    note: 'Separation at the north-east junction, approximately 400mm. Water is tracking behind the fascia.' },
  { area: 'Timber and decking', rating: 'Fair', tone: 'stone' as const, pct: 64,
    note: 'Surface greying to the western boards, consistent with exposure. Structure and fixings sound.' },
  { area: 'External paint', rating: 'Good', tone: 'sage' as const, pct: 81,
    note: 'Sound throughout. Early chalking to the western elevation only.' },
  { area: 'Drainage and grounds', rating: 'Good', tone: 'sage' as const, pct: 88,
    note: 'Downpipes clear and discharging correctly. Grounds tidy, no encroachment.' },
  { area: 'Security and access', rating: 'Good', tone: 'sage' as const, pct: 92,
    note: 'All openings secure. Alarm armed on departure. No sign of interference.' },
];

const FINDINGS = [
  { level: 'Urgent', tone: 'amber' as const, title: 'Gutter separation, north elevation',
    detail: 'Recommend re-hanging the affected run and resealing the junction. Left unattended this will reach the wall cavity within one wet season.',
    quote: '$480 incl. GST', photos: '4 photographs' },
  { level: 'Monitor', tone: 'stone' as const, title: 'Deck sealing due within six months',
    detail: 'Boards remain sound. Sealing before next summer will prevent surface checking.',
    quote: '$1,240 incl. GST', photos: '6 photographs' },
  { level: 'Planned', tone: 'sage' as const, title: 'Exterior repaint, eighteen month horizon',
    detail: 'No action required this year. Flagged so it can be budgeted rather than arriving as a surprise.',
    quote: 'Quote on request', photos: '3 photographs' },
];

export default function SampleReport() {
  return (
    <>
      <header className="border-b rule bg-paper">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 h-[76px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5">
            <Image src="/logo-mark-navy.png" alt="" width={280} height={150} className="h-[30px] w-auto" />
            <span className="hidden sm:block h-7 w-px bg-[color:var(--rule)]" />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="display text-[19px] text-ink">Coastal Pro</span>
              <span className="label label-sm text-muted mt-[4px]">Property Care</span>
            </span>
          </Link>
          <Link href="/#report" className="inline-flex items-center gap-2.5 label text-muted hover:text-ink transition-colors">
            <ArrowLeft size={14} strokeWidth={1.75} />Back
          </Link>
        </div>
      </header>

      <main id="top" className="bg-sand">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-16 lg:py-24">
          <div className="border-l-2 border-brass pl-6 mb-12">
            <p className="label text-brass-ink mb-2">Sample</p>
            <p className="text-[15px] leading-[1.65] text-muted measure">
              A worked example, not a real property. Every member receives a report in this
              form within twenty-four hours of each scheduled attendance.
            </p>
          </div>

          <article className="bg-white doc-shadow p-8 lg:p-14">
            {/* Masthead */}
            <div className="flex flex-wrap items-start justify-between gap-6 pb-8 border-b-2 border-[color:var(--ink)]">
              <div>
                <p className="label text-muted mb-3">Property Care Report</p>
                <h1 className="display display-light text-[clamp(1.6rem,3vw,2.2rem)] text-ink leading-[1.1]">
                  14 Point Nepean Road
                </h1>
                <p className="text-[15px] text-muted mt-2">Portsea, Victoria 3944</p>
              </div>
              <div className="text-right">
                <p className="label text-muted mb-3">Report</p>
                <p className="text-[15px] text-ink tnum">CP-2026-0612</p>
                <p className="text-[15px] text-muted tnum mt-1">12 June 2026</p>
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-7 border-b rule">
              {[
                ['Membership', 'Reserve'],
                ['Attendance', 'Scheduled — weekly'],
                ['Duration', '48 minutes'],
                ['Attended by', 'D. Sidebottom'],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="label text-muted mb-2">{k}</p>
                  <p className="text-[14.5px] text-text">{v}</p>
                </div>
              ))}
            </div>

            {/* Access log — the trust artefact */}
            <div className="py-7 border-b rule">
              <p className="label text-muted mb-5">Access log</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  ['Entry', '09:12'],
                  ['Exit', '10:00'],
                  ['Method', 'Key — cabinet 07'],
                  ['Alarm', 'Disarmed / rearmed'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="label text-muted mb-2">{k}</p>
                    <p className="text-[14.5px] text-text tnum">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div className="py-9 border-b rule">
              <p className="label text-muted mb-7">Condition assessment</p>
              <div className="space-y-7">
                {AREAS.map((a) => (
                  <div key={a.area}>
                    <div className="flex items-center gap-5 mb-2.5">
                      <span className="text-[15px] text-ink w-[180px] shrink-0">{a.area}</span>
                      <span className="flex-1 h-[3px] bg-ink/10 relative">
                        <span className="absolute inset-y-0 left-0" style={{ width: `${a.pct}%`, background: TONE[a.tone] }} />
                      </span>
                      <span className="flex items-center gap-2 w-[92px] shrink-0 justify-end">
                        <span className="w-[5px] h-[5px] rounded-full" style={{ background: TONE[a.tone] }} />
                        <span className="text-[13px] text-muted">{a.rating}</span>
                      </span>
                    </div>
                    <p className="text-[14.5px] leading-[1.6] text-muted pl-0 sm:pl-[200px] measure">{a.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings */}
            <div className="py-9 border-b rule">
              <p className="label text-muted mb-7">Findings and recommendations</p>
              <div className="space-y-8">
                {FINDINGS.map((f) => (
                  <div key={f.title} className="border-l-2 pl-6" style={{ borderColor: TONE[f.tone] }}>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <span className="label" style={{ color: TONE[f.tone] }}>{f.level}</span>
                      <span className="display d4 text-ink">{f.title}</span>
                    </div>
                    <p className="text-[15px] leading-[1.65] text-muted measure mb-3">{f.detail}</p>
                    <div className="flex flex-wrap gap-x-7 gap-y-1">
                      <span className="label text-muted">{f.photos}</span>
                      <span className="label text-ink tnum">{f.quote}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[14px] leading-[1.6] text-muted mt-8 measure">
                Nothing above proceeds without your written approval. Reserve members receive
                15% off eligible carpentry works; the figures shown include that discount.
              </p>
            </div>

            {/* Footer */}
            <div className="pt-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="label text-muted mb-2">Next scheduled attendance</p>
                <p className="text-[15px] text-ink tnum">Friday 19 June 2026</p>
              </div>
              <div className="text-right">
                <p className="label text-muted mb-2">22 photographs attached</p>
                <p className="text-[14px] text-muted">Coastal Pro Property Care · 0417 349 071</p>
              </div>
            </div>
          </article>

          <div className="mt-12 flex flex-col sm:flex-row gap-3.5">
            <Link href="/enquire" className="px-8 py-[14px] bg-ink text-paper text-[14px] font-medium text-center hover:bg-ink-deep transition-colors">
              Enquire about a membership
            </Link>
            <Link href="/#memberships" className="px-8 py-[14px] border border-[color:var(--ink)] text-ink text-[14px] font-medium text-center hover:bg-ink hover:text-paper transition-colors">
              View memberships
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-ink-deep text-white/50">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px]">© 2026 Coastal Pro Property Care</span>
          <div className="flex gap-8">
            <Link href="/terms" className="text-[13px] hover:text-paper transition-colors">Terms</Link>
            <Link href="/privacy" className="text-[13px] hover:text-paper transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
