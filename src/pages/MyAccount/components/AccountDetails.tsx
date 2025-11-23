import { useState } from "react";
import type { Country } from "../MyAccount";

interface AccountDetailsProps {
  countries: Country[];
}

function AccountDetails({ countries }: AccountDetailsProps) {
  const [selectedCountry, setSelectedCountry] = useState("TR");

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const selectedCountryData = countries.find(country => country.code === selectedCountry);

  return (
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
  );
}

export default AccountDetails;