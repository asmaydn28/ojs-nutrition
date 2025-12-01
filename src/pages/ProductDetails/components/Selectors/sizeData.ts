export interface Size {
  id: string;
  name: string;
  serving: string;
  discount?: string;
  priceMultiplier: number; // Base fiyatın kaç katı olacağı (örn: 1.6KG = 4x, 1.6KG X 2 = 7.52x)
  numericId: number; // Sepet için unique numeric ID (1, 2, 3...)
}

export const sizes: Size[] = [
  { id: "400G", name: "400G", serving: "16 servis", priceMultiplier: 1, numericId: 1 }, // Base fiyat
  { id: "1.6KG", name: "1.6KG", serving: "64 servis", priceMultiplier: 4, numericId: 2 }, // 4 katı (400g x 4 = 1.6kg)
  { id: "1.6KG X 2 ADET", name: "1.6KG X 2 ADET", serving: "128 servis", discount: "%6 İNDİRİM", priceMultiplier: 7.52, numericId: 3 }, // 8'in %6 indirimli hali (8 * 0.94 = 7.52)
];
