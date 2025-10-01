
import { useParams } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fixedProducts } from "./ProductListArray";
import Footer from "../../components/Footer/Footer";

function ProductList() {
  const { category } = useParams<{ category: string }>();
  
  // URL'deki kategori parametresini decode et ve büyük harfe çevir
  const decodedCategory = category ? decodeURIComponent(category).toUpperCase() : "";
  
  // Şimdilik tüm kategoriler için aynı ürünleri göster
  const filteredProducts = fixedProducts;

  return (
    <>
      {/* Kategori başlığı */}
      <div className="mt-[150px] md:mt-[200px] text-center my-8">
        <h1 className="font-inter font-semibold text-[28px] md:text-[36px] leading-8 text-[#222222]">
          {decodedCategory} ÜRÜNLERİ
        </h1>
      </div>

      {/* Ürün kartları - Responsive grid düzeni */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-5 max-w-7xl mx-auto px-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              ProductName={product.ProductName}
              img={product.img}
              ShortDescription={product.ShortDescription}
              CommentNumber={product.CommentNumber}
              Stars={product.Stars}
              Price={product.Price}
              DiscountedPrice={product.DiscountedPrice}
            />
          ))
        ) : (
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center py-12">
            <p className="font-inter text-[18px] text-[#6A6C77]">
              Bu kategoride henüz ürün bulunmuyor.
            </p>
          </div>
        )}
      </div>

      {/* Toplam ürün sayısı */}
      <div className="text-center py-8">
        <p className="font-inter text-[16px] text-[#6A6C77]">
          Toplam {filteredProducts.length} ürün görüntüleniyor
        </p>
      </div>

      <Footer/>
    </>
  );
}

export default ProductList;
