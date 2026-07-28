import type { Metadata } from 'next';
import LegalPage, { type Clause } from '../components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Membership',
  description: 'Terms governing Coastal Pro Property Care memberships.',
  robots: { index: false, follow: true },
};

const CLAUSES: Clause[] = [
  {
    heading: 'Who we are',
    body: (
      <>
        <p>
          Coastal Pro Property Care (ABN <span className="text-navy">[ABN]</span>), of{' '}
          <span className="text-navy">[registered address]</span>, Victoria. In these terms
          &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; mean Coastal Pro Property Care.
          &ldquo;You&rdquo; means the member named on the membership.
        </p>
        <p>
          These terms apply from the date your first payment is processed, or from your first
          scheduled attendance, whichever is earlier.
        </p>
      </>
    ),
  },
  {
    heading: 'What a membership includes',
    body: (
      <>
        <p>
          A membership covers <strong className="text-navy">oversight, attendance and reporting</strong>{' '}
          at the frequency of your tier: Essential one visit each month, Signature two visits each
          month, Reserve weekly attendance.
        </p>
        <p>
          Each attendance includes a visual inspection against our standard checklist, photographic
          documentation, and a written report delivered within one business day.
        </p>
        <p>
          A membership is not a security service, not a caretaking or house-sitting service, and not
          a guarantee against loss or damage. We attend on a schedule; we are not present between
          visits.
        </p>
      </>
    ),
  },
  {
    heading: 'What is not included',
    body: (
      <>
        <p>
          Repair, maintenance and improvement works are <strong className="text-navy">quoted separately</strong>{' '}
          and are never carried out without your prior written approval. This includes work we
          identify during an inspection.
        </p>
        <p>
          Also excluded: materials, third-party trade charges, statutory inspections, pest control,
          cleaning, gardening beyond visual assessment, and any works requiring a permit — unless
          separately agreed in writing.
        </p>
        <p>
          Members receive a discount on eligible carpentry works performed by us: 5% (Essential),
          10% (Signature), 15% (Reserve). The discount applies to our labour only, not to materials
          or third-party charges.
        </p>
      </>
    ),
  },
  {
    heading: 'Fees, billing and GST',
    body: (
      <>
        <p>
          Fees are as published at the time you join. Monthly memberships are billed monthly in
          advance; annual memberships are billed yearly in advance. All amounts are in Australian
          dollars and <span className="text-navy">[include / exclude]</span> GST.
        </p>
        <p>
          We may change fees on <span className="text-navy">[30 / 60]</span> days&rsquo; written
          notice. Any change takes effect from your next billing period, and you may cancel before
          it applies.
        </p>
        <p>
          If a payment fails we will contact you. Attendance may be suspended if an account remains
          unpaid for more than <span className="text-navy">[14]</span> days.
        </p>
      </>
    ),
  },
  {
    heading: 'Cancellation and pausing',
    body: (
      <>
        <p>
          There is no minimum term and no exit fee. You may cancel or pause at any time by written
          notice. Cancellation takes effect at the end of your current paid period; we do not
          pro-rata refund a partly used period unless we have failed to provide the service.
        </p>
        <p>
          On cancellation we will return any keys or access devices, and provide your complete
          reporting and photographic history.
        </p>
        <p>
          We may cancel a membership on <span className="text-navy">[30]</span> days&rsquo; notice,
          or immediately where a property is unsafe to attend, where access is not workable, or
          where fees remain unpaid.
        </p>
      </>
    ),
  },
  {
    heading: 'Access, keys and your obligations',
    body: (
      <>
        <p>
          You authorise us to enter the property for scheduled attendances and agreed works. You
          confirm you are the owner, or are authorised by the owner to grant that access.
        </p>
        <p>
          Keys and access devices are held securely and are not labelled with your address. Every
          entry and exit is logged and appears in your report.
        </p>
        <p>
          You must tell us about anything affecting safe attendance — alarm systems, animals,
          asbestos, structural defects, tenancies, or other parties with access. You must maintain
          your own building and contents insurance; a membership does not replace it.
        </p>
      </>
    ),
  },
  {
    heading: 'Reserve — limited availability',
    body: (
      <p>
        Reserve is capped at five concurrent memberships so that weekly attendance remains
        deliverable. Where the cap is reached, enquiries are placed on a waitlist. Being on the
        waitlist does not guarantee an offer, and we may decline any application at our discretion.
      </p>
    ),
  },
  {
    heading: 'Liability',
    body: (
      <>
        <p>
          We carry public liability and professional indemnity insurance and will perform our
          services with due care and skill.
        </p>
        <p>
          <strong className="text-navy">
            Nothing in these terms excludes, restricts or modifies any guarantee, right or remedy
            under the Australian Consumer Law that cannot lawfully be excluded.
          </strong>{' '}
          Where our liability can be limited, it is limited at our option to resupplying the
          services or paying the cost of resupply.
        </p>
        <p>
          To the extent permitted by law, we are not liable for loss or damage occurring between
          scheduled attendances, for pre-existing defects, for the acts or omissions of third-party
          trades engaged directly by you, or for consequential loss including loss of rent.
        </p>
        <p>
          <span className="text-navy">
            [Solicitor to confirm this clause is enforceable and appropriately scoped.]
          </span>
        </p>
      </>
    ),
  },
  {
    heading: 'Privacy',
    body: (
      <p>
        We collect and handle personal information — including property addresses, access
        arrangements and photographs of your property — as described in our{' '}
        <a href="/privacy" className="text-navy underline underline-offset-4 hover:text-blue">
          Privacy Policy
        </a>
        , which forms part of these terms.
      </p>
    ),
  },
  {
    heading: 'Changes, and governing law',
    body: (
      <>
        <p>
          We may update these terms. Where a change is material we will give you notice before it
          takes effect, and you may cancel if you do not accept it.
        </p>
        <p>
          These terms are governed by the laws of Victoria, Australia, and you and we submit to the
          non-exclusive jurisdiction of its courts.
        </p>
        <p>
          Questions: <span className="text-navy">[email]</span> or 0417 349 071.
        </p>
      </>
    ),
  },
];

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Membership"
      updated="28 July 2026"
      intro={
        <p>
          These terms govern Coastal Pro Property Care memberships. They set out what a membership
          covers, what is quoted separately, how access to your property is handled, and how either
          of us may end the arrangement. Please read them before joining.
        </p>
      }
      clauses={CLAUSES}
    />
  );
}
