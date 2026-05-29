import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type BadgeVariant = 'filled' | 'outlined' | 'tonal';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: string;
  removable?: boolean;
  onRemove?: () => void;
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'h-5 px-2 text-[10px] gap-1',
  md: 'h-6 px-3 text-xs gap-1.5',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'tonal', size = 'md', color, removable, onRemove, children, style, ...props }, ref) => {
    const colorStyle = color ? {
      backgroundColor: variant === 'filled' ? color : variant === 'tonal' ? color : undefined,
      borderColor: variant === 'outlined' ? color : undefined,
      color: variant === 'filled' ? '#fff' : variant === 'tonal' ? '#fff' : color,
      opacity: variant === 'tonal' ? '0.9' : undefined,
    } : undefined;

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-[var(--radius-sm)] font-medium whitespace-nowrap select-none',
          !color && variant === 'filled' && 'bg-primary text-on-primary',
          !color && variant === 'outlined' && 'border border-outline text-on-surface',
          !color && variant === 'tonal' && 'bg-secondary-container text-on-secondary-container',
          sizeStyles[size],
          className
        )}
        style={{ ...colorStyle, ...style }}
        {...props}
      >
        {children}
        {removable && (
          <button
            onClick={onRemove}
            className="ml-0.5 -mr-1 inline-flex items-center justify-center rounded-full hover:bg-black/10 active:bg-black/20 transition-colors"
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';