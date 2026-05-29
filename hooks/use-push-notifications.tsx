'use client';

import { useState } from 'react';

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'default'
  );
  const [isSupported] = useState(
    typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator
  );

  const requestPermission = async () => {
    if (!isSupported) return false;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  };

  return { permission, isSupported, requestPermission };
}