'use client';

import { use } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { useVisaCountry } from '@/features/visa/hooks/use-visa';
import { VisaStepper } from '@/features/visa/components/visa-stepper';
import { VisaRequirementList } from '@/features/visa/components/visa-requirement-list';
import { ExternalLink, Clock, Banknote, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CountryVisaPage({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = use(params);
  const { data: visaData, isLoading, isError } = useVisaCountry(countryCode);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <div className="h-24 w-full animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-64 w-full animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  if (isError || !visaData) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-red-500">Country visa data not found</p>
        <Link href="/visa" className="mt-2 inline-block text-xs font-semibold text-[#008080]">
          Back to Visa Assistant
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-28">
      <PageHeader title={`${visaData.country_name} Visa Guide`} showBack={true} />

      <div className="flex flex-col gap-5 p-4">
        {/* Stepper Header */}
        <div className="rounded-2xl bg-white p-4 border border-[#E0E0E0] shadow-xs">
          <VisaStepper currentStep={1} />
        </div>

        {/* Processing & Fee Summary Card */}
        <div className="grid grid-cols-2 gap-3">
          {visaData.processing_time && (
            <div className="flex flex-col rounded-2xl bg-white p-3.5 border border-[#E0E0E0] shadow-2xs">
              <span className="flex items-center gap-1 text-[11px] font-medium text-[#6C757D]">
                <Clock className="h-3.5 w-3.5 text-[#008080]" /> Processing Time
              </span>
              <span className="mt-1 text-xs font-bold text-[#1A1A1A]">{visaData.processing_time}</span>
            </div>
          )}

          {visaData.fees && (
            <div className="flex flex-col rounded-2xl bg-white p-3.5 border border-[#E0E0E0] shadow-2xs">
              <span className="flex items-center gap-1 text-[11px] font-medium text-[#6C757D]">
                <Banknote className="h-3.5 w-3.5 text-[#008080]" /> Estimated Fees
              </span>
              <span className="mt-1 text-xs font-bold text-[#1A1A1A]">
                ₱{visaData.fees.amount.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Requirement Checklist */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6C757D] mb-2 px-1">
            Required Documents ({visaData.requirements.length})
          </h3>
          <VisaRequirementList requirements={visaData.requirements} />
        </div>

        {/* Disclaimer & Transparency Badge */}
        <div className="rounded-xl bg-gray-100 p-3 text-[11px] text-[#6C757D] leading-relaxed">
          <p>
            <strong className="text-[#1A1A1A]">Disclaimer:</strong> Requirements change frequently.
            Always verify with the official embassy before submission.
          </p>
          <p className="mt-1 text-[10px] text-[#ADB5BD]">
            Last verified: {visaData.last_verified}
          </p>
        </div>
      </div>

      {/* Fixed CTA Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-[#E0E0E0] bg-white p-3 shadow-lg">
        {visaData.embassy_url ? (
          <a
            href={visaData.embassy_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008080] py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#006B6B]"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Start Official Application</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </a>
        ) : (
          <Link
            href="/trips/new"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008080] py-3 text-sm font-bold text-white"
          >
            Create Trip to {visaData.country_name}
          </Link>
        )}
      </div>
    </div>
  );
}
