export function validateWhatsApp(phone: string): boolean {
  // Validación básica: debe tener al menos 10 dígitos
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 10;
}

export function formatWhatsAppNumber(phone: string): string {
  // Remover todo excepto dígitos
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly;
}

export function generateWhatsAppLink(
  number: string,
  message: string
): string {
  const formattedNumber = formatWhatsAppNumber(number);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
