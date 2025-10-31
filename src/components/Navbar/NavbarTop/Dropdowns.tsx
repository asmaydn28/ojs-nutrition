import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown, User, UserPlus } from 'lucide-react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div className="relative hidden md:block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Dropdown Button */}
      <button
        type="button"
        className="inline-flex items-center gap-2 px-6 h-[46px] bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium text-gray-700"
        style={{ minHeight: 46 }}
      >
        <User className="w-5 h-5 text-gray-500" />
        HESAP
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          {/* Arrow */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45"></div>
          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/auth?form=login"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 group"
            >
              <User className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
              <div className="flex flex-col">
                <span className="font-medium">Üye Girişi</span>
                <span className="text-xs text-gray-500">Hesabınıza giriş yapın</span>
              </div>
            </Link>
            <div className="h-px bg-gray-100 mx-2"></div>
            <Link
              to="/auth?form=register"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-150 group"
            >
              <UserPlus className="w-5 h-5 text-gray-400 group-hover:text-green-500" />
              <div className="flex flex-col">
                <span className="font-medium">Üye Ol</span>
                <span className="text-xs text-gray-500">Yeni hesap oluşturun</span>
              </div>
            </Link>
            <div className="h-px bg-gray-100 mx-2"></div>
            <Link
              to="/account"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-red-600 transition-colors duration-150 group"
            >
              <UserPlus className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
              <div className="flex flex-col">
                <span className="font-medium">Benim Hesabım</span>
                <span className="text-xs text-gray-500">Hesap Bilgilerini Güncelle</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;