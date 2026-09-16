/* ─────────────────────────────────────────────────────────────
   Content model — transcribed from the 2026 brochure.
   Feature inheritance mirrors the brochure exactly ("Everything in
   Essential, plus:"), so cards stay readable and the full matrix
   lives in the comparison table.
   ───────────────────────────────────────────────────────────── */

export const TAGLINE = 'One call and we organise it all.';

/* ── Membership tiers ─────────────────────────────────────── */

export const ESSENTIAL_FEATURES = [
  'One scheduled comprehensive property inspection each month',
  'External building condition check',
  'Visual roofline, gutter and downpipe inspection (ground level)',
  'Windows and external doors checked',
  'Gates, fences and boundary condition checked',
  'Decking, stairs and balustrades visually inspected',
  'Visible signs of water ingress or storm damage checked',
  'Outdoor taps and obvious plumbing concerns noted',
  'General security inspection',
  'Garden and outdoor area visual check',
  'Pool and spa area visual inspection (where applicable)',
  'Digital photographic Property Care Report after every visit',
  'Maintenance recommendations',
  'Access to Coastal Pro maintenance services',
];

export const SIGNATURE_ADDS = [
  'Two scheduled property visits per month',
  'Priority booking for Coastal Pro maintenance services',
  'Detailed preventative maintenance monitoring',
  'Timber and deck condition monitoring',
  'Doors, locks, hinges and gates checked',
  'Visual moisture and mould concerns identified',
  'Property checked following extended vacancy periods',
  'Storm-related condition monitoring during scheduled visits',
  'Pre-arrival property inspection (when substituted for a scheduled visit)',
  'Tradesperson access coordination',
  'Contractor coordination and communication',
  'Property maintenance history maintained',
  'Annual Property Health Assessment',
  '12-Month Maintenance Recommendations Report',
];

export const PREMIUM_ADDS = [
  'Weekly scheduled property attendance',
  'Priority response to property issues',
  'Comprehensive property condition monitoring',
  'Pre-arrival property preparation and inspection',
  'Post-storm inspections when reasonably required',
  'Contractor access, supervision and coordination',
  'Deliveries accepted by prior arrangement',
  'Utility and appliance visual checks',
  'Outdoor furniture and property presentation checks',
  'Detailed maintenance planning',
  'Seasonal property preparation',
  'Quarterly Comprehensive Property Reports',
  'Annual Timber, Deck and Fence Assessment',
  'Annual Preventative Maintenance Plan',
  'Dedicated Coastal Pro Contact',
  'Priority access to Coastal Pro maintenance services',
];

export type Plan = {
  id: 'essential' | 'signature' | 'premium';
  index: string;
  name: string;
  price: number;
  annual: number;
  strap: string;
  line: string;
  cadence: string;
  inheritsFrom?: string;
  features: string[];
  discount: string;
  benefits: string[];
  cta: string;
  note?: string;
};

export const PLANS: Plan[] = [
  {
    id: 'essential',
    index: '01',
    name: 'Essential',
    price: 179,
    annual: 2148,
    strap: 'Professional Monthly Property Oversight',
    line: 'For owners who want a trusted local professional regularly checking on their property.',
    cadence: 'One scheduled visit each month',
    features: ESSENTIAL_FEATURES,
    discount: '5',
    benefits: ['5% discount on Coastal Pro carpentry and maintenance services'],
    cta: 'Enquire',
  },
  {
    id: 'signature',
    index: '02',
    name: 'Signature',
    price: 299,
    annual: 3588,
    strap: 'Active Property Care & Maintenance Oversight',
    line: 'For owners who want their Peninsula property actively cared for, monitored and maintained.',
    cadence: 'Two scheduled visits each month',
    inheritsFrom: 'Essential',
    features: SIGNATURE_ADDS,
    discount: '10',
    benefits: ['10% discount on Coastal Pro carpentry and maintenance services'],
    cta: 'Enquire',
    note: 'Most popular package',
  },
  {
    id: 'premium',
    index: '03',
    name: 'Premium',
    price: 499,
    annual: 5988,
    strap: 'Private Property Care For Premium Peninsula Homes',
    line: 'For owners who expect their property to be ready whenever they arrive.',
    cadence: 'Weekly scheduled attendance',
    inheritsFrom: 'Signature',
    features: PREMIUM_ADDS,
    discount: '15',
    benefits: [
      '15% discount on Coastal Pro carpentry and maintenance services',
      'Highest priority service response',
      'Dedicated property care relationship',
    ],
    cta: 'Request consultation',
    note: 'Limited to five properties only',
  },
];

export const MEMBERSHIP_BENEFITS = [
  { title: 'One point of contact', body: 'One trusted local professional who knows your property.' },
  { title: 'Preventative approach', body: 'Regular inspections and maintenance prevent costly surprises.' },
  { title: 'Detailed reporting', body: 'Digital reports with photographs after every visit.' },
  { title: 'Priority service', body: 'Members receive priority booking and response.' },
];

/* Built from the tiers so the matrix can never drift from the cards. */
export const COMPARISON = [
  ...ESSENTIAL_FEATURES.map((f) => ({ feature: f, essential: true, signature: true, premium: true })),
  ...SIGNATURE_ADDS.map((f) => ({ feature: f, essential: false, signature: true, premium: true })),
  ...PREMIUM_ADDS.map((f) => ({ feature: f, essential: false, signature: false, premium: true })),
];

/* ── Property care services (brochure p.4–5) ──────────────── */

export const CARE_SERVICES = [
  {
    index: '01',
    title: 'Routine property inspections',
    body: 'Regular scheduled inspections to ensure your property is secure and well maintained.',
  },
  {
    index: '02',
    title: 'Pre-arrival preparation',
    body: 'We get your property ready for your arrival so you can relax from the moment you walk in.',
  },
  {
    index: '03',
    title: 'Departure checks',
    body: 'We ensure everything is secure, clean and set for when you leave.',
  },
  {
    index: '04',
    title: 'Storm and weather monitoring',
    body: 'We monitor conditions and inspect your property after severe weather.',
  },
  {
    index: '05',
    title: 'Security checks',
    body: 'Lock, alarm, gate and perimeter checks for complete peace of mind.',
  },
];

/* ── Maintenance and carpentry (brochure p.6) ─────────────── */

export const TRADE_SERVICES = [
  {
    title: 'General property maintenance',
    body: 'Routine repairs and maintenance to keep your property in excellent condition year-round.',
  },
  {
    title: 'Carpentry repairs',
    body: 'Timber repairs, weatherboards, architraves, skirting boards, gates and outdoor structures.',
  },
  {
    title: 'Door and window repairs',
    body: 'Adjustment and repair of sticking doors, locks, handles, hinges and window hardware.',
  },
  {
    title: 'Decking and pergola maintenance',
    body: 'Deck repairs, board replacement, timber restoration and structural maintenance.',
  },
  {
    title: 'Fencing and gate repairs',
    body: 'Fence repairs, gate adjustments and general boundary maintenance.',
  },
  {
    title: 'Pre-sale and pre-lease improvements',
    body: 'Helping owners prepare properties for sale, lease or holiday occupancy.',
  },
];

/* ── Specialist coordination (brochure p.7) ───────────────── */

export const COORDINATED = [
  {
    title: 'Building and property inspections',
    items: ['Structural concerns', 'Building defects', 'Water ingress investigations', 'Property condition reports', 'Pre-purchase inspections'],
  },
  {
    title: 'Electrical services',
    items: ['Safety inspections', 'Fault investigations', 'Lighting and power issues', 'Switchboard assessments', 'Compliance requirements'],
  },
  {
    title: 'Plumbing services',
    items: ['Leak detection', 'Drainage concerns', 'Hot water systems', 'Roof plumbing inspections', 'Maintenance assessments'],
  },
  {
    title: 'Pool and spa services',
    items: ['Equipment inspections', 'Compliance checks', 'Water quality assessments', 'Maintenance recommendations'],
  },
  {
    title: 'Landscaping and arborist services',
    items: ['Tree assessments', 'Storm damage inspections', 'Irrigation reviews', 'Landscape maintenance planning'],
  },
  {
    title: 'Insurance and damage assessments',
    items: ['Storm damage inspections', 'Insurance reporting support', 'Emergency make-safe coordination', 'Repair quotations'],
  },
];

export const COORDINATION_INCLUDES = [
  'Liaising with contractors',
  'Scheduling appointments',
  'Organising property access',
  'Obtaining quotations',
  'Progress updates and communication',
  'Follow-up coordination where required',
];

/* Regulatory scope. This is a compliance statement, not marketing —
   it appears verbatim on the brochure and must stay verbatim here. */
export const LICENSING_NOTICE =
  'Coastal Pro Property Care does not undertake licensed electrical, plumbing, gas fitting, structural engineering or other regulated trade services. Where specialist or licensed work is required, we coordinate suitably qualified and licensed professionals on behalf of our clients.';

/* ── Annual Property Health Assessment (brochure p.8) ─────── */

export const ASSESSMENT_AREAS = [
  {
    title: 'Building and structural elements',
    items: ['External cladding and weatherboards', 'Decks, pergolas and outdoor structures', 'Doors and windows', 'Signs of movement or deterioration', 'Visible moisture concerns'],
  },
  {
    title: 'Grounds and landscaping',
    items: ['Garden condition', 'Irrigation systems', 'Tree and vegetation management', 'Drainage concerns', 'Stormwater flow'],
  },
  {
    title: 'Maintenance requirements',
    items: ['General wear and tear', 'Timber maintenance requirements', 'Painting requirements', 'Minor repairs required', 'Safety concerns'],
  },
  {
    title: 'Coastal environment impacts',
    items: ['Salt exposure impacts', 'Corrosion risks', 'Timber weathering', 'External surface deterioration', 'Preventative maintenance requirements'],
  },
];

export const ASSESSMENT_DELIVERABLES = [
  'Detailed property condition summary',
  'Photo documentation',
  'Identified maintenance issues',
  'Priority repair recommendations',
  'Preventative maintenance suggestions',
  'Estimated maintenance timeline',
  'Budget planning recommendations',
];

export const ASSESSMENT_REASONS = [
  { title: 'Save money', body: 'Identify issues before they become major repairs.' },
  { title: 'Protect property value', body: 'Maintain presentation and long-term value.' },
  { title: 'Plan ahead', body: 'Budget for future maintenance with confidence.' },
  { title: 'Peace of mind', body: 'Know your property is being monitored by a local professional.' },
];

export const IDEAL_FOR = [
  'Holiday home owners',
  'Coastal properties',
  'Permanent residences',
  'Investment properties',
  'Families living interstate',
];

/* ── Why Coastal Pro (brochure p.9) ───────────────────────── */

export const WHY_US = [
  { title: 'Reliable and trusted', body: 'We turn up when we say we will, communicate clearly and take pride in doing the job right.' },
  { title: 'Local knowledge', body: 'We live and work on the Mornington Peninsula, so we understand the local conditions and coastal challenges.' },
  { title: 'Wide range of services', body: 'From carpentry and maintenance to property checks and specialist coordination.' },
  { title: 'Tailored solutions', body: 'Every property is different. Our services and membership packages are flexible and tailored to your needs.' },
  { title: 'Quality workmanship', body: 'We take pride in our work and always aim for a high standard of finish, with attention to detail on every job.' },
  { title: 'Sustainable approach', body: 'We use responsible practices and long-lasting solutions to help protect your property and the environment.' },
  { title: 'Transparent pricing', body: 'No hidden costs. We provide clear quotes and honest advice so you know exactly what to expect.' },
  { title: 'Trusted specialists', body: 'When licensed or specialist work is required, we coordinate qualified local professionals on your behalf.' },
];

export const WHY_WE_EXIST = [
  { title: 'Protect your investment', body: 'Preventative maintenance and regular inspections help avoid costly surprises.' },
  { title: 'Save you time', body: 'We coordinate trades, inspections and maintenance so you do not have to.' },
  { title: 'Give you peace of mind', body: 'Know your property is safe, secure and well looked after.' },
  { title: 'Maintain and enhance value', body: 'Well maintained properties hold their value and perform better long term.' },
];

/* ── The problem ──────────────────────────────────────────── */

export const CONCERNS = [
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

export const PROCESS = [
  {
    index: '01',
    title: 'We attend on schedule',
    body: 'Visits are planned, not reactive. You know when we are coming, and so does your calendar.',
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

/* ── Sample report ────────────────────────────────────────── */

export const REPORT_CONDITIONS = [
  { area: 'Roofline and gutters', rating: 'Attention', tone: 'amber' as const, pct: 42 },
  { area: 'Timber and decking', rating: 'Fair', tone: 'stone' as const, pct: 64 },
  { area: 'External paint', rating: 'Good', tone: 'sage' as const, pct: 81 },
  { area: 'Drainage and grounds', rating: 'Good', tone: 'sage' as const, pct: 88 },
];

export const REPORT_FINDINGS = [
  { level: 'Urgent', tone: 'amber' as const, text: 'Gutter separation, north elevation', quoted: true },
  { level: 'Monitor', tone: 'stone' as const, text: 'Deck sealing due within six months', quoted: true },
  { level: 'Planned', tone: 'sage' as const, text: 'Exterior repaint, eighteen month horizon', quoted: false },
];

/* ── Coverage (brochure p.2) ──────────────────────────────────
   Positions derived from real latitude/longitude, so the run of the
   coast is true. Named suburbs sit on the map; the wider list is
   typographic.                                                     */

export const SUBURBS = [
  { name: 'Mount Martha', x: 510, y: 30 },
  { name: 'Dromana', x: 435, y: 105 },
  { name: 'Rosebud', x: 330, y: 135 },
  { name: 'Rye', x: 210, y: 165 },
  { name: 'Blairgowrie', x: 150, y: 150 },
  { name: 'Sorrento', x: 90, y: 120 },
  { name: 'Portsea', x: 45, y: 90 },
];

export const WIDER_AREA = [
  'Safety Beach',
  'Fingal',
  'Mornington',
  'Red Hill',
  'Balnarring',
  'Somers',
  'Shoreham',
  'Flinders',
  'Cape Schanck',
];

/* ── FAQ ──────────────────────────────────────────────────── */

export const FAQS = [
  {
    id: 'scope',
    q: 'What does a membership actually cover?',
    a: 'Oversight, attendance and reporting. We attend on schedule, inspect against a consistent checklist, photograph everything and send you a written report. Repair work is quoted separately, always with photographs and a fixed price before anything begins.',
  },
  {
    id: 'licensed',
    q: 'Do you carry out electrical or plumbing work yourselves?',
    a: 'No. We do not undertake licensed electrical, plumbing, gas fitting, structural engineering or other regulated trade services. Where that work is required we coordinate suitably qualified and licensed professionals on your behalf, organise access, obtain quotations and keep you informed throughout.',
  },
  {
    id: 'urgent',
    q: 'What if you find something urgent while I am away?',
    a: 'We make it safe first and tell you the same day, with photographs. For anything genuinely urgent — water entering the building, a security failure, a structural risk — we will make it safe immediately without waiting for approval, then send you the cost. For everything else you approve the quote before work begins.',
  },
  {
    id: 'coordination-fee',
    q: 'How do coordination fees work?',
    a: 'Where we organise a specialist inspection or licensed trade, we charge a coordination and management fee covering liaison, scheduling, access, quotations and follow-up. Fees are tailored to the scope and complexity of each project and are always confirmed with you in advance.',
  },
  {
    id: 'cancel',
    q: 'Can I pause or cancel?',
    a: 'At any time, with no exit fee and no minimum term. Many Peninsula owners pause over the months they are in residence and resume when they leave. Your full reporting history remains available either way.',
  },
  {
    id: 'insurance',
    q: 'Are you insured, and are the trades you engage insured?',
    a: 'We carry public liability and professional indemnity cover. Every trade we coordinate is licensed and separately insured, and we verify currency before they attend.',
  },
  {
    id: 'keys',
    q: 'How are keys and access handled?',
    a: 'Keys are held in a locked, access-controlled cabinet and are never labelled with your address. We attend only on scheduled dates, every entry and exit is logged, and the log appears in your report. Coded entry or a smart lock works equally well.',
  },
  {
    id: 'storm',
    q: 'What happens after a storm?',
    a: 'We attend without waiting to be asked. You receive a photographic damage assessment within twenty-four hours, along with anything needed for an insurance claim. There is no additional charge for a storm attendance.',
  },
];

/* ⚠ PLACEHOLDER — written, not real, and attributed to named people.
   Replace with genuine testimonials (with written permission to use
   name and suburb) or remove the section BEFORE launch. See
   PRE-LAUNCH.md. */
export const TESTIMONIALS = [
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
