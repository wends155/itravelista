import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#E0E0E0] bg-white p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F2F1] text-[#008080]">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-[#1A1A1A]">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-[#6C757D]">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
