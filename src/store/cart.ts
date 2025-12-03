import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productSlug: string; 
  name: string;
  aroma: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) =>
        set(({ items }) => {
          const index = items.findIndex(i => i.id === item.id);
          if (index !== -1) {
            const updated = [...items];
            updated[index] = {
              ...updated[index],
              quantity: updated[index].quantity + quantity,
            };
            return { items: updated };
          }
          return { items: [...items, { ...item, quantity }] };
        }),

      removeItem: (id) => set(({ items }) => ({ items: items.filter(i => i.id !== id) })),
      clear: () => set({ items: [] }),

      increment: (id) =>
        set(({ items }) => ({
          items: items.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
        })),

      decrement: (id) =>
        set(({ items }) => ({
          items: items
            .map(i => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))
            .filter(i => i.quantity > 0),
        })),
    }),
    {
      name: 'ojs-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const selectCartCount = (s: CartState) => s.items.reduce((acc, i) => acc + i.quantity, 0);
export const selectCartTotal = (s: CartState) => s.items.reduce((acc, i) => acc + i.quantity * i.price, 0);
