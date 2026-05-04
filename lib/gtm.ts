/**
 * Eventos para Google Tag Manager (dataLayer).
 * En GTM: variable DLV `whatsapp_source`, `whatsapp_intent`; activador "Evento personalizado" `whatsapp_click`.
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
}
