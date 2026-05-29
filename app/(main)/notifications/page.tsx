'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Heart, Megaphone, CheckCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Notification = {
  id: string;
  type: 'answer' | 'like' | 'announcement';
  title: string;
  content: string;
  link: string;
  read: boolean;
  createdAt: string;
};

const initialNotifications: Notification[] = [
  { id: '1', type: 'answer', title: 'New answer on your question', content: 'Sita Poudel answered "How to solve projectile motion problems?"', link: '/forum/1', read: false, createdAt: '2025-05-29T08:00:00Z' },
  { id: '2', type: 'like', title: 'Your answer was liked', content: 'Hari Thapa liked your answer about integration techniques', link: '/forum/3', read: false, createdAt: '2025-05-29T06:00:00Z' },
  { id: '3', type: 'announcement', title: 'New resources available', content: 'NEB 2081 past papers have been uploaded for all subjects', link: '/resources', read: true, createdAt: '2025-05-28T14:00:00Z' },
  { id: '4', type: 'like', title: 'Your question received likes', content: 'Your question "Organic chemistry reaction mechanisms" received 5 likes', link: '/forum/2', read: true, createdAt: '2025-05-27T10:00:00Z' },
];

const notificationIcons: Record<string, React.ReactNode> = {
  answer: <Bell className="h-5 w-5 text-primary" />,
  like: <Heart className="h-5 w-5 text-primary" />,
  announcement: <Megaphone className="h-5 w-5 text-primary" />,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Notifications</h1>
          <p className="text-sm text-on-surface-variant mt-1">Stay updated with activity and announcements.</p>
        </div>
        {notifications.some(n => !n.read) && (
          <Button variant="ghost" size="sm" iconLeft={<CheckCheck className="h-4 w-4" />} onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(notification => (
          <Link key={notification.id} href={notification.link}>
            <Card variant="outlined" padding="default" interactive className={`flex items-start gap-3 ${!notification.read ? 'bg-primary/5' : ''}`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-full)] shrink-0 bg-surface-container-high">
                {notificationIcons[notification.type]}
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

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-[var(--radius-full)] bg-surface-container-high mb-4">
            <Bell className="h-8 w-8 text-on-surface-variant" />
          </div>
          <h3 className="text-base font-medium text-on-surface">No notifications</h3>
          <p className="text-sm text-on-surface-variant mt-1 max-w-xs">You are all caught up.</p>
        </div>
      )}
    </div>
  );
}