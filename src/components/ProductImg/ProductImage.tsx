import type { ProductImg } from "./ProductImgArray";
import { Link } from "react-router";

function ProductImage({title, img, bgColor}: ProductImg) {
  return (
    <>
      <Link to={`/products/${encodeURIComponent(title.toLowerCase())}`} className="hover:scale-105 duration-300">
      <div style={{backgroundColor: bgColor}} className="flex rounded-[10px] relative
      xl:w-[385px] lg:w-[330px] md:w-[245px] sm:w-[300px] w-auto mx-2 sm:mx-0 h-[157px]
      "> 
        <div>
          <img src={img} alt="img" className="w-full h-full rounded-[10px] object-cover" />
        </div>
        <div className="absolute bottom-5 right-3 sm:right-10 md:right-5 lg:right-3 xl:right-5 flex flex-col items-center">
          <div
            className="
              font-inter font-black
              lg:text-[28px]
              md:text-[19px] mb-3
              sm:text-[19px]
              text-[15px]
            "
          >{title === "SPOR GIDALARI" ? (
          <>
            <span>SPOR</span>
            <br />
            <span>GIDALARI</span>
          </>
          ):(title)}</div>
          <div className="
            bg-black text-white
            font-inter font-black text-[11px] md:text-[9px] lg:text-[18px]
            align-middle h-[34px] rounded-[10px] 
            lg:w-[140px] md:w-[97px] sm:w-[110] w-[73px] flex items-center justify-center
          ">İNCELE</div>
        </div>
      </div>
      </Link>
      
    </>
  );
}

export default ProductImage;
