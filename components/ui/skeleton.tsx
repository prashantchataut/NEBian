import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'card';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded-[var(--radius-sm)]',
  circle: 'rounded-[var(--radius-full)]',
  rectangle: 'rounded-[var(--radius-md)]',
  card: 'rounded-[var(--radius-md)] h-40',
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('animate-pulse-slow bg-surface-container-high', variantStyles[variant], className)}
        style={{ width, height, ...style }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';