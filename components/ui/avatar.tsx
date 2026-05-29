import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  online?: boolean;
}

const sizeMap: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, initials, size = 'md', online, ...props }, ref) => {
    const fallbackText = initials || alt?.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || '?';

    return (
      <div ref={ref} className={cn('relative inline-flex shrink-0', className)} {...props}>
        <div
          className={cn(
            'rounded-[var(--radius-full)] flex items-center justify-center font-medium bg-primary-container text-on-primary-container overflow-hidden',
            sizeMap[size]
          )}
        >
          {src ? (
            <img src={src} alt={alt || ''} className="h-full w-full object-cover" />
          ) : (
            <span>{fallbackText}</span>
          )}
        </div>
        {online !== undefined && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block rounded-[var(--radius-full)] ring-2 ring-surface',
              online ? 'bg-green-500' : 'bg-on-surface-variant',
              size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-2.5 w-2.5' : 'h-3 w-3'
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';