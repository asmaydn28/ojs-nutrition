import { useState, useEffect, useRef } from 'react';
import { searchProducts, type APIProduct } from '@/api/products';

/* Hem mobil hem de masaüstü arama çubukları tarafından kullanılır.*/
export function useSearch(debounceMs: number = 300) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<APIProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Dışarı tıklandığında dropdown'ı kapat */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Debounced arama */
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await searchProducts(query, 10);
        setResults(response.results);
        setIsOpen(true);
      } catch (error) {
        console.error('Arama hatası:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, debounceMs]);

  const handleProductClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    isLoading,
    containerRef,
    handleProductClick
  };
}
