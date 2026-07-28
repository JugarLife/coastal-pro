'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Check, Phone, Menu, X, ArrowRight, Shield, MapPin, Users, FileText, Wrench } from 'lucide-react';

export default function Home() {
  const [expandedComparison, setExpandedComparison] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const plans = [
    {
      id: 'essential',
      name: 'Essential',
      price: 179,
      annual: 2148,
      subtitle: 'Keeping watch',
      visits: '1 visit / month',
      features: [
        'Monthly property inspection',
        'Exterior & building assessment',
        'Roof, gutter & downpipe check',
        'Deck, fence & timber inspection',
        'Security & access verification',
        'Storm damage monitoring',
        'Digital photo documentation',
        'Maintenance history & reports',
      ],
      discount: '5',
    },
    {
      id: 'signature',
      name: 'Signature',
      price: 299,
      annual: 3588,
      subtitle: 'Full attention',
      visits: '2 visits / month',
      features: [
        'Bi-monthly property visits',
        'Comprehensive condition assessment',
        'Roof, gutter & downpipe monitoring',
        'Structural timber assessment',
        'Security system verification',
        'Weather-related inspections',
        'Full photo documentation',
        'Maintenance history & reports',
        'Trades & contractor coordination',
        'Priority booking & rapid response',
      ],
      discount: '10',
      badge: 'Most Chosen',
    },
    {
      id: 'reserve',
      name: 'Reserve',
      price: 499,
      annual: 5988,
      subtitle: 'Complete care',
      visits: 'Weekly visits',
      features: [
        'Weekly property visitation',
        'Comprehensive condition ratings',
        'Proactive roof & gutter maintenance',
        'Advanced timber assessment',
        'Security system optimization',
        'Seasonal preparation & monitoring',
        'High-resolution documentation',
        'Maintenance history & archiving',
        'Full trades & contractor management',
        'Dedicated priority access',
        'Quarterly comprehensive reports',
        'Annual maintenance planning',
      ],
      discount: '15',
      badge: 'Limited Availability',
    },
  ];

  const faqs = [
    {
      id: 'whats-included',
      question: "What's covered, and what's quoted separately?",
      answer: "Memberships include all inspections, monitoring, documentation, and reporting. Repair work is quoted separately. You receive detailed specifications and photography for every quote.",
    },
    {
      id: 'cancellation',
      question: 'Can I pause or cancel anytime?',
      answer: "Yes. No lock-in contracts. Cancel or pause whenever needed. Complete handover of all documentation, photos, and maintenance history.",
    },
    {
      id: 'insurance',
      question: 'Are you fully insured?',
      answer: "Completely. Full public liability and professional indemnity insurance. All coordinated trades carry appropriate licensing and insurance.",
    },
    {
      id: 'keys',
      question: 'How do you handle secure access?',
      answer: "Keys stored securely. Access only on scheduled dates. Every entry logged and reported. Alternative access arrangements available.",
    },
    {
      id: 'storm',
      question: "What happens if there's a storm or emergency?",
      answer: "Immediate inspection, photograph damage, detailed report within 24 hours. Urgent repair quotes from trusted network. Emergency response included.",
    },
    {
      id: 'quotes',
      question: 'How do quotes and repairs work?',
      answer: "Once work is identified, we source quotes from vetted tradespeople. You receive detailed specifications with pricing. You decide what to fix and when.",
    },
  ];

  return (
    <>
      {/* Premium Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-sm text-white py-3 px-4 lg:hidden z-40 flex gap-3 border-t border-brass/30">
        <button className="flex-1 bg-coastal-blue text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
          <Phone size={16} />
          Call
        </button>
        <button className="flex-1 bg-brass text-navy py-2.5 rounded-lg font-semibold text-sm hover:bg-yellow-600 transition-all">
          Plans
        </button>
      </div>

      {/* Premium Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-50 border-b border-brass/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">
          <span className="font-serif font-bold text-navy text-xl">Coastal Pro</span>

          <nav className="hidden lg:flex gap-12 text-sm font-semibold">
            <a href="#memberships" className="text-gray-600 hover:text-brass transition">Memberships</a>
            <a href="#report" className="text-gray-600 hover:text-brass transition">Reports</a>
            <a href="#faq" className="text-gray-600 hover:text-brass transition">FAQ</a>
            <a href="#contact" className="text-gray-600 hover:text-brass transition">Contact</a>
          </nav>

          <div className="hidden lg:flex gap-3">
            <button className="px-6 py-2.5 text-brass border-2 border-brass rounded-lg font-semibold hover:bg-brass hover:text-navy transition">Call</button>
            <button className="px-6 py-2.5 bg-brass text-navy rounded-lg font-semibold hover:bg-yellow-600 transition">View Plans</button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brass/20 bg-white py-4 px-4 flex flex-col gap-3">
            <a href="#memberships" className="text-gray-700 font-semibold">Memberships</a>
            <a href="#report" className="text-gray-700 font-semibold">Reports</a>
            <a href="#faq" className="text-gray-700 font-semibold">FAQ</a>
            <a href="#contact" className="text-gray-700 font-semibold">Contact</a>
          </div>
        )}
      </header>

      <main>
        {/* ============ SECTION 1: HERO - Navy Gradient Drama ============ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-dark-navy to-navy">
          <Image
            src="/hero-bg.jpg"
            alt="Mornington Peninsula coastal property"
            fill
            className="object-cover absolute inset-0 -z-10 opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 to-dark-navy/80 -z-10" />

          <div className="text-center text-white max-w-4xl px-4 relative z-10">
            <div className="mb-6 inline-block px-4 py-2 bg-brass/20 rounded-full border border-brass/40">
              <span className="text-sm font-semibold text-brass">TRUSTED BY PENINSULA OWNERS</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-serif font-bold mb-8 leading-tight">
              Your property.<br /><span className="text-brass">Professionally protected.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/80 mb-12 font-light max-w-3xl mx-auto">
              Monthly inspections. Detailed reports. Complete peace of mind for your Peninsula home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-brass text-navy px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 shadow-lg">
                View Memberships <ArrowRight size={20} />
              </button>
              <button className="bg-white/15 border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/25 transition backdrop-blur">
                Book Consultation
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-10 text-white/90">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-brass" />
                <span className="font-semibold">Fully Insured</span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={20} className="text-brass" />
                <span className="font-semibold">Qualified Tradespeople</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-brass" />
                <span className="font-semibold">Locally Based</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 2: PROBLEM - Sand with Cards ============ */}
        <section className="py-32 px-4 lg:px-8 bg-gradient-to-b from-sand via-sand/80 to-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl lg:text-7xl font-serif font-bold text-navy mb-6">
                Distance creates risk
              </h2>
              <p className="text-xl text-gray-700">
                Without regular oversight, small issues compound into expensive problems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '🌊', title: 'Storm Damage', desc: 'Found weeks later when structural impact spreads and costs multiply.' },
                { icon: '🪵', title: 'Timber Decay', desc: 'Small rot becomes structural failure. Prevention costs far less than replacement.' },
                { icon: '📞', title: 'No Local Help', desc: "When crisis hits, you're without an advocate who knows your property." }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-brass">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-2xl font-serif font-bold text-navy mb-4">{item.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 3: HOW IT WORKS - White Gradient Flow ============ */}
        <section className="py-32 px-4 lg:px-8 bg-gradient-to-b from-white to-light-gray">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl lg:text-7xl font-serif font-bold text-navy text-center mb-20">
              Three simple steps
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { num: '01', title: 'Scheduled Visits', desc: 'Regular inspections on your calendar. Consistent. Documented. Predictable.', icon: '📅' },
                { num: '02', title: 'Thorough Assessment', desc: 'Every area inspected. High-res photos. Condition ratings. Priority flagging.', icon: '🔍' },
                { num: '03', title: 'Digital Reports', desc: 'Complete documentation within 24 hours. Photos, ratings, recommendations.', icon: '📊' }
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute -top-8 left-0 text-8xl font-serif font-bold text-brass/10">{step.num}</div>
                  <div className="bg-gradient-to-br from-white to-light-gray rounded-xl p-10 border-2 border-gray-200 hover:border-brass transition-all">
                    <div className="text-5xl mb-6">{step.icon}</div>
                    <h3 className="text-2xl font-serif font-bold text-navy mb-4">{step.title}</h3>
                    <p className="text-gray-700 text-lg">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 4: MEMBERSHIPS - Dark Navy Background ============ */}
        <section id="memberships" className="py-32 px-4 lg:px-8 bg-gradient-to-b from-navy via-dark-navy to-navy text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brass/5 rounded-full -z-0" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-6xl lg:text-7xl font-serif font-bold mb-6">
                Three tiers of care
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Each tier includes full insurance, qualified tradespeople, and detailed reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                    plan.id === 'signature'
                      ? 'md:scale-110 md:shadow-2xl md:shadow-brass/40 ring-2 ring-brass bg-gradient-to-br from-brass via-yellow-600 to-brass'
                      : plan.id === 'reserve'
                      ? 'ring-2 ring-brass bg-gradient-to-br from-navy to-dark-navy'
                      : 'bg-white/10 backdrop-blur border border-white/20'
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute top-0 right-0 px-6 py-3 text-sm font-bold ${
                      plan.id === 'signature' 
                        ? 'bg-navy text-brass' 
                        : 'bg-brass text-navy'
                    }`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className={`p-10 ${plan.id === 'signature' ? 'text-navy' : 'text-white'}`}>
                    <h3 className={`text-4xl font-serif font-bold mb-2 ${plan.id === 'signature' ? 'text-navy' : 'text-white'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm mb-8 ${plan.id === 'signature' ? 'text-navy/80' : 'text-white/80'}`}>
                      {plan.subtitle}
                    </p>

                    <div className={`mb-8 pb-8 border-b ${plan.id === 'signature' ? 'border-navy/30' : 'border-white/20'}`}>
                      <div className={`text-6xl font-serif font-bold mb-2 ${plan.id === 'signature' ? 'text-navy' : 'text-brass'}`}>
                        ${plan.price}
                      </div>
                      <p className={`text-sm ${plan.id === 'signature' ? 'text-navy/70' : 'text-white/70'}`}>
                        per month / ${plan.annual} annually
                      </p>
                    </div>

                    <div className={`text-lg font-bold mb-8 pb-8 border-b ${plan.id === 'signature' ? 'border-navy/30 text-navy' : 'border-white/20 text-brass'}`}>
                      {plan.visits}
                    </div>

                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className={`flex gap-3 text-sm ${plan.id === 'signature' ? 'text-navy' : 'text-white'}`}>
                          <Check size={20} className={`flex-shrink-0 mt-0.5 ${plan.id === 'signature' ? 'text-navy' : 'text-brass'}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                      plan.id === 'signature'
                        ? 'bg-navy text-brass hover:bg-dark-navy'
                        : plan.id === 'reserve'
                        ? 'bg-brass text-navy hover:bg-yellow-500'
                        : 'bg-white text-navy hover:bg-gray-200'
                    }`}>
                      Select Plan
                    </button>

                    <p className={`text-xs text-center mt-6 ${plan.id === 'signature' ? 'text-navy/60' : 'text-white/60'}`}>
                      {plan.discount}% off carpentry & repairs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 5: COMPARISON - Light Gray ============ */}
        <section className="py-24 lg:py-32 px-4 lg:px-8 bg-gradient-to-b from-light-gray to-white">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setExpandedComparison(!expandedComparison)}
              className="w-full flex items-center justify-between p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-brass transition-all shadow-md"
            >
              <span className="text-2xl font-serif font-bold text-navy">Compare all features</span>
              <ChevronDown size={32} className={`text-brass transition-transform duration-300 ${expandedComparison ? 'rotate-180' : ''}`} />
            </button>

            {expandedComparison && (
              <div className="mt-8 bg-white rounded-2xl overflow-hidden border-2 border-brass/30">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-brass/20 to-yellow-100 border-b-2 border-brass">
                      <th className="text-left py-6 px-6 font-serif font-bold text-navy">Feature</th>
                      <th className="text-center py-6 px-6 font-serif font-bold text-navy">Essential</th>
                      <th className="text-center py-6 px-6 font-serif font-bold text-brass">Signature</th>
                      <th className="text-center py-6 px-6 font-serif font-bold text-brass">Reserve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'Scheduled visits',
                      'Exterior & building checks',
                      'Roof, gutter & downpipe inspection',
                      'Timber, decks & fence assessment',
                      'Security & access checks',
                      'Storm & water monitoring',
                      'Pre-arrival inspection',
                      'Digital photo documentation',
                      'Maintenance history & reports',
                      'Trades coordination',
                      'Priority booking & response',
                      'Annual property health assessment',
                      'Quarterly comprehensive reports',
                      'Dedicated contact person',
                    ].map((feature, idx) => (
                      <tr key={idx} className={`border-b border-gray-100 hover:bg-yellow-50 transition-colors ${idx % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                        <td className="py-6 px-6 text-gray-800 font-semibold">{feature}</td>
                        <td className="text-center py-6 px-6">
                          {['Scheduled visits', 'Exterior & building checks', 'Roof, gutter & downpipe inspection', 'Timber, decks & fence assessment', 'Security & access checks', 'Storm & water monitoring', 'Pre-arrival inspection', 'Digital photo documentation', 'Maintenance history & reports'].includes(feature) && (
                            <Check size={24} className="mx-auto text-brass font-bold" />
                          )}
                        </td>
                        <td className="text-center py-6 px-6">
                          {feature !== 'Quarterly comprehensive reports' && feature !== 'Dedicated contact person' && (
                            <Check size={24} className="mx-auto text-brass font-bold" />
                          )}
                        </td>
                        <td className="text-center py-6 px-6">
                          <Check size={24} className="mx-auto text-brass font-bold" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ============ SECTION 6: REPORT - White with Accent ============ */}
        <section id="report" className="py-32 px-4 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-6xl lg:text-7xl font-serif font-bold text-navy mb-6">
                The Property Care Report
              </h2>
              <p className="text-xl text-gray-700">
                Professional documentation. Your property, fully understood.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="bg-gradient-to-br from-light-gray to-sand rounded-3xl p-12 shadow-xl">
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-bold text-brass uppercase tracking-widest mb-4">Condition Rating</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-brass to-yellow-500 rounded-full" />
                      </div>
                      <span className="text-2xl font-bold text-brass">75%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-brass uppercase tracking-widest mb-6">Priority Issues</p>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
                        <span className="bg-red-400 text-white px-4 py-2 rounded-lg text-xs font-bold flex-shrink-0">URGENT</span>
                        <span className="text-gray-800 font-semibold">Gutter replacement needed on north elevation</span>
                      </div>
                      <div className="flex gap-4 items-start bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
                        <span className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex-shrink-0">SOON</span>
                        <span className="text-gray-800 font-semibold">Deck sealing recommended within 6 months</span>
                      </div>
                      <div className="flex gap-4 items-start bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
                        <span className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex-shrink-0">PLAN</span>
                        <span className="text-gray-800 font-semibold">Exterior paint refresh in 18 months</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t-4 border-brass">
                    <p className="text-xs font-bold text-brass uppercase tracking-widest mb-3">Photography</p>
                    <p className="text-gray-700 text-lg font-semibold">20+ high-resolution photos with annotations</p>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                {[
                  { icon: '⚡', title: 'Within 24 hours', desc: 'Complete documentation delivered to your inbox' },
                  { icon: '💾', title: 'Permanently archived', desc: 'Every report stored for property history tracking' },
                  { icon: '💰', title: 'Detailed quotes', desc: 'From our vetted network of qualified tradespeople' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-3xl font-serif font-bold text-navy mb-3">{item.title}</h3>
                    <p className="text-xl text-gray-700 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 7: CARPENTRY - Navy with Brass Accents ============ */}
        <section className="py-32 px-4 lg:px-8 bg-gradient-to-b from-navy to-dark-navy text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Wrench size={80} className="text-brass mx-auto mb-8" />
            <h2 className="text-6xl lg:text-7xl font-serif font-bold mb-8">
              Carpentry & Repairs
            </h2>
            <p className="text-xl text-white/80 mb-16">
              We identify problems and fix them. Qualified carpenters. Member discounts on every job.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { pct: '5%', tier: 'Essential' },
                { pct: '10%', tier: 'Signature' },
                { pct: '15%', tier: 'Reserve' }
              ].map((item, i) => (
                <div key={i} className={`p-12 rounded-2xl font-bold text-2xl transition-all hover:scale-110 ${
                  i === 2 ? 'bg-gradient-to-br from-brass to-yellow-600 text-navy ring-2 ring-brass' : 'bg-white/10 border-2 border-brass/30'
                }`}>
                  <div className="text-6xl font-serif mb-3">{item.pct}</div>
                  <p>{item.tier} Members</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 8: COVERAGE - Sand Background ============ */}
        <section className="py-32 px-4 lg:px-8 bg-gradient-to-b from-sand/50 to-sand">
          <div className="max-w-4xl mx-auto text-center">
            <MapPin size={80} className="text-navy mx-auto mb-8" />
            <h2 className="text-6xl lg:text-7xl font-serif font-bold text-navy mb-8">
              Across the Peninsula
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {['Mount Martha', 'Dromana', 'Rosebud', 'Rye', 'Blairgowrie', 'Sorrento', 'Portsea'].map((suburb) => (
                <div key={suburb} className="bg-white p-6 rounded-xl font-bold text-navy text-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
                  {suburb}
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-700">
              Not listed? Contact us for special arrangements.
            </p>
          </div>
        </section>

        {/* ============ SECTION 9: ABOUT - White with Sidebars ============ */}
        <section className="py-32 px-4 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative h-96 bg-gradient-to-br from-navy/30 to-brass/30 rounded-3xl overflow-hidden flex items-center justify-center border-4 border-brass/20">
                <p className="text-gray-400 text-center px-4 text-lg">Team photograph here</p>
              </div>

              <div>
                <h2 className="text-6xl lg:text-7xl font-serif font-bold text-navy mb-10">
                  Peninsula <span className="text-brass">natives</span>
                </h2>
                <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                  <p>
                    We're local. We live here. We understand the Peninsula weather, respect these properties, and care like they're our own.
                  </p>
                  <p>
                    Every team member is based on the Peninsula. We know what matters to property owners here. That's the difference.
                  </p>
                </div>

                <div className="mt-12 pt-12 border-t-2 border-brass">
                  <p className="text-sm text-gray-600 mb-2">ABN: 12 345 678 901</p>
                  <p className="font-bold text-navy">Fully insured • Licensed • Local</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SECTION 10: AGENCIES - Brass Background ============ */}
        <section className="py-32 px-4 lg:px-8 bg-gradient-to-br from-brass via-yellow-600 to-brass text-navy">
          <div className="max-w-5xl mx-auto">
            <Users size={80} className="text-navy mx-auto mb-8" />
            <h2 className="text-6xl lg:text-7xl font-serif font-bold text-center mb-8">
              For property managers
            </h2>
            <p className="text-xl text-center text-navy/90 mb-12 max-w-2xl mx-auto">
              Simplify client reporting. Reduce overhead. We handle everything. You manage the relationship.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Reduced Liability', desc: 'Professional oversight of every vacant property' },
                { title: 'White-Label Reports', desc: 'Documentation under your branding' },
                { title: 'Volume Pricing', desc: 'Tiered discounts for your portfolio' }
              ].map((item, i) => (
                <div key={i} className="bg-navy/10 backdrop-blur p-8 rounded-2xl border-2 border-navy/20">
                  <h3 className="text-2xl font-serif font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-navy/80 text-lg">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-10 py-4 bg-navy text-brass rounded-lg font-bold text-lg hover:bg-dark-navy transition-all">
                Enquire for your portfolio
              </button>
            </div>
          </div>
        </section>

        {/* ============ SECTION 11: TESTIMONIALS - Light Gray ============ */}
        <section className="py-32 px-4 lg:px-8 bg-light-gray">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl lg:text-7xl font-serif font-bold text-navy text-center mb-20">
              Trusted on the Peninsula
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { quote: "Peace of mind. We're away most of the year. Knowing someone local cares for our home is invaluable.", author: 'John & Sarah M.', location: 'Portsea' },
                { quote: 'They caught a roof issue early. Attention to detail and local knowledge is exceptional.', author: 'Michael L.', location: 'Sorrento' },
                { quote: "Professional, reliable, and they treat homes like their own. Highly recommended.", author: 'Emma & David T.', location: 'Blairgowrie' }
              ].map((t, i) => (
                <div key={i} className="bg-white p-10 rounded-2xl shadow-lg border-l-4 border-brass hover:shadow-xl transition-all">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => <span key={j} className="text-brass text-2xl">★</span>)}
                  </div>
                  <p className="text-gray-700 text-lg mb-8 italic">"{t.quote}"</p>
                  <p className="font-bold text-navy text-lg">{t.author}</p>
                  <p className="text-brass font-semibold">{t.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 12: FAQ - White ============ */}
        <section id="faq" className="py-32 px-4 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-6xl lg:text-7xl font-serif font-bold text-navy text-center mb-20">
              Questions answered
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-gradient-to-r from-light-gray to-sand rounded-2xl overflow-hidden border-l-4 border-brass">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-8 hover:bg-white/50 transition-colors"
                  >
                    <span className="font-serif font-bold text-navy text-xl text-left">{faq.question}</span>
                    <ChevronDown size={32} className={`text-brass flex-shrink-0 transition-transform duration-300 ${expandedFaq === faq.id ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedFaq === faq.id && (
                    <div className="px-8 pb-8 text-gray-800 text-lg leading-relaxed border-t-2 border-brass/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SECTION 13: CLOSE - Dark Navy Drama ============ */}
        <section id="contact" className="py-32 px-4 lg:px-8 bg-gradient-to-br from-dark-navy via-navy to-dark-navy text-white text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-7xl lg:text-8xl font-serif font-bold mb-6">
              One call.
            </p>
            <p className="text-4xl text-white/90 font-light">
              We take care of it all.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-10 mb-20">
            <a href="tel:0417349071" className="flex items-center justify-center gap-4 text-4xl font-bold text-brass hover:text-white transition-colors">
              <Phone size={40} />
              0417 349 071
            </a>
            <a href="mailto:hello@theschoolofplay.co" className="flex items-center justify-center text-white/90 hover:text-brass transition-colors">
              <FileText size={24} className="mr-2" />
              hello@theschoolofplay.co
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-white/70 max-w-2xl mx-auto mb-12">
            <div>
              <p className="font-bold text-white mb-2 text-lg">Service Area</p>
              <p>Mornington Peninsula, Victoria</p>
            </div>
            <div>
              <p className="font-bold text-white mb-2 text-lg">Hours</p>
              <p>Monday – Friday 8am–6pm<br />Saturday & Sunday by arrangement</p>
            </div>
            <div>
              <p className="font-bold text-white mb-2 text-lg">Social</p>
              <a href="#" className="text-brass hover:text-white transition-colors">Facebook</a>
            </div>
          </div>

          <div className="border-t-2 border-brass/30 pt-12">
            <p className="text-white/50">© 2026 Coastal Pro Property Care. All rights reserved.</p>
            <div className="flex justify-center gap-8 mt-6">
              <a href="#" className="text-white/50 hover:text-brass transition-colors text-sm">Terms</a>
              <a href="#" className="text-white/50 hover:text-brass transition-colors text-sm">Privacy</a>
              <a href="#" className="text-white/50 hover:text-brass transition-colors text-sm">Contact</a>
            </div>
          </div>
        </section>
      </main>

      <div className="h-24 lg:h-0" />
    </>
  );
}
