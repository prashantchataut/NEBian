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
  elevated: 'bg-surface-container-low',
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
          'rounded-[var(--radius-md)]',
          variantStyles[variant],
          paddingStyles[padding],
          interactive && 'cursor-pointer hover:bg-surface-container-high transition-colors',
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