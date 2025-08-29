export interface Size {
  id: string;
  name: string;
  serving: string;
  discount?: string;
}

export const sizes: Size[] = [
  { id: "400G", name: "400G", serving: "16 servis" },
  { id: "1.6KG", name: "1.6KG", serving: "64 servis" },
  { id: "1.6KG X 2 ADET", name: "1.6KG X 2 ADET", serving: "128 servis", discount: "%6 İNDİRİM" },
];
