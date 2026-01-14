import { create } from 'zustand';
import { getCategories, type Category } from '@/api/categories';

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;
  fetchCategories: () => Promise<void>;
  getCategoryBySlug: (slug: string) => Category | undefined;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,
  hasFetched: false,

  fetchCategories: async () => {
    // Eğer zaten yüklendiyse tekrar çekme
    if (get().hasFetched) return;

    set({ isLoading: true, error: null });

    try {
      const categories = await getCategories();
      // Order'a göre sırala
      const sortedCategories = categories.sort((a, b) => a.order - b.order);
      set({ categories: sortedCategories, isLoading: false, hasFetched: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Kategoriler yüklenirken hata oluştu';
      set({ error: errorMessage, isLoading: false, hasFetched: true });
    }
  },

  getCategoryBySlug: (slug: string) => {
    return get().categories.find((cat) => cat.slug === slug);
  },
}));

// Selectors
export const selectCategories = (state: CategoriesState) => state.categories;
export const selectCategoriesLoading = (state: CategoriesState) => state.isLoading;
