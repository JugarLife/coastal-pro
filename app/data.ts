/* Feature inheritance is modelled explicitly so each card can show
   what carries over (muted) versus what the tier adds (full ink). */

export const BASE_FEATURES = [
  'Scheduled attendance',
  'Exterior and building condition check',
  'Roofline, gutters and downpipes',
  'Timber, decks, fences and external areas',
  'Security and access verification',
  'Storm and water monitoring',
  'Pre-arrival inspection',
  'Photographic record and written report',
];

export const SIGNATURE_ADDS = [
  'Trades and contractor coordination',
  'Priority booking and response',
  'Annual property health assessment',
];

export const RESERVE_ADDS = [
  'Quarterly comprehensive condition report',
  'Annual preventative maintenance plan',
  'Dedicated Coastal Pro contact',
];

export type Plan = {
  id: 'essential' | 'signature' | 'reserve';
  index: string;
  name: string;
  price: number;
  annual: number;
  line: string;
  cadence: string;
  inherited: string[];
  added: string[];
  discount: string;
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
    line: 'Keeping an eye on your property.',
    cadence: 'One scheduled visit each month',
    inherited: [],
    added: BASE_FEATURES,
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
    inherited: BASE_FEATURES,
    added: SIGNATURE_ADDS,
    discount: '10',
    cta: 'Enquire',
  },
  {
    id: 'reserve',
    index: '03',
    name: 'Reserve',
    price: 499,
    annual: 5988,
    line: 'Private care for when excellence is expected.',
    cadence: 'Weekly scheduled attendance',
    inherited: [...BASE_FEATURES, ...SIGNATURE_ADDS],
    added: RESERVE_ADDS,
    discount: '15',
    cta: 'Request consultation',
    note: 'Limited to five memberships',
  },
];

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

export const COMPARISON = [
  ...BASE_FEATURES.map((f) => ({ feature: f, essential: true, signature: true, reserve: true })),
  ...SIGNATURE_ADDS.map((f) => ({ feature: f, essential: false, signature: true, reserve: true })),
  ...RESERVE_ADDS.map((f) => ({ feature: f, essential: false, signature: false, reserve: true })),
];

/* Sample data — clearly labelled as such wherever it renders. */
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

/* Positions derived from actual latitude/longitude, scaled — the
   suburbs sit in true relative order along the bay coastline. */
export const SUBURBS = [
  { name: 'Mount Martha', x: 510, y: 30 },
  { name: 'Dromana', x: 435, y: 105 },
  { name: 'Rosebud', x: 330, y: 135 },
  { name: 'Rye', x: 210, y: 165 },
  { name: 'Blairgowrie', x: 150, y: 150 },
  { name: 'Sorrento', x: 90, y: 120 },
  { name: 'Portsea', x: 45, y: 90 },
];

export const FAQS = [
  {
    id: 'scope',
    q: 'What does a membership actually cover?',
    a: 'Oversight, attendance and reporting. We attend on schedule, inspect against a consistent checklist, photograph everything and send you a written report. Repair work is quoted separately, always with photographs and a fixed price before anything begins.',
  },
  {
    id: 'urgent',
    q: 'What if you find something urgent while I am away?',
    a: 'We make it safe first and tell you the same day, with photographs. For anything genuinely urgent — water entering the building, a security failure, a structural risk — we will make it safe immediately without waiting for approval, then send you the cost. For everything else you approve the quote before work begins.',
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

export const TESTIMONIALS = [
  {
    quote:
      'We are in Melbourne eleven months of the year. The report lands on the same day each month and I have stopped wondering what is happening down there.',
    name: 'J. and S. Marchetti',
    place: 'Portsea',
  },
  {
    quote:
      'They found a gutter separation in April that would have been inside the wall by spring. The photographs made the insurance conversation straightforward.',
    name: 'M. Lawson',
    place: 'Sorrento',
  },
  {
    quote:
      'Understated, punctual and genuinely knowledgeable about coastal timber. They treat the house the way we would if we were there.',
    name: 'E. and D. Thornbury',
    place: 'Blairgowrie',
  },
];
