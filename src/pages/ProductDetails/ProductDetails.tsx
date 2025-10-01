import { useParams } from "react-router";
import { useState } from "react";
import { products } from "../../components/ProductCard/ProductArray";

import ProductImage from "./components/Product/ProductImage";
import ProductInfo from "./components/Product/ProductInfo";
import AromaSelector from "./components/Selectors/AromaSelector";
import SizeSelector from "./components/Selectors/SizeSelector";
import PurchasePanel from "./components/Purchase/PurchasePanel";
import ProductAccordion from "./components/Accordion/ProductAccordion";

import { aromas } from "./components/Selectors/aromaData";
import { sizes } from "./components/Selectors/sizeData";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductComments from "./components/ProductComments/ProductComments";
import { commentsData } from "./components/ProductComments/CommentsData";
import Footer from "@/components/Footer/Footer";

function ProductDetails() {
  const { id } = useParams();

  const [selectedAroma, setSelectedAroma] = useState<string>(
    aromas[0]?.name ?? ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]?.id ?? "");
  const [quantity, setQuantity] = useState<number>(1);

  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-red-600 mt-15 text-center">
            Ürün bulunamadı! (ID: {id})
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 md:pt-40 lg:pt-40">
      
      <div className="max-w-6xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-0 md:gap-y-0 lg:gap-y-8 lg:items-start">
        <ProductImage src={product.img} alt={product.ProductName} />

        <div className="flex flex-col lg:h-full order-2 md:order-2 md:col-start-2 md:row-start-1 md:row-span-2">
          <ProductInfo product={product} />
          <AromaSelector
            selectedAroma={selectedAroma}
            setSelectedAroma={setSelectedAroma}
          />
          <SizeSelector
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          <PurchasePanel
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>

        <ProductAccordion />
      </div>


      {/* SON GÖRÜNTÜLENEN ÜRÜNLER Başlığı */}
      <div className="text-center my-8">
        <h2 className="font-inter font-semibold text-[21.5625px] leading-8 text-[#222222]">
          SON GÖRÜNTÜLENEN ÜRÜNLER
        </h2>
      </div>

      {/* PRODUCT CARDLAR */}
      <div className="grid lg:grid-cols-6  md:grid-cols-3 grid-cols-2 my-5 max-w-7xl gap-4 mx-auto">
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

      {/* YORUMLAR BÖLÜMÜ */}
      <ProductComments comments={commentsData} />

      {/* ÇOK SATANLAR Başlığı */}
      <div className="text-center mt-20">
        <h2 className="font-inter font-semibold text-[21.5625px] leading-8 text-[#222222]">
          ÇOK SATANLAR
        </h2>
      </div>

      {/* PRODUCT CARDLAR */}
      <div
        className="grid lg:grid-cols-6  md:grid-cols-3 grid-cols-2 my-5 max-w-7xl gap-4 mx-auto"
      >
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

      <Footer/>
    </div>
  );
}

export default ProductDetails;
