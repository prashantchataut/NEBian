import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'text-xs min-h-[60px]',
  md: 'text-sm min-h-[100px]',
  lg: 'text-base min-h-[140px]',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, size = 'md', ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-on-surface">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full rounded-[var(--radius-sm)] border bg-surface-container-lowest px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-outline transition-[border-color,box-shadow] duration-[var(--transition-fast)] resize-y',
            error ? 'border-error focus:ring-error' : 'border-outline-variant',
            sizeStyles[size],
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-error">{error}</p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="text-xs text-on-surface-variant">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';