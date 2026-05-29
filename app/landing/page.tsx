import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, WifiOff, Users, Download, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NEBians - Study Smarter, Anywhere',
  description: 'The only offline-first study platform built for Nepali NEB students. Download notes, past papers, and practice sets. Works without internet.',
  openGraph: {
    title: 'NEBians - Study Smarter, Anywhere',
    description: 'The only offline-first study platform built for Nepali NEB students.',
  },
};

const features = [
  {
    icon: WifiOff,
    title: 'Works Offline',
    description: 'Download resources at school WiFi. Study at home without internet. Perfect for load-shedding and rural Nepal.',
  },
  {
    icon: BookOpen,
    title: 'NEB-Aligned Content',
    description: 'Notes, past papers, and practice sets organized by your exact grade, stream, and subject. Teacher-verified accuracy.',
  },
  {
    icon: Users,
    title: 'Student Community',
    description: 'Ask questions, share knowledge, and help fellow students in the discussion forum. Peer learning at scale.',
  },
  {
    icon: Download,
    title: 'PDF Annotation',
    description: 'Highlight, underline, and add sticky notes to your study materials. Your annotations sync when you are back online.',
  },
];

const stats = [
  { value: '900K+', label: 'NEB Students Annually' },
  { value: '7', label: 'Provinces Covered' },
  { value: '100%', label: 'Offline Capable' },
  { value: 'Free', label: 'To Start' },
];

const subjects = [
  { name: 'Physics', color: '#4F46E5' },
  { name: 'Chemistry', color: '#059669' },
  { name: 'Mathematics', color: '#7C3AED' },
  { name: 'Biology', color: '#0D9488' },
  { name: 'English', color: '#EA580C' },
  { name: 'Nepali', color: '#DC2626' },
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-background">
      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-container/20 to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-on-primary-container text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Now in beta — join 500+ early users
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight leading-tight mb-6">
            Study Smarter,
            <br />
            <span className="text-primary">Anywhere in Nepal</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            The only offline-first study platform built for Nepali NEB students. 
            Download notes, past papers, and practice sets — then study without 
            worrying about your internet connection.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[var(--radius-xl)] bg-primary text-on-primary font-semibold text-base hover:bg-primary-dark transition-colors"
            >
              Start Studying Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/resources"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[var(--radius-xl)] bg-surface-container-high text-on-surface font-semibold text-base hover:bg-surface-container-highest transition-colors border border-outline-variant"
            >
              Browse Resources
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-on-surface-variant">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="px-4 py-16 bg-surface-container-low">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
              All Your Subjects, Organized
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              Content aligned with the NEB syllabus for Grade 10 (SEE) through Grade 12. 
              Science, Management, and Humanities streams.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject) => (
              <div 
                key={subject.name}
                className="flex flex-col items-center gap-3 p-4 rounded-[var(--radius-md)] bg-surface-container hover:bg-surface-container-high transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-on-surface">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
              Built for Nepal's Reality
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              We didn't copy Silicon Valley. We built what Nepali students actually need.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="p-6 rounded-[var(--radius-lg)] bg-surface-container-low border border-outline-variant/50 hover:border-outline-variant transition-colors"
              >
                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-primary-container flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-on-primary-container" />
                </div>
                <h3 className="text-lg font-semibold text-on-surface mb-2">{feature.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 bg-surface-container-low">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
              How NEBians Works
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Download', desc: 'Save notes, past papers, and practice sets to your phone when you have internet.' },
              { step: '02', title: 'Study Offline', desc: 'Read, highlight, and annotate — even during load-shedding or in areas with no signal.' },
              { step: '03', title: 'Ask & Share', desc: 'Stuck on a problem? Ask the community. Know the answer? Help a fellow student.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-on-surface mb-2">{item.title}</h3>
                <p className="text-sm text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
              What Students Are Saying
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { 
                quote: "Finally, I don't have to scroll through Facebook groups for hours to find notes. Everything is organized here.",
                name: 'Rajan K.',
                detail: 'Grade 12 Science, Kathmandu'
              },
              { 
                quote: "I live in a village with bad internet. Being able to download everything at school and study at home is a game-changer.",
                name: 'Sita M.',
                detail: 'Grade 11 Science, Surkhet'
              },
              { 
                quote: "The past papers section alone is worth it. I solved every paper from 2075 to 2080 and improved my mock test score by 25%.",
                name: 'Prakash T.',
                detail: 'Grade 12 Science, Pokhara'
              },
            ].map((testimonial, i) => (
              <div 
                key={i}
                className="p-6 rounded-[var(--radius-lg)] bg-surface-container-low border border-outline-variant/50"
              >
                <MessageCircle className="h-6 w-6 text-primary mb-4" />
                <p className="text-sm text-on-surface leading-relaxed mb-4">"{testimonial.quote}"</p>
                <div>
                  <div className="text-sm font-semibold text-on-surface">{testimonial.name}</div>
                  <div className="text-xs text-on-surface-variant">{testimonial.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-4 py-16 bg-surface-container-low">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
            Free to Start. Affordable to Grow.
          </h2>
          <p className="text-on-surface-variant mb-10">
            Start with our free tier. Upgrade when you are ready. No credit card required.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 rounded-[var(--radius-lg)] bg-surface-container border border-outline-variant">
              <div className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Free</div>
              <div className="text-3xl font-bold text-on-surface mb-4">NPR 0</div>
              <ul className="space-y-3 mb-6">
                {[
                  'Access to 70% of resources',
                  'Basic offline reading',
                  'Community forum access',
                  'Standard support',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                href="/register"
                className="block w-full py-3 rounded-[var(--radius-xl)] bg-surface-container-high text-on-surface font-semibold text-center border border-outline-variant hover:bg-surface-container-highest transition-colors"
              >
                Get Started
              </Link>
            </div>
            
            <div className="p-6 rounded-[var(--radius-lg)] bg-primary-container border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-semibold">
                Recommended
              </div>
              <div className="text-sm font-semibold text-on-primary-container uppercase tracking-widest mb-2">Pro</div>
              <div className="text-3xl font-bold text-on-primary-container mb-4">NPR 99<span className="text-base font-normal">/month</span></div>
              <ul className="space-y-3 mb-6">
                {[
                  'All resources unlocked',
                  'Advanced PDF annotations',
                  'Unlimited downloads',
                  'Priority forum support',
                  'No ads',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-on-primary-container">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                href="/register"
                className="block w-full py-3 rounded-[var(--radius-xl)] bg-primary text-on-primary font-semibold text-center hover:bg-primary-dark transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
          
          <p className="text-xs text-on-surface-variant mt-6">
            Less than the price of one guidebook. Cancel anytime.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-10 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'Does NEBians really work without internet?',
                a: 'Yes. Download resources when you have WiFi or data. Once downloaded, you can read, highlight, and annotate them completely offline. Your annotations sync back when you are online.',
              },
              {
                q: 'Is the content aligned with the NEB syllabus?',
                a: 'Absolutely. Our content is sourced from and verified by active NEB teachers. We organize everything according to the official NEB syllabus for each grade and stream.',
              },
              {
                q: 'Do I need to pay to use NEBians?',
                a: 'No. The free tier gives you access to 70% of all resources. You only need Pro if you want unlimited downloads, advanced annotations, and priority support.',
              },
              {
                q: 'Can I use NEBians on my phone?',
                a: 'Yes. NEBians is a Progressive Web App (PWA). Visit nebians.vercel.app on your phone, add it to your home screen, and it works like a native app — without using any storage space.',
              },
              {
                q: 'Which grades and streams are supported?',
                a: 'We currently support Grade 10 (SEE), Grade 11, and Grade 12 for Science, Management, and Humanities streams. We are continuously adding more content.',
              },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-[var(--radius-md)] bg-surface-container-low border border-outline-variant/50">
                <h3 className="text-sm font-semibold text-on-surface mb-2">{faq.q}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 bg-primary-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-on-primary-container mb-4">
            Ready to Study Smarter?
          </h2>
          <p className="text-on-primary-container/80 mb-8 max-w-xl mx-auto">
            Join thousands of Nepali students who are preparing for NEB exams the smart way. 
            Free forever. No credit card required.
          </p>
          <Link 
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-[var(--radius-xl)] bg-primary text-on-primary font-semibold text-lg hover:bg-primary-dark transition-colors"
          >
            Create Free Account
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="text-xs text-on-primary-container/60 mt-4">
            Works on any smartphone. No app store download needed.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-surface-container-low border-t border-outline-variant/50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[var(--radius-md)] bg-primary flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <span className="font-semibold text-on-surface">NEBians</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-on-surface-variant">
            <Link href="/resources" className="hover:text-on-surface transition-colors">Resources</Link>
            <Link href="/forum" className="hover:text-on-surface transition-colors">Forum</Link>
            <Link href="/login" className="hover:text-on-surface transition-colors">Login</Link>
          </div>
          <div className="text-xs text-on-surface-variant">
            &copy; 2026 NEBians. Built for Nepal's students.
          </div>
        </div>
      </footer>
    </div>
  );
}
