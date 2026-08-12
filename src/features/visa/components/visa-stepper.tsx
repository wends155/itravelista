'use client';

import { Check } from 'lucide-react';
import type { VisaStep } from '../types';

interface VisaStepperProps {
  currentStep: VisaStep;
  onStepClick?: (step: VisaStep) => void;
}

export function VisaStepper({ currentStep, onStepClick }: VisaStepperProps) {
  const steps: { number: VisaStep; label: string }[] = [
    { number: 1, label: 'Requirements' },
    { number: 2, label: 'Documents' },
    { number: 3, label: 'Apply' },
    { number: 4, label: 'Done' },
  ];

  return (
    <div className="flex w-full items-center justify-between px-2 py-2">
      {steps.map((step, idx) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(step.number)}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-[#008080] text-white'
                    : isActive
                    ? 'bg-[#008080] text-white ring-4 ring-[#E0F2F1]'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4 stroke-[3px]" /> : step.number}
              </button>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? 'font-bold text-[#008080]' : 'text-[#6C757D]'
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-1.5 -mt-3 transition-colors ${
                  step.number < currentStep ? 'bg-[#008080]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
