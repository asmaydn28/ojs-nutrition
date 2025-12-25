import { useState, useEffect, useCallback } from "react";
import type { Country } from "../MyAccount";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "@/api/addresses";
import { useAuthStore } from "@/store/auth";

interface AddressesProps {
  countries: Country[];
}

interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  phone: string;
}

function Addresses({ countries }: AddressesProps) {
  const { accessToken } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("TR");
  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    addressTitle: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    district: "",
    phone: ""
  });

  // API'den adresleri yükle
  const loadAddresses = useCallback(async () => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const apiAddresses = await getAddresses(accessToken);
      const mappedAddresses: Address[] = apiAddresses.map((apiAddr) => {
        const apiAddrRecord = apiAddr as unknown as Record<string, unknown>;
        const addressParts = apiAddr.full_address.split(",").map((part: string) => part.trim());
        
        return {
          id: apiAddr.id,
          label: apiAddr.title,
          firstName: (apiAddrRecord.first_name as string) || "",
          lastName: (apiAddrRecord.last_name as string) || "",
          address: addressParts[0] || apiAddr.full_address,
          city: addressParts[2] || (apiAddrRecord.region as { name?: string } | undefined)?.name || "",
          district: addressParts[1] || (apiAddrRecord.subregion as { name?: string } | undefined)?.name || "",
          phone: apiAddr.phone_number,
        };
      });
      
      setAddresses(mappedAddresses);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Adresler yüklenirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Adres kaydetme veya güncelleme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      setError("Giriş yapmanız gerekiyor.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const phoneWithPrefix = `${selectedCountryData?.prefix || "+90"}${formData.phone}`;
      const fullAddress = `${formData.address}, ${formData.district}, ${formData.city}`;

      const addressData = {
        title: formData.addressTitle,
        first_name: formData.firstName,
        last_name: formData.lastName,
        full_address: fullAddress,
        phone_number: phoneWithPrefix,
        country_id: 226,
        region_id: 3495,
        subregion_id: 39395,
      };

      if (editingAddressId) {
        await updateAddress(accessToken, editingAddressId, addressData);
      } else {
        await createAddress(accessToken, addressData);
      }

      await loadAddresses();

      setFormData({
        addressTitle: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        district: "",
        phone: "",
      });
      setShowForm(false);
      setEditingAddressId(null);
    } catch (err) {
      console.error("Adres kaydetme hatası:", err);
      setError(err instanceof Error ? err.message : "Adres kaydedilirken bir hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (address: Address) => {
    // full_address'i parse et: "adres, ilçe, şehir" formatından
    const addressParts = address.address.split(",").map((part) => part.trim());
    const parsedAddress = addressParts[0] || address.address;
    const parsedDistrict = addressParts[1] || address.district;
    const parsedCity = addressParts[2] || address.city;

    // Telefon numarasından prefix'i çıkar
    let phoneNumber = address.phone;
    if (phoneNumber.startsWith("+")) {
      const prefixMatch = countries.find((c) => phoneNumber.startsWith(c.prefix));
      if (prefixMatch) {
        phoneNumber = phoneNumber.replace(prefixMatch.prefix, "");
        setSelectedCountry(prefixMatch.code);
      }
    }

    setFormData({
      addressTitle: address.label,
      firstName: address.firstName,
      lastName: address.lastName,
      address: parsedAddress,
      city: parsedCity,
      district: parsedDistrict,
      phone: phoneNumber,
    });
    setEditingAddressId(address.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!accessToken) {
      setError("Giriş yapmanız gerekiyor.");
      return;
    }

    if (!confirm("Bu adresi silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      await deleteAddress(accessToken, id);
      // Adresleri yeniden yükle
      await loadAddresses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Adres silinirken bir hata oluştu");
    }
  };

  const handleNewAddress = () => {
    setFormData({
      addressTitle: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      district: "",
      phone: ""
    });
    setEditingAddressId(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddressId(null);
    setFormData({
      addressTitle: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      district: "",
      phone: ""
    });
  };

  const selectedCountryData = countries.find(country => country.code === selectedCountry);
  const hasAddresses = addresses.length > 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  // Form component'ini ayrı bir fonksiyon olarak tanımla
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Adres Başlığı */}
      <div>
        <label htmlFor="addressTitle" className="block text-[13.75px] font-medium text-[#222222] mb-2">
          *Adres Başlığı
        </label>
        <input
          type="text"
          id="addressTitle"
          name="addressTitle"
          value={formData.addressTitle}
          onChange={handleInputChange}
          placeholder="ev, iş vb..."
          className="w-full h-[50px] px-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13.875px] text-[#222222] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#2126AB]"
          required
        />
      </div>

      {/* Ad ve Soyad - Yan yana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-[15.875px] font-medium text-[#222222] mb-2">
            *Ad
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full h-[50px] px-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13.875px] text-[#222222] focus:outline-none focus:border-[#2126AB]"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-[14.25px] font-medium text-[#222222] mb-2">
            *Soyad
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full h-[50px] px-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13.875px] text-[#222222] focus:outline-none focus:border-[#2126AB]"
            required
          />
        </div>
      </div>

      {/* Adres */}
      <div>
        <label htmlFor="address" className="block text-[14.25px] font-medium text-[#222222] mb-2">
          *Adres
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full h-[50px] px-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13.875px] text-[#222222] focus:outline-none focus:border-[#2126AB]"
          required
        />
      </div>

      {/* Şehir ve İlçe - Yan yana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-[13.875px] font-medium text-[#222222] mb-2">
            *Şehir
          </label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full h-[50px] px-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13.875px] text-[#222222] focus:outline-none focus:border-[#2126AB] appearance-none"
            required
          >
            <option value="">Şehir seçiniz</option>
            <option value="istanbul">İstanbul</option>
            <option value="ankara">Ankara</option>
            <option value="izmir">İzmir</option>
            <option value="antalya">Antalya</option>
          </select>
        </div>
        <div>
          <label htmlFor="district" className="block text-[14.125px] font-medium text-[#222222] mb-2">
            *İlçe
          </label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className="w-full h-[50px] px-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13.875px] text-[#222222] focus:outline-none focus:border-[#2126AB] appearance-none"
            required
          >
            <option value="">İlçe seçiniz</option>
            <option value="kadikoy">Kadıköy</option>
            <option value="besiktas">Beşiktaş</option>
            <option value="sisli">Şişli</option>
            <option value="uskudar">Üsküdar</option>
          </select>
        </div>
      </div>

      {/* Telefon */}
      <div>
        <label htmlFor="phone" className="block text-[13.375px] font-medium text-[#222222] mb-2">
          *Telefon
        </label>
        <div className="relative">
          {/* Ülke Bayrağı ve Dropdown */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 z-10">
            <span className="text-xl">{selectedCountryData?.flag}</span>
            <select
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-16 h-8 bg-transparent text-[13.75px] text-[#222222] focus:outline-none appearance-none cursor-pointer"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.prefix}
                </option>
              ))}
            </select>
            {/* Dropdown Arrow */}
            <div className="pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {/* Telefon Input */}
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full h-[52px] pl-32 pr-4 bg-[#F7F7F7] border border-[#E5E5E5] rounded text-[13.75px] text-[#222222] focus:outline-none focus:border-[#2126AB]"
            required
          />
        </div>
      </div>

      {/* Butonlar - Sağ alt */}
      <div className="pt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 h-[55px] bg-gray-200 text-black text-[18.125px] font-semibold rounded hover:bg-gray-300 focus:outline-none transition-colors"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="w-[101.28px] h-[55px] bg-black text-white text-[18.125px] font-semibold rounded hover:bg-gray-800 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {!hasAddresses && !showForm ? (
        <>
          {/* Başlık */}
          <h2 className="text-2xl font-bold mb-4">ADRES OLUŞTUR</h2>

          {/* Uyarı Mesajı - Adres yokken gösterilir */}
          <div className="bg-[rgba(33,38,171,0.1)] border border-[#2126AB] rounded px-4 py-4 mb-6">
            <p className="text-[13.375px] leading-[1.79em] text-black">
              Kayıtlı bir adresiniz yok. Lütfen aşağıdaki kısımdan adres oluşturunuz.
            </p>
          </div>

          {/* Form */}
          {renderForm()}
        </>
      ) : (
        <div>
          {/* Başlık ve Yeni Adres Ekle Butonu */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-[15.89px] sm:text-2xl font-semibold sm:font-bold">
              ADRESLERİM ({addresses.length})
            </h2>
            {!showForm && (
              <button
                onClick={handleNewAddress}
                className="text-[13.375px] leading-[1.79em] text-black hover:text-[#2126AB] transition-colors cursor-pointer self-start sm:self-auto"
              >
                Yeni adres ekle
              </button>
            )}
          </div>

          {/* Form gösteriliyorsa */}
          {showForm && (
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-4">
                {editingAddressId ? "ADRESİ DÜZENLE" : "ADRES OLUŞTUR"}
              </h3>
              {renderForm()}
            </div>
          )}

          {/* Adres Kartları - Grid Layout */}
          {!showForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="border border-black rounded p-4 min-h-[218px] flex flex-col"
                >
                  {/* Adres Başlığı */}
                  <h3 className="text-[13.25px] sm:text-[13.5px] font-normal leading-[1.81em] text-black mb-4">
                    {address.label}
                  </h3>

                  {/* Adres Detayı */}
                  <p className="text-sm sm:text-[14px] font-normal leading-[1.71em] text-black mb-auto flex-1">
                    {address.address}, {address.district}, {address.city}, Türkiye
                  </p>

                  {/* Alt Kısım: Sil ve Düzenle Butonları */}
                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
                    {/* Edit Icon */}
                    <button
                      onClick={() => handleEdit(address)}
                      className="flex items-center gap-2 text-black hover:text-[#2126AB] transition-colors"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.5 2.50023C18.8978 2.10243 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.10243 21.5 2.50023C21.8978 2.89804 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.10243 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Sil Butonu */}
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="text-[12.25px] font-normal leading-[1.63em] text-black hover:text-red-600 transition-colors"
                    >
                      Sil
                    </button>

                    {/* Adresi Düzenle Butonu */}
                    <button
                      onClick={() => handleEdit(address)}
                      className="text-[11.92px] font-normal leading-[1.68em] text-black hover:text-[#2126AB] transition-colors ml-auto"
                    >
                      Adresi Düzenle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Addresses;
