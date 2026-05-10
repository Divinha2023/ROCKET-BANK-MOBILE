export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(value);
}

export function parseCurrency(value: string) {
  const normalized = value
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  return Number(normalized) || 0;
}

export function formatCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, '');
  const amount = Number(digits || '0') / 100;

  return formatCurrency(amount);
}
