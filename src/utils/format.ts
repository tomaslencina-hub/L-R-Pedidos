/** Formats whole pesos as `$ 12.800` without relying on the device's Intl data. */
export function formatPrice(amount: number) {
  return `$ ${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
