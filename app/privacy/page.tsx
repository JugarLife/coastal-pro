import type { Metadata } from 'next';
import LegalPage, { type Clause } from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Coastal Pro Property Care collects, holds and protects your information.',
  robots: { index: false, follow: true },
};

const CLAUSES: Clause[] = [
  {
    heading: 'What we collect',
    body: (
      <>
        <p>We collect only what we need to care for your property:</p>
        <ul className="space-y-2.5 pl-0">
          {[
            ['Contact details', 'name, email, phone, postal address.'],
            ['Property details', 'address, type, occupancy pattern, and the maintenance history we build over time.'],
            ['Access arrangements', 'key holdings, lock-box or alarm arrangements, and a log of every entry and exit. Collected at onboarding — never through the website.'],
            ['Photographs', 'images of your property taken during attendance, forming part of your report.'],
            ['Billing information', 'handled by our payment provider. We do not see or store full card numbers.'],
          ].map(([k, v]) => (
            <li key={k as string} className="flex gap-3">
              <span className="text-ink/30 mt-[2px]">—</span>
              <span>
                <strong className="text-ink font-medium">{k}</strong>: {v}
              </span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    heading: 'Photographs of your property',
    body: (
      <>
        <p>
          Photographs are taken solely to document condition and to support recommendations and
          quotes. They are stored with your reporting history and are available to you at any time.
        </p>
        <p>
          <strong className="text-ink">
            We will not use photographs of your property in marketing, on our website, or on social
            media without your express written consent
          </strong>
          , which you may withdraw at any time. We do not photograph interiors beyond what is
          necessary, and we do not photograph occupants.
        </p>
      </>
    ),
  },
  {
    heading: 'Keys and access information',
    body: (
      <>
        <p>
          Keys and access devices are held in a locked, access-controlled cabinet at{' '}
          <span className="text-ink">[location]</span>. They are identified by a code, never by
          your name or address, so that a lost key cannot be matched to a property.
        </p>
        <p>
          Alarm codes and access instructions are stored{' '}
          <span className="text-ink">[describe: e.g. in an encrypted password manager]</span>,
          separately from address records, and are accessible only to{' '}
          <span className="text-ink">[who]</span>.
        </p>
        <p>
          If a key or access credential is lost, we will tell you without delay and meet the
          reasonable cost of re-keying or recoding.
        </p>
      </>
    ),
  },
  {
    heading: 'How we use it',
    body: (
      <p>
        To schedule and perform attendances, produce your reports, prepare quotes, coordinate trades
        you have approved, manage billing, and contact you about your property. We do not sell your
        information, and we do not use it for advertising or profiling.
      </p>
    ),
  },
  {
    heading: 'Who we share it with',
    body: (
      <>
        <p>We disclose your information only where necessary:</p>
        <ul className="space-y-2.5">
          {[
            'Trades and contractors — limited to the address and job detail needed, and only for work you have approved.',
            'Our payment provider, for billing.',
            'Your insurer or property manager, at your request or with your consent.',
            'Emergency services or authorities, where there is a serious and imminent threat to safety or property.',
            'Where required by law.',
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span className="text-ink/30 mt-[2px]">—</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p>
          Some service providers may store data outside Australia.{' '}
          <span className="text-ink">
            [List providers and countries, and confirm the cross-border disclosure position.]
          </span>
        </p>
      </>
    ),
  },
  {
    heading: 'Security and retention',
    body: (
      <>
        <p>
          Records are held in access-controlled systems protected by strong, unique credentials and
          multi-factor authentication where available. Physical keys are secured as described above.
        </p>
        <p>
          We keep reporting and photographic history for{' '}
          <span className="text-ink">[retention period]</span> after a membership ends, so that it
          remains available for insurance or sale, then destroy or de-identify it. Access records
          and keys are returned or destroyed on cancellation.
        </p>
      </>
    ),
  },
  {
    heading: 'Accessing and correcting your information',
    body: (
      <p>
        You may ask for a copy of the information we hold about you, ask us to correct it, or ask us
        to delete it. Write to <span className="text-ink">[email]</span> and we will respond within{' '}
        <span className="text-ink">[30]</span> days. There is no charge for a reasonable request.
      </p>
    ),
  },
  {
    heading: 'Complaints',
    body: (
      <>
        <p>
          If you are concerned about how we have handled your information, contact us first at{' '}
          <span className="text-ink">[email]</span> or 0417 349 071. We will acknowledge within{' '}
          <span className="text-ink">[5]</span> business days.
        </p>
        <p>
          If you are not satisfied with our response, you may contact the Office of the Australian
          Information Commissioner at oaic.gov.au or 1300 363 992.
        </p>
      </>
    ),
  },
  {
    heading: 'Our status under the Privacy Act',
    body: (
      <>
        <p>
          <span className="text-ink">
            [For your solicitor: businesses with an annual turnover of $3 million or less are
            generally exempt from the Privacy Act 1988 (Cth), though exceptions apply and a business
            may opt in. Confirm whether Coastal Pro is bound, and whether opting in is preferable.]
          </span>
        </p>
        <p>
          Given the nature of what we hold — keys, alarm codes and images of unoccupied homes — we
          intend to handle personal information in accordance with the Australian Privacy Principles
          regardless of whether we are legally required to.
        </p>
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="28 July 2026"
      intro={
        <p>
          Caring for a property means holding information most businesses never touch — where your
          house is, when it is empty, how to get in, and what it looks like inside. This policy sets
          out exactly what we collect, how it is secured, and what we will never do with it.
        </p>
      }
      clauses={CLAUSES}
    />
  );
}
