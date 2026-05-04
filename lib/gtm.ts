/**
 * WhatsApp → `dataLayer` (GTM) + `gtag('event', 'whatsapp_click', …)` (GA4 / Google Ads “crear con código”).
 * GTM: variables DLV `whatsapp_source`, `whatsapp_intent`; activador evento personalizado `whatsapp_click`.
 * Si también disparás GA4 desde GTM con el mismo evento, podés duplicar hits: dejá solo un camino para GA4.
 */

export type WhatsAppSource =
  | 'navbar'
  | 'navbar_mobile'
  | 'hero'
  | 'sticky_bar'
  | 'floating'
  | 'contact_link'
  | 'contact_form';

export type PushWhatsAppEventParams = {
  source: WhatsAppSource;
  intent?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushWhatsAppEvent({
  source,
  intent,
}: PushWhatsAppEventParams): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer ?? [];

  const payload: Record<string, unknown> = {
    event: 'whatsapp_click',
    whatsapp_source: source,
  };

  if (intent !== undefined && intent !== '') {
    payload.whatsapp_intent = intent;
  }

  window.dataLayer.push(payload);

  const gtagParams: Record<string, string> = {
    whatsapp_source: source,
  };
  if (intent !== undefined && intent !== '') {
    gtagParams.whatsapp_intent = intent;
  }
  window.gtag?.('event', 'whatsapp_click', gtagParams);
}
