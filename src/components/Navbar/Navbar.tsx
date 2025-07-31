import FoodDropdown from "./NavbarCenter/FoodDropdown.tsx";
import HealthDropdown from "./NavbarCenter/HealthDropdown.tsx";
import ProteinDropdown from "./NavbarCenter/ProteinDropdown.tsx";
import SportsDropdown from "./NavbarCenter/SportsDropdown.tsx";
import VitaminDropdown from "./NavbarCenter/VitaminDropdown.tsx";
import AccessoryDropdown from "./NavbarCenter/AccessoryDropdown.tsx";
import NavbarBottom from "./NavbarBottom/NavbarBottom.tsx";
import SearchInput from "./NavbarTop/SearchInput.tsx";
import Dropdown from "./NavbarTop/Dropdowns";
import CartButton from "./NavbarTop/CartButton";
import { useState } from 'react';
import { Menu, X, ChevronRight, ChevronLeft } from 'lucide-react';

// mobileDropdowns verisini dosya içine ekliyorum
const mobileDropdowns = {
  "PROTEİN": [
    {
      title: "PROTEİNLER",
      links: [
        { label: "Whey Protein", href: "/protein/whey-protein" },
        { label: "Whey İzole", href: "/protein/whey-izole" },
        { label: "Clear Whey", href: "/protein/clear-whey" },
        { label: "Bezelye Proteini", href: "/protein/bezelye-proteini" },
        { label: "Kolajen Proteini", href: "/protein/kolajen-proteini" },
        { label: "Süt Proteini", href: "/protein/sut-proteini" },
        { label: "Soya Proteini", href: "/protein/soya-proteini" },
      ],
    },
    {
      title: "PROTEİNLİ ÜRÜNLER",
      links: [
        { label: "Mass Gainer", href: "/protein/mass-gainer" },
        { label: "Protein Bar", href: "/protein/protein-bar" },
        { label: "Protein Meal (Öğün Tozu)", href: "/protein/protein-meal" },
        { label: "Protein Coffee", href: "/protein/protein-coffee" },
        { label: "Collagen Coffee", href: "/protein/collagen-coffee" },
        { label: "Vegan Gainer", href: "/protein/vegan-gainer" },
      ],
    },
  ],
  "SPOR GIDALARI": [
    {
      title: "AMİNO ASİTLER",
      links: [
        { label: "Creatine", href: "/spor/amino/creatine" },
        { label: "L-Carnitine", href: "/spor/amino/l-carnitine" },
        { label: "Creatine Creapure", href: "/spor/amino/creatine-creapure" },
        { label: "BCAA", href: "/spor/amino/bcaa" },
        { label: "Glutamine", href: "/spor/amino/glutamine" },
        { label: "EAA", href: "/spor/amino/eaa" },
        { label: "Arginine", href: "/spor/amino/arginine" },
        { label: "Taurine", href: "/spor/amino/taurine" },
      ],
    },
    {
      title: "DİĞER",
      links: [
        { label: "Ultra Focus", href: "/spor/diger/ultra-focus" },
        { label: "Gamer Hack", href: "/spor/diger/gamer-hack" },
        { label: "Intra Workout", href: "/spor/diger/intra-workout" },
        { label: "Elektrolit Blend", href: "/spor/diger/elektrolit-blend" },
        { label: "Hydration", href: "/spor/diger/hydration" },
        { label: "CLA", href: "/spor/diger/cla" },
        { label: "Protein Meal (Öğün Tozu)", href: "/spor/diger/protein-meal" },
      ],
    },
  ],
  "SAĞLIK": [
    {
      title: "FONKSİYONEL GIDALAR",
      links: [
        { label: "Collagen", href: "/saglik/fonksiyonel/collagen" },
        { label: "Deep Sleep", href: "/saglik/fonksiyonel/deep-sleep" },
        { label: "Protein Coffee", href: "/saglik/fonksiyonel/protein-coffee" },
        { label: "Protein Meal (Öğün Tozu)", href: "/saglik/fonksiyonel/protein-meal" },
        { label: "Prebiyotik", href: "/saglik/fonksiyonel/prebiyotik" },
        { label: "Collagen Coffee", href: "/saglik/fonksiyonel/collagen-coffee" },
        { label: "Digestion", href: "/saglik/fonksiyonel/digestion" },
        { label: "Tatlandırıcı", href: "/saglik/fonksiyonel/tatlandirici" },
        { label: "Mct Oil", href: "/saglik/fonksiyonel/mct-oil" },
        { label: "Inulin", href: "/saglik/fonksiyonel/inulin" },
      ],
    },
    {
      title: "BİTKİ TOZLARI",
      links: [
        { label: "Greens & Superfoods", href: "/saglik/bitki/greens-superfoods" },
        { label: "Green Detox", href: "/saglik/bitki/green-detox" },
        { label: "Red Detox", href: "/saglik/bitki/red-detox" },
        { label: "Brokoli Tozu", href: "/saglik/bitki/brokoli-tozu" },
        { label: "Maca Kökü Tozu", href: "/saglik/bitki/maca-koku-tozu" },
        { label: "Spirulina Tozu", href: "/saglik/bitki/spirulina-tozu" },
        { label: "Ispanak Tozu", href: "/saglik/bitki/ispanak-tozu" },
        { label: "Maydanoz Tozu", href: "/saglik/bitki/maydanoz-tozu" },
      ],
    },
    {
      title: "ZAYIFLAMA",
      links: [
        { label: "L-Carnitine", href: "/saglik/zayiflama/l-carnitine" },
        { label: "Thermo Burner", href: "/saglik/zayiflama/thermo-burner" },
        { label: "L-Carnitine Shot", href: "/saglik/zayiflama/l-carnitine-shot" },
        { label: "CLA", href: "/saglik/zayiflama/cla" },
        { label: "Hunger Buster", href: "/saglik/zayiflama/hunger-buster" },
        { label: "CLA+", href: "/saglik/zayiflama/cla-plus" },
      ],
    },
  ],
  "GIDA": [
    {
      title: "GIDA ÜRÜNLERİ",
      links: [
        { label: "Pirinç Kreması", href: "/gida/pirinc-kremasi" },
        { label: "Protein Bar", href: "/gida/protein-bar" },
        { label: "Fıstık Ezmeleri", href: "/gida/fistik-ezmeleri" },
        { label: "Düşük Kalorili Soslar", href: "/gida/dusuk-kalorili-soslar" },
        { label: "Baharatlar", href: "/gida/baharatlar" },
        { label: "Tatlandırıcılar", href: "/gida/tatlandiricilar" },
        { label: "Sprey Zeytinyağı", href: "/gida/sprey-zeytinyagi" },
      ],
    },
  ],
  "VİTAMİN": [
    {
      title: "ÖZEL FORMÜL ÜRÜNLER",
      links: [
        { label: "Thermo Burner", href: "/vitamin/ozel-formul/thermo-burner" },
        { label: "LVR", href: "/vitamin/ozel-formul/lvr" },
        { label: "KDNY", href: "/vitamin/ozel-formul/kdny" },
        { label: "T-Prime", href: "/vitamin/ozel-formul/t-prime" },
        { label: "Hunger Buster", href: "/vitamin/ozel-formul/hunger-buster" },
        { label: "Beauty Formula", href: "/vitamin/ozel-formul/beauty-formula" },
        { label: "Relax", href: "/vitamin/ozel-formul/relax" },
        { label: "Focus Formula", href: "/vitamin/ozel-formul/focus-formula" },
      ],
    },
    {
      title: "VİTAMİNLER",
      links: [
        { label: "C Vitamini", href: "/vitamin/vitaminler/c-vitamini" },
        { label: "B Vitamini", href: "/vitamin/vitaminler/b-vitamini" },
        { label: "D Vitamini", href: "/vitamin/vitaminler/d-vitamini" },
        { label: "K Vitamini", href: "/vitamin/vitaminler/k-vitamini" },
      ],
    },
    {
      title: "MİNERALLER",
      links: [
        { label: "Magnezyum", href: "/vitamin/mineraller/magnezyum" },
        { label: "Demir", href: "/vitamin/mineraller/demir" },
        { label: "Krom", href: "/vitamin/mineraller/krom" },
        { label: "Selenyum", href: "/vitamin/mineraller/selenyum" },
      ],
    },
    {
      title: "BİTKİSEL ÜRÜNLER",
      links: [
        { label: "Green Detox", href: "/vitamin/bitkisel/green-detox" },
        { label: "Milk Thistle", href: "/vitamin/bitkisel/milk-thistle" },
        { label: "Tribulus Terrestris", href: "/vitamin/bitkisel/tribulus-terrestris" },
        { label: "Saw Palmetto", href: "/vitamin/bitkisel/saw-palmetto" },
        { label: "L-Theanine", href: "/vitamin/bitkisel/l-theanine" },
        { label: "Panax Ginseng", href: "/vitamin/bitkisel/panax-ginseng" },
        { label: "5-HTP", href: "/vitamin/bitkisel/5-htp" },
        { label: "L-Tyrosine", href: "/vitamin/bitkisel/l-tyrosine" },
        { label: "Rhodiola Rosea", href: "/vitamin/bitkisel/rhodiola-rosea" },
      ],
    },
  ],
  "AKSESUAR": [
    {
      title: "AKSESUAR",
      links: [
        { label: "Termal Korse", href: "/aksesuar/termal-korse" },
        { label: "Wrist Wraps (Bilek Sargısı)", href: "/aksesuar/wrist-wraps" },
        { label: "Lifting Straps", href: "/aksesuar/lifting-straps" },
        { label: "Tișörtler", href: "/aksesuar/tisortler" },
        { label: "Relentless Shaker", href: "/aksesuar/relentless-shaker" },
        { label: "Pocket Shaker", href: "/aksesuar/pocket-shaker" },
        { label: "Pillbox", href: "/aksesuar/pillbox" },
        { label: "Huni", href: "/aksesuar/huni" },
        { label: "Proteinocean Havlu", href: "/aksesuar/proteinocean-havlu" },
      ],
    },
  ],
};

function Navbar() {
  // SubmenuKey tipini güncelliyorum
  type SubmenuKey = keyof typeof mobileDropdowns | null | string;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submenu, setSubmenu] = useState<SubmenuKey>(null);
  return (
    <header className="fixed top-0 left-0 w-full bg-white font-inter z-50">
      {/* Overlay ve Drawer */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300"
            onClick={() => {
              setMobileOpen(false);
              setSubmenu(null);
            }}
          />
          {/* Drawer */}
          <nav
            className="fixed top-0 left-0 h-full w-[320px] max-w-[90vw] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 transform translate-x-0 animate-slide-in"
            style={{ boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.2)' }}
          >
            {/* Kapat Butonu */}
            <button
              className="absolute top-5 right-5 p-2 z-10"
              aria-label="Menüyü Kapat"
              onClick={() => {
                setMobileOpen(false);
                setSubmenu(null);
              }}
            >
              <X className="w-8 h-8 text-black" />
            </button>
            {/* Ana Menü veya Alt Menü */}
            {!submenu && (
              <div className="flex flex-col pt-16 pb-0 h-full">
                {['PROTEİN','SPOR GIDALARI','SAĞLIK','GIDA','VİTAMİN','AKSESUAR'].map((item) => (
                  <div
                    key={item}
                    className="relative h-12 flex items-center font-inter font-semibold text-black text-base pl-8 pr-12 cursor-pointer select-none hover:bg-gray-100 transition"
                    style={{lineHeight:'40px'}}
                    onClick={() => mobileDropdowns[item as keyof typeof mobileDropdowns] ? setSubmenu(item) : null}
                  >
                    {item}
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <ChevronRight className="w-[26px] h-[26px] border-2 border-black rounded-full p-1" />
                    </span>
                  </div>
                ))}
                {/* Gri alan ve alt linkler, menüden sonra ve drawer'ın kalanını kaplayacak şekilde */}
                <div className="flex-1 bg-[#E5E5E5] w-full py-4 px-8 flex flex-col justify-start">
                  <a href="/hesabim" className="font-inter font-medium text-[13.75px] text-black mb-2 transition-colors hover:text-blue-600">HESABIM</a>
                  <a href="/musteri-yorumlari" className="font-inter font-medium text-[13.75px] text-black mb-2 transition-colors hover:text-blue-600">MÜŞTERİ YORUMLARI</a>
                  <a href="/iletisim" className="font-inter font-medium text-[13.75px] text-black transition-colors hover:text-blue-600">İLETİŞİM</a>
                </div>
              </div>
            )}
            {/* Alt Menü (ör. PROTEİN) */}
            {submenu && (
              <div className="flex flex-col h-full bg-white pt-8">
                <div className="flex items-center px-4 mb-4">
                  <button onClick={() => setSubmenu(null)} className="mr-2">
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <span className="font-bold text-lg">{typeof submenu === 'string' ? submenu : ''}</span>
                </div>
                <div className="flex flex-col gap-6 px-8 overflow-y-auto pb-8">
                  {typeof submenu === 'string' && (mobileDropdowns[submenu as keyof typeof mobileDropdowns] || []).map((section: { title: string; links: { label: string; href: string }[] }, idx: number) => (
                    <div key={idx}>
                      <div className="font-bold mb-2 text-[15px]">{section.title}</div>
                      {section.links.map((link: { label: string; href: string }, i: number) => (
                        <a key={i} href={link.href} className="block text-gray-700 py-1 text-[15px] font-inter hover:text-blue-600 transition-colors">{link.label}</a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </>
      )}
      {/* Üst Header */}
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row h-auto md:h-[94px] items-center gap-2 md:gap-4 px-4 sm:px-6 md:px-8 lg:px-12 w-full">
        {/* Mobil Header */}
        <div className="relative flex md:hidden items-center justify-between w-full h-[55px]">
          {/* Hamburger */}
          <button
            className="p-2 mr-2"
            aria-label="Menüyü Aç"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-7 h-7 text-black" />
          </button>
          {/* Logo (tam ortada, absolute) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <img
              src="/Header/LOGO_Siyah.png"
              alt="OJS Nutrition Logo"
              className="h-[30px] w-auto max-w-[141px]"
            />
          </div>
          {/* Cart Icon (sadece ikon ve kırmızı 0) */}
          <button className="w-9 h-9 flex items-center justify-center">
            {/* Modern ve şık sepet ikonu (ör. Lucide/Tabler) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#222]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h15l-1.5 9h-13z" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            <span className="ml-1 text-[#ED2727] text-[16px] font-bold leading-4">0</span>
          </button>
        </div>
        {/* Masaüstü/Tablet Header */}
        <div className="hidden md:flex w-full items-center">
          <div className="flex-shrink-0 md:mr-8 flex justify-center md:justify-start w-full md:w-auto py-2 md:py-0">
            <img src="/Header/LOGO_Siyah.png" alt="Logo" className="h-[38px] w-auto" style={{width:171}} />
          </div>
          <div className="flex flex-col md:flex-row flex-1 items-center gap-2 md:gap-2 justify-end w-full">
            <div className="w-full max-w-[350px] md:mr-2">
              <SearchInput />
            </div>
            <Dropdown />
            <CartButton />
          </div>
        </div>
      </div>
      {/* Mobil Search Bar */}
      <div className="md:hidden w-full px-0 pb-2 bg-black flex items-center justify-center">
        <form className="relative w-full flex items-center justify-center mt-2">
          <div className="w-full h-[36px] bg-[#F3F3F3] rounded-full flex items-center px-4">
            {/* Modern ve şık büyüteç ikonu */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#333] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="ARADIĞINIZ ÜRÜNÜ YAZINIZ."
              className="flex-1 bg-transparent border-none outline-none text-[13px] placeholder:text-[#333] font-inter h-[18px] leading-4"
              style={{ fontWeight: 400 }}
            />
          </div>
        </form>
      </div>
      {/* Menü */}
      <nav className="w-full bg-[#222222] md:block hidden">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center md:justify-between px-2 sm:px-4 md:px-8 h-[45px] overflow-x-auto">
          <ul className="flex gap-2 sm:gap-4 md:gap-6 text-white text-sm font-semibold w-full justify-center md:justify-between whitespace-nowrap">
            <li className="hover:text-[#ED2727] transition cursor-pointer"><ProteinDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><SportsDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><HealthDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><FoodDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><VitaminDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><AccessoryDropdown /></li>
          </ul>
        </div>
      </nav>
      {/* Alt Banner */}
      <div className="w-full bg-[#F7F7F7] md:block hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-center h-[40px] px-2 sm:px-4 md:px-8">
          <NavbarBottom />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
