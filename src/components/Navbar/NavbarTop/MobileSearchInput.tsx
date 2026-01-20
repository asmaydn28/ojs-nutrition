import { Link } from 'react-router-dom';
import { getProductImageUrl, type APIProduct } from '@/api/products';
import { useSearch } from '@/hooks/useSearch';

function MobileSearchInput() {
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
        <div className="flex flex-col items-end">
          <span className="font-bold text-black text-xs">{discounted_price} TL</span>
          <span className="text-[10px] text-red-500 line-through">{total_price} TL</span>
        </div>
      );
    }
    return <span className="font-bold text-black text-xs">{total_price} TL</span>;
  };

  return (
    <div ref={containerRef} className="md:hidden bg-black py-3 px-4 relative">
      <div className="max-w-[1200px] mx-auto">
        <form onSubmit={handleSubmit} className="relative h-[36px] w-full">
          {/* Input Background */}
          <div className="absolute inset-0 bg-[#F3F3F3] rounded-[24px]"></div>
          
          {/* Search Icon */}
          <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="11" cy="11" r="7" stroke="#2B0000" strokeWidth="2" fill="none"/>
              <path d="M21 21l-6 -6" stroke="#2B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder="ARADIĞINIZ ÜRÜNÜ YAZINIZ."
            className="absolute left-[32px] right-[12px] top-0 h-full bg-transparent font-inter font-normal text-[12.9062px] leading-[16px] text-[#333333] placeholder:text-[#333333] focus:outline-none"
          />
        </form>
      </div>

      {/* Arama sonuçları dropdown - Mobil tasarım */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-0 bg-white shadow-2xl z-[60] max-h-[70vh] overflow-y-auto border-t border-gray-100">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 text-sm">Aranıyor...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.slug} className="border-b border-gray-100 last:border-b-0">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={handleProductClick}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={getProductImageUrl(product.photo_src)}
                      alt={product.name}
                      className="w-12 h-12 object-contain rounded border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-black text-sm truncate uppercase">{product.name}</h4>
                      <p className="text-[11px] text-gray-500 truncate">{product.short_explanation}</p>
                    </div>
                    {formatPrice(product)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.trim() ? (
            <div className="p-4 text-center text-gray-500 text-sm">Sonuç bulunamadı</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default MobileSearchInput;
