'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type ChipVariant = 'single' | 'multi';

interface ChipOption {
  value: string;
  label: string;
  color?: string;
  icon?: React.ReactNode;
}

interface ChipGroupProps {
  options: ChipOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  variant?: ChipVariant;
  className?: string;
  size?: 'sm' | 'md';
}

export function ChipGroup({
  options,
  value,
  onChange,
  variant = 'single',
  className,
  size = 'md',
}: ChipGroupProps) {
  const isSelected = (optionValue: string) => {
    if (variant === 'single') {
      return value === optionValue;
    }
    return Array.isArray(value) && value.includes(optionValue);
  };

  const handleClick = (optionValue: string) => {
    if (variant === 'single') {
      onChange(optionValue);
    } else {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(optionValue)) {
        onChange(currentValues.filter((v) => v !== optionValue));
      } else {
        onChange([...currentValues, optionValue]);
      }
    }
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const selected = isSelected(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleClick(option.value)}
            className={cn(
              'inline-flex items-center justify-center rounded-[var(--radius-full)] font-medium select-none transition-all duration-[var(--transition-fast)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              'active:scale-[0.97]',
              sizeStyles[size],
              selected
                ? 'bg-primary text-on-primary shadow-[var(--elevation-1)]'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest border border-outline-variant'
            )}
            style={
              selected && option.color
                ? { backgroundColor: option.color, color: '#FFFFFF' }
                : undefined
            }
          >
            {selected && (
              <Check className={cn('shrink-0', size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />
            )}
            {option.icon && !selected && <span className="shrink-0">{option.icon}</span>}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
