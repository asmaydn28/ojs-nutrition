import AccessoryDropdown from "./NavbarCenter/AccessoryDropdown.tsx";
import FoodDropdown from "./NavbarCenter/FoodDropdown.tsx";
import HealthDropdown from "./NavbarCenter/HealthDropdown.tsx";
import ProteinDropdown from "./NavbarCenter/ProteinDropdown.tsx";
import SportsDropdown from "./NavbarCenter/SportsDropdown.tsx";
import VitaminDropdown from "./NavbarCenter/VitaminDropdown.tsx";
import NavbarBottom from "./NavbarBottom/NavbarBottom.tsx";
import Dropdowns from "./NavbarTop/Dropdowns.tsx";
import SearchInput from "./NavbarTop/SearchInput.tsx";



function Navbar() {
  return (
    <div className="shadow">

      <div className="flex h-[94px] justify-center items-center gap-4 px-2.5">

        {/* Sol: Logo */}
        <div className="md:me-40">
          <img src="/Header/LOGO_Siyah.png" alt="Logo" className="h-[38px]" />
        </div>

        {/* Orta: Search ve Dropdown */}
        <SearchInput />
        <Dropdowns />

        {/* Sağ: Sepet */}
        <div>
          <button className="bg-gray-500 hover:bg-gray-400 py-2.5 px-8 rounded-[4px] text-white font-bold">
            SEPET
          </button>
        </div>

      </div>

      
      <div className="h-[35px] bg-black text-white flex items-center justify-center gap-6 px-8">
        <ProteinDropdown />
        <SportsDropdown/>
        <HealthDropdown/>
        <FoodDropdown/>
        <VitaminDropdown/>
        <AccessoryDropdown/>
      </div>

      <div className="w-full flex justify-center" style={{position: 'relative', height: '40px', background: '#F7F7F7'}}>
        <NavbarBottom/>
      </div>
      
    </div>
  );
}

export default Navbar;
