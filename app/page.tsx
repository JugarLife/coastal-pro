'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Plus, Phone, Menu, X, ArrowUpRight, Download, Check } from 'lucide-react';
import { track } from '@vercel/analytics';
import {
  TAGLINE, PLANS, MEMBERSHIP_BENEFITS, COMPARISON, CONCERNS, PROCESS,
  CARE_SERVICES, TRADE_SERVICES, COORDINATED, COORDINATION_INCLUDES, LICENSING_NOTICE,
  ASSESSMENT_AREAS, ASSESSMENT_DELIVERABLES, ASSESSMENT_REASONS, IDEAL_FOR,
  WHY_US, WHY_WE_EXIST, REPORT_CONDITIONS, REPORT_FINDINGS,
  SUBURBS, WIDER_AREA, FAQS, TESTIMONIALS,
} from './data';

const PREMIUM_CAP = 5;
const TONE = { amber: 'var(--amber)', stone: 'var(--stone)', sage: 'var(--sage)' } as const;

const NAV = [
  ['Services', '#services'],
  ['Memberships', '#memberships'],
  ['The report', '#report'],
  ['Coverage', '#coverage'],
  ['Questions', '#faq'],
] as const;

const PILLARS = ['Inspections', 'Maintenance', 'Specialist coordination', 'Carpentry & repairs', 'Peace of mind'];

/* Per-section download of the matching brochure page. */
function Brochure({ slug, dark = false }: { slug: string; dark?: boolean }) {
  return (
    <a
      href={`/brochure/${slug}.pdf`}
      download
      onClick={() => track('brochure_download', { section: slug })}
      className={`inline-flex items-center gap-2.5 label transition-colors duration-200 ${
        dark ? 'text-white/50 hover:text-brass-lift' : 'text-muted hover:text-brass-ink'
      }`}
    >
      <Download size={13} strokeWidth={1.75} />
      Download as PDF
    </a>
  );
}

/* ── Section header variants ──────────────────────────────────
   Four shapes, distributed so no two adjacent sections open the
   same way. A uniform header is what made the page feel uniform
   even where the layouts underneath differed. */

/* A · Stacked — eyebrow, headline, lede in a column. */
function HeadA({ eyebrow, title, lede, children }: {
  eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <div className="reveal max-w-[640px] mb-16 lg:mb-20">
      <span className="label text-muted block mb-8">{eyebrow}</span>
      <h2 className="display display-light d2 text-ink mb-7">{title}</h2>
      {lede && <p className="lede text-muted measure">{lede}</p>}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}

/* B · Split — headline left, lede right, under a full rule. */
function HeadB({ eyebrow, title, lede, children, dark = false }: {
  eyebrow: string; title: React.ReactNode; lede?: React.ReactNode;
  children?: React.ReactNode; dark?: boolean;
}) {
  return (
    <div className="reveal mb-16 lg:mb-24">
      <div className={`flex items-center justify-between gap-6 pb-6 border-b ${dark ? 'rule-dark' : 'rule'}`}>
        <span className={`label ${dark ? 'text-brass-lift' : 'text-muted'}`}>{eyebrow}</span>
        {children}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-7 lg:gap-x-20 pt-10 lg:pt-12">
        <h2 className={`lg:col-span-6 display display-light d2 ${dark ? 'text-paper' : 'text-ink'}`}>{title}</h2>
        {lede && (
          <p className={`lg:col-span-5 lg:col-start-8 lede measure self-end ${dark ? 'text-white/64' : 'text-muted'}`}>
            {lede}
          </p>
        )}
      </div>
    </div>
  );
}

/* C · Centred — flanked eyebrow. Reserved for moments that earn it. */
function HeadC({ eyebrow, title, lede, dark = false }: {
  eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; dark?: boolean;
}) {
  return (
    <div className="reveal text-center mb-16 lg:mb-20">
      <div className="flex items-center justify-center gap-4 mb-9">
        <span className={`block w-11 h-px ${dark ? 'bg-brass-lift' : 'bg-brass'}`} />
        <span className={`label ${dark ? 'text-brass-lift' : 'text-brass-ink'}`}>{eyebrow}</span>
        <span className={`block w-11 h-px ${dark ? 'bg-brass-lift' : 'bg-brass'}`} />
      </div>
      <h2 className={`display display-light d2 mx-auto max-w-[780px] ${dark ? 'text-paper' : 'text-ink'}`}>{title}</h2>
      {lede && (
        <p className={`lede mx-auto max-w-[560px] mt-7 ${dark ? 'text-white/64' : 'text-muted'}`}>{lede}</p>
      )}
    </div>
  );
}

/* D · Oversized index — a large faint numeral carries the eyebrow. */
function HeadD({ index, eyebrow, title, lede, children }: {
  index: string; eyebrow: string; title: React.ReactNode;
  lede?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <div className="reveal mb-16 lg:mb-20">
      <div className="flex items-start gap-8 lg:gap-12">
        <span className="numeral text-[clamp(3rem,7vw,5.5rem)] leading-[0.8] text-ink/[0.11] shrink-0">
          {index}
        </span>
        <div className="max-w-[660px] pt-1">
          <span className="label text-muted block mb-6">{eyebrow}</span>
          <h2 className="display display-light d2 text-ink mb-7">{title}</h2>
          {lede && <p className="lede text-muted measure">{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [premiumLeft, setPremiumLeft] = useState<number | null>(null);
  const [reportFocus, setReportFocus] = useState('condition');
  const [quote, setQuote] = useState(0);
  const [hoverSuburb, setHoverSuburb] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  useEffect(() => {
    let off = false;
    fetch('/api/availability')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (!off && d?.configured) setPremiumLeft(d.remaining); })
      .catch(() => {});
    return () => { off = true; };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setQuote((q) => (q + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);

  /* Scroll depth, reported once per milestone per visit. Tells us whether
     people reach the pricing or fall out at the problem section. */
  useEffect(() => {
    const marks = [25, 50, 75, 100];
    const seen = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const m of marks) {
        if (pct >= m && !seen.has(m)) {
          seen.add(m);
          track('scroll_depth', { depth: m });
        }
      }
      if (seen.size === marks.length) window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dim = scrolled ? 'text-muted' : 'text-white/70';

  return (
    <>
      <div className="curtain fixed inset-0 z-[90] bg-paper" aria-hidden="true" />

      {/* ══ NAV ═══════════════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'bg-paper/94 backdrop-blur-md rule' : 'bg-transparent border-transparent'}`}>
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="h-[76px] flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3.5">
              <Image src={scrolled ? '/logo-mark-navy.png' : '/logo-mark.png'} alt=""
                width={280} height={150} priority className="h-[30px] w-auto" />
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

            <nav className="hidden lg:flex gap-8">
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
              <a href="tel:0417349071" onClick={() => track('phone_click')}
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
            <Image src="/hero-coast.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background:
            'linear-gradient(180deg, rgba(7,26,51,0.40) 0%, rgba(7,26,51,0.12) 30%, rgba(7,26,51,0.52) 74%, rgba(7,26,51,0.86) 100%)' }} />
          <div className="absolute inset-0" style={{ background:
            'linear-gradient(90deg, rgba(7,26,51,0.46) 0%, rgba(7,26,51,0.22) 42%, rgba(7,26,51,0) 72%)' }} />

          <div className="relative w-full mx-auto max-w-[1240px] px-6 lg:px-10 pb-20 lg:pb-[132px] pt-40">
            <div className="max-w-[880px]">
              <div className="hero-fade flex items-center gap-4 mb-9" style={{ animationDelay: '80ms' }}>
                <span className="block w-11 h-px bg-brass-lift" />
                <span className="label text-brass-lift">Mornington Peninsula</span>
              </div>

              <h1 className="display display-light d1 text-paper mb-7">
                <span className="block hero-line" style={{ animationDelay: '160ms' }}>Your property.</span>
                <span className="block hero-line" style={{ animationDelay: '220ms' }}>Professionally cared for.</span>
              </h1>

              <p className="hero-line display text-[clamp(1.1rem,1.6vw,1.4rem)] text-brass-lift mb-7"
                style={{ animationDelay: '280ms' }}>
                {TAGLINE}
              </p>

              <p className="hero-line lede text-white/74 measure mb-11" style={{ animationDelay: '330ms' }}>
                Premium property care and maintenance for homes on the Mornington Peninsula.
                Whether you are local, interstate or overseas, we become your single point of contact.
              </p>

              <div className="hero-line flex flex-col sm:flex-row gap-3.5" style={{ animationDelay: '380ms' }}>
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

        {/* ══ PILLARS STRIP ═══════════════════════════════════ */}
        <section className="bg-ink-deep text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-5 border-x-0">
              {PILLARS.map((p, i) => (
                <div key={p} className={`py-7 lg:py-8 px-2 lg:px-5 ${i > 0 ? 'md:border-l rule-dark' : ''} ${
                  i % 2 === 1 ? 'border-l rule-dark md:border-l' : ''} ${i >= 2 ? 'border-t rule-dark md:border-t-0' : ''}`}>
                  <span className="label text-white/62 block text-center">{p}</span>
                </div>
              ))}
            </div>
            <p className="text-center py-7 border-t rule-dark display text-[clamp(1rem,1.5vw,1.3rem)] text-paper">
              Complete property care. <span className="text-brass-lift">Total peace of mind.</span>
            </p>
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
                  <div key={c.index} style={{ transitionDelay: `${i * 100}ms` }}
                    className={`reveal py-11 ${i > 0 ? 'border-t rule' : 'lg:pt-0'}`}>
                    <span className="numeral block text-[48px] leading-none text-ink/[0.13] mb-5">{c.index}</span>
                    <h3 className="display d3 text-ink mb-4">{c.title}</h3>
                    <p className="text-[16px] leading-[1.68] text-muted measure">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 03 · PROPERTY CARE SERVICES ═════════════════════ */}
        <section id="services" className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <HeadB eyebrow="Property care services"
              title={<>Your eyes and ears on the Peninsula.</>}
              lede="From regular inspections and security checks to pre-arrival preparation and storm monitoring, we make sure your property is safe, secure and always ready for you.">
              <Brochure slug="property-care-services" />
            </HeadB>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-16">
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CARE_SERVICES.map((sv, i) => (
                    <div key={sv.index} style={{ transitionDelay: `${i * 70}ms` }}
                      className={`reveal tile ${i === 0 ? 'sm:col-span-2' : ''}`}>
                      <span className="numeral text-[26px] leading-none text-brass-ink block mb-5">{sv.index}</span>
                      <h3 className="display d4 text-ink mb-2.5">{sv.title}</h3>
                      <p className="text-[15px] leading-[1.6] text-muted">{sv.body}</p>
                    </div>
                  ))}
                </div>
                <p className="reveal display text-[clamp(1.1rem,1.6vw,1.35rem)] text-ink mt-12 border-l-2 border-brass pl-6 leading-[1.4]">
                  We look after your property like it is our own.
                </p>
              </div>

              <div className="reveal lg:col-span-4 lg:col-start-9">
                <div className="lg:sticky lg:top-28">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src="/img/cliff.jpg" alt="Mornington Peninsula coastline"
                      fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <p className="label text-muted mt-5">Mornington Peninsula</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 04 · PROCESS ════════════════════════════════════ */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[140px]">
            <div className="reveal max-w-[620px] mb-16 lg:mb-20">
              <span className="label text-brass-lift block mb-8">How it works</span>
              <h2 className="display display-light d2 text-paper">Three steps, repeated with discipline.</h2>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-x-16">
              <span aria-hidden className="hidden md:block absolute top-[13px] left-[8%] right-[8%] h-px bg-[color:var(--rule-dark)]" />
              {PROCESS.map((s, i) => (
                <div key={s.index} style={{ transitionDelay: `${i * 100}ms` }} className="reveal relative">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="relative z-10 bg-ink pr-4 numeral text-[26px] leading-none text-brass-lift">
                      {s.index}
                    </span>
                  </div>
                  <h3 className="display d3 text-paper mb-4">{s.title}</h3>
                  <p className="text-[16px] leading-[1.68] text-white/64 measure">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 05 · MEMBERSHIPS ════════════════════════════════ */}
        <section id="memberships" className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-8">
              <div className="max-w-[620px]">
                <span className="label text-muted block mb-8">Membership packages</span>
                <h2 className="display display-light d2 text-ink mb-7">
                  Choose the level of care that is right for your property.
                </h2>
                <p className="lede text-muted measure">
                  Every property owner has different needs. Whether you are looking for routine peace
                  of mind or complete property oversight, there is a package designed to protect your investment.
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-5">
                <div className="inline-flex border rule bg-paper">
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
                <Brochure slug="memberships" />
              </div>
            </div>

            <p className="reveal text-[15.5px] leading-[1.7] text-muted measure border-l-2 border-brass pl-6 mb-16">
              If we find something urgent while you are away, we make it safe immediately and tell
              you the same day, with photographs. Every package includes rapid response, access
              management and professional reporting.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
              {PLANS.map((plan, i) => {
                const isPremium = plan.id === 'premium';
                const isSig = plan.id === 'signature';
                return (
                  <div key={plan.id} style={{ transitionDelay: `${i * 100}ms` }} className="reveal flex flex-col">
                    <div className="h-7 flex items-end mb-3">
                      {isSig && <span className="label text-brass-ink">{plan.note}</span>}
                    </div>

                    <div className={`flex flex-col flex-1 p-9 lg:p-10 border ${
                      isSig ? 'bg-ink border-[color:var(--ink)] lg:-my-4 lg:py-14 shadow-[0_18px_50px_rgba(7,26,51,0.18)]'
                      : isPremium ? 'bg-paper border-brass' : 'bg-transparent rule'}`}>
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className={`display d3 ${
                          isSig ? 'text-paper' : isPremium ? 'text-brass-ink' : 'text-ink'}`}>{plan.name}</h3>
                        <span className={`numeral text-[13px] ${isSig ? 'text-white/35' : 'text-ink/25'}`}>{plan.index}</span>
                      </div>
                      <p className={`label mb-6 ${isSig ? 'text-brass-lift' : 'text-muted'}`}>{plan.strap}</p>
                      <p className={`text-[15px] leading-[1.6] measure-sm mb-9 ${
                        isSig ? 'text-white/70' : 'text-muted'}`}>{plan.line}</p>

                      <div className="mb-2">
                        <span key={annual ? 'a' : 'm'} className="hero-fade inline-flex items-start">
                          <span className={`display text-[19px] mt-[10px] mr-[3px] ${
                            isSig ? 'text-white/55' : 'text-ink/55'}`}>$</span>
                          <span className={`display display-light text-[54px] leading-[0.95] tnum ${
                            isSig ? 'text-paper' : 'text-ink'}`}>
                            {annual ? plan.annual.toLocaleString() : plan.price}
                          </span>
                        </span>
                      </div>
                      <p className={`text-[13.5px] mb-2 ${isSig ? 'text-white/60' : 'text-muted'}`}>{annual ? 'per year' : 'per month'}</p>
                      {annual && (
                        <span className={`hero-fade inline-block self-start label border px-2.5 py-1 mb-2 ${
                          isSig ? 'text-brass-lift border-[color:var(--rule-dark)]' : 'text-brass-ink rule'}`}>
                          Save ${(plan.price * 12 - plan.annual).toLocaleString()}
                        </span>
                      )}

                      <div className={`py-4 border-y my-8 ${isSig ? 'border-[color:var(--rule-dark)]' : 'rule'}`}>
                        <span className={`text-[14px] ${isSig ? 'text-paper' : 'text-ink'}`}>{plan.cadence}</span>
                      </div>

                      <p className={`label mb-5 ${isSig ? 'text-paper' : 'text-ink'}`}>
                        {plan.inheritsFrom ? `Everything in ${plan.inheritsFrom}, plus` : 'Included'}
                      </p>

                      <ul className="space-y-3 mb-9 flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className={`flex gap-3.5 text-[14.5px] leading-[1.5] ${
                            isSig ? 'text-white/85' : 'text-text'}`}>
                            <span className={`mt-[8px] w-[3px] h-[3px] rounded-full shrink-0 ${
                              isSig ? 'bg-brass-lift' : 'bg-brass'}`} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={`border-t pt-6 mb-7 ${isSig ? 'border-[color:var(--rule-dark)]' : 'rule'}`}>
                        <p className={`label mb-4 ${isSig ? 'text-brass-lift' : 'text-muted'}`}>Member benefits</p>
                        <ul className="space-y-2.5">
                          {plan.benefits.map((b) => (
                            <li key={b} className={`flex gap-3 text-[14px] leading-[1.5] ${
                              isSig ? 'text-white/85' : 'text-text'}`}>
                              <Check size={14} strokeWidth={2} className={`shrink-0 mt-[5px] ${
                                isSig ? 'text-brass-lift' : 'text-brass'}`} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {isPremium && (
                        <p className="label text-brass-ink border rule px-4 py-3 mb-6 text-center">
                          {premiumLeft !== null
                            ? premiumLeft > 0
                              ? `${premiumLeft} of ${PREMIUM_CAP} remaining`
                              : 'Fully subscribed — waitlist open'
                            : plan.note}
                        </p>
                      )}

                      <Link href={`/enquire?plan=${plan.id}`}
                        onClick={() => track('plan_selected', { plan: plan.id, billing: annual ? 'annual' : 'monthly' })}
                        className={`block w-full py-[14px] text-center text-[14px] font-medium transition-colors duration-200 ${
                          isPremium ? 'bg-brass-ink text-paper hover:bg-ink'
                          : isSig ? 'bg-paper text-ink hover:bg-white'
                          : 'border border-[color:var(--ink)] text-ink hover:bg-ink hover:text-paper'}`}>
                        {plan.cta}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Membership benefits */}
            <div className="reveal grid grid-cols-1 md:grid-cols-4 border-t rule mt-16">
              {MEMBERSHIP_BENEFITS.map((b, i) => (
                <div key={b.title} className={`pt-8 pb-2 md:pr-8 ${
                  i > 0 ? 'md:pl-8 md:border-l rule border-t md:border-t-0 pt-8' : ''}`}>
                  <h3 className="display d4 text-ink mb-3">{b.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted">{b.body}</p>
                </div>
              ))}
            </div>

            <p className="label text-muted mt-14 measure leading-[1.9]">
              Memberships cover oversight, attendance and reporting. Repair work is quoted separately.
            </p>
          </div>
        </section>

        {/* ══ 06 · COMPARISON ═════════════════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <button onClick={() => setShowTable(!showTable)} aria-expanded={showTable}
              className="w-full flex items-center justify-between py-9 border-y rule group">
              <span className="display d4 text-ink">Compare all inclusions</span>
              <ChevronDown size={22} strokeWidth={1.5}
                className={`text-muted group-hover:text-ink transition-all duration-300 ${showTable ? 'rotate-180' : ''}`} />
            </button>

            {showTable && (
              <div className="overflow-x-auto pb-[88px] lg:pb-[120px]">
                <table className="w-full min-w-[780px] text-left">
                  <thead>
                    <tr className="border-b rule">
                      <th className="label text-muted font-semibold py-6 pr-6">Inclusion</th>
                      {['Essential', 'Signature', 'Premium'].map((t) => (
                        <th key={t} className={`label font-semibold py-6 px-6 text-center w-[124px] ${
                          t === 'Premium' ? 'text-brass-ink' : 'text-muted'}`}>{t}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.feature} className="border-b rule">
                        <td className="py-[16px] pr-6 text-[14.5px] text-text">{row.feature}</td>
                        {(['essential', 'signature', 'premium'] as const).map((t) => (
                          <td key={t} className="py-[16px] px-6">
                            {row[t]
                              ? <span className={`block w-[5px] h-[5px] rounded-full mx-auto ${
                                  t === 'premium' ? 'bg-brass' : 'bg-ink/45'}`} />
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

        {/* ══ 07 · THE REPORT ═════════════════════════════════ */}
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

        {/* ══ 08 · ANNUAL ASSESSMENT — vertical ledger ═══════ */}
        <section className="bg-ink-deep text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="reveal mb-16 lg:mb-24 max-w-[700px]">
              <span className="label text-brass-lift block mb-8">Annual assessment</span>
              <h2 className="display display-light d2 text-paper mb-7">
                Protect your investment before problems become expensive repairs.
              </h2>
              <p className="lede text-white/64 measure">
                Like a regular health check-up for the property — a single deep assessment each
                year that finds what monthly visits are not looking for.
              </p>
            </div>

            {/* A ledger running down a single rule — not a grid of boxes. */}
            <div className="relative pl-8 lg:pl-16 mb-20">
              <span aria-hidden className="absolute left-0 lg:left-4 top-2 bottom-2 w-px bg-[color:var(--rule-dark)]" />
              {ASSESSMENT_AREAS.map((a, i) => (
                <div key={a.title} style={{ transitionDelay: `${i * 90}ms` }}
                  className="reveal relative grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-12 py-9 lg:py-11 border-b rule-dark last:border-0">
                  <span aria-hidden
                    className="absolute -left-8 lg:-left-[4.1rem] top-[2.9rem] w-2 h-2 rounded-full bg-brass-lift" />
                  <div className="lg:col-span-4">
                    <span className="numeral text-[13px] text-white/35 block mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="display d3 text-paper">{a.title}</h3>
                  </div>
                  <ul className="lg:col-span-8 flex flex-wrap gap-x-7 gap-y-2.5 self-center">
                    {a.items.map((it) => (
                      <li key={it} className="text-[15px] text-white/70 whitespace-nowrap">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16">
              <div className="reveal lg:col-span-5">
                <p className="label text-brass-lift mb-7">Your property health report</p>
                <ul className="space-y-3">
                  {ASSESSMENT_DELIVERABLES.map((d) => (
                    <li key={d} className="flex gap-3.5 text-[15px] leading-[1.5] text-white/85">
                      <Check size={15} strokeWidth={2} className="shrink-0 mt-[5px] text-brass-lift" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal lg:col-span-6 lg:col-start-7">
                <p className="label text-brass-lift mb-7">Why an annual assessment</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                  {ASSESSMENT_REASONS.map((r) => (
                    <div key={r.title} className="py-5 border-b rule-dark">
                      <h4 className="display d4 text-paper mb-1.5">{r.title}</h4>
                      <p className="text-[14.5px] leading-[1.55] text-white/60">{r.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-9 pt-7 border-t rule-dark flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className="label text-white/45">Ideal for</span>
                  {IDEAL_FOR.map((t) => (
                    <span key={t} className="text-[14.5px] text-white/80">{t}</span>
                  ))}
                </div>
                <div className="mt-9"><Brochure slug="annual-health-assessment" dark /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 09 · MAINTENANCE & CARPENTRY ════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 pt-[88px] lg:pt-[160px]">
            <HeadA eyebrow="Maintenance and carpentry"
              title={<>Reliable repairs.<br />Professional workmanship.</>}
              lede="Whether it is a minor repair, preventative maintenance, or an improvement project, we deliver dependable workmanship and attention to detail on every job.">
              <Brochure slug="maintenance-carpentry" />
            </HeadA>
          </div>

          {/* Full-bleed — the one place the grid is deliberately broken. */}
          <div className="reveal relative w-full h-[280px] sm:h-[380px] lg:h-[460px] my-4 lg:my-6">
            <Image src="/img/deck.jpg" alt="Deck and pergola maintenance"
              fill sizes="100vw" className="object-cover" />
          </div>

          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 pb-[88px] lg:pb-[160px] pt-14 lg:pt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TRADE_SERVICES.map((sv, i) => (
                <div key={sv.title} style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                  className="reveal tile">
                  <h3 className="display d4 text-ink mb-2.5">{sv.title}</h3>
                  <p className="text-[15px] leading-[1.65] text-muted">{sv.body}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 mt-16">
              <div className="reveal lg:col-span-5">
                <p className="label text-muted mb-6">Why choose Coastal Pro</p>
                <ul className="space-y-3.5">
                  {['Qualified carpentry experience', 'Reliable and professional service',
                    'Honest advice and clear communication', 'Fully insured',
                    'One point of contact for all property needs',
                    'Local knowledge of the Mornington Peninsula'].map((t) => (
                    <li key={t} className="flex gap-3.5 text-[15px] leading-[1.5] text-text">
                      <Check size={15} strokeWidth={2} className="shrink-0 mt-[5px] text-brass" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal lg:col-span-6 lg:col-start-7 flex flex-col justify-between gap-10">
                <p className="display text-[clamp(1.3rem,2.2vw,1.85rem)] text-ink leading-[1.32]">
                  We treat every property as if it were our own.
                </p>
                <div>
                  <div className="grid grid-cols-3 border-t rule pt-7">
                    {[['5%', 'Essential'], ['10%', 'Signature'], ['15%', 'Premium']].map(([pc, t], i) => (
                      <div key={t} className={i > 0 ? 'pl-6 border-l rule' : ''}>
                        <span className={`numeral block text-[34px] leading-none mb-2 ${
                          t === 'Premium' ? 'text-brass-ink' : 'text-ink'}`}>{pc}</span>
                        <span className="label text-muted">{t}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[13.5px] text-muted mt-4">Member discount on eligible works.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 10 · SPECIALIST COORDINATION — directory ════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 pt-[88px] lg:pt-[160px] pb-[72px] lg:pb-[100px]">
            <HeadB eyebrow="Specialist coordination"
              title={<>We organise the right professionals for the job.</>}
              lede="Not every issue requires a handyman. Some situations require licensed trades, qualified inspectors or specialist contractors. We coordinate trusted local professionals on your behalf.">
              <Brochure slug="specialist-coordination" />
            </HeadB>

            {/* An index: large left label, inline right entries. */}
            <div className="border-t rule">
              {COORDINATED.map((c, i) => (
                <div key={c.title} style={{ transitionDelay: `${i * 60}ms` }}
                  className="reveal grid grid-cols-1 lg:grid-cols-12 gap-y-3 lg:gap-x-12 py-8 border-b rule items-baseline group">
                  <span className="lg:col-span-1 numeral text-[15px] text-ink/28">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="lg:col-span-4 display d3 text-ink group-hover:text-brass-ink transition-colors duration-300">
                    {c.title}
                  </h3>
                  <ul className="lg:col-span-7 flex flex-wrap gap-x-6 gap-y-2">
                    {c.items.map((it) => (
                      <li key={it} className="text-[14.5px] text-muted">{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16 mt-16">
              <div className="reveal lg:col-span-5">
                <p className="label text-muted mb-5">Coordination fees</p>
                <p className="text-[15.5px] leading-[1.68] text-muted measure">
                  We charge a coordination and management fee for organising specialist
                  inspections and contractors. Fees are tailored to the scope of each project
                  and confirmed with you in advance.
                </p>
                <p className="display text-[clamp(1.15rem,1.7vw,1.4rem)] text-ink leading-[1.38] mt-8 border-l-2 border-brass pl-6">
                  We coordinate the right people, so you do not have to.
                </p>
              </div>
              <div className="reveal lg:col-span-6 lg:col-start-7">
                <p className="label text-muted mb-6">Our service may include</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                  {COORDINATION_INCLUDES.map((t) => (
                    <div key={t} className="py-3.5 border-b rule flex gap-3.5 text-[14.5px] leading-[1.5] text-text">
                      <Check size={14} strokeWidth={2} className="shrink-0 mt-[5px] text-brass" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full-bleed. The regulatory statement is the one thing on the page
              that should be impossible to scroll past. */}
          <div className="reveal w-full bg-ink text-paper">
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-12 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-5 lg:gap-x-16 items-start">
                <p className="lg:col-span-3 label text-brass-lift">Important information</p>
                <p className="lg:col-span-9 text-[15.5px] leading-[1.75] text-white/85 max-w-[68ch]">
                  {LICENSING_NOTICE}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 11 · COVERAGE ═══════════════════════════════════ */}
        <section id="coverage" className="bg-sand">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-20 items-center">
              <div className="reveal lg:col-span-5">
                <span className="label text-muted block mb-8">Coverage</span>
                <h2 className="display display-light d2 text-ink mb-6">
                  Proudly servicing the Mornington Peninsula.
                </h2>
                <p className="text-[16px] leading-[1.68] text-muted measure mb-10">
                  We service all suburbs across the Peninsula and surrounding areas.
                </p>

                <ul className="border-t rule">
                  {SUBURBS.map((s) => (
                    <li key={s.name}
                      onMouseEnter={() => setHoverSuburb(s.name)}
                      onMouseLeave={() => setHoverSuburb(null)}
                      className="border-b rule py-3 flex items-baseline justify-between cursor-default">
                      <span className={`display d4 transition-colors duration-200 ${
                        hoverSuburb === s.name ? 'text-brass-ink' : 'text-ink'}`}>{s.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        hoverSuburb === s.name ? 'bg-brass scale-150' : 'bg-ink/20'}`} />
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <p className="label text-muted mb-4">And surrounding areas</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {WIDER_AREA.map((t) => (
                      <span key={t} className="text-[15px] text-text">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="reveal lg:col-span-7">
                <svg viewBox="0 0 600 260" className="w-full h-auto" role="img"
                  aria-label="Stylised map of the Mornington Peninsula showing serviced suburbs">
                  <path d="M556 8 C 520 34, 470 74, 404 96 C 330 121, 262 134, 196 148 C 150 158, 110 142, 74 116 C 52 100, 34 86, 20 78"
                    fill="none" stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
                  <path d="M566 30 C 528 60, 476 100, 408 124 C 332 150, 258 164, 190 176 C 142 185, 100 168, 62 138 C 40 120, 24 106, 12 98"
                    fill="none" stroke="var(--ink)" strokeOpacity="0.26" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 6" />
                  {SUBURBS.map((s) => {
                    const on = hoverSuburb === s.name;
                    const cx = s.x * 0.92 + 22;
                    const cy = s.y * 0.72 + 22;
                    return (
                      <g key={s.name}
                        onMouseEnter={() => setHoverSuburb(s.name)}
                        onMouseLeave={() => setHoverSuburb(null)} style={{ cursor: 'default' }}>
                        <circle cx={cx} cy={cy} r={on ? 7 : 4.5}
                          fill={on ? 'var(--brass)' : 'var(--ink)'} fillOpacity={on ? 1 : 0.7}
                          style={{ transition: 'all 200ms var(--ease)' }} />
                        <text x={cx} y={cy - 16} textAnchor="middle" fontSize="13" letterSpacing="1.8"
                          fill={on ? 'var(--brass-ink)' : 'var(--ink)'} fontWeight={on ? 700 : 600}
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

        {/* ══ 12 · WHY COASTAL PRO ════════════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 pt-[88px] lg:pt-[160px] pb-[72px] lg:pb-[110px]">
            <HeadC eyebrow="Why Coastal Pro"
              title={<>More than maintenance.<br />Complete property care.</>}
              lede="Whether you are a homeowner, holiday home owner or property investor, we make it easy to keep your property safe, functional and looking its best." />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 border-t rule">
              {WHY_US.map((w, i) => (
                <div key={w.title} style={{ transitionDelay: `${(i % 2) * 80}ms` }}
                  className="reveal grid grid-cols-[auto_1fr] gap-x-7 py-8 border-b rule items-baseline">
                  <span className="numeral text-[15px] text-brass-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="display d3 text-ink mb-2.5">{w.title}</h3>
                    <p className="text-[15.5px] leading-[1.65] text-muted">{w.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal flex justify-center mt-12">
              <Brochure slug="why-coastal-pro" />
            </div>
          </div>

          {/* Photographic band carrying the community line. */}
          <div className="relative w-full min-h-[420px] lg:min-h-[500px] flex items-center overflow-hidden">
            <Image src="/img/coast.jpg" alt="" fill sizes="100vw"
              className="object-cover object-[62%_58%]" />
            <div className="absolute inset-0" style={{ background:
              'linear-gradient(90deg, rgba(7,26,51,0.90) 0%, rgba(7,26,51,0.66) 36%, rgba(7,26,51,0.26) 66%, rgba(7,26,51,0.12) 100%)' }} />
            <div className="relative w-full mx-auto max-w-[1240px] px-6 lg:px-10 py-16">
              <div className="max-w-[560px]">
                <span className="label text-brass-lift block mb-7">Supporting our local community</span>
                <p className="display display-light text-[clamp(1.7rem,3.4vw,2.8rem)] text-paper leading-[1.2] mb-8">
                  Locals looking after locals.
                </p>
                <p className="text-[16px] leading-[1.7] text-white/74 measure">
                  We are proud to be a local Mornington Peninsula business, supporting local
                  suppliers, trades and the community we live in. Our commitment is a professional,
                  honest and reliable service that gives you more time to enjoy what matters most.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[72px] lg:py-[110px]">
            <p className="reveal label text-muted mb-8">Why we exist</p>
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t rule">
              {WHY_WE_EXIST.map((w, i) => (
                <div key={w.title} className={`py-9 lg:pr-9 border-b rule ${
                  i > 0 ? 'lg:border-l lg:pl-9 lg:-ml-px' : ''}`}>
                  <h3 className="display d4 text-ink mb-3">{w.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 13 · WHO WE ARE ═════════════════════════════════ */}
        <section className="bg-sand">
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
                    Coastal Pro Property Care was created to make owning a property on the Peninsula
                    simple, stress free and enjoyable.
                  </p>
                  <p>
                    We know how important your property is to you. Our mission is to protect your
                    investment, maintain its value and give you complete peace of mind.
                  </p>
                </div>

                <ul className="mt-10 border-t rule">
                  {[['Dale', 'Carpenter — Cert III Carpentry, [licence no.]'],
                    ['[Name]', '[Trade and qualification]']].map(([n, r]) => (
                    <li key={n} className="py-4 border-b rule flex items-baseline gap-5">
                      <span className="display d4 text-ink w-[92px] shrink-0">{n}</span>
                      <span className="text-[14.5px] text-muted">{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8"><Brochure slug="about" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 14 · AGENCIES ═══════════════════════════════════ */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="reveal border-b rule py-11 flex flex-col lg:flex-row lg:items-center justify-between gap-7">
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

        {/* ══ 15 · TESTIMONIALS ═══════════════════════════════ */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[80px] lg:py-[120px]">
            <div className="reveal max-w-[1000px]">
              <div className="flex items-center gap-4 mb-10">
                <span className="block w-11 h-px bg-brass-lift" />
                <span className="label text-brass-lift">In their words</span>
              </div>
              <div className="grid min-h-[230px] lg:min-h-[260px]">
                {TESTIMONIALS.map((t, i) => (
                  <figure key={t.name} aria-hidden={i !== quote}
                    className={`col-start-1 row-start-1 transition-opacity duration-700 ${
                      i === quote ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <blockquote className="display display-light text-[clamp(1.75rem,3.9vw,3.1rem)] leading-[1.26] text-paper mb-10">
                      {t.quote}
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <span className="label text-white/55">{t.name}</span>
                      <span className="w-5 h-px bg-[color:var(--rule-dark)]" />
                      <span className="label text-brass-lift">{t.place}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="flex gap-2.5 mt-12">
                {TESTIMONIALS.map((t, i) => (
                  <button key={t.name} onClick={() => setQuote(i)} aria-label={`Testimonial ${i + 1}`}
                    className={`h-px transition-all duration-500 ${
                      i === quote ? 'w-12 bg-brass-lift' : 'w-6 bg-white/25 hover:bg-white/50'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 16 · FAQ ════════════════════════════════════════ */}
        <section id="faq" className="bg-sand border-y rule">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[88px] lg:py-[160px]">
            <HeadC eyebrow="Questions" title={<>Before you commit.</>} />

            <div className="max-w-[860px] mx-auto">
              <div className="border-t rule">
                {FAQS.map((faq) => {
                  const open = openFaq === faq.id;
                  return (
                    <div key={faq.id} className="border-b rule">
                      <button onClick={() => setOpenFaq(open ? null : faq.id)}
                        aria-expanded={open} aria-controls={`faq-${faq.id}`}
                        className="w-full flex items-start justify-between gap-8 py-[30px] text-left group">
                        <span className="display d4 text-ink">{faq.q}</span>
                        <Plus size={19} strokeWidth={1.5}
                          className={`shrink-0 mt-1 text-muted group-hover:text-ink transition-transform duration-[420ms] ${
                            open ? 'rotate-[135deg]' : ''}`}
                          style={{ transitionTimingFunction: 'var(--ease)' }} />
                      </button>
                      <div id={`faq-${faq.id}`} className={`collapse ${open ? 'open' : ''}`}>
                        <div>
                          <p className="pb-[30px] pr-8 text-[16px] leading-[1.72] text-muted max-w-[64ch]">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-12">
                <p className="text-[15px] text-muted">The complete nine-page brochure.</p>
                <Brochure slug="coastal-pro-brochure" />
              </div>
            </div>
          </div>
        </section>

        {/* ══ 17 · CLOSE ══════════════════════════════════════ */}
        <section id="contact" className="bg-ink text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-[104px] lg:py-[176px] text-center">
            <div className="reveal">
              <div className="flex items-center justify-center gap-4 mb-10">
                <span className="block w-11 h-px bg-brass-lift" />
                <span className="label text-brass-lift">One call</span>
                <span className="block w-11 h-px bg-brass-lift" />
              </div>

              <h2 className="display display-light d1 text-paper mb-8">And we organise it all.</h2>

              <p className="lede text-white/64 max-w-[520px] mx-auto mb-14">
                Complete property care. Total peace of mind. Tell us about the property and we
                will arrange a consultation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:0417349071" onClick={() => track('phone_click')}
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

        {/* ══ FOOTER ══════════════════════════════════════════ */}
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
                <a href="tel:0417349071" onClick={() => track('phone_click')} className="block text-[14.5px] text-brass-lift hover:text-paper transition-colors tnum mb-1.5">
                  0417 349 071
                </a>
                <Link href="/enquire" className="block text-[14.5px] hover:text-paper transition-colors mb-1.5">
                  Send an enquiry
                </Link>
                <a href="/brochure/coastal-pro-brochure.pdf" download
                  className="block text-[14.5px] hover:text-paper transition-colors">
                  Download brochure
                </a>
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

      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden grid grid-cols-2 border-t rule-dark">
        <a href="tel:0417349071" onClick={() => track('phone_click')}
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
