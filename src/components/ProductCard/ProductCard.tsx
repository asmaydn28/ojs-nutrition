import type { Product } from "./ProductArray";

function ProductCard({
  id,
  ProductName,
  img,
  ShortDescription,
  CommentNumber,
  Stars,
  Price,
  DiscountedPrice,
}: Product) {
  return (
    <>
        <a href={`/product/${id}`} className="block cursor-pointer">
          <div className="lg:w-[200px] md:w-[242px] w-[179px] h-[320px]
          rounded-xl flex flex-col items-center mx-auto my-9 group relative">
            {/* İndirim Badge'i - Sadece indirimli ürünlerde görünür */}
            {DiscountedPrice && (
              <div className="absolute -top-6 right-0 w-[60px] h-[50px] bg-[#ED2727] text-white text-xs font-bold flex flex-col items-center justify-center z-10 group-hover:scale-85 duration-200 transition-transform">
                <span>%{Math.round(((parseFloat(Price.toString().replace(' TL', '')) - parseFloat(DiscountedPrice.toString().replace(' TL', ''))) / parseFloat(Price.toString().replace(' TL', ''))) * 100)}</span>
                <span>İNDİRİM</span>
              </div>
            )}
            {/* Ürün görseli */}
          <div className="w-[168px] h-[168px] overflow-hidden mb-4 group-hover:scale-105 duration-200 transition-transform flex items-center justify-center">
            <img
              src={img}
              alt={ProductName}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Ürün ismi */}
          <div className="w-full h-9 flex justify-center items-center mb-1">
            <span className="font-inter font-semibold text-[16px] leading-[18px] text-black text-center">
              {ProductName}
            </span>
          </div>

          {/* Kısa açıklama */}
          <div className="w-full h-8 flex justify-center items-center mb-2">
            <span className="font-inter font-medium text-[11px] leading-[16px] text-gray-500 text-center">
              {ShortDescription}
            </span>
          </div>

          {/* Yıldızlar */}
          <div className="flex justify-center items-center h-7 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M14 2L17.09 9.26L25 10.27L18.5 15.97L20.18 23.72L14 19.77L7.82 23.72L9.5 15.97L3 10.27L10.91 9.26L14 2Z"
                  fill={i < Stars ? "#FDD835" : "#E0E0E0"}
                />
              </svg>
            ))}
          </div>

          {/* Yorum sayısı */}
          <div className="w-full flex justify-center mb-1">
            <span className="font-inter font-medium text-[13px] leading-[17px] text-[#333] text-center">
              {CommentNumber} Yorum
            </span>
          </div>

          {/* Fiyatlar - Sabit yükseklik ve alta sabitleme */}
          <div className="w-full h-8 flex justify-center items-center gap-2 mt-auto">
            {DiscountedPrice ? (
              <>
                <span className="font-inter font-normal text-[19.5px] leading-[32px] text-red-600 text-center">
                  {DiscountedPrice}
                </span>
                <span className="font-inter font-normal text-[16px] leading-[32px] text-gray-400 line-through text-center">
                  {Price}
                </span>
              </>
            ) : (
              <span className="font-inter font-normal text-[19.5px] leading-[32px] text-black text-center">
                {Price}
              </span>
            )}
          </div>
        </div>
        </a>
    </>
  );
}

export default ProductCard;
