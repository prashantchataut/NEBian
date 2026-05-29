'use client';

import Link from 'next/link';
import { Bell, CheckCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockNotifications = [
  { id: '1', type: 'answer' as const, title: 'New answer on your question', content: 'Sita Poudel answered "How to solve projectile motion problems?"', link: '/forum/1', read: false, createdAt: '2025-05-29T08:00:00Z' },
  { id: '2', type: 'like' as const, title: 'Your answer was liked', content: 'Hari Thapa liked your answer about integration techniques', link: '/forum/3', read: false, createdAt: '2025-05-29T06:00:00Z' },
  { id: '3', type: 'announcement' as const, title: 'New resources available', content: 'NEB 2081 past papers have been uploaded for all subjects', link: '/resources', read: true, createdAt: '2025-05-28T14:00:00Z' },
  { id: '4', type: 'like' as const, title: 'Your question received likes', content: 'Your question "Organic chemistry reaction mechanisms" received 5 likes', link: '/forum/2', read: true, createdAt: '2025-05-27T10:00:00Z' },
];

export default function NotificationsPage() {
  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Notifications</h1>
          <p className="text-sm text-on-surface-variant mt-1">Stay updated with activity and announcements.</p>
        </div>
        <Button variant="ghost" size="sm" iconLeft={<CheckCheck className="h-4 w-4" />}>
          Mark all read
        </Button>
      </div>

      <div className="space-y-2">
        {mockNotifications.map(notification => (
          <Link key={notification.id} href={notification.link}>
            <Card variant="outlined" padding="default" interactive className={`flex items-start gap-3 ${!notification.read ? 'bg-primary-container/5' : ''}`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] shrink-0 bg-surface-container-high">
                {notification.type === 'answer' && <Bell className="h-5 w-5 text-primary" />}
                {notification.type === 'like' && <span className="text-sm text-error">&#9829;</span>}
                {notification.type === 'announcement' && <span className="text-sm font-bold text-primary">!</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm ${!notification.read ? 'font-semibold text-on-surface' : 'font-medium text-on-surface'}`}>{notification.title}</h3>
                  {!notification.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{notification.content}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}