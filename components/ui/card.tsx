import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'elevated' | 'outlined' | 'filled';
type CardPadding = 'compact' | 'default' | 'spacious';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  elevated: 'bg-surface-container-low shadow-[var(--elevation-1)]',
  outlined: 'bg-surface border border-outline-variant',
  filled: 'bg-surface-container-highest',
};

const paddingStyles: Record<CardPadding, string> = {
  compact: 'p-3',
  default: 'p-4',
  spacious: 'p-6',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', padding = 'default', interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-[var(--radius-md)] transition-[background-color,box-shadow,transform] duration-[var(--transition-fast)]',
          variantStyles[variant],
          paddingStyles[padding],
          interactive && 'cursor-pointer hover:shadow-[var(--elevation-2)] hover:-translate-y-px active:translate-y-0 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';