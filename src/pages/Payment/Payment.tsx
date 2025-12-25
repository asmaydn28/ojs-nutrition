import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cart";
import { useAuthStore } from "@/store/auth";
import { getAddresses } from "@/api/addresses";
import type { Country } from "../MyAccount/MyAccount";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, TAX_RATE, DISCOUNT_RATE } from "@/utils/constants";

interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
  district: string;
  phone: string;
}

function Payment() {
  const cartItems = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity * i.price, 0));
  const { accessToken, user } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  // Kullanıcının kayıtlı adreslerini API'den çek
  const loadAddresses = useCallback(async () => {
    if (!accessToken) {
      setIsLoadingAddresses(false);
      return;
    }

    setIsLoadingAddresses(true);
    try {
      const apiAddresses = await getAddresses(accessToken);
      const mappedAddresses: Address[] = apiAddresses.map((apiAddr) => {
        const addrRecord = apiAddr as unknown as Record<string, unknown>;
        const addressParts = apiAddr.full_address.split(",").map((part: string) => part.trim());
        
        return {
          id: apiAddr.id,
          label: apiAddr.title,
          address: addressParts[0] || apiAddr.full_address,
          city: addressParts[2] || (addrRecord.region as { name?: string } | undefined)?.name || "",
          district: addressParts[1] || (addrRecord.subregion as { name?: string } | undefined)?.name || "",
          phone: apiAddr.phone_number,
        };
      });
      
      setAddresses(mappedAddresses);
      if (mappedAddresses.length > 0 && !selectedAddressId) {
        setSelectedAddressId(mappedAddresses[0].id);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Adresler yüklenemedi:", err.message);
      }
    } finally {
      setIsLoadingAddresses(false);
    }
  }, [accessToken, selectedAddressId]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("TR");
  const [formData, setFormData] = useState({
    addressTitle: "",
    address: "",
    city: "",
    district: "",
    phone: ""
  });

  const resetFormData = () => {
    setFormData({
      addressTitle: "",
      address: "",
      city: "",
      district: "",
      phone: ""
    });
  };

  const countries: Country[] = [
    { code: "TR", name: "Türkiye", flag: "🇹🇷", prefix: "+90" },
    { code: "US", name: "Amerika", flag: "🇺🇸", prefix: "+1" },
    { code: "DE", name: "Almanya", flag: "🇩🇪", prefix: "+49" },
    { code: "FR", name: "Fransa", flag: "🇫🇷", prefix: "+33" }
  ];

  const selectedCountryData = countries.find(country => country.code === selectedCountry);

  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = Math.round(cartTotal * TAX_RATE);
  const discount = Math.round(cartTotal * DISCOUNT_RATE);
  const finalTotal = cartTotal - discount + shippingCost + tax;

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddressForm(false);
    setEditingAddressId(null);
    resetFormData();
  };

  const handleEditAddress = (address: Address) => {
    setFormData({
      addressTitle: address.label,
      address: address.address,
      city: address.city,
      district: address.district,
      phone: address.phone
    });
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const handleNewAddress = () => {
    resetFormData();
    setEditingAddressId(null);
    setShowAddressForm(true);
  };

  const handleCancelAddress = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
    resetFormData();
  };

  const handleDeleteAddress = async () => {
    if (editingAddressId && window.confirm("Bu adresi silmek istediğinize emin misiniz?")) {
      setShowAddressForm(false);
      setEditingAddressId(null);
      resetFormData();
    }
  };

  const renderAddressForm = () => (
    <div>
      {/* Form Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <h3 className="text-base sm:text-lg md:text-[19.8438px] font-normal leading-8 text-[#272727]">
          {editingAddressId ? "Adres Düzenle" : "Yeni Adres"}
        </h3>
        <button
          type="button"
          onClick={handleCancelAddress}
          className="text-sm sm:text-base text-[16px] leading-6 font-normal text-[#272727] hover:text-[#2126AB] transition-colors"
        >
          Vazgeç
        </button>
      </div>

      <form onSubmit={handleAddressSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
        {/* Adres Başlığı */}
        <div>
          <label htmlFor="addressTitle" className="block text-[11.2px] leading-[22px] font-normal text-[#8A8B94] mb-1">
            Adres Başlığı
          </label>
          <input
            type="text"
            id="addressTitle"
            name="addressTitle"
            value={formData.addressTitle}
            onChange={handleInputChange}
            className="w-full h-[54px] px-4 bg-white border border-[#E5E4E9] rounded-lg text-base leading-[19px] text-[#272727] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#2126AB] transition-colors"
            required
          />
        </div>

        {/* Adres */}
        <div>
          <label htmlFor="address" className="block text-[11.2px] leading-[22px] font-normal text-[#8A8B94] mb-1">
            Adres
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Ahmet Mh. Mehmetoğlu Sk. No: 1 Daire: 2"
            className="w-full h-[54px] px-4 bg-white border border-[#E5E4E9] rounded-lg text-base leading-[19px] text-[#272727] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#2126AB] transition-colors"
            required
          />
        </div>

        {/* İl ve İlçe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="city" className="block text-[11.2px] leading-[22px] font-normal text-[#8A8B94] mb-1">
              İl
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full h-[54px] px-4 bg-white border border-[#E5E4E9] rounded-lg text-base leading-6 text-[#272727] focus:outline-none focus:border-[#2126AB] appearance-none transition-colors"
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
            <label htmlFor="district" className="block text-[11.2px] leading-[22px] font-normal text-[#8A8B94] mb-1">
              İlçe
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="w-full h-[54px] px-4 bg-white border border-[#E5E4E9] rounded-lg text-base leading-6 text-[#272727] focus:outline-none focus:border-[#2126AB] appearance-none transition-colors"
              required
            >
              <option value="">İlçe seçiniz</option>
              <option value="kadikoy">Kadıköy</option>
              <option value="besiktas">Beşiktaş</option>
              <option value="sisli">Şişli</option>
              <option value="uskudar">Üsküdar</option>
              <option value="atasehir">Ataşehir</option>
            </select>
          </div>
        </div>

        {/* Telefon */}
        <div>
          <label htmlFor="phone" className="block text-[11.2px] leading-[22px] font-normal text-[#8A8B94] mb-1">
            Telefon
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 z-20">
              <span className="text-xl shrink-0">{selectedCountryData?.flag}</span>
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="bg-transparent text-base text-[#272727] focus:outline-none appearance-none cursor-pointer min-w-[40px]"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.prefix}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="z-30">
                  <path d="M6 9L12 15L18 9" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
                </svg>
              </div>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="537 265 80 23"
              className="w-full h-[54px] pl-[130px] pr-4 bg-white border border-[#E5E4E9] rounded-lg text-base leading-[19px] text-[#272727] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#2126AB] transition-colors"
              required
            />
          </div>
        </div>

        {/* Form Footer Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          {editingAddressId && (
            <button
              type="button"
              onClick={handleDeleteAddress}
              className="w-full sm:flex-1 h-[56px] bg-white border border-[#CECED2] text-[#272727] text-base leading-6 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none transition-colors"
            >
              Adresi Sil
            </button>
          )}
          <button
            type="submit"
            className={`w-full ${editingAddressId ? 'sm:flex-1' : 'sm:w-auto sm:px-8'} h-[56px] bg-black text-white text-base leading-6 font-semibold rounded-lg hover:bg-gray-800 focus:outline-none transition-colors`}
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Two Column Layout - Responsive Container */}
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="flex flex-col xl:flex-row">
          {/* Left Column - White Background - Full Height */}
          <div className="w-full xl:w-1/2 bg-white xl:min-h-screen">
            {/* Header with Logo and User Info */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 sm:py-4 relative">
              {/* Logo */}
              <Link to="/" className="inline-block">
                <img src="/Header/logo-black.svg" alt="OJS Nutrition" className="h-6 sm:h-7 md:h-8 lg:h-[32px] xl:h-[38px] w-auto cursor-pointer hover:opacity-80 transition-opacity" />
              </Link>

              {/* User Info - Right Aligned */}
              <div className="absolute top-3 sm:top-4 right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 2xl:right-20 text-right">
                <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px] font-semibold leading-tight text-[#272727]">
                  {user?.first_name && user?.last_name 
                    ? `${user.first_name} ${user.last_name}` 
                    : "Kullanıcı"}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-[14px] font-medium leading-tight text-[#8A8B94]">
                  {user?.email || "email@example.com"}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pb-4 sm:pb-6 xl:pb-0">
              {/* Step 1: Address */}
              <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-black border border-[#2126AB] flex items-center justify-center shrink-0">
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px] font-normal text-white">1</span>
                  </div>
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] font-semibold leading-tight text-[#272727]">Adres</h2>
                </div>

                <div className="mb-1.5 sm:mb-2 md:mb-3">
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-[19.0625px] font-normal leading-tight text-[#272727] ml-7 sm:ml-8 md:ml-9 lg:ml-11">
                    Teslimat Adresi
                  </h3>
                </div>

                {/* Address Cards */}
                {!showAddressForm ? (
                  <div className="space-y-1.5 sm:space-y-2 md:space-y-3 ml-7 sm:ml-8 md:ml-9 lg:ml-11">
                    {isLoadingAddresses ? (
                      <div className="text-sm text-gray-500 py-4">Adresler yükleniyor...</div>
                    ) : addresses.length === 0 ? (
                      <div className="text-sm text-gray-500 py-4">Kayıtlı adres bulunamadı. Lütfen yeni adres ekleyin.</div>
                    ) : (
                      addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`relative border rounded-lg p-2.5 sm:p-3 md:p-4 cursor-pointer transition-all ${
                          selectedAddressId === address.id
                            ? "bg-[#F7F7F9] border-[#2126AB] shadow-[0_0_0_1px_#2126AB]"
                            : "border-[#E5E4E9] hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedAddressId(address.id)}
                      >
                        {/* Radio Button */}
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="shrink-0 mt-0.5">
                            {selectedAddressId === address.id ? (
                              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black border-10 border-black flex items-center justify-center">
                                <svg width="10" height="8" viewBox="0 0 12 10" fill="none" className="text-white">
                                  <path d="M1 5L4.5 8.5L11 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                            ) : (
                              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#E5E4E9]"></div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1 gap-2">
                              <h4 className="text-xs sm:text-sm md:text-base font-normal leading-4 sm:leading-5 text-[#272727]">
                                {address.label}
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAddress(address);
                                }}
                                className="text-xs sm:text-sm md:text-base font-normal leading-4 sm:leading-5 text-[#272727] hover:text-[#2126AB] transition-colors shrink-0"
                              >
                                Düzenle
                              </button>
                            </div>
                            <p className="text-xs sm:text-sm md:text-base font-normal leading-4 sm:leading-5 text-[#8A8B94] wrap-break-word">
                              {address.address}, {address.district}, {address.city}, Türkiye
                            </p>
                          </div>
                        </div>
                      </div>
                      ))
                    )}

                    {/* New Address Option */}
                    <div
                      className="border border-[#E5E4E9] rounded-lg p-2.5 sm:p-3 md:p-4 cursor-pointer hover:border-gray-300 transition-colors"
                      onClick={handleNewAddress}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#E5E4E9] shrink-0"></div>
                        <span className="text-xs sm:text-sm md:text-base font-normal leading-4 sm:leading-5 text-[#272727]">
                          Yeni Adres
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ml-7 sm:ml-8 md:ml-9 lg:ml-11 bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6">
                    {renderAddressForm()}
                  </div>
                )}

                {/* Continue Button */}
                {!showAddressForm && (
                  <div className="mt-3 sm:mt-4 lg:mt-5 ml-7 sm:ml-8 md:ml-9 lg:ml-11">
                    <button
                      className="w-full h-11 sm:h-12 md:h-14 bg-black rounded-lg text-white text-xs sm:text-sm md:text-base font-semibold leading-4 sm:leading-5 hover:bg-gray-800 transition-colors"
                    >
                      Kargo ile Devam Et
                    </button>
                  </div>
                )}
              </div>

              {/* Step 2: Shipping */}
              <div className="border-t border-[#E5E4E9] pt-2 sm:pt-3 md:pt-4 mb-2 sm:mb-3 md:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-black flex items-center justify-center shrink-0">
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px] font-normal text-black">2</span>
                  </div>
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] font-semibold leading-tight text-[#8A8B94]">Kargo</h2>
                </div>
              </div>

              {/* Step 3: Payment */}
              <div className="border-t border-[#E5E4E9] pt-2 sm:pt-3 md:pt-4 mb-2 sm:mb-3 md:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-black flex items-center justify-center shrink-0">
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px] font-normal text-black">3</span>
                  </div>
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] font-semibold leading-tight text-[#8A8B94]">Ödeme</h2>
                </div>
              </div>

              {/* Footer Links */}
              <div className="border-t border-[#E5E4E9] pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4">
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-[14px] font-normal leading-tight text-[#8A8B94]">
                  <a href="#" className="hover:text-[#2126AB] transition-colors">
                    Para İade Politikası
                  </a>
                  <span>•</span>
                  <a href="#" className="hover:text-[#2126AB] transition-colors">
                    Gizlilik Politikası
                  </a>
                  <span>•</span>
                  <a href="#" className="hover:text-[#2126AB] transition-colors">
                    Hizmet Şartları
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Gray Background - Full Height */}
          <div className="w-full xl:w-1/2 bg-[#F7F7F9] xl:min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 md:py-8 xl:py-4">
            <div className="max-w-full xl:max-w-[600px] mx-auto">
              {/* Products List */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500">Sepetiniz boş</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 sm:gap-3 md:gap-4 relative pb-2 sm:pb-0">
                      {/* Product Image */}
                      <div className="relative shrink-0">
                        <img
                          src={item.image || "/ProductCard/whey-protein.png"}
                          alt={item.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain bg-white rounded-lg border"
                        />
                        {/* Quantity Badge */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#2126AB] rounded-full flex items-center justify-center">
                          <span className="text-[9px] sm:text-[10px] md:text-[12px] font-medium leading-[18px] text-white">
                            {item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm md:text-[14px] font-semibold leading-4 sm:leading-5 text-[#272727] mb-0.5 sm:mb-1">
                              {item.name}
                            </h3>
                            <p className="text-[10px] sm:text-[11px] md:text-[12px] font-normal leading-4 sm:leading-5 text-[#8A8B94]">
                              {[item.aroma, item.size].filter(Boolean).join(" / ")}
                            </p>
                          </div>
                          <div className="text-xs sm:text-sm md:text-[14px] font-normal leading-5 sm:leading-[21px] text-[#272727] whitespace-nowrap shrink-0">
                            {(item.price * item.quantity).toLocaleString('tr-TR')} TL
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-[#E5E4E9] my-2 sm:my-3 md:my-4 lg:my-6"></div>

              {/* Subtotal */}
              <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4 lg:mb-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6 border-b border-[#E5E4E9]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm md:text-base font-normal leading-5 sm:leading-6 text-[#8A8B94]">Ara Toplam</span>
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-[#8A8B94] rounded-full flex items-center justify-center shrink-0">
                    <span className="text-[9px] sm:text-[10px] md:text-[12px] font-normal leading-[18px] text-white">?</span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm md:text-base font-normal leading-5 sm:leading-6 text-[#272727]">
                  {cartTotal.toLocaleString('tr-TR')} TL
                </span>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold leading-6 sm:leading-7 md:leading-[30px] text-[#272727]">Toplam</span>
                <span className="text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold leading-6 sm:leading-7 md:leading-[30px] text-[#272727]">
                  {finalTotal.toLocaleString('tr-TR')} TL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
