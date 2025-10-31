import Footer from "@/components/Footer/Footer";
import { useState } from "react"

function MyAccount() {

  const [activeTab, setActiveTab] = useState("hesap-bilgilerim");
  const [selectedCountry, setSelectedCountry] = useState("TR");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  }

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  }

  const countries = [
    { code: "TR", name: "Türkiye", flag: "🇹🇷", prefix: "+90" },
    { code: "US", name: "Amerika", flag: "🇺🇸", prefix: "+1" },
    { code: "DE", name: "Almanya", flag: "🇩🇪", prefix: "+49" },
    { code: "FR", name: "Fransa", flag: "🇫🇷", prefix: "+33" }
  ];

  const selectedCountryData = countries.find(country => country.code === selectedCountry);

  return (
  <>  
    <div className="md:mt-50 mt-40 mb-15 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="text-center md:text-left mb-5 md:mb-0">
            <h1 className="font-bold mb-5 text-4xl leading-10">Hesabım</h1>

            <button 
              className={`md:block mx-5 md:mx-0 mb-5 font-semibold leading-6 text-[14px] hover:text-red-500 active:text-red-700 ${activeTab === "hesap-bilgilerim" ? "text-black" : "text-gray"}`} onClick={() => handleTabClick("hesap-bilgilerim")}>
                <span className="flex">
                  <img alt="hesap" src="../../../public/MyAccount/Group.svg" className="mr-2" /> Hesap Bilgilerim
                </span>
            </button>

            <button 
              className={`md:block mx-5 md:mx-0 mb-5 font-semibold leading-6 text-[14px]
              hover:text-red-500 active:text-red-700 ${activeTab === "siparislerim" ? "text-black" : "text-gray"}`} onClick={() => handleTabClick("siparislerim")}>
                <span className="flex">
                  <img alt="hesap" src="../../../public/MyAccount/SVG.svg" className="mr-2" /> Siparişlerim
                </span>
            </button>

            <button 
              className={`md:block mx-5 md:mx-0 font-semibold leading-6 text-[14px]
              hover:text-red-500 active:text-red-700 ${activeTab === "adreslerim" ? "text-black" : "text-gray"}`} onClick={() => handleTabClick("adreslerim")}>
                <span className="flex">
                  <img alt="hesap" src="../../../public/MyAccount/SVG (1).svg" className="mr-2" /> Adreslerim
                </span>
            </button>
        </div>

        <div className="col-span-2">
            {activeTab === "hesap-bilgilerim" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Hesap Bilgilerim</h2>
                <form className="space-y-6">
                  {/* Ad ve Soyad - Yan yana */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first-name" className="block text-[15px] font-medium text-[#222222] mb-2">
                        *Ad
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        defaultValue="Adım"
                        className="w-full h-12 px-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13.625px] text-[#222222] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-[15px] font-medium text-[#222222] mb-2">
                        *Soyad
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        defaultValue="Soyadım"
                        className="w-full h-12 px-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13.75px] text-[#222222] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Telefon */}
                  <div>
                    <label htmlFor="phone" className="block text-[12px] font-medium text-[#222222] mb-2">
                      Telefon
                    </label>
                    <div className="relative">
                      {/* Ülke Dropdown */}
                      <select
                        value={selectedCountry}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-20 h-8 bg-[#F7F7F7] text-[13.75px] text-[#222222] focus:outline-none appearance-none pr-6"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      {/* Dropdown Arrow */}
                      <div className="absolute left-20 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {/* Prefix */}
                      <div className="absolute left-28 top-1/2 transform -translate-y-1/2 flex items-center">
                        <span className="text-[13px] text-[#222222] mr-2">{selectedCountryData?.prefix}</span>
                        <span className="text-lg mr-2">{selectedCountryData?.flag}</span>
                      </div>
                      {/* Phone Input */}
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full h-12 pl-48 pr-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13px] text-[#222222] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-[14.25px] font-medium text-[#222222] mb-2">
                      *Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue="example@example.com"
                      className="w-full h-12 px-4 bg-[#E5E5E5] border border-[#888888] rounded text-[13.375px] text-[#888888] focus:outline-none"
                    />
                  </div>

                  {/* Kaydet Butonu */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="w-[101.28px] h-14 bg-black text-white text-[18.125px] font-semibold rounded hover:bg-gray-800 focus:outline-none"
                    >
                      Kaydet
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "siparislerim" && (
              <div>
                <h2>Siparişlerim</h2>
              </div>
            )}

            {activeTab === "adreslerim" && (
              <div>
                <h2>Adreslerim</h2>
              </div>
            )}
        </div>
      </div>
    </div>
    <Footer />
  </>  
  )
}

export default MyAccount
