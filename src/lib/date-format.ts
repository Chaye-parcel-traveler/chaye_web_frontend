const frenchDateFormatter = new Intl.DateTimeFormat('fr-FR');

const frenchDateTimeFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short',
});

type DateValue = string | number | Date | null | undefined;

export function formatFrenchDate(value: DateValue): string {
  if (value == null) return '';
  return frenchDateFormatter.format(new Date(value));
}

export function formatFrenchDateTime(value: DateValue): string {
  if (value == null) return '';
  return frenchDateTimeFormatter.format(new Date(value));
}
