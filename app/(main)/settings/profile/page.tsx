'use client';

import { useState } from 'react';
import { Camera, Mail, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { SUBJECT_LABELS, GRADE_LABELS } from '@/types';

export default function ProfilePage() {
  const [name, setName] = useState('Ram Sharma');
  const [email, setEmail] = useState('ram@example.com');
  const [grade, setGrade] = useState('Grade11');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
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
            <p className="text-xs text-on-surface-variant mt-0.5">{GRADE_LABELS[grade as keyof typeof GRADE_LABELS]}</p>
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
            <div className="flex flex-col gap-1.5">
              <label htmlFor="profile-grade" className="text-sm font-medium text-on-surface">Grade</label>
              <select
                id="profile-grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="h-10 rounded-[var(--radius-sm)] border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-outline transition-[border-color,box-shadow] duration-[var(--transition-fast)]"
              >
                <option value="Grade10">{GRADE_LABELS['Grade10']}</option>
                <option value="Grade11">{GRADE_LABELS['Grade11']}</option>
                <option value="Grade12">{GRADE_LABELS['Grade12']}</option>
              </select>
            </div>
          </div>
        </Card>

        <Card variant="outlined" padding="default">
          <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-4">Subjects</h3>
          <p className="text-sm text-on-surface-variant mb-3">Select the subjects you are studying. This helps personalize your experience.</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SUBJECT_LABELS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className="px-3 h-8 rounded-[var(--radius-full)] text-xs font-medium transition-[background-color,color] duration-[var(--transition-fast)] bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest active:bg-surface-container-highest"
              >
                {label}
              </button>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" size="md" type="button">Cancel</Button>
          <Button variant="primary" size="md" iconLeft={<Save className="h-4 w-4" />} loading={isSaving}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}