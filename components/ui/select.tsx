import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  options: { value: string; label: string }[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, iconLeft, options, placeholder, id, size = 'md', ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-on-surface">
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
              {iconLeft}
            </span>
          )}
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full rounded-[var(--radius-sm)] border bg-surface-container-lowest px-3 text-on-surface appearance-none transition-[border-color,box-shadow] duration-[var(--transition-fast)]',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
              'hover:border-outline',
              error ? 'border-error focus:ring-error' : 'border-outline-variant',
              iconLeft && 'pl-10',
              'pr-10',
              sizeStyles[size],
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
        {error && (
          <p id={`${selectId}-error`} className="text-xs text-error">{error}</p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="text-xs text-on-surface-variant">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
