import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useLocation, useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL path'ine göre form tipini belirle
  // /kayit-ol ise register, /giris-yap ise login
  const isRegisterPath = location.pathname === "/kayit-ol";
  const [isLoginView, setIsLoginView] = useState(!isRegisterPath);

  // URL path değiştiğinde state'i güncelle
  useEffect(() => {
    setIsLoginView(location.pathname === "/giris-yap");
  }, [location.pathname]);

  // Aktif ve pasif sekme için Tailwind sınıfları
  const activeTabClasses = "bg-white text-blue-700 border-b-white";
  const inactiveTabClasses = "bg-gray-100 text-gray-500 hover:bg-gray-200";

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-white px-4 md:mt-20 mt-25">
      <div className="w-full max-w-lg mx-auto">
        {/* Sekmeler */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => navigate("/giris-yap")}
            className={`w-1/2 py-4 text-center text-lg font-medium focus:outline-none transition-colors duration-150 ease-in-out 
              ${isLoginView ? activeTabClasses : inactiveTabClasses}`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => navigate("/kayit-ol")}
            className={`w-1/2 py-4 text-center text-lg font-medium focus:outline-none transition-colors duration-150 ease-in-out 
              ${!isLoginView ? activeTabClasses : inactiveTabClasses}`}
          >
            Üye Ol
          </button>
        </div>

        {/* Form Alanı */}
        <div className="bg-white p-8 border-l border-r border-b border-gray-200">
          {isLoginView ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;