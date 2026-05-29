'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  id?: string;
  className?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onChange, disabled, label, description, id, className }, ref) => {
    const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn('flex items-center justify-between gap-4', className)}>
        {(label || description) && (
          <div className="flex flex-col gap-0.5 min-w-0">
            {label && (
              <label
                htmlFor={toggleId}
                className="text-sm font-medium text-on-surface cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-on-surface-variant">{description}</p>
            )}
          </div>
        )}
        <button
          ref={ref}
          id={toggleId}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={cn(
            'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-[var(--transition-fast)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'bg-primary' : 'bg-surface-container-highest border border-outline-variant'
          )}
        >
          <span
            className={cn(
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-[var(--elevation-1)] transition-transform duration-[var(--transition-fast)]',
              'translate-x-0.5 mt-[3px]',
              checked ? 'translate-x-[22px] bg-on-primary' : 'translate-x-0.5'
            )}
          />
        </button>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
