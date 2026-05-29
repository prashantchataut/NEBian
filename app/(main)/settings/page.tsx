'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor, Trash2, Download, HardDrive, ChevronRight, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { ChipGroup } from '@/components/ui/chip-group';
import { ContentScope, GRADE_LABELS } from '@/types';
import Link from 'next/link';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    announcements: true,
    answers: true,
    likes: false,
  });
  const [contentScope, setContentScope] = useState<ContentScope>('MyGradeOnly');

  const contentScopeOptions = [
    { value: 'MyGradeOnly', label: 'My Grade Only' },
    { value: 'All', label: 'All Grades' },
  ];

  return (
    <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Settings</h1>
        <p className="text-sm text-on-surface-variant mt-1">Customize your experience.</p>
      </div>

      <Link href="/settings/profile">
        <Card variant="outlined" padding="default" interactive className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-[var(--radius-full)] bg-primary-container text-on-primary-container shrink-0">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-on-surface">Ram Sharma</p>
            <p className="text-xs text-on-surface-variant">ram@example.com</p>
          </div>
          <ChevronRight className="h-5 w-5 text-on-surface-variant shrink-0" />
        </Card>
      </Link>

      <Card variant="outlined" padding="default">
        <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3">Appearance</h2>
        <div className="grid grid-cols-3 gap-3">
          {([
            { value: 'light' as const, icon: Sun, label: 'Light' },
            { value: 'dark' as const, icon: Moon, label: 'Dark' },
            { value: 'system' as const, icon: Monitor, label: 'System' },
          ]).map(option => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-[var(--radius-md)] border transition-[border-color,background-color,color] duration-[var(--transition-fast)] ${
                theme === option.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container-high active:bg-surface-container-highest'
              }`}
            >
              <option.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card variant="outlined" padding="default">
        <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3">Content Scope</h2>
        <p className="text-sm text-on-surface-variant mb-3">Choose whether to see resources for your grade only or all grades.</p>
        <ChipGroup
          options={contentScopeOptions}
          value={contentScope}
          onChange={(v) => setContentScope(v as ContentScope)}
          variant="single"
          size="sm"
        />
      </Card>

      <Card variant="outlined" padding="default">
        <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3">Notifications</h2>
        <div className="space-y-3">
          <Toggle
            label="Important announcements"
            checked={notifications.announcements}
            onChange={(checked) => setNotifications(prev => ({ ...prev, announcements: checked }))}
          />
          <Toggle
            label="Answers to your questions"
            checked={notifications.answers}
            onChange={(checked) => setNotifications(prev => ({ ...prev, answers: checked }))}
          />
          <Toggle
            label="Likes on your posts"
            checked={notifications.likes}
            onChange={(checked) => setNotifications(prev => ({ ...prev, likes: checked }))}
          />
        </div>
      </Card>

      <Card variant="outlined" padding="default">
        <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3">Storage</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-on-surface-variant" />
              <div>
                <p className="text-sm text-on-surface">Cached resources</p>
                <p className="text-xs text-on-surface-variant">3 files, 24.5 MB</p>
              </div>
            </div>
            <button
              onClick={() => {}}
              className="inline-flex items-center justify-center h-8 px-3 rounded-[var(--radius-full)] text-xs font-medium text-on-surface-variant hover:bg-surface-container-high active:bg-surface-container-highest transition-[background-color] duration-[var(--transition-fast)]"
            >
              Clear
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-on-surface-variant" />
              <div>
                <p className="text-sm text-on-surface">PDF annotations</p>
                <p className="text-xs text-on-surface-variant">12 annotations saved</p>
              </div>
            </div>
            <button
              onClick={() => {}}
              className="inline-flex items-center justify-center h-8 px-3 rounded-[var(--radius-full)] text-xs font-medium text-on-surface-variant hover:bg-surface-container-high active:bg-surface-container-highest transition-[background-color] duration-[var(--transition-fast)]"
            >
              Clear
            </button>
          </div>
        </div>
      </Card>

      <Card variant="outlined" padding="default">
        <h2 className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3">About</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Version</span>
            <span className="text-on-surface font-medium">0.1.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Package</span>
            <span className="text-on-surface font-medium">com.neb.ians</span>
          </div>
        </div>
      </Card>
    </div>
  );
}