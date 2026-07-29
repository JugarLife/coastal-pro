'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

const PLANS = {
  essential: { name: 'Essential', price: 179, annual: 2148, cadence: 'One visit each month' },
  signature: { name: 'Signature', price: 299, annual: 3588, cadence: 'Two visits each month' },
  reserve: { name: 'Reserve', price: 499, annual: 5988, cadence: 'Weekly attendance' },
  undecided: { name: 'Not yet decided', price: null, annual: null, cadence: 'We will advise on a suitable level' },
} as const;

type PlanKey = keyof typeof PLANS;

const SUBURBS = ['Mount Martha', 'Dromana', 'Rosebud', 'Rye', 'Blairgowrie', 'Sorrento', 'Portsea', 'Other'];
const TYPES = ['Holiday home', 'Permanent residence', 'Investment or rental', 'Other'];
const OCCUPANCY = ['Rarely — a few weeks a year', 'Seasonally', 'Most weekends', 'Full time'];
const TIMES = ['Any time', 'Morning', 'Afternoon', 'Evening'];

const REQUIRED = ['name', 'email', 'phone', 'address', 'suburb'] as const;

export default function EnquireForm() {
  const params = useSearchParams();
  const planParam = params.get('plan');
  const initialPlan: PlanKey =
    planParam && planParam in PLANS ? (planParam as PlanKey) : 'undecided';

  const [plan, setPlan] = useState<PlanKey>(initialPlan);
  const [values, setValues] = useState<Record<string, string>>({
    name: '', email: '', phone: '', address: '', suburb: '',
    propertyType: TYPES[0], occupancy: OCCUPANCY[0],
    contactMethod: 'Phone', contactTime: TIMES[0], notes: '', company: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [reference, setReference] = useState('');
  const [formError, setFormError] = useState('');
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'done') doneRef.current?.focus();
  }, [status]);

  const set = (k: string, v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');

    const next: Record<string, string> = {};
    for (const k of REQUIRED) if (!values[k].trim()) next[k] = 'This field is required.';
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      next.email = 'Enter a valid email address.';
    if (values.phone && !/^[0-9+()\-\s]{8,20}$/.test(values.phone))
      next.phone = 'Enter a valid phone number.';

    if (Object.keys(next).length) {
      setErrors(next);
      const first = document.getElementById(Object.keys(next)[0]);
      first?.focus();
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, plan }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        setFormError('Please check the highlighted fields.');
        setStatus('error');
        return;
      }
      setReference(json.reference);
      setStatus('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setFormError('Something went wrong sending your enquiry. Please call 0417 349 071.');
      setStatus('error');
    }
  }

  const chosen = PLANS[plan];

  const fieldCls = (k: string) =>
    `w-full bg-transparent border-b px-0 py-3 text-[16px] text-ink outline-none transition-colors ${
      errors[k] ? 'border-[#B4472E]' : 'border-[color:var(--rule)] focus:border-ink'
    }`;

  /* ── Confirmation ─────────────────────────────────────────── */
  if (status === 'done') {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        className="mx-auto max-w-[680px] px-6 lg:px-10 py-24 lg:py-32 outline-none"
      >
        <div className="flex items-center gap-4 mb-9">
          <span className="block w-11 h-px bg-brass" />
          <span className="label text-brass-ink">Enquiry received</span>
        </div>

        <h1 className="display display-light d2 text-ink mb-7">Thank you. We have it.</h1>

        <p className="lede text-muted mb-10">
          Your enquiry reference is{' '}
          <span className="text-ink font-medium tabular-nums">{reference}</span>. We read every
          enquiry personally — you will not be entered into an automated sequence.
        </p>

        <div className="border-t rule">
          {[
            ['We call you within one business day', 'A short conversation about the property, its history and what you need from us.'],
            ['We attend and assess, at no charge', 'We walk the property, take photographs and confirm the right level of care. No obligation to proceed.'],
            ['You receive terms and a start date', 'Only then do we discuss payment. Nothing is charged before you have met us.'],
          ].map(([t, b], i) => (
            <div key={t} className="grid grid-cols-[auto_1fr] gap-x-7 py-7 border-b rule">
              <span className="numeral text-[15px] text-ink/32 pt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="display d4 text-ink mb-2">{t}</p>
                <p className="text-[15.5px] leading-[1.65] text-muted">{b}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/"
            className="px-8 py-[14px] bg-ink text-paper text-[14px] font-medium text-center hover:bg-ink-deep transition-colors"
          >
            Return to the site
          </Link>
          <a
            href="tel:0417349071"
            className="px-8 py-[14px] border border-ink text-ink text-[14px] font-medium text-center hover:bg-ink hover:text-paper transition-colors"
          >
            Or call 0417 349 071
          </a>
        </div>
      </div>
    );
  }

  /* ── Form ─────────────────────────────────────────────────── */
  return (
    <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-14 lg:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 label text-muted hover:text-ink transition-colors mb-12"
      >
        <ArrowLeft size={14} strokeWidth={1.75} />
        Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-20">
        {/* Form column */}
        <div className="lg:col-span-7">
          <h1 className="display display-light d2 text-ink mb-5">Enquire about a membership</h1>
          <p className="lede text-muted mb-14 max-w-[520px]">
            A few details so we can prepare properly before we speak. This is an enquiry, not a
            purchase — nothing is charged, and no payment details are collected.
          </p>

          <form onSubmit={onSubmit} noValidate>
            {/* Honeypot */}
            <input
              type="text" name="company" tabIndex={-1} autoComplete="off"
              aria-hidden="true"
              className="absolute w-px h-px -left-[9999px] opacity-0"
              value={values.company} onChange={(e) => set('company', e.target.value)}
            />

            <fieldset className="mb-14">
              <legend className="label text-muted mb-8 pb-4 border-b rule w-full">About you</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                <Field id="name" label="Full name" required error={errors.name}>
                  <input id="name" name="name" autoComplete="name" className={fieldCls('name')}
                    value={values.name} onChange={(e) => set('name', e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-err' : undefined} />
                </Field>
                <Field id="phone" label="Phone" required error={errors.phone}>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldCls('phone')}
                    value={values.phone} onChange={(e) => set('phone', e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-err' : undefined} />
                </Field>
                <Field id="email" label="Email" required error={errors.email} className="sm:col-span-2">
                  <input id="email" name="email" type="email" autoComplete="email" className={fieldCls('email')}
                    value={values.email} onChange={(e) => set('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-err' : undefined} />
                </Field>
              </div>
            </fieldset>

            <fieldset className="mb-14">
              <legend className="label text-muted mb-8 pb-4 border-b rule w-full">The property</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                <Field id="address" label="Street address" required error={errors.address} className="sm:col-span-2">
                  <input id="address" name="address" autoComplete="street-address" className={fieldCls('address')}
                    value={values.address} onChange={(e) => set('address', e.target.value)}
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? 'address-err' : undefined} />
                </Field>
                <Field id="suburb" label="Suburb" required error={errors.suburb}>
                  <select id="suburb" name="suburb" className={fieldCls('suburb')}
                    value={values.suburb} onChange={(e) => set('suburb', e.target.value)}
                    aria-invalid={!!errors.suburb}
                    aria-describedby={errors.suburb ? 'suburb-err' : undefined}>
                    <option value="">Select…</option>
                    {SUBURBS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field id="propertyType" label="Property type">
                  <select id="propertyType" name="propertyType" className={fieldCls('propertyType')}
                    value={values.propertyType} onChange={(e) => set('propertyType', e.target.value)}>
                    {TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field id="occupancy" label="How often are you there?" className="sm:col-span-2">
                  <select id="occupancy" name="occupancy" className={fieldCls('occupancy')}
                    value={values.occupancy} onChange={(e) => set('occupancy', e.target.value)}>
                    {OCCUPANCY.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
            </fieldset>

            <fieldset className="mb-12">
              <legend className="label text-muted mb-8 pb-4 border-b rule w-full">Preferences</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                <Field id="contactMethod" label="Preferred contact">
                  <select id="contactMethod" name="contactMethod" className={fieldCls('contactMethod')}
                    value={values.contactMethod} onChange={(e) => set('contactMethod', e.target.value)}>
                    <option>Phone</option><option>Email</option>
                  </select>
                </Field>
                <Field id="contactTime" label="Best time to call">
                  <select id="contactTime" name="contactTime" className={fieldCls('contactTime')}
                    value={values.contactTime} onChange={(e) => set('contactTime', e.target.value)}>
                    {TIMES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field id="notes" label="Anything we should know" className="sm:col-span-2">
                  <textarea id="notes" name="notes" rows={4} className={`${fieldCls('notes')} resize-none`}
                    value={values.notes} onChange={(e) => set('notes', e.target.value)} />
                </Field>
              </div>
            </fieldset>

            <p className="text-[14px] leading-[1.65] text-muted border-l-2 border-brass pl-5 mb-10">
              We do not ask for keys, alarm codes or access details here. Those are arranged in
              person, once you have decided to proceed.
            </p>

            <div aria-live="polite">
              {formError && (
                <p className="text-[14.5px] text-[#B4472E] mb-6">{formError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto px-12 py-[16px] bg-ink text-paper text-[15px] font-medium hover:bg-ink-deep transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </button>
          </form>
        </div>

        {/* Summary rail */}
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-14">
            <div
              className={`border-t-2 pt-8 ${plan === 'reserve' ? 'border-brass' : 'border-ink'}`}
            >
              <span className="label text-muted block mb-4">Selected</span>
              <h2
                className={`display d3 mb-2 ${plan === 'reserve' ? 'text-brass-ink' : 'text-ink'}`}
              >
                {chosen.name}
              </h2>
              {chosen.price !== null && (
                <p className="text-[15px] text-muted mb-1 tabular-nums">
                  ${chosen.price} per month · ${chosen.annual!.toLocaleString()} annually
                </p>
              )}
              <p className="text-[15px] text-muted">{chosen.cadence}</p>

              <div className="mt-7 pt-7 border-t rule">
                <label htmlFor="plan" className="label text-muted block mb-3">
                  Change level
                </label>
                <select
                  id="plan" name="plan" value={plan}
                  onChange={(e) => setPlan(e.target.value as PlanKey)}
                  className="w-full bg-transparent border-b border-[color:var(--rule)] focus:border-ink px-0 py-3 text-[16px] text-ink outline-none transition-colors"
                >
                  <option value="essential">Essential — $179</option>
                  <option value="signature">Signature — $299</option>
                  <option value="reserve">Reserve — $499</option>
                  <option value="undecided">Not yet decided</option>
                </select>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t rule">
              <span className="label text-muted block mb-6">What happens next</span>
              <ul className="space-y-4">
                {[
                  'We call within one business day',
                  'We attend and assess at no charge',
                  'Terms and a start date, only if you proceed',
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-[1.55] text-ink">
                    <Check size={15} strokeWidth={2} className="shrink-0 mt-[5px] text-ink/40" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[13.5px] text-muted mt-7 leading-[1.6]">
                No payment is taken at this stage and no card details are collected.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  id, label, required, error, children, className = '',
}: {
  id: string; label: string; required?: boolean; error?: string;
  children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label text-muted block mb-2.5">
        {label}
        {required && <span className="text-brass-ink ml-1.5">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-[13px] text-[#B4472E] mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
