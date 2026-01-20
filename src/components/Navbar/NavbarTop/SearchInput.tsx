import { Link } from 'react-router-dom';
import { getProductImageUrl, type APIProduct } from '@/api/products';
import { useSearch } from '@/hooks/useSearch';

function SearchInput() {
  const {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    isLoading,
    containerRef,
    handleProductClick
  } = useSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const formatPrice = (product: APIProduct) => {
    const { total_price, discounted_price } = product.price_info;
    if (discounted_price) {
      return (
        <div className="text-right">
          <span className="font-bold text-black">{discounted_price} TL</span>
          <span className="text-sm text-red-500 line-through ml-2">{total_price} TL</span>
        </div>
      );
    }
    return <span className="font-bold text-black">{total_price} TL</span>;
  };

  return (
    <div ref={containerRef} className="hidden md:block relative">
      <form onSubmit={handleSubmit} className="flex max-w-md rounded-[4px] ml-3 border border-gray-400 bg-white">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Aradığınız ürünü yazınız"
          className="w-full px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#919191] px-6 text-white hover:bg-gray-400 transition"
        >
          ARA
        </button>
      </form>

      {/* Arama sonuçları dropdown */}
      {isOpen && (
        <div className="absolute top-full left-3 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Aranıyor...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.slug} className="border-b border-gray-100 last:border-b-0">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={handleProductClick}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={getProductImageUrl(product.photo_src)}
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-black truncate">{product.name}</h4>
                      <p className="text-sm text-gray-500 truncate">{product.short_explanation}</p>
                    </div>
                    {formatPrice(product)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.trim() ? (
            <div className="p-4 text-center text-gray-500">Sonuç bulunamadı</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
