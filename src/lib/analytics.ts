declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export type AnalyticsEvent =
  | 'trip_created'
  | 'checklist_generated'
  | 'checklist_item_toggled'
  | 'budget_template_applied'
  | 'budget_entry_added'
  | 'visa_country_viewed'
  | 'visa_copied_to_checklist'
  | 'guest_login';

export function trackEvent(eventName: AnalyticsEvent, props?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(eventName, { props });
  } else {
    // Development logger fallback
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event]: ${eventName}`, props || '');
    }
  }
}
