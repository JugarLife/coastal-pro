'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Check, Phone, Menu, X, ArrowRight } from 'lucide-react';

export default function Home() {
  const [expandedComparison, setExpandedComparison] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'essential',
      name: 'Essential',
      price: 179,
      annual: 2148,
      subtitle: 'Keeping an eye on your property.',
      description: 'Monthly visits with comprehensive documentation.',
      visits: '1 visit per month',
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
      cta: 'Begin',
    },
    {
      id: 'signature',
      name: 'Signature',
      price: 299,
      annual: 3588,
      subtitle: 'For properties that deserve attention.',
      description: 'Twice-monthly visits with strategic oversight and coordination.',
      visits: '2 visits per month',
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
      cta: 'Select Plan',
    },
    {
      id: 'reserve',
      name: 'Reserve',
      price: 499,
      annual: 5988,
      subtitle: 'Premium care for Peninsula residences.',
      description: 'Weekly attendance with dedicated oversight and proactive management.',
      visits: 'Weekly attendance',
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
      cta: 'Request Access',
    },
  ];

  const faqs = [
    {
      id: 'whats-included',
      question: "What's covered, and what's quoted separately?",
      answer: "Memberships include all inspections, monitoring, documentation, and reporting. Repair work—whether we identify it or you request it—is quoted separately. You'll receive detailed specifications and photography for every quote. We never surprise you with costs.",
    },
    {
      id: 'cancellation',
      question: 'Can I pause or cancel anytime?',
      answer: "Yes. No lock-in contracts. Cancel or pause whenever you need to. We'll provide a complete handover of all documentation, photos, maintenance history, and recommendations.",
    },
    {
      id: 'insurance',
      question: 'Are you fully insured?',
      answer: "Completely. We carry full public liability and professional indemnity insurance. Any trades or contractors we coordinate carry appropriate licensing and insurance. Your property is protected.",
    },
    {
      id: 'keys',
      question: 'How do you handle secure access?',
      answer: "Keys are stored in our secure facility. We access your property only on scheduled visit dates. Every entry is logged and reported to you. We're happy to discuss alternative access arrangements if needed.",
    },
    {
      id: 'storm',
      question: 'What happens if there's a storm or emergency?',
      answer: "We inspect immediately, photograph all damage, and send you a detailed report within 24 hours. We'll provide urgent repair quotes from our trusted network. Emergency response is included—no additional cost.",
    },
    {
      id: 'quotes',
      question: 'How do quotes and repairs work?',
      answer: "Once we identify work needed, we source quotes from our vetted tradespeople. You receive detailed quotes with photos, timelines, and pricing. You decide what to fix and when. We manage it all if you proceed.",
    },
  ];

  return (
    <>
      {/* Premium Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-navy to-navy/95 backdrop-blur-sm text-white py-3 px-4 lg:hidden z-40 flex gap-3 border-t border-brass/20">
        <button className="flex-1 bg-gradient-to-r from-coastal-blue to-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-coastal-blue/30 transition-all duration-300">
          <Phone size={16} />
          Call
        </button>
        <button className="flex-1 bg-gradient-to-r from-brass to-yellow-600 text-navy py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-brass/30 transition-all duration-300">
          View Plans
        </button>
      </div>

      {/* Premium Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-navy text-xl tracking-tight">Coastal Pro</span>
            <span className="hidden sm:block text-gray-400 text-sm">Property Care</span>
          </div>

          <nav className="hidden lg:flex gap-12 text-sm font-medium">
            <a href="#memberships" className="text-gray-600 hover:text-coastal-blue transition-colors duration-200">Memberships</a>
            <a href="#report" className="text-gray-600 hover:text-coastal-blue transition-colors duration-200">Reports</a>
            <a href="#faq" className="text-gray-600 hover:text-coastal-blue transition-colors duration-200">FAQ</a>
            <a href="#contact" className="text-gray-600 hover:text-coastal-blue transition-colors duration-200">Contact</a>
          </nav>

          <div className="hidden lg:flex gap-3">
            <button className="px-6 py-2.5 text-coastal-blue border-2 border-coastal-blue rounded-lg font-semibold hover:bg-coastal-blue hover:text-white transition-all duration-300">
              Call
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-coastal-blue to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-coastal-blue/30 transition-all duration-300">
              View Plans
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white py-4 px-4 flex flex-col gap-3">
            <a href="#memberships" className="text-gray-700 font-medium">Memberships</a>
            <a href="#report" className="text-gray-700 font-medium">Reports</a>
            <a href="#faq" className="text-gray-700 font-medium">FAQ</a>
            <a href="#contact" className="text-gray-700 font-medium">Contact</a>
          </div>
        )}
      </header>

      <main>
        {/* 1. ELITE Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/hero-bg.jpg"
            alt="Mornington Peninsula coastal property"
            fill
            className="object-cover absolute inset-0 -z-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-navy/60 via-navy/50 to-navy/40 -z-10" />

          <div className="text-center text-white max-w-4xl px-4 relative z-10">
            <div className="mb-8 inline-block">
              <span className="text-sm font-semibold text-brass tracking-widest uppercase">Trusted by Peninsula Property Owners</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 leading-tight tracking-tight">
              Your property.<br /><span className="text-brass">Professionally cared for.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-16 font-light max-w-3xl mx-auto leading-relaxed">
              Premium property oversight for holiday homes and coastal residences. Monthly inspections, detailed reporting, and complete peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-gradient-to-r from-coastal-blue to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-coastal-blue/40 transition-all duration-300 flex items-center justify-center gap-2 group">
                View Memberships <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/15 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/25 transition-all duration-300 backdrop-blur-sm">
                Book Consultation
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 text-sm text-white/90">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brass/30 flex items-center justify-center">
                  <Check size={16} className="text-brass" />
                </div>
                <span className="font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brass/30 flex items-center justify-center">
                  <Check size={16} className="text-brass" />
                </div>
                <span className="font-medium">Qualified Tradespeople</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brass/30 flex items-center justify-center">
                  <Check size={16} className="text-brass" />
                </div>
                <span className="font-medium">Locally Based</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. The Problem - Refined */}
        <section className="py-24 lg:py-40 px-4 lg:px-8 bg-gradient-to-b from-sand/50 to-sand">
          <div className="max-w-4xl mx-auto">
            <div className="mb-20">
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-navy mb-6 text-center">
                The absence of oversight becomes the source of risk.
              </h2>
              <p className="text-center text-gray-600 text-lg">
                Distance creates vulnerability. Without regular attention, small issues compound into expensive problems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🌊</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-navy mb-3">Storm Damage Spreads</h3>
                <p className="text-gray-600">Found weeks later when it's already affected structural integrity and cost multiplies.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🪵</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-navy mb-3">Timber Decay Accelerates</h3>
                <p className="text-gray-600">Small rot becomes structural failure. Prevention costs less than replacement.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-navy mb-3">No Local Advocate</h3>
                <p className="text-gray-600">When something goes wrong, you're alone. No one knows your property or your needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. How It Works - Visual Flow */}
        <section className="py-24 lg:py-40 px-4 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-navy mb-6">
                How oversight works
              </h2>
              <p className="text-lg text-gray-600">
                Three simple steps. Complete transparency. Your property, professionally managed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-coastal-blue/20 to-blue-500/20 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:shadow-xl group-hover:shadow-coastal-blue/20 transition-all duration-300">
                  <span className="text-5xl font-serif font-bold text-coastal-blue">1</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy mb-3">Scheduled Visits</h3>
                <p className="text-gray-600 leading-relaxed">
                  Regular inspections on your calendar. Monthly, bi-monthly, or weekly. Consistent, predictable, documented.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-coastal-blue/20 to-blue-500/20 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:shadow-xl group-hover:shadow-coastal-blue/20 transition-all duration-300">
                  <span className="text-5xl font-serif font-bold text-coastal-blue">2</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy mb-3">Thorough Assessment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Detailed inspection of every area. High-resolution photos. Condition ratings. Priority flagging of any issues.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-coastal-blue/20 to-blue-500/20 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:shadow-xl group-hover:shadow-coastal-blue/20 transition-all duration-300">
                  <span className="text-5xl font-serif font-bold text-coastal-blue">3</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy mb-3">Digital Report</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete documentation delivered within 24 hours. Photos, ratings, recommendations, and quotes if needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ELITE Memberships */}
        <section id="memberships" className="py-24 lg:py-40 px-4 lg:px-8 bg-gradient-to-b from-light-gray to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-sm font-semibold text-brass tracking-widest uppercase mb-4 block">Membership Options</span>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-navy mb-6">
                Three tiers of care
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the level of attention your property deserves. All include full insurance, qualified tradespeople, and detailed reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  className={`relative rounded-2xl transition-all duration-300 overflow-hidden ${
                    plan.id === 'signature'
                      ? 'md:scale-105 md:shadow-2xl bg-gradient-to-br from-navy to-navy/95 text-white ring-2 ring-brass'
                      : plan.id === 'reserve'
                      ? 'bg-white ring-2 ring-brass shadow-lg'
                      : 'bg-white shadow-md hover:shadow-xl'
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute top-0 right-0 px-6 py-2 text-sm font-semibold ${
                      plan.id === 'signature' 
                        ? 'bg-gradient-to-r from-coastal-blue to-blue-600 text-white' 
                        : 'bg-gradient-to-r from-brass to-yellow-600 text-navy'
                    }`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className="p-10">
                    <h3 className={`text-3xl font-serif font-bold mb-3 ${
                      plan.id === 'signature' ? 'text-white' : 'text-navy'
                    }`}>
                      {plan.name}
                    </h3>
                    
                    <p className={`text-sm mb-8 ${
                      plan.id === 'signature' ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {plan.subtitle}
                    </p>

                    <div className="mb-8 pb-8 border-b border-gray-200 dark:border-white/20">
                      <div className={`text-5xl font-serif font-bold mb-2 ${
                        plan.id === 'signature' ? 'text-white' : 'text-navy'
                      }`}>
                        ${plan.price}
                      </div>
                      <p className={`text-sm ${
                        plan.id === 'signature' ? 'text-white/70' : 'text-gray-600'
                      }`}>
                        per month / ${plan.annual} annually
                      </p>
                    </div>

                    <div className={`text-sm font-semibold mb-8 pb-8 border-b border-gray-200 dark:border-white/20 ${
                      plan.id === 'signature' ? 'text-white' : 'text-navy'
                    }`}>
                      {plan.visits}
                    </div>

                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className={`flex gap-3 text-sm ${
                          plan.id === 'signature' ? 'text-white' : 'text-gray-700'
                        }`}>
                          <Check size={20} className={plan.id === 'signature' ? 'text-brass flex-shrink-0 mt-0.5' : 'text-brass flex-shrink-0 mt-0.5'} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-3.5 rounded-lg font-semibold text-center transition-all duration-300 group ${
                      plan.id === 'signature'
                        ? 'bg-gradient-to-r from-coastal-blue to-blue-600 text-white hover:shadow-xl hover:shadow-coastal-blue/40'
                        : plan.id === 'reserve'
                        ? 'bg-gradient-to-r from-brass to-yellow-600 text-navy hover:shadow-xl hover:shadow-brass/40'
                        : 'bg-navy text-white hover:bg-dark-navy'
                    }`}>
                      {plan.cta} <ArrowRight size={16} className="inline group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className={`text-xs text-center mt-6 ${
                      plan.id === 'signature' ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      {plan.discount}% off eligible carpentry & repairs
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-600">
              Memberships cover inspections, monitoring, and reporting. Repair work is quoted separately—never a hidden cost.
            </p>
          </div>
        </section>

        {/* 5. Comparison Table */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setExpandedComparison(!expandedComparison)}
              className="w-full flex items-center justify-between p-8 bg-light-gray hover:bg-gray-100 rounded-2xl transition-all duration-300 group"
            >
              <span className="text-lg font-semibold text-navy">Compare all features</span>
              <ChevronDown
                size={28}
                className={`text-brass transition-transform duration-300 ${
                  expandedComparison ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedComparison && (
              <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-light-gray border-b border-gray-200">
                      <th className="text-left py-6 px-6 font-semibold text-navy">Feature</th>
                      <th className="text-center py-6 px-6 font-semibold text-navy">Essential</th>
                      <th className="text-center py-6 px-6 font-semibold text-navy">Signature</th>
                      <th className="text-center py-6 px-6 font-semibold text-navy">Reserve</th>
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
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-5 px-6 text-gray-700 font-medium">{feature}</td>
                        <td className="text-center py-5 px-6">
                          {['Scheduled visits', 'Exterior & building checks', 'Roof, gutter & downpipe inspection', 'Timber, decks & fence assessment', 'Security & access checks', 'Storm & water monitoring', 'Pre-arrival inspection', 'Digital photo documentation', 'Maintenance history & reports'].includes(feature) && (
                            <Check size={22} className="mx-auto text-brass" />
                          )}
                        </td>
                        <td className="text-center py-5 px-6">
                          {feature !== 'Quarterly comprehensive reports' && feature !== 'Dedicated contact person' && (
                            <Check size={22} className="mx-auto text-coastal-blue" />
                          )}
                        </td>
                        <td className="text-center py-5 px-6">
                          <Check size={22} className="mx-auto text-brass" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* 6. Property Report */}
        <section id="report" className="py-24 lg:py-40 px-4 lg:px-8 bg-gradient-to-b from-light-gray to-sand/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-sm font-semibold text-brass tracking-widest uppercase mb-4 block">Your Advantage</span>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-navy mb-6">
                The Property Care Report
              </h2>
              <p className="text-xl text-gray-600">
                Every visit produces professional documentation. This is how you know what's happening to your property.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-2xl p-10 shadow-xl">
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold text-brass uppercase tracking-wide mb-3">Condition Rating</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-coastal-blue to-blue-600 rounded-full" />
                      </div>
                      <span className="text-lg font-bold text-navy">75%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-brass uppercase tracking-wide mb-4">Priority Recommendations</p>
                    <div className="space-y-3">
                      <div className="flex gap-3 items-start bg-red-50 p-4 rounded-lg">
                        <span className="bg-red-200 text-red-700 px-3 py-1 rounded text-xs font-bold flex-shrink-0 mt-0.5">Urgent</span>
                        <span className="text-sm text-gray-700">Gutter replacement needed on north elevation</span>
                      </div>
                      <div className="flex gap-3 items-start bg-yellow-50 p-4 rounded-lg">
                        <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-xs font-bold flex-shrink-0 mt-0.5">Soon</span>
                        <span className="text-sm text-gray-700">Deck sealing recommended within 6 months</span>
                      </div>
                      <div className="flex gap-3 items-start bg-blue-50 p-4 rounded-lg">
                        <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-bold flex-shrink-0 mt-0.5">Plan</span>
                        <span className="text-sm text-gray-700">Exterior paint refresh in 18 months</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-gray-200">
                    <p className="text-xs font-semibold text-brass uppercase tracking-wide mb-3">Professional Photography</p>
                    <p className="text-sm text-gray-700">20+ high-resolution photos with annotations and area callouts</p>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-navy mb-4">Delivered within 24 hours</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Complete digital documentation arrives in your inbox. Photos, condition ratings, detailed recommendations, and professional quotes for any work identified.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-3xl font-serif font-bold text-navy mb-4">Permanently archived</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Every report is stored in your secure account. Build a complete history of your property over time. Track what's been maintained and what's coming due.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-3xl font-serif font-bold text-navy mb-4">Quotes from our network</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    When work is recommended, we source detailed quotes from our vetted tradespeople. You decide what to fix, when, and whether to proceed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Carpentry */}
        <section className="py-24 lg:py-40 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm font-semibold text-brass tracking-widest uppercase mb-4 block">Complete Solution</span>
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-navy mb-8">
              Carpentry & Repairs
            </h2>
            <p className="text-xl text-gray-600 mb-16">
              We don't just identify what needs fixing. We fix it. Our qualified carpenters handle everything from gutter repairs to complete deck restoration. Members receive exclusive discounts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-light-gray to-sand p-10 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="text-5xl font-serif font-bold text-brass mb-3">5%</div>
                <p className="text-gray-700 font-semibold text-lg">Essential members</p>
              </div>
              <div className="bg-gradient-to-br from-light-gray to-sand p-10 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="text-5xl font-serif font-bold text-coastal-blue mb-3">10%</div>
                <p className="text-gray-700 font-semibold text-lg">Signature members</p>
              </div>
              <div className="bg-gradient-to-br from-brass/10 to-yellow-100/30 p-10 rounded-2xl ring-2 ring-brass hover:shadow-lg transition-all duration-300">
                <div className="text-5xl font-serif font-bold text-brass mb-3">15%</div>
                <p className="text-gray-700 font-semibold text-lg">Reserve members</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Coverage */}
        <section className="py-24 lg:py-40 px-4 lg:px-8 bg-light-gray">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-navy mb-8">
              Service across the Peninsula
            </h2>
            <p className="text-xl text-gray-600 mb-16">
              Proudly servicing Mornington Peninsula properties
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Mount Martha', 'Dromana', 'Rosebud', 'Rye', 'Blairgowrie', 'Sorrento', 'Portsea'].map((suburb) => (
                <div key={suburb} className="bg-white p-6 rounded-xl hover:shadow-md transition-all duration-300">
                  <p className="font-semibold text-navy">{suburb}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 mt-12">
              Not listed? Contact us—we may be able to help with special arrangements.
            </p>
          </div>
        </section>

        {/* 9. About */}
        <section className="py-24 lg:py-40 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative h-96 bg-gradient-to-br from-navy/20 to-coastal-blue/20 rounded-2xl overflow-hidden flex items-center justify-center">
                <p className="text-gray-400 text-center px-4">Team photograph will go here</p>
              </div>

              <div>
                <span className="text-sm font-semibold text-brass tracking-widest uppercase mb-6 block">About Us</span>
                <h2 className="text-5xl lg:text-6xl font-serif font-bold text-navy mb-8">
                  We live and work on the Peninsula
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    We're not a national franchise or anonymous service. We're local. We know this community, understand the Peninsula weather, and care for homes like they're our own.
                  </p>
                  <p>
                    Every member of our team is based here. We understand the character of these properties and take genuine pride in protecting them.
                  </p>
                  <p>
                    When you choose Coastal Pro, you're choosing neighbors who know your property, respect your home, and are accountable to your standards.
                  </p>
                </div>

                <div className="mt-10 pt-10 border-t-2 border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">ABN: 12 345 678 901</p>
                  <p className="text-sm text-gray-600 font-semibold">Fully insured • Licensed • Local</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Agencies */}
        <section className="py-24 lg:py-40 px-4 lg:px-8 bg-gradient-to-b from-navy to-dark-navy text-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-semibold text-brass tracking-widest uppercase mb-6 block">B2B Solution</span>
                <h2 className="text-5xl lg:text-6xl font-serif font-bold mb-8">
                  For property managers & agencies
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Simplify client reporting. Reduce your overhead. We handle inspections, documentation, and coordination. You manage the relationship.
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-brass to-yellow-600 text-navy rounded-lg font-semibold hover:shadow-xl hover:shadow-brass/40 transition-all duration-300">
                  Enquire for your portfolio
                </button>
              </div>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <Check size={28} className="text-brass flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg mb-2">Reduced liability</p>
                    <p className="text-white/70">Professional oversight of vacant and seasonal properties</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Check size={28} className="text-brass flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg mb-2">White-label reports</p>
                    <p className="text-white/70">Customized documentation under your branding</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Check size={28} className="text-brass flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg mb-2">Volume pricing</p>
                    <p className="text-white/70">Tiered discounts for portfolio management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Testimonials */}
        <section className="py-24 lg:py-40 px-4 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-sm font-semibold text-brass tracking-widest uppercase mb-4 block">Trusted by Peninsula Owners</span>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-navy mb-6">
                What property owners say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Having Coastal Pro manage our property has given us complete peace of mind. We're away most of the year, and knowing someone local is paying attention is invaluable.",
                  author: 'John & Sarah M.',
                  location: 'Portsea',
                },
                {
                  quote: 'They caught a roof issue early that would have become structural failure. Their attention to detail and local knowledge is exceptional.',
                  author: 'Michael L.',
                  location: 'Sorrento',
                },
                {
                  quote: "Professional, reliable, and they treat our home like their own. They understand Peninsula properties. Couldn't recommend them more highly.",
                  author: 'Emma & David T.',
                  location: 'Blairgowrie',
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-gradient-to-br from-light-gray to-sand/50 p-10 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-brass text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-navy text-lg">{testimonial.author}</p>
                    <p className="text-sm text-brass font-medium">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. FAQ */}
        <section id="faq" className="py-24 lg:py-40 px-4 lg:px-8 bg-light-gray">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-navy mb-6">
                Frequently asked questions
              </h2>
              <p className="text-lg text-gray-600">
                Clear answers to help you choose with confidence
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-8 hover:bg-light-gray transition-colors duration-200"
                  >
                    <span className="font-semibold text-navy text-lg text-left">{faq.question}</span>
                    <ChevronDown
                      size={26}
                      className={`text-brass flex-shrink-0 transition-transform duration-300 ${
                        expandedFaq === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedFaq === faq.id && (
                    <div className="px-8 pb-8 text-gray-700 text-lg leading-relaxed border-t-2 border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. Close */}
        <section id="contact" className="py-24 lg:py-40 px-4 lg:px-8 bg-gradient-to-br from-navy via-navy to-dark-navy text-white text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 leading-tight">
              One call.
            </p>
            <p className="text-3xl lg:text-4xl text-white/90 font-light">
              We take care of it all.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-16 max-w-2xl mx-auto">
            <a href="tel:0417349071" className="flex items-center justify-center gap-3 text-3xl font-semibold text-brass hover:text-white transition-colors duration-300 group">
              <Phone size={28} />
              0417 349 071
            </a>
            <a href="mailto:hello@theschoolofplay.co" className="flex items-center justify-center gap-3 text-lg font-semibold text-white/90 hover:text-brass transition-colors duration-300">
              hello@theschoolofplay.co
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-white/70 max-w-2xl mx-auto">
            <div>
              <p className="font-semibold text-white mb-3">Service Area</p>
              <p>Mornington Peninsula, Victoria</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Hours</p>
              <p>Monday – Friday 8am–6pm<br />Saturday & Sunday by arrangement</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Follow</p>
              <p>
                <a href="#" className="text-brass hover:text-white transition-colors">Facebook</a>
              </p>
            </div>
          </div>
        </section>

        <footer className="bg-dark-navy text-white/50 text-center py-12 text-sm border-t border-white/10">
          <p>© 2026 Coastal Pro Property Care. All rights reserved.</p>
          <div className="flex justify-center gap-8 mt-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </footer>
      </main>

      <div className="h-24 lg:h-0" />
    </>
  );
}
