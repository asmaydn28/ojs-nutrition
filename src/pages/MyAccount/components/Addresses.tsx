import { useState } from "react";
import type { Country } from "../MyAccount";

interface AddressesProps {
  countries: Country[];
}

interface Address {
  id: number;
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  phone: string;
}

function Addresses({ countries }: AddressesProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("TR");
  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    addressTitle: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    district: "",
    phone: ""
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend entegrasyonunda burada API çağrısı yapılacak
    if (editingAddressId) {
      // Düzenleme modu
      setAddresses(addresses.map(addr => 
        addr.id === editingAddressId 
          ? {
              ...addr,
              label: formData.addressTitle,
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              city: formData.city,
              district: formData.district,
              phone: formData.phone
            }
          : addr
      ));
      setEditingAddressId(null);
    } else {
      // Yeni adres ekleme
      const newAddress: Address = {
        id: addresses.length + 1,
        label: formData.addressTitle,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        phone: formData.phone
      };
      setAddresses([...addresses, newAddress]);
    }
    
    setFormData({
      addressTitle: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      district: "",
      phone: ""
    });
    setShowForm(false);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      addressTitle: address.label,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      city: address.city,
      district: address.district,
      phone: address.phone
    });
    setEditingAddressId(address.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {

    setAddresses(addresses.filter(addr => addr.id !== id));
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
          className="w-[101.28px] h-[55px] bg-black text-white text-[18.125px] font-semibold rounded hover:bg-gray-800 focus:outline-none transition-colors"
        >
          Kaydet
        </button>
      </div>
    </form>
  );

  return (
    <div>
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
