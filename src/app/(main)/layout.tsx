import { BottomNav } from '@/components/shared/bottom-nav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA]">
      <main className="flex-1 pb-20 md:pb-6">{children}</main>
      <BottomNav />
    </div>
  );
}
