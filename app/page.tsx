'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Check, Phone, Menu, X } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Coastal Pro Property Care
   Design system: flat colour fields, hairline rules, asymmetric
   editorial grids. Brass appears in exactly two places — the
   Reserve tier and the hero eyebrow rule. Nowhere else.
   ───────────────────────────────────────────────────────────── */

const PLANS = [
  {
    id: 'essential',
    index: '01',
    name: 'Essential',
    price: 179,
    annual: 2148,
    line: 'Keeping an eye on your property.',
    cadence: 'One scheduled visit each month',
    features: [
      'Monthly attendance',
      'Exterior and building condition check',
      'Roofline, gutters and downpipes',
      'Timber, decks, fences and external areas',
      'Security and access verification',
      'Storm and water monitoring',
      'Pre-arrival inspection',
      'Photographic record and written report',
    ],
    discount: '5',
    cta: 'Enquire',
  },
  {
    id: 'signature',
    index: '02',
    name: 'Signature',
    price: 299,
    annual: 3588,
    line: 'Actively caring for your property.',
    cadence: 'Two scheduled visits each month',
    features: [
      'Fortnightly attendance',
      'Exterior and building condition check',
      'Roofline, gutters and downpipes',
      'Timber, decks, fences and external areas',
      'Security and access verification',
      'Storm and water monitoring',
      'Pre-arrival inspection',
      'Photographic record and written report',
      'Trades and contractor coordination',
      'Priority booking and response',
      'Annual property health assessment',
    ],
    discount: '10',
    cta: 'Enquire',
    note: 'Most chosen',
  },
  {
    id: 'reserve',
    index: '03',
    name: 'Reserve',
    price: 499,
    annual: 5988,
    line: 'Private care for when excellence is expected.',
    cadence: 'Weekly scheduled attendance',
    features: [
      'Weekly attendance',
      'Exterior and building condition check',
      'Roofline, gutters and downpipes',
      'Timber, decks, fences and external areas',
      'Security and access verification',
      'Storm and water monitoring',
      'Pre-arrival inspection',
      'Photographic record and written report',
      'Trades and contractor coordination',
      'Priority booking and response',
      'Quarterly comprehensive condition report',
      'Annual preventative maintenance plan',
      'Dedicated Coastal Pro contact',
    ],
    discount: '15',
    cta: 'Request consultation',
    note: 'Limited to five memberships',
  },
];

const RESERVE_CAP = 5;

const CONCERNS = [
  {
    index: '01',
    title: 'Storm damage found late',
    body: 'A lifted sheet or blocked downpipe goes unseen for six weeks. What was a morning of work becomes a ceiling, a floor and an insurance claim.',
  },
  {
    index: '02',
    title: 'Timber that fails quietly',
    body: 'Salt air and westerly weather work on decks, posts and window frames year round. Caught early it is maintenance. Caught late it is structural.',
  },
  {
    index: '03',
    title: 'No one on the ground',
    body: 'Something goes wrong on a Friday and you are ninety minutes away with no local contact who knows the property, the access or the history.',
  },
];

const PROCESS = [
  {
    index: '01',
    title: 'We attend on schedule',
    body: 'Visits are planned, not reactive. You know when we are coming and so does your calendar.',
  },
  {
    index: '02',
    title: 'We inspect and photograph',
    body: 'A consistent checklist across roofline, structure, timber, drainage, security and grounds. Everything documented.',
  },
  {
    index: '03',
    title: 'You receive the report',
    body: 'In your inbox within twenty-four hours. Condition ratings, photographs, and anything requiring attention priced separately.',
  },
];

const COMPARISON = [
  { feature: 'Scheduled attendance', essential: true, signature: true, reserve: true },
  { feature: 'Exterior and building condition checks', essential: true, signature: true, reserve: true },
  { feature: 'Roofline, gutters and downpipes', essential: true, signature: true, reserve: true },
  { feature: 'Timber, decks, fences and external areas', essential: true, signature: true, reserve: true },
  { feature: 'Security and access checks', essential: true, signature: true, reserve: true },
  { feature: 'Storm and water monitoring', essential: true, signature: true, reserve: true },
  { feature: 'Pre-arrival inspection', essential: true, signature: true, reserve: true },
  { feature: 'Photographic record and written report', essential: true, signature: true, reserve: true },
  { feature: 'Trades and contractor coordination', essential: false, signature: true, reserve: true },
  { feature: 'Priority booking and response', essential: false, signature: true, reserve: true },
  { feature: 'Annual property health assessment', essential: false, signature: true, reserve: true },
  { feature: 'Quarterly comprehensive condition report', essential: false, signature: false, reserve: true },
  { feature: 'Annual preventative maintenance plan', essential: false, signature: false, reserve: true },
  { feature: 'Dedicated Coastal Pro contact', essential: false, signature: false, reserve: true },
];

const REPORT_CONDITIONS = [
  { area: 'Roofline and gutters', rating: 'Attention', pct: 42 },
  { area: 'Timber and decking', rating: 'Fair', pct: 64 },
  { area: 'External paint', rating: 'Good', pct: 81 },
  { area: 'Drainage and grounds', rating: 'Good', pct: 88 },
];

const REPORT_FINDINGS = [
  { level: 'Urgent', text: 'Gutter separation, north elevation', quoted: true },
  { level: 'Monitor', text: 'Deck sealing due within six months', quoted: true },
  { level: 'Planned', text: 'Exterior repaint, eighteen month horizon', quoted: false },
];

const SUBURBS = [
  'Mount Martha',
  'Dromana',
  'Rosebud',
  'Rye',
  'Blairgowrie',
  'Sorrento',
  'Portsea',
];

const FAQS = [
  {
    id: 'scope',
    q: 'What does a membership actually cover?',
    a: 'Oversight, attendance and reporting. We attend on schedule, inspect against a consistent checklist, photograph everything and send you a written report. Repair work is quoted separately, always with photographs and a fixed price before anything begins.',
  },
  {
    id: 'cancel',
    q: 'Can I pause or cancel?',
    a: 'At any time, with no exit fee and no minimum term. Many Peninsula owners pause over the months they are in residence and resume when they leave. Your full reporting history remains available to you either way.',
  },
  {
    id: 'insurance',
    q: 'Are you insured, and are the trades you engage insured?',
    a: 'We carry public liability and professional indemnity cover. Every trade we coordinate on your behalf is licensed and separately insured, and we verify currency before they attend your property.',
  },
  {
    id: 'keys',
    q: 'How are keys and access handled?',
    a: 'Keys are held in a locked, access-controlled cabinet and are never labelled with your address. We attend only on scheduled dates, every entry and exit is logged, and the log appears in your report. Coded entry or a smart lock works equally well if you prefer.',
  },
  {
    id: 'storm',
    q: 'What happens after a storm?',
    a: 'We attend without waiting to be asked. You receive a photographic damage assessment within twenty-four hours, along with anything needed for an insurance claim and quotes for urgent repair. There is no additional charge for a storm attendance.',
  },
  {
    id: 'quotes',
    q: 'How does quoting for repair work?',
    a: 'Anything we find is documented with photographs and priced before work begins. You approve each item individually. Members receive five, ten or fifteen per cent off eligible carpentry depending on tier. Nothing proceeds without your written go-ahead.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'We are in Melbourne eleven months of the year. The report lands on the same day each month and I have stopped wondering what is happening down there.',
    name: 'J. and S. Marchetti',
    place: 'Portsea',
  },
  {
    quote: 'They found a gutter separation in April that would have been inside the wall by spring. The photographs made the insurance conversation straightforward.',
    name: 'M. Lawson',
    place: 'Sorrento',
  },
  {
    quote: 'Understated, punctual and genuinely knowledgeable about coastal timber. They treat the house the way we would if we were there.',
    name: 'E. and D. Thornbury',
    place: 'Blairgowrie',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [reserveLeft, setReserveLeft] = useState<number | null>(null);

  /* Reserve scarcity is counted from live Stripe subscriptions, never
     hardcoded — the brief was explicit that fake scarcity is a
     liability. Until Stripe is configured the endpoint reports
     configured:false and the static note stands. */
  useEffect(() => {
    let cancelled = false;
    fetch('/api/availability')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d?.configured) setReserveLeft(d.remaining);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  /* Header sits transparent over the hero and resolves to a solid
     paper bar once past it. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.82);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Reveals marked elements once, on first entry. Unobserved after,
     so nothing re-fades on scroll-back. */
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Only now hide them — see .js-reveal in globals.css.
    document.documentElement.classList.add('js-reveal');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* Marks the nav item for whichever section owns the upper third
     of the viewport. */
  useEffect(() => {
    const ids = ['memberships', 'report', 'coverage', 'faq'];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -62% 0px' },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ══ NAVIGATION ══════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-paper/92 backdrop-blur-md rule'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="flex items-center justify-between h-[74px]">
            <a href="#top" className="flex items-center gap-3.5 group">
              <Image
                src={scrolled ? '/logo-mark-navy.png' : '/logo-mark.png'}
                alt=""
                width={280}
                height={150}
                priority
                className="h-[30px] w-auto"
              />
              <span
                className={`hidden sm:block h-7 w-px transition-colors duration-500 ${
                  scrolled ? 'bg-[color:var(--rule)]' : 'bg-white/25'
                }`}
              />
              <span className="flex flex-col leading-none">
                <span
                  className={`display text-[19px] tracking-[-0.02em] transition-colors duration-500 ${
                    scrolled ? 'text-navy' : 'text-paper'
                  }`}
                >
                  Coastal Pro
                </span>
                <span
                  className={`label mt-[3px] text-[9.5px] transition-colors duration-500 ${
                    scrolled ? 'text-muted' : 'text-white/60'
                  }`}
                >
                  Property Care
                </span>
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-10">
              {[
                ['Memberships', '#memberships'],
                ['The report', '#report'],
                ['Coverage', '#coverage'],
                ['Questions', '#faq'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className={`relative text-[14px] transition-colors duration-200 ${
                    scrolled
                      ? active === href.slice(1)
                        ? 'text-navy'
                        : 'text-muted hover:text-navy'
                      : 'text-white/72 hover:text-paper'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-brass transition-all duration-300 ${
                      active === href.slice(1) ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:0417349071"
                className={`text-[14px] transition-colors duration-500 ${
                  scrolled ? 'text-navy hover:text-blue' : 'text-paper/85 hover:text-paper'
                }`}
              >
                0417 349 071
              </a>
              <a
                href="#memberships"
                className={`px-6 py-[11px] text-[14px] font-medium transition-all duration-500 ${
                  scrolled
                    ? 'bg-navy text-paper hover:bg-navy-deep'
                    : 'bg-paper text-navy hover:bg-white'
                }`}
              >
                View memberships
              </a>
            </div>

            <button
              className={`lg:hidden transition-colors duration-500 ${
                scrolled || navOpen ? 'text-navy' : 'text-paper'
              }`}
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Menu"
              aria-expanded={navOpen}
            >
              {navOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="lg:hidden border-t rule bg-paper absolute inset-x-0 top-full">
            <div className="px-6 py-5 flex flex-col">
              {[
                ['Memberships', '#memberships'],
                ['The report', '#report'],
                ['Coverage', '#coverage'],
                ['Questions', '#faq'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setNavOpen(false)}
                  className="py-3 border-b rule text-[15px] text-navy last:border-0"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* ══ 01 · HERO ═════════════════════════════════════════
            Full-bleed image, navy scrim weighted to the left,
            content set low-left. Not centred.                    */}
        <section className="relative min-h-[92vh] -mt-[75px] flex items-end overflow-hidden bg-navy">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(96deg, rgba(5,20,40,0.95) 0%, rgba(6,23,45,0.90) 34%, rgba(9,31,58,0.68) 58%, rgba(11,37,69,0.46) 80%, rgba(11,37,69,0.38) 100%)',
            }}
          />

          <div className="relative w-full mx-auto max-w-[1240px] px-6 lg:px-10 pb-20 lg:pb-28 pt-32">
            <div className="max-w-[880px] rise">
              <div className="flex items-center gap-4 mb-9">
                <span className="block w-11 h-px bg-brass" />
                <span className="label text-brass">Mornington Peninsula</span>
              </div>

              <h1 className="display display-light d1 text-paper mb-8">
                Your property.
                <br />
                Professionally cared for.
              </h1>

              <p className="lede text-white/72 max-w-[540px] mb-11">
                Property care memberships for holiday homes and coastal residences.
                Scheduled attendance, considered oversight, and a written report
                after every visit.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5">
                <a
                  href="#memberships"
                  className="px-9 py-[15px] bg-paper text-navy text-[15px] font-medium text-center hover:bg-white transition-colors duration-200"
                >
                  View memberships
                </a>
                <Link
                  href="/enquire"
                  className="px-9 py-[15px] border border-white/38 text-paper text-[15px] font-medium text-center hover:bg-white/10 hover:border-white/60 transition-all duration-200"
                >
                  Book a property consultation
                </Link>
              </div>
            </div>
          </div>

          {/* Trust bar — text only, divided by hairlines */}
          <div className="absolute bottom-0 inset-x-0 border-t rule-dark">
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <div className="flex flex-wrap">
                {['Fully insured', 'Qualified carpenters', 'Locally based'].map((item, i) => (
                  <div
                    key={item}
                    className={`py-4 pr-8 lg:pr-14 ${i > 0 ? 'pl-8 lg:pl-14 border-l rule-dark' : ''}`}
                  >
                    <span className="label text-white/62">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 02 · THE PROBLEM ══════════════════════════════════
            Sand field. Asymmetric 12-col: statement left,
            indexed list right, divided by hairlines. No cards.   */}
        <section className="bg-sand">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-24 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-20">
              <div className="lg:col-span-5">
                <div className="reveal lg:sticky lg:top-32">
                  <span className="label text-muted block mb-7">The problem</span>
                  <h2 className="display display-light d2 text-navy mb-7">
                    Who checks your property when you are not there?
                  </h2>
                  <p className="lede text-muted max-w-[400px]">
                    Distance is the whole difficulty. Nothing about a coastal
                    house fails suddenly — it fails slowly, unobserved.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                {CONCERNS.map((c, i) => (
                  <div
                    key={c.index}
                    style={{ transitionDelay: `${i * 90}ms` }}
                    className={`reveal grid grid-cols-[auto_1fr] gap-x-8 py-9 ${
                      i === 0 ? 'lg:pt-2' : 'border-t rule'
                    }`}
                  >
                    <span className="numeral text-[15px] text-navy/32 pt-1.5">{c.index}</span>
                    <div>
                      <h3 className="display d4 text-navy mb-3">{c.title}</h3>
                      <p className="text-[16px] leading-[1.68] text-muted">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 03 · PROCESS ══════════════════════════════════════
            Paper field. Three columns under a full rule, with
            oversized outline numerals. Editorial, not iconic.    */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-24 lg:py-36">
            <div className="reveal max-w-[620px] mb-16 lg:mb-24">
              <span className="label text-muted block mb-7">How it works</span>
              <h2 className="display display-light d2 text-navy">
                Three steps, repeated with discipline.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t rule">
              {PROCESS.map((step, i) => (
                <div
                  key={step.index}
                  style={{ transitionDelay: `${i * 90}ms` }}
                  className={`reveal pt-10 pb-2 md:pr-12 ${
                    i > 0 ? 'md:pl-12 md:border-l rule border-t md:border-t-0' : ''
                  } ${i > 0 ? 'pt-10' : ''}`}
                >
                  <span className="numeral block text-[56px] leading-none text-navy/13 mb-8">
                    {step.index}
                  </span>
                  <h3 className="display d4 text-navy mb-4">{step.title}</h3>
                  <p className="text-[16px] leading-[1.68] text-muted max-w-[300px]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 04 · MEMBERSHIPS ══════════════════════════════════
            Navy field. Three columns separated by vertical
            hairlines — not floating cards. Brass appears here,
            on Reserve only.                                      */}
        <section id="memberships" className="bg-navy text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-24 lg:py-36">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-20">
              <div className="reveal max-w-[560px]">
                <span className="label text-white/50 block mb-7">Memberships</span>
                <h2 className="display display-light d2 text-paper">
                  Three levels of care.
                  <br />
                  One trusted team.
                </h2>
              </div>

              {/* Billing toggle — hairline segmented control */}
              <div className="inline-flex border rule-dark self-start lg:self-auto">
                <button
                  onClick={() => setAnnual(false)}
                  className={`px-6 py-2.5 text-[13px] font-medium transition-colors duration-200 ${
                    !annual ? 'bg-paper text-navy' : 'text-white/62 hover:text-paper'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`px-6 py-2.5 text-[13px] font-medium border-l rule-dark transition-colors duration-200 ${
                    annual ? 'bg-paper text-navy' : 'text-white/62 hover:text-paper'
                  }`}
                >
                  Annual
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 border-t rule-dark">
              {PLANS.map((plan, i) => {
                const isReserve = plan.id === 'reserve';
                return (
                  <div
                    key={plan.id}
                    style={{ transitionDelay: `${i * 110}ms` }}
                    className={`reveal relative flex flex-col pt-11 pb-11 lg:pr-11 ${
                      i > 0 ? 'lg:pl-11 lg:border-l rule-dark border-t lg:border-t-0' : ''
                    }`}
                  >
                    {/* Brass top rule — Reserve only */}
                    {isReserve && (
                      <span className="absolute top-0 left-0 lg:left-11 right-0 h-px bg-brass" />
                    )}

                    <div className="flex items-baseline justify-between mb-1.5">
                      <h3
                        className={`display d3 ${isReserve ? 'text-brass' : 'text-paper'}`}
                      >
                        {plan.name}
                      </h3>
                      <span className="numeral text-[13px] text-white/28">{plan.index}</span>
                    </div>

                    <p className="text-[15px] text-white/55 mb-9 max-w-[280px]">{plan.line}</p>

                    <div className="mb-2">
                      <span className="display display-light text-[52px] leading-none text-paper tabular-nums">
                        ${annual ? plan.annual.toLocaleString() : plan.price}
                      </span>
                      <span className="text-[14px] text-white/50 ml-2">
                        {annual ? 'per year' : 'per month'}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/38 mb-9">
                      {annual ? (
                        <>
                          Equivalent to ${Math.round(plan.annual / 12)} monthly
                          <span className={isReserve ? 'text-brass ml-2' : 'text-white/60 ml-2'}>
                            Save ${(plan.price * 12 - plan.annual).toLocaleString()}
                          </span>
                        </>
                      ) : (
                        `$${plan.annual.toLocaleString()} billed annually`
                      )}
                    </p>

                    <div className="py-4 border-y rule-dark mb-8">
                      <span className="text-[14px] text-paper">{plan.cadence}</span>
                    </div>

                    <ul className="space-y-3 mb-10 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-3 text-[14.5px] leading-[1.5]">
                          <Check
                            size={15}
                            strokeWidth={2}
                            className={`shrink-0 mt-[5px] ${
                              isReserve ? 'text-brass' : 'text-white/40'
                            }`}
                          />
                          <span className="text-white/78">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      {(plan.note || (isReserve && reserveLeft !== null)) && (
                        <p
                          className={`label mb-4 ${isReserve ? 'text-brass' : 'text-white/45'}`}
                        >
                          {isReserve && reserveLeft !== null
                            ? reserveLeft > 0
                              ? `${reserveLeft} of ${RESERVE_CAP} places remaining`
                              : 'Fully subscribed — waitlist open'
                            : plan.note}
                        </p>
                      )}
                      <Link
                        href={`/enquire?plan=${plan.id}`}
                        className={`block w-full py-[14px] text-center text-[14px] font-medium transition-colors duration-200 ${
                          isReserve
                            ? 'bg-brass text-navy hover:bg-[#D9B237]'
                            : plan.id === 'signature'
                            ? 'bg-paper text-navy hover:bg-white'
                            : 'border rule-dark text-paper hover:bg-white/10'
                        }`}
                      >
                        {plan.cta}
                      </Link>
                      <p className="text-[12.5px] text-white/38 mt-4">
                        {plan.discount}% off eligible carpentry works
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="label text-white/40 mt-14 max-w-[620px] leading-[1.9]">
              Memberships cover oversight, attendance and reporting. Repair work is
              quoted separately.
            </p>
          </div>
        </section>

        {/* ══ 05 · COMPARISON ═══════════════════════════════════
            Paper field. Disclosure row as a hairline band.
            Table uses rules only — no fills, no zebra.           */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <button
              onClick={() => setShowTable(!showTable)}
              aria-expanded={showTable}
              className="w-full flex items-center justify-between py-9 border-b rule group"
            >
              <span className="display d4 text-navy">Compare all inclusions</span>
              <ChevronDown
                size={22}
                strokeWidth={1.5}
                className={`text-muted group-hover:text-navy transition-all duration-300 ${
                  showTable ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showTable && (
              <div className="overflow-x-auto pb-24 lg:pb-32">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="border-b rule">
                      <th className="label text-muted font-semibold py-6 pr-6">Inclusion</th>
                      <th className="label text-muted font-semibold py-6 px-6 text-center w-[128px]">
                        Essential
                      </th>
                      <th className="label text-muted font-semibold py-6 px-6 text-center w-[128px]">
                        Signature
                      </th>
                      <th className="label text-brass font-semibold py-6 pl-6 text-center w-[128px]">
                        Reserve
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.feature} className="border-b rule">
                        <td className="py-[18px] pr-6 text-[15px] text-ink">{row.feature}</td>
                        {(['essential', 'signature', 'reserve'] as const).map((tier) => (
                          <td key={tier} className="py-[18px] px-6 text-center">
                            {row[tier] ? (
                              <Check
                                size={16}
                                strokeWidth={2}
                                className={`mx-auto ${
                                  tier === 'reserve' ? 'text-brass' : 'text-navy/45'
                                }`}
                              />
                            ) : (
                              <span className="block w-3 h-px bg-navy/15 mx-auto" />
                            )}
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

        {/* ══ 06 · THE REPORT ═══════════════════════════════════
            Sand field. Asymmetric: a real document rendered on
            the left, three terse points on the right.            */}
        <section id="report" className="bg-sand">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-24 lg:py-36">
            <div className="reveal max-w-[620px] mb-16 lg:mb-20">
              <span className="label text-muted block mb-7">The artefact</span>
              <h2 className="display display-light d2 text-navy mb-7">
                The Property Care Report
              </h2>
              <p className="lede text-muted">
                The membership is the service. The report is the proof of it —
                delivered after every visit, archived for the life of the property.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-20 items-start">
              {/* Document */}
              <div className="lg:col-span-7">
                <div className="reveal bg-paper border rule p-8 lg:p-11 shadow-[0_1px_2px_rgba(11,37,69,0.05)]">
                  <div className="flex items-start justify-between pb-6 border-b rule">
                    <div>
                      <p className="label text-muted mb-2">Property Care Report</p>
                      <p className="display d4 text-navy">14 Point Nepean Road</p>
                    </div>
                    <div className="text-right shrink-0 pl-6">
                      <p className="label text-muted mb-2">Visit</p>
                      <p className="text-[14px] text-navy tabular-nums">12 Jun 2026</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 py-6 border-b rule">
                    {[
                      ['Attendance', 'Scheduled'],
                      ['Duration', '48 minutes'],
                      ['Attended by', 'D. Sidebottom'],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <p className="label text-muted mb-2">{k}</p>
                        <p className="text-[14px] text-ink">{v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="py-7 border-b rule">
                    <p className="label text-muted mb-6">Condition assessment</p>
                    <div className="space-y-4">
                      {REPORT_CONDITIONS.map((c) => (
                        <div key={c.area} className="flex items-center gap-5">
                          <span className="text-[14px] text-ink w-[168px] shrink-0">
                            {c.area}
                          </span>
                          <span className="flex-1 h-[3px] bg-navy/10 relative">
                            <span
                              className="absolute inset-y-0 left-0"
                              style={{
                                width: `${c.pct}%`,
                                background:
                                  c.pct < 50 ? '#B4472E' : c.pct < 75 ? '#C9A227' : '#0B2545',
                              }}
                            />
                          </span>
                          <span className="text-[13px] text-muted w-[68px] text-right shrink-0">
                            {c.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="py-7 border-b rule">
                    <p className="label text-muted mb-6">Findings</p>
                    <div className="space-y-4">
                      {REPORT_FINDINGS.map((f) => (
                        <div key={f.text} className="flex items-baseline gap-4">
                          <span
                            className="label w-[74px] shrink-0"
                            style={{
                              color:
                                f.level === 'Urgent'
                                  ? '#B4472E'
                                  : f.level === 'Monitor'
                                  ? '#8A6F14'
                                  : '#66727F',
                            }}
                          >
                            {f.level}
                          </span>
                          <span className="text-[14.5px] text-ink flex-1">{f.text}</span>
                          {f.quoted && (
                            <span className="text-[12px] text-muted shrink-0">
                              Quote attached
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="pt-6 text-[13px] text-muted">
                    22 photographs attached · Next scheduled attendance 26 June 2026
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div className="lg:col-span-5">
                {[
                  {
                    t: 'Delivered within twenty-four hours',
                    b: 'Every visit produces a report. Condition ratings, photographs, and anything found — with a fixed price attached before any work is discussed.',
                  },
                  {
                    t: 'Archived for the life of the property',
                    b: 'Reports accumulate into a maintenance record. What was done, when, and what is coming due. Useful at sale, essential at claim.',
                  },
                  {
                    t: 'Quoted, never assumed',
                    b: 'Nothing proceeds without written approval. Members receive five, ten or fifteen per cent off eligible carpentry depending on tier.',
                  },
                ].map((item, i) => (
                  <div
                    key={item.t}
                    style={{ transitionDelay: `${i * 90}ms` }}
                    className={`reveal py-8 ${i > 0 ? 'border-t rule' : 'pt-0'}`}
                  >
                    <h3 className="display d4 text-navy mb-3">{item.t}</h3>
                    <p className="text-[16px] leading-[1.68] text-muted">{item.b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ 07 · CARPENTRY ════════════════════════════════════
            Navy band. Deliberately compact — a statement and
            three figures on one line. Not a full section.        */}
        <section className="bg-navy-deep text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-20 items-center">
              <div className="lg:col-span-6">
                <span className="label text-white/45 block mb-6">Carpentry and repairs</span>
                <h2 className="display display-light d3 text-paper mb-4">
                  We can also fix what we find.
                </h2>
                <p className="text-[16px] leading-[1.68] text-white/60 max-w-[440px]">
                  Qualified carpenters, licensed trades, and a single point of
                  coordination. Members receive a standing discount on eligible works.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="grid grid-cols-3 border-t rule-dark">
                  {[
                    ['5%', 'Essential'],
                    ['10%', 'Signature'],
                    ['15%', 'Reserve'],
                  ].map(([pct, tier], i) => (
                    <div
                      key={tier}
                      className={`pt-7 pb-1 ${i > 0 ? 'pl-6 border-l rule-dark' : ''}`}
                    >
                      <span
                        className={`numeral block text-[38px] leading-none mb-3 ${
                          tier === 'Reserve' ? 'text-brass' : 'text-paper'
                        }`}
                      >
                        {pct}
                      </span>
                      <span className="label text-white/45">{tier}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 08 · COVERAGE ═════════════════════════════════════
            Paper field. Suburb names set large in serif, in a
            ruled list. Typographic, not a map graphic.           */}
        <section id="coverage" className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-24 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-20">
              <div className="reveal lg:col-span-4">
                <span className="label text-muted block mb-7">Coverage</span>
                <h2 className="display display-light d2 text-navy mb-6">
                  We work the length of the Peninsula.
                </h2>
                <p className="text-[16px] leading-[1.68] text-muted max-w-[320px]">
                  If your property sits outside these suburbs, speak to us. We take on
                  work beyond this list where the schedule allows.
                </p>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <div className="border-t rule">
                  {SUBURBS.map((s, i) => (
                    <div
                      key={s}
                      style={{ transitionDelay: `${i * 55}ms` }}
                      className="reveal flex items-baseline justify-between py-[18px] border-b rule group"
                    >
                      <span className="display d3 text-navy">{s}</span>
                      <span className="numeral text-[13px] text-navy/25">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 09 · WHO WE ARE ═══════════════════════════════════
            Sand field. Image left running to the grid edge,
            first-person copy right.                              */}
        <section className="bg-sand">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-24 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-20 items-center">
              <div className="lg:col-span-6">
                <div className="reveal relative aspect-[4/3] bg-navy/8 border rule">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="label text-navy/35">Photograph — team and vehicle</span>
                  </div>
                </div>
              </div>

              <div className="reveal lg:col-span-5 lg:col-start-8" style={{ transitionDelay: '110ms' }}>
                <span className="label text-muted block mb-7">Who we are</span>
                <h2 className="display display-light d2 text-navy mb-8">
                  We live and work on the Peninsula.
                </h2>
                <div className="space-y-5 text-[16.5px] leading-[1.7] text-muted">
                  <p>
                    We are not a franchise and not a call centre. We are a small local
                    team of qualified carpenters who look after a limited number of
                    properties properly, rather than a large number superficially.
                  </p>
                  <p>
                    We know what a westerly does to a deck, what salt does to fixings,
                    and which houses on which streets need watching after a big blow.
                    We care for your home the way we would our own.
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t rule flex flex-wrap gap-x-10 gap-y-3">
                  <span className="label text-muted">ABN 12 345 678 901</span>
                  <span className="label text-muted">Fully insured</span>
                  <span className="label text-muted">Licensed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 10 · AGENCIES ═════════════════════════════════════
            Paper field, single compact strip. Deliberately does
            not compete with the consumer flow.                   */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="border-y rule py-11 flex flex-col lg:flex-row lg:items-center justify-between gap-7">
              <div className="max-w-[640px]">
                <span className="label text-muted block mb-3">
                  For agencies and property managers
                </span>
                <p className="display d4 text-navy">
                  Portfolio oversight, white-labelled reporting and volume terms.
                </p>
              </div>
              <Link
                href="/enquire?plan=undecided"
                className="shrink-0 px-8 py-[13px] border border-navy text-navy text-[14px] font-medium text-center hover:bg-navy hover:text-paper transition-colors duration-200"
              >
                Enquire for a portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* ══ 11 · TESTIMONIALS ═════════════════════════════════
            Paper field. Three ruled columns. Serif quotes,
            small-caps attribution. No stars, no cards.           */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-24 lg:py-32">
            <span className="label text-muted block mb-14">In their words</span>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t rule">
              {TESTIMONIALS.map((t, i) => (
                <figure
                  key={t.name}
                  style={{ transitionDelay: `${i * 90}ms` }}
                  className={`reveal pt-10 pb-2 md:pr-10 ${
                    i > 0 ? 'md:pl-10 md:border-l rule border-t md:border-t-0 pt-10' : ''
                  }`}
                >
                  <blockquote className="display display-light text-[21px] leading-[1.42] text-navy mb-8">
                    {t.quote}
                  </blockquote>
                  <figcaption>
                    <span className="label text-navy block mb-1.5">{t.name}</span>
                    <span className="label text-muted">{t.place}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 12 · FAQ ══════════════════════════════════════════
            Sand field. Hairline accordion, two-column header.
            No boxes, no borders beyond the rules.                */}
        <section id="faq" className="bg-sand">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-24 lg:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-20">
              <div className="lg:col-span-4">
                <div className="reveal lg:sticky lg:top-32">
                  <span className="label text-muted block mb-7">Questions</span>
                  <h2 className="display display-light d2 text-navy">
                    Before you commit.
                  </h2>
                </div>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <div className="border-t rule">
                  {FAQS.map((faq) => {
                    const open = openFaq === faq.id;
                    return (
                      <div key={faq.id} className="border-b rule">
                        <button
                          onClick={() => setOpenFaq(open ? null : faq.id)}
                          aria-expanded={open}
                          aria-controls={`faq-${faq.id}`}
                          className="w-full flex items-start justify-between gap-8 py-7 text-left group"
                        >
                          <span className="display d4 text-navy">{faq.q}</span>
                          <ChevronDown
                            size={20}
                            strokeWidth={1.5}
                            className={`shrink-0 mt-1 text-muted group-hover:text-navy transition-all duration-300 ${
                              open ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {open && (
                          <p
                            id={`faq-${faq.id}`}
                            className="pb-8 pr-12 text-[16px] leading-[1.72] text-muted max-w-[620px]"
                          >
                            {faq.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 13 · CLOSE ════════════════════════════════════════
            Navy field. The one section that earns being centred. */}
        <section id="contact" className="bg-navy text-paper">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-28 lg:py-40 text-center">
            <Image
              src="/logo-lockup.png"
              alt="Coastal Pro Property Care"
              width={540}
              height={583}
              className="h-[104px] w-auto mx-auto mb-12 opacity-95"
            />

            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="block w-11 h-px bg-brass" />
              <span className="label text-brass">One call</span>
              <span className="block w-11 h-px bg-brass" />
            </div>

            <h2 className="display display-light d1 text-paper mb-8">
              We take care of it all.
            </h2>

            <p className="lede text-white/62 max-w-[520px] mx-auto mb-14">
              Tell us about the property and we will arrange a consultation.
              No obligation, and no pressure to proceed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <a
                href="tel:0417349071"
                className="w-full sm:w-auto px-10 py-[15px] bg-paper text-navy text-[15px] font-medium hover:bg-white transition-colors duration-200"
              >
                0417 349 071
              </a>
              <Link
                href="/enquire"
                className="w-full sm:w-auto px-10 py-[15px] border border-white/38 text-paper text-[15px] font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-200"
              >
                Send an enquiry
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-9 border-t rule-dark pt-12 text-left max-w-[820px] mx-auto">
              {[
                ['Service area', 'Mornington Peninsula, Victoria'],
                ['Hours', 'Monday to Friday, 8am — 6pm\nWeekends by arrangement'],
                ['Follow', 'Facebook'],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="label text-white/42 block mb-3">{k}</span>
                  <span className="text-[14.5px] text-white/72 whitespace-pre-line">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-navy-deep text-white/45">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[13px]">
              © 2026 Coastal Pro Property Care
            </span>
            <div className="flex gap-8">
              {[
                ['Terms', '/terms'],
                ['Privacy', '/privacy'],
              ].map(([l, href]) => (
                <Link key={href} href={href} className="text-[13px] hover:text-paper transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* ══ MOBILE ACTION BAR ═══════════════════════════════════ */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden grid grid-cols-2 border-t rule-dark">
        <a
          href="tel:0417349071"
          className="flex items-center justify-center gap-2 py-4 bg-navy text-paper text-[14px] font-medium"
        >
          <Phone size={15} strokeWidth={1.75} />
          Call
        </a>
        <a
          href="#memberships"
          className="flex items-center justify-center py-4 bg-paper text-navy text-[14px] font-medium border-l rule"
        >
          View memberships
        </a>
      </div>
      <div className="h-14 lg:hidden" />
    </>
  );
}
