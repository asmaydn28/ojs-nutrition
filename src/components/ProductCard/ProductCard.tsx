import { Link } from "react-router-dom";
import type { APIProduct } from "@/api/products";
import { getProductImageUrl } from "@/api/products";
import StarRating from "../StarRating/StarRating";
import { COLORS } from "@/utils/constants";

interface ProductCardProps {
  product: APIProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const {
    slug,
    name,
    photo_src,
    short_explanation,
    comment_count,
    average_star,
    price_info,
  } = product;

  const imageUrl = getProductImageUrl(photo_src);
  const hasDiscount = !!price_info.discounted_price;
  const discountPercentage = price_info.discount_percentage;

  return (
    <Link to={`/product/${slug}`} className="block cursor-pointer">
      <div className="lg:w-[200px] md:w-[242px] w-[179px] h-[320px] rounded-xl flex flex-col items-center mx-auto my-9 group relative">
        {/* İndirim Badge'i - Conditional Rendering */}
        {hasDiscount && discountPercentage && (
          <div className="absolute -top-6 right-0 w-[60px] h-[50px] text-white text-xs font-bold flex flex-col items-center justify-center z-10 group-hover:scale-85 duration-200 transition-transform" style={{ backgroundColor: COLORS.discount }}>
            <span>%{Math.round(discountPercentage)}</span>
            <span>İNDİRİM</span>
          </div>
        )}

        {/* Ürün görseli*/}
        <div className="w-[168px] h-[168px] mb-4 group-hover:scale-105 duration-200 transition-transform overflow-hidden flex items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="w-[168px] h-[168px] object-cover"
          />
        </div>

        {/* Ürün ismi */}
        <div className="w-full h-9 flex justify-center items-center mb-1">
          <span className="font-inter font-semibold text-[16px] leading-[18px] text-black text-center">
            {name}
          </span>
        </div>

        {/* Kısa açıklama */}
        <div className="w-full h-8 flex justify-center items-center mb-2">
          <span className="font-inter font-medium text-[11px] leading-[16px] text-gray-500 text-center">
            {short_explanation}
          </span>
        </div>

        {/* Yıldızlar ve Yorum */}
        <div className="w-full flex justify-center mb-1">
          <StarRating
            rating={average_star}
            size="lg"
            showCount
            commentCount={comment_count}
            className="justify-center"
          />
        </div>

        {/* Fiyatlar - Conditional Rendering */}
        <div className="w-full h-8 flex justify-center items-center gap-2 mt-auto">
          {hasDiscount ? (
            <>
              <span className="font-inter font-normal text-[19.5px] leading-[32px] text-red-600 text-center">
                {price_info.discounted_price} TL
              </span>
              <span className="font-inter font-normal text-[16px] leading-[32px] text-gray-400 line-through text-center">
                {price_info.total_price} TL
              </span>
            </>
          ) : (
            <span className="font-inter font-normal text-[19.5px] leading-[32px] text-black text-center">
              {price_info.total_price} TL
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
