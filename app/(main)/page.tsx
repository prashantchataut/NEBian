import Link from 'next/link';
import { BookOpen, Heart, ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SUBJECTS, SUBJECT_COLORS, SUBJECT_LABELS } from '@/types';

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

const recentResources = [
  {
    subject: 'Physics' as const,
    title: 'Physics Grade 11 Textbook',
    description: 'Neb Edition 2081',
    grade: 'Grade 11',
    time: '2h ago',
  },
  {
    subject: 'Chemistry' as const,
    title: 'Organic Chemistry Notes',
    description: 'Complete chapter-wise notes',
    grade: 'Class 12',
    time: '5h ago',
  },
  {
    subject: 'Mathematics' as const,
    title: 'Calculus Practice Sets',
    description: 'With solutions and explanations',
    grade: 'Class 11',
    time: '1d ago',
  },
];

const forumActivity = [
  {
    initials: 'RS',
    title: 'How to solve projectile motion problems?',
    likes: 12,
    answers: 5,
    liked: true,
  },
  {
    initials: 'AP',
    title: 'Balancing redox reactions in organic chemistry?',
    likes: 8,
    answers: 3,
    liked: false,
  },
];

export default function HomePage() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <section>
        <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Welcome back</h1>
        <p className="text-sm text-on-surface-variant mt-1">Continue where you left off or explore new resources.</p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Subjects</h2>
          <Link href="/resources" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-on-primary-container transition-colors group">
            View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUBJECTS.map((subject) => (
            <Link key={subject} href={`/resources?subject=${subject}`} className="animate-slide-up">
              <Card variant="outlined" padding="compact" interactive className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: SUBJECT_COLORS[subject] }}
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
          <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Recent Resources</h2>
          <Link href="/resources" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-on-primary-container transition-colors group">
            View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentResources.map((resource) => (
            <Card key={resource.title} variant="outlined" padding="default" interactive>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-surface-container-high shrink-0">
                  <BookOpen className="h-5 w-5 text-on-surface-variant" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-on-surface truncate">{resource.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{resource.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge size="sm" variant="tonal" color={SUBJECT_COLORS[resource.subject]}>{SUBJECT_LABELS[resource.subject]}</Badge>
                    <Badge size="sm" variant="outlined">{resource.grade}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-on-surface-variant shrink-0">
                  <Clock className="h-3 w-3" /> {resource.time}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Forum Activity</h2>
          <Link href="/forum" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-on-primary-container transition-colors group">
            View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {forumActivity.map((post) => (
            <Card key={post.title} variant="outlined" padding="default" interactive>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] bg-primary-container text-on-primary-container text-xs font-bold shrink-0">
                  {post.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-on-surface">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <Heart className="h-3 w-3" fill={post.liked ? 'currentColor' : 'none'} /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                      <MessageCircle className="h-3 w-3" /> {post.answers} answers
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}