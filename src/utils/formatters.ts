// Formatlama utility fonksiyonları

/**
 * Toplam sayfa sayısını hesaplar
 * @param totalItems - Toplam öğe sayısı
 * @param itemsPerPage - Sayfa başına öğe sayısı
 * @returns Toplam sayfa sayısı
 */
export function calculateTotalPages(
  totalItems: number,
  itemsPerPage: number
): number {
  return Math.ceil(totalItems / itemsPerPage);
}

