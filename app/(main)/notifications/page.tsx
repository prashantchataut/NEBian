'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Heart, Megaphone, CheckCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { notificationService } from '@/lib/services';
import type { Notification } from '@/types';

const notificationIcons: Record<string, React.ReactNode> = {
  answer: <Bell className="h-5 w-5 text-primary" />,
  like: <Heart className="h-5 w-5 text-primary" />,
  announcement: <Megaphone className="h-5 w-5 text-primary" />,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = () => {
    setIsLoading(true);
    setError(null);
    notificationService.getAll()
      .then(setNotifications)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load notifications'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
    fetchNotifications();
  }, []);

  const markAllRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      prev.filter(n => !n.read).forEach(n => notificationService.markAsRead(n.id));
      return updated;
    });
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

      {error ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-[var(--radius-full)] bg-error-container mb-4">
            <AlertCircle className="h-8 w-8 text-on-error-container" />
          </div>
          <h3 className="text-base font-medium text-on-surface">Failed to load notifications</h3>
          <p className="text-sm text-on-surface-variant mt-1 max-w-xs">{error}</p>
          <Button variant="outline" size="md" iconLeft={<RefreshCw className="h-4 w-4" />} onClick={fetchNotifications} className="mt-4">
            Retry
          </Button>
        </div>
      ) : isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-[var(--radius-md)] border border-outline-variant p-4 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-[var(--radius-full)] bg-surface-container-highest shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-surface-container-highest rounded w-2/3" />
                  <div className="h-3 bg-surface-container-highest rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(notification => (
            <Link key={notification.id} href={notification.link || '#'}>
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
      )}

      {!isLoading && !error && notifications.length === 0 && (
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
