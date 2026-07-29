'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Plus, Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import {
  PLANS, CONCERNS, PROCESS, COMPARISON,
  REPORT_CONDITIONS, REPORT_FINDINGS, SUBURBS, FAQS, TESTIMONIALS,
} from './data';

const RESERVE_CAP = 5;
const TONE = { amber: 'var(--amber)', stone: 'var(--stone)', sage: 'var(--sage)' } as const;

const NAV = [
  ['Memberships', '#memberships'],
  ['The report', '#report'],
  ['Coverage', '#coverage'],
  ['Questions', '#faq'],
] as const;

export default function Home() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [reserveLeft, setReserveLeft] = useState<number | null>(null);
  const [reportFocus, setReportFocus] = useState('condition');
  const [quote, setQuote] = useState(0);
  const [hoverSuburb, setHoverSuburb] = useState<string | null>(null);

  /* Header: transparent over the hero, solid off-white past it. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Reveal marked elements once, then unobserve. */
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* Active nav section. */
  useEffect(() => {
    const nodes = NAV.map(([, h]) => document.getElementById(h.slice(1)))
      .filter((n): n is HTMLElement => !!n);
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (es) => {
        const vis = es.filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-18% 0px -62% 0px' },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* Sticky report: the document pins while the notes scroll past,
     and the matching part of the report lifts as each arrives. */
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-report]'));
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (es) => {
        const vis = es.filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setReportFocus((vis[0].target as HTMLElement).dataset.report!);
      },
      { rootMargin: '-42% 0px -42% 0px' },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* Reserve scarcity counted from live subscriptions, never hardcoded. */
  useEffect(() => {
    let off = false;
    fetch('/api/availability')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!off && d?.configured) setReserveLeft(d.remaining); })
      .catch(() => {});
    return () => { off = true; };
  }, []);

  /* Testimonials cycle one at a time. Paused for reduced motion. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setQuote((q) => (q + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);

  const dim = scrolled ? 'text-muted' : 'text-white/70';

  return (
    <>
      {/* Page-load curtain — wipes up and gets out of the way. */}
      <div className="curtain fixed inset-0 z-[90] bg-paper" aria-hidden="true" />

      {/* ══ NAV ═══════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? 'bg-paper/94 backdrop-blur-md rule' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="h-[76px] flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3.5">
              <Image
                src={scrolled ? '/logo-mark-navy.png' : '/logo-mark.png'}
                alt="" width={280} height={150} priority
                className="h-[30px] w-auto transition-opacity duration-300"
              />
              <span className={`hidden sm:block h-7 w-px transition-colors duration-300 ${
                scrolled ? 'bg-[color:var(--rule)]' : 'bg-white/25'}`} />
              <span className="hidden sm:flex flex-col leading-none">
                <span className={`display text-[19px] transition-colors duration-300 ${
                  scrolled ? 'text-ink' : 'text-paper'}`}>Coastal Pro</span>
                <span className={`label label-sm mt-[4px] transition-colors duration-300 ${dim}`}>
                  Property Care
                </span>
              </span>
            </a>

            <nav className="hidden lg:flex gap-10">
              {NAV.map(([label, href]) => (
                <a key={href} href={href}
                  className={`relative text-[14px] transition-colors duration-200 ${
                    scrolled
                      ? active === href.slice(1) ? 'text-ink' : 'text-muted hover:text-ink'
                      : 'text-white/72 hover:text-paper'}`}>
                  {label}
                  <span className={`absolute -bottom-1.5 left-0 h-px bg-brass transition-all duration-300 ${
                    active === href.slice(1) ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-7">
              {/* Highest-intent element on the page — accent + icon. */}
              <a href="tel:0417349071"
                className={`flex items-center gap-2 text-[14.5px] transition-colors duration-300 ${
                  scrolled ? 'text-brass-ink hover:text-ink' : 'text-brass-lift hover:text-paper'}`}>
                <Phone size={14} strokeWidth={1.75} />
                <span className="tnum">0417 349 071</span>
              </a>
              <Link href="/enquire"
                className={`px-6 py-[11px] text-[14px] font-medium transition-all duration-300 ${
                  scrolled ? 'bg-ink text-paper hover:bg-ink-deep' : 'bg-paper text-ink hover:bg-white'}`}>
                Enquire
              </Link>
            </div>

            <button className={`lg:hidden transition-colors duration-300 ${
              scrolled || navOpen ? 'text-ink' : 'text-paper'}`}
              onClick={() => setNavOpen(!navOpen)} aria-label="Menu" aria-expanded={navOpen}>
              {navOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="lg:hidden absolute inset-x-0 top-full border-t rule bg-paper">
            <div className="px-6 py-4 flex flex-col">
              {NAV.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setNavOpen(false)}
                  className="py-3.5 border-b rule text-[15px] text-ink last:border-0">{label}</a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* ══ 01 · HERO ═══════════════════════════════════════ */}
        <section className="relative min-h-[94vh] -mt-[76px] flex items-end overflow-hidden bg-ink">
          <div className="absolute inset-0 ken-burns">
            <Image src="/hero-bg.jpg" alt="" fill priority className="object-cover" />
          </div>
          {/* Vertical scrim keeps the photo photographic rather than
              flatly overlaid. A second, left-weighted layer carries the
              type without touching the right of the frame. */}
          <div className="absolute inset-0" style={{
            background:
              'linear-gradient(180deg, rgba(7,26,51,0.40) 0%, rgba(7,26,51,0.12) 30%, rgba(7,26,51,0.52) 74%, rgba(7,26,51,0.86) 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background:
              'linear-gradient(90deg, rgba(7,26,51,0.46) 0%, rgba(7,26,51,0.22) 42%, rgba(7,26,51,0) 72%)',
          }} />

          <div className="relative w-full mx-auto max-w-[1240px] px-6 lg:px-10 pb-[92px] lg:pb-[132px] pt-40">
            <div className="max-w-[880px]">
              <div className="hero-fade flex items-center gap-4 mb-9" style={{ animationDelay: '80ms' }}>
                <span className="block w-11 h-px bg-brass-lift" />
                <span className="label text-brass-lift">Mornington Peninsula</span>
              </div>

              {/* Line break is explicit and holds at every breakpoint. */}
              <h1 className="display display-light d1 text-paper mb-8">
                <span className="block hero-line" style={{ animationDelay: '160ms' }}>Your property.</span>
                <span className="block hero-line" style={{ animationDelay: '220ms' }}>Professionally cared for.</span>
              </h1>

              <p className="hero-line lede text-white/74 measure mb-11" style={{ animationDelay: '300ms' }}>
                Property care memberships for holiday homes and coastal residences.
                Scheduled attendance, considered oversight, and a written report after every visit.
              </p>

              <div className="hero-line flex flex-col sm:flex-row gap-3.5" style={{ animationDelay: '360ms' }}>
                <a href="#memberships"
                  className="px-9 py-[15px] bg-paper text-ink text-[15px] font-medium text-center hover:bg-white transition-colors duration-200">
                  View memberships
                </a>
                <Link href="/enquire"
                  className="px-9 py-[15px] border border-white/38 text-paper text-[15px] font-medium text-center hover:bg-white/10 hover:border-white/60 transition-all duration-200">
                  Book a property consultation
                </Link>
              </div>
            </div>
          </div>

          {/* Trust marks — no pills. Small-caps, hairline dividers. */}
          <div className="absolute bottom-0 inset-x-0 border-t rule-dark hero-fade" style={{ animationDelay: '520ms' }}>
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <div className="flex flex-wrap">
                {['Fully insured', 'Qualified carpenters', 'Locally based'].map((t, i) => (
                  <div key={t} className={`py-[18px] pr-8 lg:pr-14 ${i > 0 ? 'pl-8 lg:pl-14 border-l rule-dark' : ''}`}>
                    <span className="label text-white/60">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 02 · THE PROBLEM ════════════════════════════════ */}
        <section className="bg-sand">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-20">
              <div className="lg:col-span-5">
                <div className="reveal lg:sticky lg:top-32">
                  <span className="label text-muted block mb-8">The problem</span>
                  <h2 className="display display-light d2 text-ink mb-7">
                    Who checks your property when you are not there?
                  </h2>
                  <p className="lede text-muted measure-sm">
                    Distance is the whole difficulty. Nothing about a coastal house
                    fails suddenly — it fails slowly, unobserved.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                {CONCERNS.map((c, i) => (
                  <div key={c.index}
                    style={{ transitionDelay: `${i * 100}ms` }}
                    className={`reveal py-11 ${i > 0 ? 'border-t rule' : 'lg:pt-0'}`}>
                    {/* Large, light, faint — sits above the heading. */}
                    <span className="numeral block text-[48px] leading-none text-ink/[0.13] mb-5">
                      {c.index}
                    </span>
                    <h3 className="display d3 text-ink mb-4">{c.title}</h3>
                    <p className="text-[16px] leading-[1.68] text-muted measure">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 03 · PROCESS ════════════════════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="reveal max-w-[620px] mb-16 lg:mb-24">
              <span className="label text-muted block mb-8">How it works</span>
              <h2 className="display display-light d2 text-ink">
                Three steps, repeated with discipline.
              </h2>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-x-16">
              {/* Thin line connecting the numerals. */}
              <span aria-hidden className="hidden md:block absolute top-[13px] left-[8%] right-[8%] h-px bg-[color:var(--rule)]" />
              {PROCESS.map((s, i) => (
                <div key={s.index} style={{ transitionDelay: `${i * 100}ms` }} className="reveal relative">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="relative z-10 bg-paper pr-4 numeral text-[26px] leading-none text-brass-ink">
                      {s.index}
                    </span>
                  </div>
                  <h3 className="display d3 text-ink mb-4">{s.title}</h3>
                  <p className="text-[16px] leading-[1.68] text-muted measure">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 04 · MEMBERSHIPS ════════════════════════════════ */}
        <section id="memberships" className="bg-paper border-y rule">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-8">
              <div className="max-w-[560px]">
                <span className="label text-muted block mb-8">Memberships</span>
                <h2 className="display display-light d2 text-ink">
                  Three levels of care.<br />One trusted team.
                </h2>
              </div>

              <div className="inline-flex border rule self-start lg:self-auto bg-paper">
                {(['Monthly', 'Annual'] as const).map((l) => {
                  const on = (l === 'Annual') === annual;
                  return (
                    <button key={l} onClick={() => setAnnual(l === 'Annual')}
                      className={`px-6 py-2.5 text-[13px] font-medium transition-colors duration-200 ${
                        l === 'Annual' ? 'border-l rule' : ''} ${
                        on ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}>
                      {l}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Emergency promise — the thing an anxious owner most wants
                to hear, stated rather than implied. */}
            <p className="reveal text-[15.5px] leading-[1.7] text-muted measure border-l-2 border-brass pl-6 mb-16">
              If we find something urgent while you are away, we make it safe
              immediately and tell you the same day, with photographs. Every tier.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
              {PLANS.map((plan, i) => {
                const isReserve = plan.id === 'reserve';
                const isSig = plan.id === 'signature';
                return (
                  <div key={plan.id} style={{ transitionDelay: `${i * 100}ms` }} className="reveal flex flex-col">
                    {/* Label sits ABOVE the card, outside it. */}
                    <div className="h-7 flex items-end mb-3">
                      {isSig && <span className="label text-brass-ink">Most chosen</span>}
                    </div>

                    <div className={`flex flex-col flex-1 p-9 lg:p-10 border ${
                      isSig ? 'bg-paper-warm border-[color:var(--rule)]' : 'bg-transparent border-[color:var(--rule)]'
                    }`}>
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className={`display d3 ${isReserve ? 'text-brass-ink' : 'text-ink'}`}>{plan.name}</h3>
                        <span className="numeral text-[13px] text-ink/25">{plan.index}</span>
                      </div>
                      <p className="text-[15px] text-muted measure-sm mb-9">{plan.line}</p>

                      {/* $ small and raised, number large in the serif,
                          period small and quiet underneath. */}
                      <div className="mb-2">
                        <span key={annual ? 'a' : 'm'} className="hero-fade inline-flex items-start">
                          <span className="display text-[19px] text-ink/55 mt-[10px] mr-[3px]">$</span>
                          <span className="display display-light text-[54px] leading-[0.95] text-ink tnum">
                            {annual ? plan.annual.toLocaleString() : plan.price}
                          </span>
                        </span>
                      </div>
                      <p className="text-[13.5px] text-muted mb-2">
                        {annual ? 'per year' : 'per month'}
                      </p>
                      {annual && (
                        <span className="hero-fade inline-block self-start label text-brass-ink border rule px-2.5 py-1 mb-2">
                          Save ${(plan.price * 12 - plan.annual).toLocaleString()}
                        </span>
                      )}

                      <div className="py-4 border-y rule my-8">
                        <span className="text-[14px] text-ink">{plan.cadence}</span>
                      </div>

                      {/* Inherited features muted, new ones full ink —
                          the upgrade reads at a glance. */}
                      <ul className="space-y-3 mb-9 flex-1">
                        {plan.inherited.map((f) => (
                          <li key={f} className="flex gap-3.5 text-[14.5px] leading-[1.5] text-muted/75">
                            <span className="mt-[10px] w-2.5 h-px bg-[color:var(--rule)] shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                        {plan.added.map((f) => (
                          <li key={f} className="flex gap-3.5 text-[14.5px] leading-[1.5] text-text">
                            <span className="mt-[8px] w-[3px] h-[3px] rounded-full bg-brass shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {isReserve && (
                        <p className="label text-brass-ink border rule px-4 py-3 mb-6 text-center">
                          {reserveLeft !== null
                            ? reserveLeft > 0
                              ? `${reserveLeft} of ${RESERVE_CAP} remaining`
                              : 'Fully subscribed — waitlist open'
                            : plan.note}
                        </p>
                      )}

                      <Link href={`/enquire?plan=${plan.id}`}
                        className={`block w-full py-[14px] text-center text-[14px] font-medium transition-colors duration-200 ${
                          isReserve ? 'bg-brass-ink text-paper hover:bg-ink'
                          : isSig ? 'bg-ink text-paper hover:bg-ink-deep'
                          : 'border border-[color:var(--ink)] text-ink hover:bg-ink hover:text-paper'}`}>
                        {plan.cta}
                      </Link>
                      <p className="text-[12.5px] text-muted mt-4 text-center">
                        {plan.discount}% off eligible carpentry works
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="label text-muted mt-14 measure leading-[1.9]">
              Memberships cover oversight, attendance and reporting. Repair work is quoted separately.
            </p>
          </div>
        </section>

        {/* ══ 05 · COMPARISON ═════════════════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <button onClick={() => setShowTable(!showTable)} aria-expanded={showTable}
              className="w-full flex items-center justify-between py-9 border-b rule group">
              <span className="display d4 text-ink">Compare all inclusions</span>
              <ChevronDown size={22} strokeWidth={1.5}
                className={`text-muted group-hover:text-ink transition-all duration-300 ${showTable ? 'rotate-180' : ''}`} />
            </button>

            {showTable && (
              <div className="overflow-x-auto pb-[88px] lg:pb-[120px]">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="border-b rule">
                      <th className="label text-muted font-semibold py-6 pr-6">Inclusion</th>
                      {['Essential', 'Signature', 'Reserve'].map((t) => (
                        <th key={t} className={`label font-semibold py-6 px-6 text-center w-[128px] ${
                          t === 'Reserve' ? 'text-brass-ink' : 'text-muted'}`}>{t}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.feature} className="border-b rule">
                        <td className="py-[18px] pr-6 text-[15px] text-text">{row.feature}</td>
                        {(['essential', 'signature', 'reserve'] as const).map((t) => (
                          <td key={t} className="py-[18px] px-6">
                            {row[t]
                              ? <span className={`block w-[5px] h-[5px] rounded-full mx-auto ${
                                  t === 'reserve' ? 'bg-brass' : 'bg-ink/45'}`} />
                              : <span className="block w-3 h-px bg-ink/12 mx-auto" />}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ══ 06 · THE REPORT — the centrepiece ═══════════════ */}
        <section id="report" className="bg-ink text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="reveal max-w-[620px] mb-16 lg:mb-24">
              <span className="label text-brass-lift block mb-8">The artefact</span>
              <h2 className="display display-light d2 text-paper mb-7">The Property Care Report</h2>
              <p className="lede text-white/64 measure">
                The membership is the service. The report is the proof of it — delivered
                after every visit, archived for the life of the property.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-20 items-start">
              {/* Document pins while the notes scroll past. */}
              <div className="lg:col-span-7">
                <div className="lg:sticky lg:top-28">
                  <div className="bg-white text-text p-8 lg:p-11 doc-shadow rotate-[-0.7deg]">
                    <div className="flex items-start justify-between pb-6 border-b rule">
                      <div>
                        <p className="label text-muted mb-2">Property Care Report</p>
                        <p className="display d4 text-ink">14 Point Nepean Road</p>
                        <p className="label label-sm text-brass-ink mt-2">Sample — not a real property</p>
                      </div>
                      <div className="text-right shrink-0 pl-6">
                        <p className="label text-muted mb-2">Visit</p>
                        <p className="text-[14px] text-ink tnum">12 Jun 2026</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 py-6 border-b rule">
                      {[['Attendance', 'Scheduled'], ['Duration', '48 minutes'], ['Attended by', 'D. Sidebottom']].map(([k, v]) => (
                        <div key={k}>
                          <p className="label text-muted mb-2">{k}</p>
                          <p className="text-[14px] text-text">{v}</p>
                        </div>
                      ))}
                    </div>

                    <div className={`py-7 border-b rule transition-opacity duration-500 ${
                      reportFocus === 'condition' ? 'opacity-100' : 'opacity-40'}`}>
                      <p className="label text-muted mb-6">Condition assessment</p>
                      <div className="space-y-4">
                        {REPORT_CONDITIONS.map((c) => (
                          <div key={c.area} className="flex items-center gap-5">
                            <span className="text-[14px] text-text w-[168px] shrink-0">{c.area}</span>
                            <span className="flex-1 h-[3px] bg-ink/10 relative">
                              <span className="absolute inset-y-0 left-0"
                                style={{ width: `${c.pct}%`, background: TONE[c.tone] }} />
                            </span>
                            <span className="flex items-center gap-2 w-[86px] shrink-0 justify-end">
                              <span className="w-[5px] h-[5px] rounded-full" style={{ background: TONE[c.tone] }} />
                              <span className="text-[13px] text-muted">{c.rating}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`py-7 border-b rule transition-opacity duration-500 ${
                      reportFocus === 'findings' ? 'opacity-100' : 'opacity-40'}`}>
                      <p className="label text-muted mb-6">Findings</p>
                      <div className="space-y-4">
                        {REPORT_FINDINGS.map((f) => (
                          <div key={f.text} className="flex items-baseline gap-4">
                            <span className="flex items-center gap-2 w-[86px] shrink-0">
                              <span className="w-[5px] h-[5px] rounded-full" style={{ background: TONE[f.tone] }} />
                              <span className="label" style={{ color: TONE[f.tone] }}>{f.level}</span>
                            </span>
                            <span className="text-[14.5px] text-text flex-1">{f.text}</span>
                            {f.quoted && <span className="text-[12px] text-muted shrink-0">Quote attached</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`pt-6 transition-opacity duration-500 ${
                      reportFocus === 'archive' ? 'opacity-100' : 'opacity-40'}`}>
                      <p className="text-[13px] text-muted">
                        22 photographs attached · Next scheduled attendance 26 June 2026
                      </p>
                    </div>
                  </div>

                  <a href="/sample-report"
                    className="inline-flex items-center gap-2 mt-8 text-[14.5px] text-brass-lift hover:text-paper transition-colors">
                    See a full sample report
                    <ArrowUpRight size={15} strokeWidth={1.75} />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                {[
                  { k: 'condition', t: 'Every area rated, every visit', b: 'Roofline, timber, paint and drainage are scored the same way each time, so change is visible across months rather than guessed at.' },
                  { k: 'findings', t: 'Findings priced before they are discussed', b: 'Anything we find arrives with photographs and a fixed price. Nothing proceeds without your written approval.' },
                  { k: 'archive', t: 'Archived for the life of the property', b: 'Reports accumulate into a maintenance record — what was done, when, and what is coming due. Useful at sale, essential at claim.' },
                ].map((item, i) => (
                  <div key={item.k} data-report={item.k}
                    className={`reveal py-14 lg:py-[120px] ${i > 0 ? 'border-t rule-dark' : 'lg:pt-0'}`}>
                    <h3 className="display d3 text-paper mb-4">{item.t}</h3>
                    <p className="text-[16px] leading-[1.7] text-white/62 measure">{item.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 07 · CARPENTRY ══════════════════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[72px] lg:py-[104px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-20 items-center">
              <div className="reveal lg:col-span-6">
                <span className="label text-muted block mb-6">Carpentry and repairs</span>
                <h2 className="display display-light d3 text-ink mb-4">We can also fix what we find.</h2>
                <p className="text-[16px] leading-[1.68] text-muted measure">
                  Qualified carpenters, licensed trades, and a single point of coordination.
                  Members receive a standing discount on eligible works.
                </p>
              </div>
              <div className="reveal lg:col-span-6">
                <div className="grid grid-cols-3 border-t rule">
                  {[['5%', 'Essential'], ['10%', 'Signature'], ['15%', 'Reserve']].map(([p, t], i) => (
                    <div key={t} className={`pt-7 ${i > 0 ? 'pl-6 border-l rule' : ''}`}>
                      <span className={`numeral block text-[38px] leading-none mb-3 ${
                        t === 'Reserve' ? 'text-brass-ink' : 'text-ink'}`}>{p}</span>
                      <span className="label text-muted">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 08 · COVERAGE ═══════════════════════════════════ */}
        <section id="coverage" className="bg-sand border-y rule">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-20 items-center">
              <div className="reveal lg:col-span-5">
                <span className="label text-muted block mb-8">Coverage</span>
                <h2 className="display display-light d2 text-ink mb-6">
                  We work the length of the Peninsula.
                </h2>
                <p className="text-[16px] leading-[1.68] text-muted measure mb-10">
                  If your property sits outside these suburbs, speak to us. We take on
                  work beyond this list where the schedule allows.
                </p>

                <ul className="border-t rule">
                  {SUBURBS.map((s) => (
                    <li key={s.name}
                      onMouseEnter={() => setHoverSuburb(s.name)}
                      onMouseLeave={() => setHoverSuburb(null)}
                      className="border-b rule py-3 flex items-baseline justify-between cursor-default transition-colors">
                      <span className={`display d4 transition-colors duration-200 ${
                        hoverSuburb === s.name ? 'text-brass-ink' : 'text-ink'}`}>{s.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        hoverSuburb === s.name ? 'bg-brass scale-150' : 'bg-ink/20'}`} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thin-stroke coastline. Suburb positions are derived from
                  real lat/long, so the run of the coast is true. */}
              <div className="reveal lg:col-span-7">
                <svg viewBox="0 0 600 260" className="w-full h-auto" role="img"
                  aria-label="Stylised map of the Mornington Peninsula showing serviced suburbs">
                  <path d="M556 8 C 520 34, 470 74, 404 96 C 330 121, 262 134, 196 148 C 150 158, 110 142, 74 116 C 52 100, 34 86, 20 78"
                    fill="none" stroke="var(--ink)" strokeOpacity="0.32" strokeWidth="1.25" strokeLinecap="round" />
                  <path d="M566 30 C 528 60, 476 100, 408 124 C 332 150, 258 164, 190 176 C 142 185, 100 168, 62 138 C 40 120, 24 106, 12 98"
                    fill="none" stroke="var(--ink)" strokeOpacity="0.14" strokeWidth="1" strokeLinecap="round"
                    strokeDasharray="2 5" />
                  {SUBURBS.map((s) => {
                    const on = hoverSuburb === s.name;
                    const cx = s.x * 0.92 + 22;
                    const cy = s.y * 0.72 + 22;
                    return (
                      <g key={s.name}
                        onMouseEnter={() => setHoverSuburb(s.name)}
                        onMouseLeave={() => setHoverSuburb(null)}
                        style={{ cursor: 'default' }}>
                        <circle cx={cx} cy={cy} r={on ? 5 : 3}
                          fill={on ? 'var(--brass)' : 'var(--ink)'}
                          fillOpacity={on ? 1 : 0.42}
                          style={{ transition: 'all 200ms var(--ease)' }} />
                        <text x={cx} y={cy - 13} textAnchor="middle"
                          fontSize="10.5" letterSpacing="1.6"
                          fill={on ? 'var(--brass-ink)' : 'var(--muted)'}
                          fontWeight={on ? 600 : 400}
                          style={{ textTransform: 'uppercase', transition: 'all 200ms var(--ease)' }}>
                          {s.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <p className="label text-muted/70 mt-6">Indicative — not to scale</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 09 · WHO WE ARE ═════════════════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-20 items-center">
              <div className="reveal lg:col-span-6">
                <div className="relative aspect-[16/10] bg-ink/[0.06] border rule flex items-center justify-center">
                  <div className="text-center px-8">
                    <p className="label text-ink/35 mb-2">Photograph required</p>
                    <p className="text-[14px] text-muted measure-sm mx-auto">
                      Team and vehicle, coastal light, mid-work rather than posed. Wide cinematic crop.
                    </p>
                  </div>
                </div>
              </div>

              <div className="reveal lg:col-span-5 lg:col-start-8" style={{ transitionDelay: '100ms' }}>
                <span className="label text-muted block mb-8">Who we are</span>
                <h2 className="display display-light d2 text-ink mb-8">
                  We live and work on the Peninsula.
                </h2>
                <div className="space-y-5 text-[16.5px] leading-[1.7] text-muted measure">
                  <p>
                    We are not a franchise and not a call centre. We are a small local team of
                    qualified carpenters who look after a limited number of properties properly,
                    rather than a large number superficially.
                  </p>
                  <p>
                    We know what a westerly does to a deck, what salt does to fixings, and which
                    houses on which streets need watching after a big blow.
                  </p>
                </div>

                {/* Anonymity is the enemy of trust when you hold the keys. */}
                <ul className="mt-10 border-t rule">
                  {[
                    ['Dale', 'Carpenter — Cert III Carpentry, [licence no.]'],
                    ['[Name]', '[Trade and qualification]'],
                  ].map(([n, r]) => (
                    <li key={n} className="py-4 border-b rule flex items-baseline gap-5">
                      <span className="display d4 text-ink w-[92px] shrink-0">{n}</span>
                      <span className="text-[14.5px] text-muted">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 10 · AGENCIES ═══════════════════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="reveal border-y rule py-11 flex flex-col lg:flex-row lg:items-center justify-between gap-7">
              <div className="measure">
                <span className="label text-muted block mb-3">For agencies and property managers</span>
                <p className="display d4 text-ink">
                  Portfolio oversight, white-labelled reporting and volume terms.
                </p>
              </div>
              <Link href="/enquire?plan=undecided"
                className="shrink-0 px-8 py-[13px] border border-[color:var(--ink)] text-ink text-[14px] font-medium text-center hover:bg-ink hover:text-paper transition-colors duration-200">
                Enquire for a portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* ══ 11 · TESTIMONIALS ═══════════════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[140px]">
            <div className="reveal max-w-[900px]">
              <span className="label text-muted block mb-12">In their words</span>

              <div className="grid min-h-[220px] lg:min-h-[200px]">
                {TESTIMONIALS.map((t, i) => (
                  <figure key={t.name}
                    aria-hidden={i !== quote}
                    className={`col-start-1 row-start-1 transition-opacity duration-700 ${
                      i === quote ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <blockquote className="display display-light text-[clamp(1.45rem,2.9vw,2.3rem)] leading-[1.32] text-ink mb-9">
                      {t.quote}
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <span className="label text-muted">{t.name}</span>
                      <span className="w-5 h-px bg-[color:var(--rule)]" />
                      <span className="label text-brass-ink">{t.place}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="flex gap-2.5 mt-12">
                {TESTIMONIALS.map((t, i) => (
                  <button key={t.name} onClick={() => setQuote(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`h-px transition-all duration-500 ${
                      i === quote ? 'w-12 bg-brass' : 'w-6 bg-ink/20 hover:bg-ink/40'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 12 · FAQ ════════════════════════════════════════ */}
        <section id="faq" className="bg-sand border-y rule">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-20">
              <div className="lg:col-span-4">
                <div className="reveal lg:sticky lg:top-32">
                  <span className="label text-muted block mb-8">Questions</span>
                  <h2 className="display display-light d2 text-ink">Before you commit.</h2>
                </div>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <div className="border-t rule">
                  {FAQS.map((faq) => {
                    const open = openFaq === faq.id;
                    return (
                      <div key={faq.id} className="border-b rule">
                        <button onClick={() => setOpenFaq(open ? null : faq.id)}
                          aria-expanded={open} aria-controls={`faq-${faq.id}`}
                          className="w-full flex items-start justify-between gap-8 py-[30px] text-left group">
                          <span className="display d4 text-ink">{faq.q}</span>
                          {/* Plus rotates to a minus. */}
                          <Plus size={19} strokeWidth={1.5}
                            className={`shrink-0 mt-1 text-muted group-hover:text-ink transition-transform duration-[420ms] ${
                              open ? 'rotate-[135deg]' : ''}`}
                            style={{ transitionTimingFunction: 'var(--ease)' }} />
                        </button>
                        <div id={`faq-${faq.id}`} className={`collapse ${open ? 'open' : ''}`}>
                          <div>
                            <p className="pb-[30px] pr-12 text-[16px] leading-[1.72] text-muted measure">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 13 · CLOSE — bookend to the hero ════════════════ */}
        <section id="contact" className="bg-ink text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[104px] lg:py-[176px] text-center">
            <div className="reveal">
              <div className="flex items-center justify-center gap-4 mb-10">
                <span className="block w-11 h-px bg-brass-lift" />
                <span className="label text-brass-lift">One call</span>
                <span className="block w-11 h-px bg-brass-lift" />
              </div>

              <h2 className="display display-light d1 text-paper mb-8">We take care of it all.</h2>

              <p className="lede text-white/64 max-w-[520px] mx-auto mb-14">
                Tell us about the property and we will arrange a consultation.
                No obligation, and no pressure to proceed.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:0417349071"
                  className="w-full sm:w-auto px-10 py-[15px] bg-paper text-ink text-[15px] font-medium hover:bg-white transition-colors duration-200 inline-flex items-center justify-center gap-2.5">
                  <Phone size={15} strokeWidth={1.75} />
                  <span className="tnum">0417 349 071</span>
                </a>
                <Link href="/enquire"
                  className="w-full sm:w-auto px-10 py-[15px] border border-white/38 text-paper text-[15px] font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-200">
                  Send an enquiry
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ FOOTER — spare ══════════════════════════════════ */}
        <footer className="bg-ink-deep text-white/50">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b rule-dark">
              <div>
                <Image src="/logo-mark.png" alt="Coastal Pro Property Care"
                  width={280} height={150} className="h-[34px] w-auto mb-5 opacity-90" />
                <p className="label text-white/40">ABN [ABN]</p>
                <p className="label text-white/40 mt-2">Fully insured · Licensed</p>
              </div>
              <div>
                <p className="label text-white/70 mb-4">Service area</p>
                <p className="text-[14.5px] leading-[1.6]">Mornington Peninsula, Victoria</p>
              </div>
              <div>
                <p className="label text-white/70 mb-4">Hours</p>
                <p className="text-[14.5px] leading-[1.6]">
                  Monday to Friday, 8am — 6pm<br />Weekends by arrangement
                </p>
              </div>
              <div>
                <p className="label text-white/70 mb-4">Contact</p>
                <a href="tel:0417349071" className="block text-[14.5px] text-brass-lift hover:text-paper transition-colors tnum mb-1.5">
                  0417 349 071
                </a>
                <Link href="/enquire" className="block text-[14.5px] hover:text-paper transition-colors">
                  Send an enquiry
                </Link>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[13px]">© 2026 Coastal Pro Property Care</span>
              <div className="flex gap-8">
                <Link href="/terms" className="text-[13px] hover:text-paper transition-colors">Terms</Link>
                <Link href="/privacy" className="text-[13px] hover:text-paper transition-colors">Privacy</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ══ MOBILE BAR ══════════════════════════════════════ */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden grid grid-cols-2 border-t rule-dark">
        <a href="tel:0417349071"
          className="flex items-center justify-center gap-2 py-4 bg-ink text-paper text-[14px] font-medium">
          <Phone size={15} strokeWidth={1.75} />Call
        </a>
        <Link href="/enquire"
          className="flex items-center justify-center py-4 bg-paper text-ink text-[14px] font-medium border-l rule">
          Enquire
        </Link>
      </div>
      <div className="h-14 lg:hidden" />
    </>
  );
}
