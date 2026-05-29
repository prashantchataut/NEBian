import Link from 'next/link';
import { BookOpen, MessageCircle, Heart, ArrowRight, TrendingUp, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SUBJECTS, SUBJECT_COLORS, SUBJECT_LABELS, GRADE_LABELS, RESOURCE_TYPE_LABELS } from '@/types';

const subjectIcons: Record<string, string> = {
  Physics: 'P',
  Chemistry: 'C',
  Mathematics: 'M',
  Biology: 'B',
  English: 'E',
  Nepali: 'N',
  SocialStudies: 'S',
  ComputerScience: 'CS',
};

export default function HomePage() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-5xl mx-auto space-y-8">
      <section>
        <h1 className="text-2xl font-semibold text-on-surface">Welcome back</h1>
        <p className="text-sm text-on-surface-variant mt-1">Continue where you left off or explore new resources.</p>
      </section>

      <section>
        <h2 className="text-sm font-medium text-on-surface-variant uppercase tracking-wider mb-3">Subjects</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUBJECTS.map((subject) => (
            <Link key={subject} href={`/resources?subject=${subject}`}>
              <Card variant="outlined" padding="compact" interactive className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: `var(--color-subject-${subject.charAt(0).toLowerCase() + subject.slice(1).replace(/([A-Z])/g, '')})` }}
                >
                  {subjectIcons[subject]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">{SUBJECT_LABELS[subject]}</p>
                  <p className="text-xs text-on-surface-variant">Resources</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Recent Resources</h2>
          <Link href="/resources" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} variant="outlined" padding="default" interactive>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-surface-container-high shrink-0">
                  <BookOpen className="h-5 w-5 text-on-surface-variant" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-on-surface truncate">Physics Grade 11 Textbook</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Neb Edition 2081</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge size="sm" variant="tonal" style={{ backgroundColor: 'var(--color-subject-physics)', color: '#fff' }}>Physics</Badge>
                    <Badge size="sm" variant="outlined">Grade 11</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-on-surface-variant shrink-0">
                  <Clock className="h-3 w-3" /> 2h ago
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Forum Activity</h2>
          <Link href="/forum" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Card key={i} variant="outlined" padding="default" interactive>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] bg-primary-container text-on-primary-container text-xs font-bold shrink-0">
                  RS
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-on-surface">How to solve projectile motion problems?</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <MessageCircle className="h-3 w-3" /> 5 answers
                    </span>
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <Heart className="h-3 w-3" /> 12
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">Popular This Week</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} variant="outlined" padding="default" interactive>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <Badge size="sm" variant="tonal" style={{ backgroundColor: 'var(--color-type-pastpaper)', color: '#fff' }}>Past Paper</Badge>
              </div>
              <h3 className="text-sm font-medium text-on-surface">NEB Physics 2080 Past Paper</h3>
              <p className="text-xs text-on-surface-variant mt-1">Grade 12</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}