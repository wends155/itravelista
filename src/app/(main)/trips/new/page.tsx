import { PageHeader } from '@/components/shared/page-header';
import { TripForm } from '@/features/trips/components/trip-form';

export default function NewTripPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Plan a New Trip" showBack={true} />
      <div className="p-4">
        <TripForm />
      </div>
    </div>
  );
}
