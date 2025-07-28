import type { Product } from "./ProductArray";

function ProductCard({ProductName, img, ShortDescription, CommentNumber, Stars, Price,DiscountedPrice,
  }: Product) {
    return (
      <div className="w-[200px] bg-white rounded-xl flex flex-col items-center p-4 shadow-md mx-auto">
        {/* Ürün görseli */}
        <div className="w-[168px] h-[168px] rounded-lg overflow-hidden mb-4">
          <img
            src={img}
            alt={ProductName}
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Ürün ismi */}
        <div className="w-full flex justify-center mb-1">
          <span className="font-inter font-semibold text-[16px] leading-[18px] text-black text-center">
            {ProductName}
          </span>
        </div>
  
        {/* Kısa açıklama */}
        <div className="w-full flex justify-center mb-2">
          <span className="font-inter font-medium text-[11px] leading-[16px] text-gray-500 text-center">
            {ShortDescription}
          </span>
        </div>
  
        {/* Yıldızlar */}
        <div className="flex justify-center mb-2">
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
  
        {/* Fiyatlar */}
        <div className="w-full flex justify-center items-center gap-2 mt-1">
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
    );
  }
  
  export default ProductCard;