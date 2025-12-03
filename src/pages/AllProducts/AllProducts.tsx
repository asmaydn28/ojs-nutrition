import { useLoaderData, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import type { ProductListResponse } from "@/api/products";

// Loader'dan gelen veri tipi
interface AllProductsLoaderData {
  products: ProductListResponse;
  currentPage: number;
  totalPages: number;
}

function AllProducts() {
  const { products, currentPage, totalPages } = useLoaderData() as AllProductsLoaderData;
  const navigate = useNavigate();

  // Sayfa değiştirme fonksiyonu
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`/urunler?page=${page}`);
    }
  };

  return (
    <>
      {/* Sayfa başlığı */}
      <div className="mt-[150px] md:mt-[200px] text-center my-8">
        <h1 className="font-inter font-semibold text-[28px] md:text-[36px] leading-8 text-[#222222]">
          TÜM ÜRÜNLER
        </h1>
        <p className="font-inter text-[14px] text-gray-500 mt-2">
          Toplam {products.count} ürün bulundu
        </p>
      </div>

      {/* Ürün kartları - Responsive grid düzeni */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 my-5 max-w-7xl mx-auto px-4">
        {products.results.length > 0 ? (
          products.results.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-6 text-center py-12">
            <p className="font-inter text-[18px] text-[#6A6C77]">
              Ürün bulunamadı.
            </p>
          </div>
        )}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center my-8 mb-12 gap-2">
          {/* Sol ok */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-[#387EC7] hover:bg-[#387EC7] hover:text-white"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Sayfa numaraları */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-[#387EC7] text-white"
                  : "text-[#387EC7] hover:bg-[#387EC7] hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Sağ ok */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-[#387EC7] hover:bg-[#387EC7] hover:text-white"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Toplam ürün sayısı */}
      <div className="text-center py-8 pb-16">
        <p className="font-inter text-[16px] text-[#6A6C77]">
          Sayfa {currentPage} / {totalPages} ({products.results.length} ürün
          gösteriliyor)
        </p>
      </div>

      <Footer />
    </>
  );
}

export default AllProducts;

