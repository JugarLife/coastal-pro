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

/* ── Mornington Peninsula outline ─────────────────────────────
   Traced from the coastline on page 2 of the 2026 brochure: the
   landmass was flood-filled, its outer boundary followed, then
   simplified to 204 points. Real shape, not an abstraction.
   Markers sit on the traced bay coastline at their true relative
   distances from Point Nepean.                                  */
export const PENINSULA_PATH =
  'M0.0,497.7 L9.3,469.8 L23.3,474.4 L30.2,486.0 L44.2,497.7 L62.8,504.7 L86.0,502.3 L93.0,493.0 L137.2,490.7 L181.4,481.4 L232.6,462.8 L367.4,388.4 L390.7,372.1 L416.3,341.9 L420.9,332.6 L420.9,316.3 L416.3,311.6 L416.3,304.7 L425.6,288.4 L467.4,258.1 L493.0,232.6 L502.3,211.6 L502.3,181.4 L516.3,162.8 L520.9,162.8 L534.9,146.5 L600.0,111.6 L620.9,90.7 L627.9,76.7 L641.9,65.1 L655.8,67.4 L667.4,90.7 L676.7,86.0 L690.7,65.1 L702.3,69.8 L723.3,69.8 L758.1,23.3 L774.4,20.9 L781.4,16.3 L786.0,0.0 L804.7,16.3 L807.0,23.3 L811.6,23.3 L814.0,32.6 L823.3,44.2 L841.9,46.5 L862.8,58.1 L860.5,67.4 L869.8,90.7 L879.1,97.7 L883.7,95.3 L883.7,107.0 L888.4,114.0 L886.0,127.9 L893.0,134.9 L895.3,144.2 L893.0,153.5 L893.0,146.5 L888.4,141.9 L883.7,144.2 L881.4,162.8 L886.0,172.1 L879.1,174.4 L881.4,200.0 L867.4,216.3 L867.4,262.8 L883.7,279.1 L886.0,293.0 L900.0,311.6 L900.0,316.3 L907.0,318.6 L904.7,332.6 L909.3,353.5 L948.8,407.0 L946.5,423.3 L951.2,434.9 L979.1,472.1 L983.7,486.0 L1000.0,502.3 L1000.0,723.3 L1000.0,611.6 L993.0,609.3 L990.7,614.0 L995.3,616.3 L988.4,616.3 L981.4,609.3 L979.1,625.6 L972.1,616.3 L967.4,620.9 L962.8,616.3 L960.5,623.3 L946.5,632.6 L948.8,637.2 L955.8,637.2 L941.9,644.2 L939.5,639.5 L934.9,644.2 L923.3,641.9 L918.6,651.2 L918.6,665.1 L911.6,665.1 L911.6,672.1 L904.7,672.1 L897.7,679.1 L897.7,686.0 L897.7,681.4 L893.0,679.1 L883.7,683.7 L888.4,690.7 L881.4,690.7 L879.1,686.0 L865.1,686.0 L860.5,690.7 L855.8,688.4 L853.5,702.3 L853.5,697.7 L844.2,690.7 L837.2,695.3 L837.2,702.3 L837.2,697.7 L830.2,690.7 L823.3,693.0 L820.9,688.4 L802.3,688.4 L800.0,697.7 L804.7,700.0 L788.4,697.7 L783.7,711.6 L786.0,707.0 L779.1,700.0 L781.4,681.4 L776.7,669.8 L772.1,667.4 L772.1,676.7 L758.1,693.0 L758.1,702.3 L730.2,702.3 L732.6,716.3 L744.2,711.6 L746.5,716.3 L751.2,716.3 L741.9,716.3 L732.6,723.3 L732.6,730.2 L727.9,732.6 L727.9,744.2 L727.9,734.9 L714.0,723.3 L702.3,727.9 L702.3,744.2 L686.0,723.3 L693.0,714.0 L702.3,711.6 L707.0,711.6 L709.3,716.3 L718.6,711.6 L725.6,714.0 L730.2,709.3 L725.6,700.0 L697.7,690.7 L697.7,704.7 L688.4,707.0 L688.4,700.0 L681.4,693.0 L672.1,693.0 L667.4,697.7 L660.5,693.0 L646.5,693.0 L634.9,683.7 L625.6,665.1 L611.6,648.8 L604.7,646.5 L602.3,639.5 L565.1,630.2 L541.9,630.2 L520.9,639.5 L516.3,644.2 L516.3,651.2 L497.7,665.1 L488.4,662.8 L483.7,667.4 L467.4,669.8 L434.9,688.4 L425.6,709.3 L393.0,707.0 L339.5,746.5 L314.0,755.8 L307.0,748.8 L274.4,734.9 L253.5,716.3 L216.3,716.3 L211.6,711.6 L200.0,711.6 L193.0,718.6 L174.4,716.3 L144.2,681.4 L127.9,672.1 L120.9,672.1 L53.5,607.0 L27.9,569.8 L20.9,555.8 L20.9,544.2 L2.3,518.6 L0.0,500.0 Z';

export const PENINSULA_VIEWBOX = '-122 -62 1240 906';

export const SUBURBS: {
  name: string; x: number; y: number; lx: number; ly: number; anchor: 'start' | 'end';
}[] = [
  { name: 'Portsea', x: 86.6, y: 501.5, lx: 46.6, ly: 511.5, anchor: 'end' as const },
  { name: 'Sorrento', x: 163.7, y: 485.1, lx: 129.7, ly: 455.1, anchor: 'end' as const },
  { name: 'Blairgowrie', x: 259.9, y: 447.7, lx: 299.9, ly: 457.7, anchor: 'start' as const },
  { name: 'Rye', x: 365.1, y: 389.7, lx: 405.1, ly: 399.7, anchor: 'start' as const },
  { name: 'Rosebud', x: 482.2, y: 243.4, lx: 522.2, ly: 253.4, anchor: 'start' as const },
  { name: 'Dromana', x: 618.9, y: 92.7, lx: 578.9, ly: 102.7, anchor: 'end' as const },
  { name: 'Safety Beach', x: 667.3, y: 90.4, lx: 707.3, ly: 100.4, anchor: 'start' as const },
  { name: 'Mount Martha', x: 761.6, y: 22.8, lx: 801.6, ly: 32.8, anchor: 'start' as const },];

/* Label positions above were solved offline by greedy placement — widest
   labels first, candidate offsets tried in preference order, rejecting any
   that collide with a placed label or another marker. Hand-nudging eight
   labels by eye is how you end up with the overlaps this map started with. */

export const WIDER_AREA = [
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
