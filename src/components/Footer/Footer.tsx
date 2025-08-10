
import { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

function Footer() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="bg-[#222222] text-white">
      <div className="grid grid-cols-1 gap-4 p-4 md:p-6 max-w-5xl mx-auto">
        {/* Stars and Rating - Top Section */}
        <div className="flex items-center justify-center md:justify-start">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block"
            >
              <path
                d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z"
                fill="#FFD700"
              />
            </svg>
          ))}
          <span className="font-inter font-light text-[20.31px] leading-[37.5px] align-middle text-white ml-1">(140.000+)</span>
        </div>

        {/* Content Section - Headings and Paragraph side by side */}
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
          {/* Main Headings */}
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-inter font-medium text-[20px] md:text-[31.17px] leading-[28px] md:leading-[42.7px] tracking-[0.5px] md:tracking-[1px] uppercase align-middle">
              LABORATUVAR TESTLİ ÜRÜNLER
            </h3>
            <h3 className="font-inter font-medium text-[20px] md:text-[31.17px] leading-[28px] md:leading-[42.7px] tracking-[0.5px] md:tracking-[1px] uppercase align-middle">
              AYNI GÜN & ÜCRETSİZ KARGO
            </h3>
            <h3 className="font-inter font-medium text-[20px] md:text-[31.17px] leading-[28px] md:leading-[42.7px] tracking-[0.5px] md:tracking-[1px] uppercase align-middle">
              MEMNUNİYET GARANTİSİ
            </h3>
          </div>

          {/* Paragraph Text */}
          <div className="flex items-start justify-center md:justify-start">
            <p className="font-inter font-light text-[16px] md:text-[20.31px] leading-[28px] md:leading-[37.5px] tracking-[0px] align-middle text-white max-w-sm md:max-w-md text-center md:text-left">
              200.000'den fazla ürün yorumumuza dayanarak,<br className="hidden md:block" />
              ürünlerimizi seveceğinize eminiz. Eğer herhangi<br className="hidden md:block" />
              bir sebeple memnun kalmazsan, bizimle iletişime<br className="hidden md:block" />
              geçtiğinde çözüme kavuşturacağız.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile accordion (only visible below md) */}
      <div className="md:hidden max-w-md px-4 pb-6" aria-label="Footer mobile accordions">
        {/* Logo on top */}
        <div className="w-full flex justify-start pt-2 pb-4">
          <img src="/Header/logo-white.svg" alt="OJS Nutrition" className="h-6" />
        </div>

        <div>
          {/* Item 1 */}
          <button
            type="button"
            onClick={() => setActiveIndex(activeIndex === 0 ? null : 0)}
            aria-expanded={activeIndex === 0}
            className="w-full flex items-center justify-start gap-3 py-4"
          >
            {activeIndex === 0 ? (
              <MinusIcon className="h-[18px] w-[18px] text-white" />
            ) : (
              <PlusIcon className="h-[18px] w-[18px] text-white" />
            )}
            <span className="font-inter font-medium uppercase text-white text-[17.97px] leading-[28px] tracking-[0] align-middle">OJS NUTRITION</span>
          </button>
          <div
            aria-hidden={activeIndex !== 0}
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${activeIndex === 0 ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="pb-3">
              <ul className="space-y-1">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Hakkımızda</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Kalite Politikamız</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Kariyer</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Basın Bültenleri</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">İletişim</a></li>
              </ul>
            </div>
          </div>

          {/* Item 2 */}
          <button
            type="button"
            onClick={() => setActiveIndex(activeIndex === 1 ? null : 1)}
            aria-expanded={activeIndex === 1}
            className="w-full flex items-center justify-start gap-3 py-4"
          >
            {activeIndex === 1 ? (
              <MinusIcon className="h-[18px] w-[18px] text-white" />
            ) : (
              <PlusIcon className="h-[18px] w-[18px] text-white" />
            )}
            <span className="font-inter font-medium uppercase text-white text-[17.97px] leading-[28px] tracking-[0] align-middle">MÜŞTERİ HİZMETLERİ</span>
          </button>
          <div
            aria-hidden={activeIndex !== 1}
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${activeIndex === 1 ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="pb-3">
              <ul className="space-y-1">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Siparişlerim</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Kargo Takip</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">İade & Değişim</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Sıkça Sorulan Sorular</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Ödeme Seçenekleri</a></li>
              </ul>
            </div>
          </div>

          {/* Item 3 */}
          <button
            type="button"
            onClick={() => setActiveIndex(activeIndex === 2 ? null : 2)}
            aria-expanded={activeIndex === 2}
            className="w-full flex items-center justify-start gap-3 py-4"
          >
            {activeIndex === 2 ? (
              <MinusIcon className="h-[18px] w-[18px] text-white" />
            ) : (
              <PlusIcon className="h-[18px] w-[18px] text-white" />
            )}
            <span className="font-inter font-medium uppercase text-white text-[17.97px] leading-[28px] tracking-[0] align-middle">POPÜLER KATEGORİLER</span>
          </button>
          <div
            aria-hidden={activeIndex !== 2}
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${activeIndex === 2 ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="pb-3">
              <ul className="space-y-1">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Protein Tozları</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Amino Asit</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Kreatin</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Vitamin & Mineral</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Sporcu Aksesuarları</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:grid w-full md:grid-cols-3 md:gap-x-12 lg:gap-x-20 xl:gap-x-24 md:gap-y-0 max-w-5xl mx-auto mt-6 md:mt-8 lg:mt-10 px-4 md:px-6" aria-label="Footer link columns">
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center md:h-5 lg:h-6">
            <img src="/Header/logo-white.svg" alt="OJS Nutrition" className="md:h-5 lg:h-6" />
          </div>
          <ul className="md:space-y-1.5 lg:space-y-2">
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Hakkımızda</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Kalite Politikamız</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Kariyer</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Basın Bültenleri</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">İletişim</a></li>
          </ul>
        </div>

        <div className="space-y-2 md:space-y-3">
          <h4 className="font-inter font-medium uppercase text-white/90 md:text-[12px] md:leading-[20px] md:tracking-[1px] lg:text-[14px] lg:leading-[24px] lg:tracking-[1.2px]">KATEGORİLER</h4>
          <ul className="md:space-y-1.5 lg:space-y-2">
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Siparişlerim</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Kargo Takip</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">İade & Değişim</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Sıkça Sorulan Sorular</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Ödeme Seçenekleri</a></li>
          </ul>
        </div>

        <div className="space-y-2 md:space-y-3">
          <h4 className="font-inter font-medium uppercase text-white/90 md:text-[12px] md:leading-[20px] md:tracking-[1px] lg:text-[14px] lg:leading-[24px] lg:tracking-[1.2px]">POPÜLER ÜRÜNLER</h4>
          <ul className="md:space-y-1.5 lg:space-y-2">
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Protein Tozları</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Amino Asit</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Kreatin</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Vitamin & Mineral</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Sporcu Aksesuarları</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 text-center">
        <p className="font-inter font-normal text-white/70 text-[10.13px] leading-[16px] tracking-[0] align-middle">
          © {new Date().getFullYear()} Tüm hakları saklıdır 
          <a
            href="https://asimaydin.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white underline-offset-2 hover:underline ml-1"
          >
            Asım Aydın
          </a>
        </p>
      </div>
      
    </div>
  )
}

export default Footer
