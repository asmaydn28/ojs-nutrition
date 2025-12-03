import { useLoaderData } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductImage from "../../components/ProductImg/ProductImage";
import { productimg } from "../../components/ProductImg/ProductImgArray";
import Comments from "../../components/Comments/Comments";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../../components/Footer/Footer";
import StarRating from "../../components/StarRating/StarRating";
import type { APIProduct } from "@/api/products";

// Loader'dan gelen veri tipi
interface HomePageLoaderData {
  bestSellers: APIProduct[];
}

function HomePage() {
  // Loader'dan gelen verileri al
  const { bestSellers } = useLoaderData() as HomePageLoaderData;

  return (
    <>
      {/*Ana sayfadaki büyük resim */}
      <div className="mt-[100px] md:mt-[180px] flex justify-center overflow-hidden">
        <img
          src="/Header/OJS nutrition slider banner 2.png"
          className="w-full h-full object-center md:object-cover transition-transform duration-700 md:scale-100 scale-125"
          alt="ojs"
        />
      </div>

      {/*img cardları */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5
      xl:w-[1200px] lg:w-[1000px] md:w-[750px] sm:w-[600px] w-auto sm:mx-auto mx-4"
      >
        {productimg.map((product) => (
          <ProductImage
            key={product.id}
            title={product.title}
            img={product.img}
            bgColor={product.bgColor}
          />
        ))}
      </div>

      {/* ÇOK SATANLAR Başlığı */}
      <div className="text-center my-8">
        <h2 className="font-inter font-semibold text-[21.5625px] leading-8 text-[#222222]">
          ÇOK SATANLAR
        </h2>
      </div>

      {/* PRODUCT CARDLAR - API'den gelen veriler */}
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 my-5 max-w-7xl gap-4 mx-auto">
        {bestSellers.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {/* ojs nutrition bölümü */}
      <div
        className="relative flex items-center justify-start bg-cover bg-right md:bg-contain md:bg-center max-w-[1920px] mx-auto"
        style={{
          backgroundImage: "url('/Header/ojs-template.png')",
          backgroundRepeat: "no-repeat",
          height: "480px",
        }}
      >
        <div className="2xl:ml-[20%] xl:ml-[17%] lg:ml-[12%] md:ml-[5%] md:mx-0 mx-auto md:mt-0 mt-55">
          <img
            src="/Header/logo-white.svg"
            alt="OJS Nutrition Logo"
            className="object-contain md:w-[253px] md:h-[58px] w-[360px] h-[82px]"
          />
        </div>
      </div>

      {/* Gerçek Müşteri Yorumları Bölümü */}
      <div className="my-5 mx-auto xl:w-[1200px] md:w-[700px] w-auto">
        <div className="border-b-2 flex mx-2 items-center flex-wrap gap-x-2 gap-y-1">
          <div className="me-auto text-base md:text-xl whitespace-nowrap">
            Gerçek Müşteri Yorumları
          </div>
          <StarRating rating={5} size="sm" />
          <div>
            <a
              href="#"
              className="font-inter font-bold text-[11px] md:text-[13.125px] leading-[15px] md:leading-[17px] underline text-[#6A6C77]"
            >
              198453Yorum
            </a>
          </div>
          <div
            className="cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={() => {
              const event = new CustomEvent("nextClick");
              window.dispatchEvent(event);
            }}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </div>
          <div
            className="cursor-pointer hover:bg-gray-100 p-1 rounded"
            onClick={() => {
              const event = new CustomEvent("prevClick");
              window.dispatchEvent(event);
            }}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>
        </div>
        <Comments variant="homepage" />
      </div>

      {/* Footer üstü bilgilendirme */}
      <div className="bg-[#222222] text-white -mb-11 px-5 pb-5">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 gap-8 md:gap-10">
          {/* Üst: yalnızca yıldızlar (cols-1) */}
          <div className="flex items-center justify-start">
            <StarRating rating={5} size="sm" />
            <span className="font-inter font-light text-[18px] md:text-[20.31px] leading-[28px] md:leading-[37.5px] text-white ml-2">
              (140.000+)
            </span>
          </div>

          {/* Alt: içerikler (cols-2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Sol: başlıklar */}
            <div className="space-y-2 text-left">
              <h3 className="font-inter font-medium text-[20px] md:text-[31.17px] leading-[28px] md:leading-[42.7px] tracking-[0.5px] md:tracking-[1px] uppercase">
                LABORATUVAR TESTLİ ÜRÜNLER
              </h3>
              <h3 className="font-inter font-medium text-[20px] md:text-[31.17px] leading-[28px] md:leading-[42.7px] tracking-[0.5px] md:tracking-[1px] uppercase">
                AYNI GÜN & ÜCRETSİZ KARGO
              </h3>
              <h3 className="font-inter font-medium text-[20px] md:text-[31.17px] leading-[28px] md:leading-[42.7px] tracking-[0.5px] md:tracking-[1px] uppercase">
                MEMNUNİYET GARANTİSİ
              </h3>
            </div>

            {/* Sağ: paragraf */}
            <div className="flex items-start">
              <p className="font-inter font-light text-[16px] md:text-[20.31px] leading-[28px] md:leading-[37.5px] text-white md:max-w-xl text-left">
                200.000'den fazla ürün yorumumuza dayanarak, ürünlerimizi
                seveceğinize eminiz. Eğer herhangi bir sebeple memnun kalmazsan,
                bizimle iletişime geçtiğinde çözüme kavuşturacağız.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
