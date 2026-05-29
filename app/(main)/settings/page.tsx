'use client';

import { useState } from 'react';
import { Moon, Sun, Monitor, Trash2, Download, HardDrive } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');

  return (
    <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-on-surface">Settings</h1>
        <p className="text-sm text-on-surface-variant mt-1">Customize your experience.</p>
      </div>

      <Card variant="outlined" padding="default">
        <h2 className="text-sm font-medium text-on-surface mb-3">Appearance</h2>
        <div className="grid grid-cols-3 gap-3">
          {([
            { value: 'light' as const, icon: Sun, label: 'Light' },
            { value: 'dark' as const, icon: Moon, label: 'Dark' },
            { value: 'system' as const, icon: Monitor, label: 'System' },
          ]).map(option => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`flex flex-col items-center gap-2 p-4 rounded-[var(--radius-md)] border transition-colors ${
                theme === option.value
                  ? 'border-primary bg-primary-container/10 text-primary'
                  : 'border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <option.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card variant="outlined" padding="default">
        <h2 className="text-sm font-medium text-on-surface mb-3">Notifications</h2>
        <div className="space-y-3">
          {['Important announcements', 'Answers to your questions', 'Likes on your posts'].map(item => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-sm text-on-surface">{item}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-[var(--radius-full)] peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:rounded-[var(--radius-full)] after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-on-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="outlined" padding="default">
        <h2 className="text-sm font-medium text-on-surface mb-3">Storage</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-on-surface-variant" />
              <div>
                <p className="text-sm text-on-surface">Cached resources</p>
                <p className="text-xs text-on-surface-variant">3 files, 24.5 MB</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconLeft={<Trash2 className="h-3 w-3" />}>Clear</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-on-surface-variant" />
              <div>
                <p className="text-sm text-on-surface">PDF annotations</p>
                <p className="text-xs text-on-surface-variant">12 annotations saved</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconLeft={<Trash2 className="h-3 w-3" />}>Clear</Button>
          </div>
        </div>
      </Card>

      <Card variant="outlined" padding="default">
        <h2 className="text-sm font-medium text-on-surface mb-3">About</h2>
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