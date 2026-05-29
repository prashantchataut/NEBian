import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary hover:bg-primary-dark active:bg-primary-dark/90 shadow-[var(--elevation-1)] active:shadow-none',
  secondary: 'bg-secondary-container text-on-secondary-container hover:brightness-[0.96] active:brightness-[0.92]',
  outline: 'border border-outline text-on-surface hover:bg-surface-container-high active:bg-surface-container-highest',
  ghost: 'text-on-surface-variant hover:bg-surface-container-high active:bg-surface-container-highest',
  danger: 'bg-error text-on-error hover:brightness-[0.96] active:brightness-[0.92] shadow-[var(--elevation-1)] active:shadow-none',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, iconLeft, iconRight, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-[var(--radius-full)] font-medium select-none transition-[background-color,box-shadow,filter] duration-[var(--transition-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-[0.38] disabled:pointer-events-none active:scale-[0.97]',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {iconLeft && <span className="shrink-0">{iconLeft}</span>}
            {children}
            {iconRight && <span className="shrink-0">{iconRight}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';