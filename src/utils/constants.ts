// Uygulama genelinde kullanılan sabitler

// Kargo ve ödeme sabitleri
export const FREE_SHIPPING_THRESHOLD = 500; // TL
export const SHIPPING_COST = 50; // TL
export const TAX_RATE = 0.01; // %1
export const DISCOUNT_RATE = 0.071; // %7.1

// Aroma renkleri mapping
export const AROMA_COLORS: Record<string, string> = {
  Bisküvi: "#D4A574",
  Çikolata: "#8B4513",
  Muz: "#FFD700",
  "Salted Caramel": "#FF6347",
  "Choco Nut": "#A0522D",
  "Hindistan Cevizi": "#CD853F",
  Çilek: "#FF0000",
  Vanilya: "#F3E5AB",
  Karamel: "#D2691E",
  Elma: "#7CFC00",
  Aromasız: "#888888",
  Karpuz: "#FF6B6B",
  Limonata: "#FFEB3B",
  "Fruit Fusion": "#9C27B0",
};

// Renk sabitleri
export const COLORS = {
  primary: "#2126AB",
  discount: "#ED2727",
} as const;

