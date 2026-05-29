import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Zap, BookOpen, Users, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'NEBians pricing plans. Start free, upgrade when you are ready.',
};

const plans = [
  {
    name: 'Free',
    price: 'NPR 0',
    period: 'forever',
    description: 'Perfect for getting started with NEB preparation.',
    icon: BookOpen,
    features: [
      'Access to 70% of all resources',
      'Basic PDF viewer',
      'Community forum access',
      '3 downloads per day',
      'Standard support',
      'Ad-supported experience',
    ],
    cta: 'Get Started Free',
    href: '/register',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'NPR 99',
    period: 'per month',
    description: 'For serious students who want unlimited access.',
    icon: Zap,
    features: [
      'Access to 100% of all resources',
      'Advanced PDF annotations (highlight, sticky notes)',
      'Unlimited downloads',
      'Offline reading for all resources',
      'Priority forum support',
      'Ad-free experience',
      'Reading progress tracking',
      'Bookmark unlimited resources',
    ],
    cta: 'Upgrade to Pro',
    href: '/register?plan=pro',
    highlighted: true,
  },
  {
    name: 'School',
    price: 'NPR 2,999',
    period: 'per year',
    description: 'For schools and coaching centers.',
    icon: Users,
    features: [
      'Everything in Pro',
      'Teacher dashboard',
      'Student analytics & progress tracking',
      'Custom content uploads',
      'Bulk student onboarding',
      'Dedicated support',
      'White-label option',
      'API access',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
];

const comparisonFeatures = [
  { name: 'Resource access', free: '70%', pro: '100%', school: '100%' },
  { name: 'PDF annotations', free: 'Basic', pro: 'Advanced', school: 'Advanced' },
  { name: 'Daily downloads', free: '3', pro: 'Unlimited', school: 'Unlimited' },
  { name: 'Offline reading', free: 'Limited', pro: 'Full', school: 'Full' },
  { name: 'Forum access', free: 'Yes', pro: 'Priority', school: 'Priority' },
  { name: 'Ads', free: 'Yes', pro: 'No', school: 'No' },
  { name: 'Reading progress', free: 'No', pro: 'Yes', school: 'Yes' },
  { name: 'Bookmarks', free: '10', pro: 'Unlimited', school: 'Unlimited' },
  { name: 'Teacher dashboard', free: 'No', pro: 'No', school: 'Yes' },
  { name: 'Student analytics', free: 'No', pro: 'No', school: 'Yes' },
  { name: 'Custom uploads', free: 'No', pro: 'No', school: 'Yes' },
  { name: 'API access', free: 'No', pro: 'No', school: 'Yes' },
];

export default function PricingPage() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
          Simple, Affordable Pricing
        </h1>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          Start free and upgrade when you are ready. Less than the cost of one guidebook.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-[var(--radius-lg)] p-6 ${
              plan.highlighted
                ? 'bg-primary-container border-2 border-primary shadow-lg scale-105'
                : 'bg-surface-container-low border border-outline-variant'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-semibold">
                Most Popular
              </div>
            )}

            <div className="mb-4">
              <div className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center mb-3 ${
                plan.highlighted ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
              }`}>
                <plan.icon className="h-5 w-5" />
              </div>
              <h2 className={`text-lg font-semibold ${plan.highlighted ? 'text-on-primary-container' : 'text-on-surface'}`}>
                {plan.name}
              </h2>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${plan.highlighted ? 'text-on-primary-container' : 'text-on-surface'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? 'text-on-primary-container/70' : 'text-on-surface-variant'}`}>
                  /{plan.period}
                </span>
              </div>
              <p className={`text-sm mt-2 ${plan.highlighted ? 'text-on-primary-container/80' : 'text-on-surface-variant'}`}>
                {plan.description}
              </p>
            </div>

            <ul className="flex-1 space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className={`h-4 w-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-primary' : 'text-on-surface-variant'}`} />
                  <span className={`text-sm ${plan.highlighted ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={`block w-full py-3 rounded-[var(--radius-xl)] text-center font-semibold text-sm transition-colors ${
                plan.highlighted
                  ? 'bg-primary text-on-primary hover:bg-primary-dark'
                  : 'bg-surface-container-high text-on-surface border border-outline-variant hover:bg-surface-container-highest'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-on-surface text-center">
          Feature Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="text-left py-3 px-4 font-medium text-on-surface-variant">Feature</th>
                <th className="text-center py-3 px-4 font-medium text-on-surface-variant">Free</th>
                <th className="text-center py-3 px-4 font-medium text-primary">Pro</th>
                <th className="text-center py-3 px-4 font-medium text-on-surface-variant">School</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, i) => (
                <tr key={i} className="border-b border-outline-variant/50">
                  <td className="py-3 px-4 text-on-surface">{feature.name}</td>
                  <td className="py-3 px-4 text-center text-on-surface-variant">{feature.free}</td>
                  <td className="py-3 px-4 text-center text-on-surface font-medium">{feature.pro}</td>
                  <td className="py-3 px-4 text-center text-on-surface-variant">{feature.school}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-on-surface text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'Can I switch between plans?',
              a: 'Yes. You can upgrade or downgrade at any time. If you downgrade, you keep Pro features until the end of your billing period.',
            },
            {
              q: 'Is there a free trial for Pro?',
              a: 'No need — the free tier lets you experience most features. Upgrade to Pro only when you need unlimited downloads and advanced annotations.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept eSewa, Khalti, and major credit/debit cards. School plans can be paid via bank transfer.',
            },
            {
              q: 'Can I get a refund?',
              a: 'Yes. If you are not satisfied with Pro, contact us within 7 days for a full refund.',
            },
            {
              q: 'What happens to my downloads if I cancel Pro?',
              a: 'You keep all downloaded resources, but you will not be able to download new ones beyond the free tier limit.',
            },
          ].map((faq, i) => (
            <div key={i} className="p-4 rounded-[var(--radius-md)] bg-surface-container-low border border-outline-variant/50">
              <h3 className="text-sm font-medium text-on-surface mb-1">{faq.q}</h3>
              <p className="text-sm text-on-surface-variant">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-8 bg-primary-container rounded-[var(--radius-lg)]">
        <h2 className="text-xl font-bold text-on-primary-container mb-2">
          Still Have Questions?
        </h2>
        <p className="text-on-primary-container/80 mb-4">
          Contact us and we will help you choose the right plan.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-xl)] bg-primary text-on-primary font-semibold text-sm hover:bg-primary-dark transition-colors"
        >
          Contact Support
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
