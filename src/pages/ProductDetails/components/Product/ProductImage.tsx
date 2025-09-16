interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage = ({ src, alt }: ProductImageProps) => {
  return (
    <div className="flex justify-center lg:justify-start items-start mb-4 md:mb-0">
      <img
        className="block w-[587px] h-[587px] lg:w-full lg:max-w-[587px] lg:h-auto lg:object-contain lg:self-start"
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default ProductImage;
