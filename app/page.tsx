'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Check, Phone, Menu, X } from 'lucide-react';

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
      subtitle: 'Keeping an eye on your property.',
      visits: '1 scheduled visit per month',
      features: [
        'Scheduled visits',
        'Exterior & building condition checks',
        'Roofline, gutters & downpipes',
        'Timber, decks, fences & external areas',
        'Security & access checks',
        'Storm & water monitoring',
        'Pre-arrival inspection',
        'Maintenance history & reporting',
      ],
      discount: '5',
      badge: null,
    },
    {
      id: 'signature',
      name: 'Signature',
      price: 299,
      annual: 3588,
      subtitle: 'Actively caring for your property.',
      visits: '2 scheduled visits per month',
      features: [
        'Scheduled visits',
        'Exterior & building condition checks',
        'Roofline, gutters & downpipes',
        'Timber, decks, fences & external areas',
        'Security & access checks',
        'Storm & water monitoring',
        'Pre-arrival inspection',
        'Maintenance history & reporting',
        'Trades & contractor coordination',
        'Priority booking & response',
      ],
      discount: '10',
      badge: 'Most Chosen',
    },
    {
      id: 'reserve',
      name: 'Reserve',
      price: 499,
      annual: 5988,
      subtitle: 'Private care for when excellence is expected.',
      visits: 'Weekly scheduled attendance',
      features: [
        'Scheduled visits',
        'Exterior & building condition checks',
        'Roofline, gutters & downpipes',
        'Timber, decks, fences & external areas',
        'Security & access checks',
        'Storm & water monitoring',
        'Pre-arrival inspection',
        'Maintenance history & reporting',
        'Trades & contractor coordination',
        'Priority booking & response',
      ],
      discount: '15',
      badge: 'Limited to 5',
    },
  ];

  const faqs = [
    {
      id: 'whats-included',
      question: "What's not included in memberships?",
      answer: "Memberships cover oversight, attendance and reporting. Repair work is quoted separately. We'll provide detailed quotes and recommendations for any work that's needed, and you have full discretion on whether to proceed.",
    },
    {
      id: 'cancellation',
      question: 'How do I cancel or pause my membership?',
      answer: "You can cancel or pause your membership at any time. We'll ensure a smooth transition and handover of all documentation and access arrangements.",
    },
    {
      id: 'insurance',
      question: 'What insurance do you carry?',
      answer: "We're fully insured for all work we perform. When we coordinate trades and contractors on your behalf, we ensure they carry appropriate insurance and licensing.",
    },
    {
      id: 'keys',
      question: 'How do you handle keys and property access?',
      answer: "We store keys securely and access your property only on scheduled visit dates. All access is logged and reported. We're happy to discuss access arrangements that work for you.",
    },
    {
      id: 'storm',
      question: 'What happens after a storm or emergency?',
      answer: "We'll inspect your property immediately, photograph any damage, and send you a detailed report with recommendations and urgent repair quotes if needed. This is covered under your membership.",
    },
    {
      id: 'quotes',
      question: 'How do repair quotes work?',
      answer: "Once our inspection identifies work that's needed, we'll get quotes from our qualified network. You'll receive detailed quotes with photos and specifications. You decide whether to proceed, and we'll manage everything if you do.",
    },
  ];

  return (
    <>
      {/* Sticky Mobile Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy text-white py-3 px-4 lg:hidden z-40 flex gap-3">
        <button className="flex-1 bg-coastal-blue text-white py-2 rounded font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90">
          <Phone size={16} />
          Call
        </button>
        <button className="flex-1 bg-brass text-navy py-2 rounded font-semibold text-sm hover:opacity-90">
          View Plans
        </button>
      </div>

      {/* Header/Nav */}
      <header className="sticky top-0 bg-white z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-navy text-lg">Coastal Pro</span>
          </div>

          <nav className="hidden lg:flex gap-8 text-sm font-medium">
            <a href="#memberships" className="text-gray-700 hover:text-coastal-blue transition">Memberships</a>
            <a href="#report" className="text-gray-700 hover:text-coastal-blue transition">Reports</a>
            <a href="#faq" className="text-gray-700 hover:text-coastal-blue transition">FAQ</a>
            <a href="#contact" className="text-gray-700 hover:text-coastal-blue transition">Contact</a>
          </nav>

          <div className="hidden lg:flex gap-4">
            <button className="px-6 py-2 text-coastal-blue border border-coastal-blue rounded font-medium hover:bg-coastal-blue hover:text-white transition">
              Call
            </button>
            <button className="px-6 py-2 bg-coastal-blue text-white rounded font-medium hover:opacity-90 transition">
              View Plans
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 px-4 flex flex-col gap-4">
            <a href="#memberships" className="text-gray-700">Memberships</a>
            <a href="#report" className="text-gray-700">Reports</a>
            <a href="#faq" className="text-gray-700">FAQ</a>
            <a href="#contact" className="text-gray-700">Contact</a>
          </div>
        )}
      </header>

      <main>
        {/* 1. Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/hero-bg.jpg"
            alt="Coastal property"
            fill
            className="object-cover absolute inset-0 -z-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-navy/70 via-navy/60 to-coastal-blue/40 -z-10" />

          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Your property.<br />Professionally cared for.
            </h1>
            <p className="text-lg lg:text-xl opacity-90 mb-12 font-light">
              Premium property care memberships for holiday homes and coastal residences across the Mornington Peninsula.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-coastal-blue text-white px-8 py-4 rounded font-semibold text-lg hover:opacity-90 transition">
                View Memberships
              </button>
              <button className="bg-white/20 border-2 border-white text-white px-8 py-4 rounded font-semibold text-lg hover:bg-white/30 transition">
                Book a Consultation
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <Check size={18} />
                <span>Fully insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} />
                <span>Qualified carpenters</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={18} />
                <span>Locally based</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. The Problem */}
        <section className="py-20 lg:py-32 px-4 lg:px-8 bg-sand">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-3xl font-serif font-bold text-navy mb-12">
              Who checks your property when you're not there?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-left">
                <div className="w-12 h-12 bg-coastal-blue/20 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full border-2 border-coastal-blue" />
                </div>
                <p className="text-gray-700">Storm damage found weeks later, when it's spread.</p>
              </div>
              <div className="text-left">
                <div className="w-12 h-12 bg-coastal-blue/20 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full border-2 border-coastal-blue" />
                </div>
                <p className="text-gray-700">Small timber issues become structural problems.</p>
              </div>
              <div className="text-left">
                <div className="w-12 h-12 bg-coastal-blue/20 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full border-2 border-coastal-blue" />
                </div>
                <p className="text-gray-700">No local contact when something goes wrong.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Answer */}
        <section className="py-20 lg:py-32 px-4 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-navy text-center mb-16">
              How it works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-coastal-blue/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-serif font-bold text-coastal-blue">1</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">We attend on schedule</h3>
                <p className="text-gray-600">Regular visits tailored to your membership level, whether monthly or weekly.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-coastal-blue/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-serif font-bold text-coastal-blue">2</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">We inspect and photograph</h3>
                <p className="text-gray-600">Comprehensive property assessments with detailed documentation of every visit.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-coastal-blue/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-serif font-bold text-coastal-blue">3</span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">You receive a report</h3>
                <p className="text-gray-600">Detailed reports with photos and recommendations. Quotes for any work needed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Memberships */}
        <section id="memberships" className="py-20 lg:py-32 px-4 lg:px-8 bg-light-gray">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-navy text-center mb-4">
              Three levels of care
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Choose the level of attention your property deserves. All memberships include full insurance, qualified local tradespeople, and regular property inspections.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-lg p-8 transition ${
                    plan.id === 'signature'
                      ? 'bg-navy text-white ring-2 ring-navy lg:scale-105 lg:shadow-2xl'
                      : 'bg-white text-gray-900'
                  } ${
                    plan.id === 'reserve' ? 'ring-2 ring-brass' : ''
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute -top-4 right-8 px-4 py-1 rounded-full text-sm font-semibold ${
                      plan.id === 'signature' ? 'bg-coastal-blue text-white' : 'bg-brass text-navy'
                    }`}>
                      {plan.badge}
                    </div>
                  )}

                  <h3 className={`text-2xl font-serif font-bold mb-2 ${
                    plan.id === 'signature' ? 'text-white' : 'text-navy'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${
                    plan.id === 'signature' ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    {plan.subtitle}
                  </p>

                  <div className="mb-6">
                    <div className={`text-4xl font-serif font-bold ${
                      plan.id === 'signature' ? 'text-white' : 'text-navy'
                    }`}>
                      ${plan.price}
                    </div>
                    <p className={`text-sm ${
                      plan.id === 'signature' ? 'text-white/70' : 'text-gray-600'
                    }`}>
                      /month (${plan.annual}/year)
                    </p>
                  </div>

                  <p className={`text-sm font-semibold mb-6 pb-6 border-b ${
                    plan.id === 'signature' ? 'border-white/20 text-white' : 'border-gray-200'
                  }`}>
                    {plan.visits}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={`flex gap-3 text-sm ${
                        plan.id === 'signature' ? 'text-white' : 'text-gray-700'
                      }`}>
                        <Check size={18} className={plan.id === 'signature' ? 'text-coastal-blue flex-shrink-0' : 'text-brass flex-shrink-0'} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 rounded font-semibold mb-4 transition ${
                    plan.id === 'signature'
                      ? 'bg-coastal-blue text-white hover:opacity-90'
                      : 'bg-navy text-white hover:opacity-90'
                  }`}>
                    Select Plan
                  </button>

                  <p className={`text-xs text-center ${
                    plan.id === 'signature' ? 'text-white/60' : 'text-gray-500'
                  }`}>
                    {plan.discount}% off eligible carpentry works*
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-gray-500">
              *Memberships cover oversight, attendance and reporting. Repair work is quoted separately.
            </p>
          </div>
        </section>

        {/* 5. Full Comparison */}
        <section className="py-20 lg:py-32 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setExpandedComparison(!expandedComparison)}
              className="w-full flex items-center justify-between p-6 bg-light-gray rounded-lg hover:bg-gray-100 transition"
            >
              <span className="font-semibold text-gray-900">Compare all inclusions</span>
              <ChevronDown
                size={24}
                className={`text-coastal-blue transition-transform ${
                  expandedComparison ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedComparison && (
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                      <th className="text-center py-4 px-4 font-semibold text-navy">Essential</th>
                      <th className="text-center py-4 px-4 font-semibold text-navy">Signature</th>
                      <th className="text-center py-4 px-4 font-semibold text-navy">Reserve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'Scheduled visits',
                      'Exterior & building checks',
                      'Roofline, gutters & downpipes',
                      'Timber, decks, fences',
                      'Security & access checks',
                      'Storm & water monitoring',
                      'Pre-arrival inspection',
                      'Maintenance history & reporting',
                      'Trades & contractor coordination',
                      'Priority booking & response',
                      'Annual property health assessment',
                      'Quarterly condition reports',
                      'Dedicated contact',
                    ].map((feature, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-4 px-4 text-gray-700">{feature}</td>
                        <td className="text-center py-4 px-4">
                          {['Scheduled visits', 'Exterior & building checks', 'Roofline, gutters & downpipes', 'Timber, decks, fences', 'Security & access checks', 'Storm & water monitoring', 'Pre-arrival inspection', 'Maintenance history & reporting'].includes(feature) && (
                            <Check size={20} className="mx-auto text-brass" />
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {feature !== 'Quarterly condition reports' && feature !== 'Dedicated contact' && (
                            <Check size={20} className="mx-auto text-coastal-blue" />
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          <Check size={20} className="mx-auto text-brass" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* 6. The Property Care Report */}
        <section id="report" className="py-20 lg:py-32 px-4 lg:px-8 bg-light-gray">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-navy text-center mb-4">
              The Property Care Report
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Every visit produces a detailed digital report with photographs and prioritized recommendations. Your property, fully documented.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-brass uppercase tracking-wide mb-2">Condition Rating</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-coastal-blue rounded-full" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">75%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-brass uppercase tracking-wide mb-3">Priority Recommendations</p>
                    <div className="space-y-2">
                      <div className="flex gap-2 text-sm">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold flex-shrink-0">Urgent</span>
                        <span className="text-gray-700">Gutter repair required on north elevation</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold flex-shrink-0">Soon</span>
                        <span className="text-gray-700">Deck sealing recommended within 6 months</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold flex-shrink-0">Plan</span>
                        <span className="text-gray-700">Annual exterior paint refresh in 18 months</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Photography included</p>
                    <p className="text-sm text-gray-700">20+ high-resolution photographs with annotations</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-3">Delivered digitally</h3>
                  <p className="text-gray-700">Every report arrives in your inbox within 24 hours of the visit. Complete with photographs, condition ratings, and a prioritized list of any work recommended.</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-3">Accessible always</h3>
                  <p className="text-gray-700">All reports are stored in your account for future reference. Track the history of your property and plan ahead with confidence.</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-3">Actionable insights</h3>
                  <p className="text-gray-700">When work is recommended, we provide detailed quotes from our network of qualified tradespeople. You decide what to fix and when.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Carpentry & Repairs */}
        <section className="py-20 lg:py-32 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-navy mb-6">
              Carpentry & Repairs
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We don't just identify what needs fixing—we can fix it. Our qualified carpenters handle everything from gutter repairs to deck restoration. Members receive exclusive discounts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-light-gray rounded-lg">
                <div className="text-3xl font-serif font-bold text-brass mb-2">5%</div>
                <p className="text-gray-700">Essential members</p>
              </div>
              <div className="p-6 bg-light-gray rounded-lg">
                <div className="text-3xl font-serif font-bold text-coastal-blue mb-2">10%</div>
                <p className="text-gray-700">Signature members</p>
              </div>
              <div className="p-6 bg-light-gray rounded-lg ring-2 ring-brass">
                <div className="text-3xl font-serif font-bold text-brass mb-2">15%</div>
                <p className="text-gray-700">Reserve members</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Coverage Area */}
        <section className="py-20 lg:py-32 px-4 lg:px-8 bg-light-gray">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-navy mb-4">
              Service coverage
            </h2>
            <p className="text-gray-600 mb-12">
              We proudly service the Mornington Peninsula
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Mount Martha', 'Dromana', 'Rosebud', 'Rye', 'Blairgowrie', 'Sorrento', 'Portsea'].map((suburb) => (
                <div key={suburb} className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-navy">{suburb}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 mt-8">
              Can't find your suburb? Get in touch—we may be able to help.
            </p>
          </div>
        </section>

        {/* 9. Who We Are */}
        <section className="py-20 lg:py-32 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy/30 to-coastal-blue/30 flex items-center justify-center">
                  <p className="text-white text-center">Team photo will go here</p>
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-serif font-bold text-navy mb-6">
                  We live and work on the Peninsula
                </h2>
                <p className="text-gray-700 mb-4">
                  We're not a national franchise or a faceless call centre. We're local, we know this community, and we care for your home like it's our own.
                </p>
                <p className="text-gray-700 mb-4">
                  Every member of our team is based here. We know what the Peninsula weather can do, we understand the character of these homes, and we take genuine pride in looking after them.
                </p>
                <p className="text-gray-700">
                  When you choose Coastal Pro, you're choosing people who will be your neighbours, who will know your property, and who will treat your home with the respect it deserves.
                </p>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">ABN: 12 345 678 901</p>
                  <p className="text-sm text-gray-600">Fully insured • Licensed • Local</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Agencies & Managers */}
        <section className="py-20 lg:py-32 px-4 lg:px-8 bg-navy text-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-serif font-bold mb-6">
                  For property managers & agencies
                </h2>
                <p className="text-white/90 mb-6">
                  Simplify client reporting and reduce your maintenance overhead. We handle the inspections, documentation, and coordination. You manage the relationship.
                </p>
                <button className="px-8 py-3 bg-coastal-blue text-white rounded font-semibold hover:opacity-90 transition">
                  Enquire for your portfolio
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Check size={24} className="text-brass flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Reduced liability</p>
                    <p className="text-white/70 text-sm">Professional oversight of vacant or seasonal properties</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Check size={24} className="text-brass flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">White-label reports</p>
                    <p className="text-white/70 text-sm">Customized reporting under your branding</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Check size={24} className="text-brass flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Tiered pricing</p>
                    <p className="text-white/70 text-sm">Volume discounts for portfolio management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Testimonials */}
        <section className="py-20 lg:py-32 px-4 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-navy text-center mb-12">
              What property owners say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Having Coastal Pro look after our property has given us complete peace of mind. We're away most of the year and knowing someone local is checking in on things is invaluable.",
                  author: 'John & Sarah M.',
                  location: 'Portsea',
                },
                {
                  quote: 'They caught a roof issue early that could have become a much bigger problem. Their attention to detail is exceptional.',
                  author: 'Michael L.',
                  location: 'Sorrento',
                },
                {
                  quote: "Professional, reliable, and they treat your home like their own. Couldn't recommend them more highly.",
                  author: 'Emma & David T.',
                  location: 'Blairgowrie',
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-light-gray p-8 rounded-lg">
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-navy">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. FAQ */}
        <section id="faq" className="py-20 lg:py-32 px-4 lg:px-8 bg-light-gray">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-navy text-center mb-12">
              Frequently asked questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-900 text-left">{faq.question}</span>
                    <ChevronDown
                      size={24}
                      className={`text-coastal-blue flex-shrink-0 transition-transform ${
                        expandedFaq === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedFaq === faq.id && (
                    <div className="px-6 pb-6 text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. Close & Footer */}
        <section id="contact" className="py-20 lg:py-32 px-4 lg:px-8 bg-navy text-white text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-5xl font-serif font-bold mb-4">
              One call.
            </p>
            <p className="text-2xl text-white/90">
              We take care of it all.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12">
            <a href="tel:0417349071" className="flex items-center justify-center gap-2 text-2xl font-semibold text-coastal-blue hover:text-brass transition">
              <Phone size={24} />
              0417 349 071
            </a>
            <a href="mailto:coastalpropertycare@outlook.com" className="flex items-center justify-center gap-2 text-lg font-semibold text-white/90 hover:text-coastal-blue transition">
              coastalpropertycare@outlook.com
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-white/70 max-w-2xl mx-auto">
            <div>
              <p className="font-semibold text-white mb-2">Service Area</p>
              <p>Mornington Peninsula</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Hours</p>
              <p>Monday – Friday 8am–6pm<br />Weekend by arrangement</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-2">Follow us</p>
              <p>
                <a href="#" className="text-coastal-blue hover:text-brass transition">Facebook</a>
              </p>
            </div>
          </div>
        </section>

        <footer className="bg-dark-navy text-white/60 text-center py-8 text-xs">
          <p>© 2026 Coastal Pro Property Care. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </footer>
      </main>

      {/* Padding for mobile sticky bar */}
      <div className="h-24 lg:h-0" />
    </>
  );
}
