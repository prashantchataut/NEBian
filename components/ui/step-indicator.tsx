'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  icon?: React.ReactNode;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  className,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol role="list" className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = index === currentStep;
          const isClickable = isCompleted || index <= Math.max(...completedSteps, -1) + 1;

          return (
            <li
              key={step.label}
              className={cn(
                'flex flex-col items-center gap-1.5 relative',
                index < steps.length - 1 && 'flex-1'
              )}
            >
              <div className="flex items-center w-full">
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all duration-[var(--transition-medium)]',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                    'disabled:cursor-not-allowed',
                    isCompleted
                      ? 'bg-primary text-on-primary'
                      : isCurrent
                      ? 'bg-primary text-on-primary ring-4 ring-primary/20'
                      : 'bg-surface-container-high text-on-surface-variant border border-outline-variant',
                    isClickable && !isCurrent && 'hover:bg-surface-container-highest'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.icon || (index + 1)
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2 transition-colors duration-[var(--transition-medium)]',
                      isCompleted ? 'bg-primary' : 'bg-surface-container-highest'
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium text-center hidden sm:block',
                  isCurrent
                    ? 'text-primary'
                    : isCompleted
                    ? 'text-on-surface'
                    : 'text-on-surface-variant'
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
