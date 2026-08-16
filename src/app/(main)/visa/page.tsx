import { PageHeader } from '@/components/shared/page-header';
import { VisaCountrySelector } from '@/features/visa/components/visa-country-selector';

export default function VisaAssistantPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Visa Assistant"
        subtitle="PH Passport visa requirements & guides"
        showBack={true}
        backHref="/"
      />
      <div className="p-4">
        <VisaCountrySelector />
      </div>
    </div>
  );
}
