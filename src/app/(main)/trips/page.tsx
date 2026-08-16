import { PageHeader } from '@/components/shared/page-header';
import { TripList } from '@/features/trips/components/trip-list';

export default function TripsPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="My Trips"
        subtitle="Manage your upcoming & past adventures"
        showBack={true}
        backHref="/"
      />
      <TripList />
    </div>
  );
}
