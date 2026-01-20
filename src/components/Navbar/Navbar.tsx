import { useEffect } from 'react';
import NavbarBottom from "./NavbarBottom/NavbarBottom.tsx";
import SearchInput from "./NavbarTop/SearchInput.tsx";
import Dropdown from "./NavbarTop/Dropdowns";
import CartButton from "./NavbarTop/CartButton";
import CategoryDropdown from "./NavbarCenter/CategoryDropdown.tsx";
import MobileSearchInput from "./NavbarTop/MobileSearchInput.tsx";
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import NavbarLink from "./NavbarMobile/NavbarLink.tsx";
import { useCategoriesStore } from '@/store/categories';

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Kategori store'dan verileri al
  const { categories, fetchCategories } = useCategoriesStore();

  // Component mount olduğunda kategorileri çek
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white font-inter z-50">
      {/* Desktop Header */}
      <div className="max-w-[1200px] flex items-center justify-between mx-auto md:h-[94px] h-[55px] px-4 md:px-8">
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
            {categories.map((category) => (
              <li key={category.id} className="hover:text-[#ED2727] transition cursor-pointer">
                <CategoryDropdown category={category} />
              </li>
            ))}
            {/* TÜM ÜRÜNLER - Statik link */}
            <li className="hover:text-[#ED2727] transition cursor-pointer">
              <Link to="/urunler" className="px-4 py-2 block">
                TÜM ÜRÜNLER
              </Link>
            </li>
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
      <MobileSearchInput />

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
