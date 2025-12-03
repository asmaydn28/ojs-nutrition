import { useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import type { ProductDetailResponse, ProductVariant } from "@/api/products";
import { getProductImageUrl } from "@/api/products";
import { useCartStore } from "@/store/cart";
import StarRating from "@/components/StarRating/StarRating";
import { AROMA_COLORS } from "@/utils/constants";

import Comments from "@/components/Comments/Comments";
import Footer from "@/components/Footer/Footer";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Loader'dan gelen veri tipi
interface ProductDetailsLoaderData {
  product: ProductDetailResponse;
}

function ProductDetails() {
  const { product } = useLoaderData() as ProductDetailsLoaderData;

  // Benzersiz aromalar ve boyutları çıkar
  const aromas = useMemo(() => {
    const aromaSet = new Set<string>();
    product.variants.forEach((v) => {
      if (v.aroma) {
        aromaSet.add(v.aroma);
      }
    });
    return Array.from(aromaSet);
  }, [product.variants]);

  const sizes = useMemo(() => {
    const sizeMap = new Map<number, ProductVariant["size"]>();
    product.variants.forEach((v) => {
      if (v.size && !sizeMap.has(v.size.gram)) {
        sizeMap.set(v.size.gram, v.size);
      }
    });
    return Array.from(sizeMap.values());
  }, [product.variants]);

  // Varsayılan varyant (ilk available olan)
  const defaultVariant = product.variants.find((v) => v.is_available) || product.variants[0];

  const [selectedAroma, setSelectedAroma] = useState<string>(
    defaultVariant?.aroma || aromas[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState<number>(
    defaultVariant?.size?.gram || sizes[0]?.gram || 0
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  // Seçili varyanta göre fiyat ve görsel bilgisi
  const selectedVariant = useMemo(() => {
    return (
      product.variants.find(
        (v) => v.aroma === selectedAroma && v.size?.gram === selectedSize
      ) || defaultVariant
    );
  }, [product.variants, selectedAroma, selectedSize, defaultVariant]);

  const priceInfo = selectedVariant?.price;
  const productImage = getProductImageUrl(selectedVariant?.photo_src);

  // Zustand store
  const addItem = useCartStore((s) => s.addItem);

  // Sepete ekle fonksiyonu
  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const price = priceInfo?.discounted_price || priceInfo?.total_price || 0;
    
    addItem(
      {
        id: selectedVariant.id,
        productSlug: product.slug,
        name: product.name,
        aroma: selectedAroma,
        size: `${selectedVariant.size.gram}G${selectedVariant.size.pieces > 1 ? ` x ${selectedVariant.size.pieces}` : ""}`,
        price: price,
        image: productImage,
      },
      quantity
    );

    // Miktar sıfırla
    setQuantity(1);
  };

  // Accordion içerikleri - API'den gelen explanation objesinden
  const accordionItems = [
    {
      title: "ÖZELLİKLER",
      content: product.explanation?.features || "Ürün özellikleri yükleniyor...",
    },
    {
      title: "BESİN İÇERİĞİ",
      content: product.explanation?.nutritional_content
        ? formatNutritionalContent(product.explanation.nutritional_content)
        : "Besin içeriği yükleniyor...",
    },
    {
      title: "KULLANIM ŞEKLİ",
      content: product.explanation?.usage || "Kullanım bilgisi yükleniyor...",
    },
  ];


  return (
    <div className="min-h-screen pt-36 md:pt-40 lg:pt-40">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-0 md:gap-y-0 lg:gap-y-8 lg:items-start">
        {/* Ürün Görseli */}
        <div className="flex justify-center lg:justify-start items-start mb-4 md:mb-0">
          <img
            className="block w-[587px] h-[587px] lg:w-full lg:max-w-[587px] lg:h-auto lg:object-contain lg:self-start"
            src={productImage}
            alt={product.name}
          />
        </div>

        {/* Ürün Bilgileri */}
        <div className="flex flex-col lg:h-full order-2 md:order-2 md:col-start-2 md:row-start-1 md:row-span-2">
          {/* Ürün Adı */}
          <h1 className="font-inter font-semibold text-[26.95px] leading-[36px] tracking-[0] align-middle text-black">
            {product.name}
          </h1>

          {/* Kısa Açıklama */}
          <h2 className="text-gray-600 mt-1">{product.short_explanation}</h2>

          {/* Yıldızlar ve Yorum Sayısı */}
          <div className="mt-2">
            <StarRating
              rating={product.average_star}
              size="md"
              showCount
              commentCount={product.comment_count}
              layout="horizontal" // ProductDetails'ta yan yana
            />
          </div>

          {/* Etiketler */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 border-b pb-4">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-200 text-black rounded-full font-inter font-normal text-[10.13px] leading-[16px] align-middle"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Aroma Seçici */}
          {aromas.length > 0 && (
            <div className="mt-6">
              <h3 className="font-inter font-bold text-black text-lg mb-4">
                AROMA:
              </h3>
              <div className="flex flex-wrap gap-2">
                {aromas.map((aroma) => (
                  <button
                    key={aroma}
                    onClick={() => setSelectedAroma(aroma)}
                    className={`
                      relative flex items-center gap-2 px-3 py-2 border-2 rounded-md transition-all duration-200 w-fit
                      ${
                        selectedAroma === aroma
                          ? "border-[#2126AB] bg-orange-50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }
                    `}
                    style={{ height: "35px" }}
                  >
                    {selectedAroma === aroma && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#2126AB] rounded-full flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    <span className="font-inter text-xs text-black leading-tight">
                      {aroma}
                    </span>
                    <div
                      className="w-4 h-4 rounded-sm shrink-0"
                      style={{
                        backgroundColor: AROMA_COLORS[aroma] || "#888888",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Boyut Seçici */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="font-inter font-bold text-black text-lg mb-4">
                BOYUT:
              </h3>
              <div className="flex flex-wrap gap-4">
                {sizes.map((size) => {
                  // Bu boyut için indirim var mı kontrol et
                  const variantForSize = product.variants.find(
                    (v) => v.size?.gram === size.gram && v.aroma === selectedAroma
                  );
                  const hasDiscount = variantForSize?.price?.discount_percentage;

                  return (
                    <button
                      key={size.gram}
                      onClick={() => setSelectedSize(size.gram)}
                      className={`
                        relative border-2 rounded-md transition-all duration-200 px-6 py-4 text-center min-w-[140px]
                        ${
                          selectedSize === size.gram
                            ? "border-[#2126AB] bg-white"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        }
                        ${hasDiscount ? "min-w-[180px]" : ""}
                      `}
                    >
                      {hasDiscount && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          %{hasDiscount} İNDİRİM
                        </div>
                      )}

                      {selectedSize === size.gram && (
                        <div
                          className={`absolute -top-1 ${hasDiscount ? "-left-1" : "-right-1"} w-4 h-4 bg-[#2126AB] rounded-full flex items-center justify-center`}
                        >
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      <div className="font-inter font-bold text-black text-lg">
                        {size.gram}G
                        {size.pieces > 1 && ` x ${size.pieces}`}
                      </div>
                      <div className="font-inter text-sm text-black">
                        {size.total_services} servis
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fiyat ve Sepete Ekle */}
          <div className="mt-8">
            {/* Fiyat ve Servis Ücreti */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-4xl font-inter font-bold text-black">
                {priceInfo?.discounted_price || priceInfo?.total_price} TL
                {priceInfo?.discounted_price && (
                  <span className="text-lg text-gray-400 line-through ml-2">
                    {priceInfo.total_price} TL
                  </span>
                )}
              </div>
              {priceInfo?.price_per_servings && (
                <div className="font-inter font-semibold text-[16.92px] leading-[28.5px] tracking-[0] align-middle capitalize text-black">
                  {priceInfo.price_per_servings.toFixed(2)} TL /Servis
                </div>
              )}
            </div>

            {/* Miktar Seçici ve Sepete Ekle Butonu */}
            <div className="flex items-center gap-4 mb-8">
              {/* Miktar Seçici */}
              <div className="flex items-center bg-gray-100 rounded-lg border h-[55px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="grid place-items-center w-[44px] h-full text-gray-600 hover:text-black transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>

                <div className="grid place-items-center px-5 bg-white text-center min-w-[60px] h-full font-inter font-medium">
                  {quantity}
                </div>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="grid place-items-center w-[44px] h-full text-gray-600 hover:text-black transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              {/* Sepete Ekle Butonu */}
              <button 
                onClick={handleAddToCart}
                className="bg-black text-white h-[55px] px-7 rounded-lg font-inter font-bold text-lg uppercase flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors flex-1"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                SEPETE EKLE
              </button>
            </div>

            {/* Değer Önerileri */}
            <div className="grid grid-cols-3 gap-8 pb-5 lg:border-b-2 mb-5">
              {/* Aynı Gün Kargo */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="font-inter font-medium text-black text-sm">
                  Aynı Gün
                </div>
                <div className="font-inter text-black text-sm">
                  Ücretsiz Kargo
                </div>
              </div>

              {/* Mutlu Müşteri */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="font-inter font-medium text-black text-sm">
                  750.000+
                </div>
                <div className="font-inter text-black text-sm">
                  Mutlu Müşteri
                </div>
              </div>

              {/* Memnuniyet Garantisi */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div className="font-inter font-medium text-black text-sm">
                  Memnuniyet
                </div>
                <div className="font-inter text-black text-sm">Garantisi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Bölümü */}
        <div className="order-3 md:order-3 lg:order-4 col-start-1 md:col-start-1 md:row-start-2 lg:col-start-2 lg:row-start-auto lg:row-span-1">
          <div className="mt-0 lg:mt-4">
            <div>
              {accordionItems.map((item, index) => (
                <div
                  key={index}
                  className={index < accordionItems.length - 1 ? "border-b" : ""}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordionIndex(
                        openAccordionIndex === index ? null : index
                      )
                    }
                    className="relative w-full py-4"
                  >
                    <span className="block w-full text-left font-inter font-bold text-[14.63px] leading-[24px] tracking-[0.4px] align-middle text-black">
                      {item.title}
                    </span>
                    <ChevronDownIcon
                      className={`h-5 w-5 text-black transition-transform absolute right-0 top-1/2 -translate-y-1/2 ${
                        openAccordionIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                      openAccordionIndex === index
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div
                      className="pb-4 font-inter font-medium text-[12px] leading-[20px] tracking-[0] align-middle text-gray-700 whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* YORUMLAR BÖLÜMÜ */}
      <Comments variant="product" />

      <Footer />
    </div>
  );
}

// Besin içeriğini HTML formatına çeviren yardımcı fonksiyon
function formatNutritionalContent(content: {
  ingredients: Array<{ aroma: string | null; value: string }>;
  nutrition_facts: {
    ingredients: Array<{ name: string; amounts: string[] }>;
    portion_sizes: string[];
  };
}): string {
  let html = "<div class='space-y-4'>";

  // İçindekiler
  if (content.ingredients && content.ingredients.length > 0) {
    html += "<div><strong>İçindekiler:</strong><br/>";
    html += content.ingredients
      .map((ing) => ing.value)
      .filter(Boolean)
      .join(", ");
    html += "</div>";
  }

  // Besin Değerleri
  if (content.nutrition_facts && content.nutrition_facts.ingredients) {
    html += "<div><strong>Besin Değerleri</strong> (";
    html += content.nutrition_facts.portion_sizes?.join(", ") || "1 porsiyon";
    html += "):<br/><ul class='list-disc pl-4 mt-2'>";
    content.nutrition_facts.ingredients.forEach((item) => {
      html += `<li>${item.name}: ${item.amounts?.join(", ") || "-"}</li>`;
    });
    html += "</ul></div>";
  }

  html += "</div>";
  return html;
}

export default ProductDetails;
