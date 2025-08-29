import { type Product } from "../../../components/ProductCard/ProductArray";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <>
      <h1 className="font-inter font-semibold text-[26.95px] leading-[36px] tracking-[0] align-middle text-black">
        {product.ProductName}
      </h1>

      <h2>{product.ShortDescription}</h2>

      <div className="flex items-center gap-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z"
                fill={i < product.Stars ? "#FDD835" : "#E0E0E0"}
              />
            </svg>
          ))}
        </div>
        <span className="text-black font-medium">
          {product.CommentNumber} Yorum
        </span>
      </div>

      {/* Etiketler */}
      <div className="flex gap-3 mt-4 border-b pb-2">
        <span className="px-3 py-1.5 bg-gray-200 text-black rounded-full font-inter font-normal text-[10.13px] leading-[16px] align-middle">
          VEJETARYEN
        </span>
        <span className="px-3 py-1.5 bg-gray-200 text-black rounded-full font-inter font-normal text-[10.13px] leading-[16px] align-middle">
          GLUTENSİZ
        </span>
      </div>
    </>
  );
};

export default ProductInfo;
