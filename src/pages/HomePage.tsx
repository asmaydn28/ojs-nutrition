import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "../components/ProductCard/ProductArray";
import ProductImage from "@/components/ProductImg/ProductImage";
import { productimg } from "@/components/ProductImg/ProductImgArray";

function HomePage() {
  return (
    <>
      {/*Ana sayfadaki büyük resim */}
      <div className="-mt-0.5 flex justify-center overflow-hidden">
        <img
          src="../../public/Header/OJS nutrition slider banner 2.png"
          className="w-full h-full object-center md:object-cover transition-transform duration-700 md:scale-100 scale-125"
          alt="ojs"
        />
      </div>

      {/*img cardları */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5
      xl:w-[1200px] lg:w-[1000px] md:w-[750px] sm:w-[600px] w-auto sm:mx-auto mx-4">
        {productimg.map((product) => (
            <ProductImage
              id={product.id}
              title={product.title}
              img={product.img}
              bgColor={product.bgColor}
              left={product.left}
            />
        ))}
      </div>

      <div className="grid lg:grid-cols-6  md:grid-cols-3 grid-cols-2 mt-5">
          {products.map((product) => (
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
          ))}
      </div>
    </>
  );
}

export default HomePage;
