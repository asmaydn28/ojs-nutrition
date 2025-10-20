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
import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import NavbarLink from "./NavbarMobile/NavbarLink.tsx"



function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white font-inter z-50">
      {/* Desktop Header */}
      <div className="max-w-[1200px] flex items-center justify-between mx-auto md:h-[94px] h-[55px] md:px-8">
        {/* Hamburger Button - Sadece Mobile'da Görünür */}
          <button 
            className="md:hidden p-2 mr-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-black" />
          </button>

        {/* Logo */}
        <div>
          <Link to="/">
            <img src="/Header/logo-black.svg" alt="Logo" className="h-[38px] w-auto" style={{width:171}} />
          </Link>
        </div>
        
        {/* Search, Dropdown, Cart */}
        <div className="md:flex md:flex-1 md:gap-4 md:justify-end">
          <SearchInput />
          <Dropdown />
          <CartButton />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="w-full bg-[#222222] hidden md:flex">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-8 h-[45px]">
          <ul className="flex gap-6 text-white text-sm font-semibold">
            <li className="hover:text-[#ED2727] transition cursor-pointer"><ProteinDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><SportsDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><HealthDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><FoodDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><VitaminDropdown /></li>
            <li className="hover:text-[#ED2727] transition cursor-pointer"><AccessoryDropdown /></li>
          </ul>
        </div>
      </nav>

      {/* Bottom Banner */}
      {!location.pathname.startsWith('/product/') && (
        <div className="w-full bg-[#F7F7F7] hidden md:block">
          <div className="max-w-[1200px] mx-auto flex items-center justify-center h-[40px] px-8">
            <NavbarBottom />
          </div>
        </div>
      )}

      {/* Mobile Search Bar */}
      <div className="md:hidden bg-black py-3 px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Form Container */}
          <div className="relative h-[36px] w-full">
            {/* Input Background */}
            <div className="absolute inset-0 bg-[#F3F3F3] rounded-[24px]"></div>
            
            {/* Search Icon */}
            <div className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px]"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="11" cy="11" r="7" stroke="#2B0000" strokeWidth="2" fill="none"/>
                <path d="M21 21l-6 -6" stroke="#2B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Text Container */}
            <div className="absolute left-[32px] right-[32px] top-[9px] h-[18px] flex items-center">
              {/* Input Field */}
              <input
                type="text"
                placeholder="ARADIĞINIZ ÜRÜNÜ YAZINIZ."
                className="w-full h-full bg-transparent font-inter font-normal text-[12.9062px] leading-[16px] text-[#333333] placeholder:text-[#333333] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <NavbarLink
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
    
  );
}

export default Navbar;
