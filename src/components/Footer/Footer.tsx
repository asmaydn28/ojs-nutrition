
import { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';

function Footer() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="bg-[#222222] text-white pt-3">
      

      {/* Mobile link tasarımı md altı */}
      <div className="md:hidden max-w-md px-4 py-6" aria-label="Footer mobile accordions">
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
                <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">İletişim</Link></li>
                <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Hakkımızda</Link></li>
                <li><Link to="/faq" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Sıkça Sorulan Sorular</Link></li>
                <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">KVKK</Link></li>
                <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Çalışma İlkelerimiz</Link></li>
                <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Satış Sözleşmesi</Link></li>
                <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Garanti ve İade Koşulları</Link></li>
                <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Gerçek Müşteri Yorumları</Link></li>
                <li><Link to="/" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Blog</Link></li>
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
            <span className="font-inter font-medium uppercase text-white text-[17.97px] leading-[28px] tracking-[0] align-middle">KATEGORİLER</span>
          </button>
          <div
            aria-hidden={activeIndex !== 1}
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${activeIndex === 1 ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="pb-3">
              <ul className="space-y-1">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Protein</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Spor Gıdaları</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Sağlık</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Gıda</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Vitamin</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Aksesuar</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Tüm Ürünler</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Paketler</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Lansmana Özel Fİyatlar</a></li>
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
            <span className="font-inter font-medium uppercase text-white text-[17.97px] leading-[28px] tracking-[0] align-middle">POPÜLER ÜRÜNLER</span>
          </button>
          <div
            aria-hidden={activeIndex !== 2}
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${activeIndex === 2 ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="pb-3">
              <ul className="space-y-1">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Whey Protein</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Cream of Rice</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Creatine</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">BCAA</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Pre-Workout</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Fitness Paketi</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Collagen</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">Günlük Vitamin Paketi</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors text-[13px] leading-[20px]">ZMA</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop md üstünde */}
      <div className="hidden md:grid w-full md:grid-cols-3 md:gap-x-12 lg:gap-x-20 xl:gap-x-24 md:gap-y-0 max-w-5xl mx-auto mt-6 md:mt-8 lg:mt-10 px-4 md:px-6" aria-label="Footer link columns">
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center md:h-5 lg:h-6">
            <img src="/Header/logo-white.svg" alt="OJS Nutrition" className="md:h-5 lg:h-6" />
          </div>
          <ul className="md:space-y-1.5 lg:space-y-2">
            <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">İletişim</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Hakkımızda</Link></li>
            <li><Link to="/faq" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Sıkça Sorulan Sorular</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">KVKK</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Çalışma İlkelerimiz</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Satış Sözleşmesi</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Garanti ve İade Koşulları</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Gerçek Müşteri Yorumları</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Blog</Link></li>
          </ul>
        </div>

        <div className="space-y-2 md:space-y-3">
          <h4 className="font-inter font-medium uppercase text-white/90 md:text-[12px] md:leading-[20px] md:tracking-[1px] lg:text-[14px] lg:leading-[24px] lg:tracking-[1.2px]">KATEGORİLER</h4>
          <ul className="md:space-y-1.5 lg:space-y-2">
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Protein</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Spor Gıdaları</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Sağlık</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Gıda</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Vitamin</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Aksesuar</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Tüm Ürünler</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Paketler</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Lansmana Özel Fırsatlar</a></li>
          </ul>
        </div>

        <div className="space-y-2 md:space-y-3">
          <h4 className="font-inter font-medium uppercase text-white/90 md:text-[12px] md:leading-[20px] md:tracking-[1px] lg:text-[14px] lg:leading-[24px] lg:tracking-[1.2px]">POPÜLER ÜRÜNLER</h4>
          <ul className="md:space-y-1.5 lg:space-y-2">
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Whey Protein</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Cream of Rice</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Creatine</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">BCAA</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Pre-Workout</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Fitness Paketi</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Collagen</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">Günlük Vitamin Paketi</a></li>
            <li><a href="#" className="text-white/80 hover:text-white transition-colors md:text-[12px] md:leading-[20px] lg:text-[14px] lg:leading-[24px]">ZMA</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 text-center">
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
