'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Mail, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Select } from '@/components/ui/select';
import { ChipGroup } from '@/components/ui/chip-group';
import {
  Stream,
  Subject,
  ContentScope,
  Grade,
  STREAMS,
  STREAM_LABELS,
  GRADE_REQUIRES_STREAM,
  getSubjectsForGrade,
  SUBJECT_LABELS,
  SUBJECT_COLORS,
  GRADES,
  GRADE_LABELS,
} from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState('Ram Sharma');
  const [email, setEmail] = useState('ram@example.com');
  const [grade, setGrade] = useState<Grade>('Grade11');
  const [stream, setStream] = useState<Stream | null>('Science');
  const [subjects, setSubjects] = useState<Subject[]>(['Physics', 'Chemistry', 'Mathematics']);
  const [contentScope, setContentScope] = useState<ContentScope>('MyGradeOnly');
  const [isSaving, setIsSaving] = useState(false);

  const availableSubjects = getSubjectsForGrade(grade, stream);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const gradeOptions = GRADES.map((g) => ({
    value: g,
    label: GRADE_LABELS[g],
  }));

  const streamOptions = STREAMS.map((s) => ({
    value: s,
    label: STREAM_LABELS[s],
  }));

  const subjectOptions = availableSubjects.map((s) => ({
    value: s,
    label: SUBJECT_LABELS[s],
    color: SUBJECT_COLORS[s],
  }));

  const contentScopeOptions = [
    { value: 'MyGradeOnly', label: 'My Grade Only' },
    { value: 'All', label: 'All Grades' },
  ];

  const showStream = GRADE_REQUIRES_STREAM[grade];

  const handleGradeChange = (newGrade: string) => {
    const g = newGrade as Grade;
    setGrade(g);
    if (!GRADE_REQUIRES_STREAM[g]) {
      setStream(null);
    }
    setSubjects([]);
  };

  const handleStreamChange = (value: string | string[]) => {
    setStream(value as Stream);
    setSubjects([]);
  };

  const handleSubjectsChange = (value: string | string[]) => {
    setSubjects(value as Subject[]);
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Profile</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage your account information.</p>
        </div>
      </div>

      <Card variant="outlined" padding="spacious" className="mb-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <Avatar size="lg" initials={name.split(' ').map(w => w[0]).join('')} />
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-full)] bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Change photo"
            >
              <Camera className="h-5 w-5 text-white" />
            </button>
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-on-surface truncate">{name}</h2>
            <p className="text-sm text-on-surface-variant">{email}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {GRADE_LABELS[grade]}{stream ? ` — ${STREAM_LABELS[stream]}` : ''}
            </p>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSave} className="space-y-5">
        <Card variant="outlined" padding="default">
          <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-4">Personal Information</h3>
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              iconLeft={<Mail className="h-4 w-4" />}
            />
            <Select
              label="Grade"
              options={gradeOptions}
              value={grade}
              onChange={(e) => handleGradeChange(e.target.value)}
            />
            {showStream && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-on-surface">Stream</label>
                <ChipGroup
                  options={streamOptions}
                  value={stream || ''}
                  onChange={handleStreamChange}
                  variant="single"
                  size="sm"
                />
              </div>
            )}
          </div>
        </Card>

        <Card variant="outlined" padding="default">
          <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-4">Subjects</h3>
          <p className="text-sm text-on-surface-variant mb-3">Select the subjects you are studying. This helps personalize your experience.</p>
          <ChipGroup
            options={subjectOptions}
            value={subjects}
            onChange={handleSubjectsChange}
            variant="multi"
            size="sm"
          />
        </Card>

        <Card variant="outlined" padding="default">
          <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-4">Content Scope</h3>
          <p className="text-sm text-on-surface-variant mb-3">Choose whether to see resources for your grade only or all grades.</p>
          <ChipGroup
            options={contentScopeOptions}
            value={contentScope}
            onChange={(v) => setContentScope(v as ContentScope)}
            variant="single"
            size="sm"
          />
        </Card>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" size="md" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button variant="primary" size="md" iconLeft={<Save className="h-4 w-4" />} loading={isSaving}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}