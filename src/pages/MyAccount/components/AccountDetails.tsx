import { useState, useEffect, useCallback } from "react";
import type { FormEvent } from "react";
import type { Country } from "../MyAccount";
import { getUserProfile, updateUserProfile } from "@/api/auth";
import { useAuthStore } from "@/store/auth";

interface AccountDetailsProps {
  countries: Country[];
}

function AccountDetails({ countries }: AccountDetailsProps) {
  const { accessToken, setUser } = useAuthStore();
  const [selectedCountry, setSelectedCountry] = useState("TR");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUserProfile = useCallback(async () => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    const currentUser = useAuthStore.getState().user;
    if (currentUser) {
      const userRecord = currentUser as unknown as Record<string, unknown>;
      const firstName = currentUser.first_name || (userRecord.firstName as string) || "";
      const lastName = currentUser.last_name || (userRecord.lastName as string) || "";
      const email = currentUser.email || "";
      const phone = currentUser.phone_number || (userRecord.phone_number as string) || (userRecord.phone as string) || "";
      
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setPhone(phone);
      setIsLoading(false);
      
      try {
        const profile = await getUserProfile(accessToken);
        setUser(profile);
        const profileRecord = profile as unknown as Record<string, unknown>;
        
        if (profile.first_name || profileRecord.firstName) {
          setFirstName(profile.first_name || (profileRecord.firstName as string) || firstName);
        }
        if (profile.last_name || profileRecord.lastName) {
          setLastName(profile.last_name || (profileRecord.lastName as string) || lastName);
        }
        if (profile.email) {
          setEmail(profile.email);
        }
        if (profile.phone_number || profileRecord.phone_number || profileRecord.phone) {
          setPhone(profile.phone_number || (profileRecord.phone_number as string) || (profileRecord.phone as string) || phone);
        }
      } catch {
        // Store'daki bilgiler kullanılıyor
      }
      return;
    }
    
    try {
      const profile = await getUserProfile(accessToken);
      setUser(profile);
      const profileRecord = profile as unknown as Record<string, unknown>;
      
      setFirstName(profile.first_name || (profileRecord.firstName as string) || "");
      setLastName(profile.last_name || (profileRecord.lastName as string) || "");
      setEmail(profile.email || "");
      setPhone(profile.phone_number || (profileRecord.phone_number as string) || (profileRecord.phone as string) || "");
    } catch (err) {
      // API'den çekilemezse store'daki bilgiler kullanılıyor
      if (err instanceof Error) {
        console.error("Profil bilgisi çekilemedi:", err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, setUser]);

  useEffect(() => {
    // Sayfa açıldığında veya accessToken değiştiğinde API'den kullanıcı bilgilerini çek
    loadUserProfile();
  }, [loadUserProfile]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!accessToken) {
      setError("Giriş yapmanız gerekiyor.");
      return;
    }

    setIsSaving(true);

    try {
      const updatedProfile = await updateUserProfile(accessToken, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
      });
      setUser(updatedProfile);
      setSuccess("Bilgileriniz başarıyla güncellendi.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profil güncellenirken bir hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  const selectedCountryData = countries.find(country => country.code === selectedCountry);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hesap Bilgilerim</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

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
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            value={email}
            disabled
            className="w-full h-12 px-4 bg-[#E5E5E5] border border-[#888888] rounded text-[13.375px] text-[#888888] focus:outline-none cursor-not-allowed"
          />
        </div>

        {/* Kaydet Butonu */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="w-[101.28px] h-14 bg-black text-white text-[18.125px] font-semibold rounded hover:bg-gray-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountDetails;