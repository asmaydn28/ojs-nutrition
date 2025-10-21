import Footer from "@/components/Footer/Footer";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validasyonu
    if (!formData.name || !formData.email || !formData.message) {
      alert('Lütfen zorunlu alanları doldurun!');
      return;
    }

    // Form gönderme işlemi (şimdilik alert)
    alert('Form başarıyla gönderildi!');
    console.log('Form Data:', formData);
    
    // Formu temizle
    setFormData({
      name: '',
      surname: '',
      email: '',
      message: ''
    });
  };
  return (
    <>
      {/* Ana Container */}
      <div className="relative w-full max-w-[700px] h-auto mx-auto mt-[150px] md:mt-[200px] px-4 md:px-0">
        
        {/* Başlık - Bize Ulaşın */}
        <h2 className="w-full text-center font-inter font-bold text-[32px] md:text-[45.75px] leading-[36px] md:leading-[48px] text-black mb-4">
          Bize Ulaşın
        </h2>

        {/* Açıklama Metni */}
        <p className="w-full text-center font-inter font-normal text-[12px] md:text-[13.375px] leading-[20px] md:leading-[24px] text-black mb-8">
          Bize aşağıdaki iletişim ulaşabilirsiniz.
        </p>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          
          {/* İsim ve Soyad - Mobile'da tek satır, Desktop'ta yan yana */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-0">
            {/* İsim Input */}
            <div className="w-full md:w-1/2 md:pr-2">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="İsim *"
                required
                className="w-full h-[50px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] px-[17px] font-inter font-normal text-[14px] leading-[17px] text-black placeholder-[#A1A1AA] focus:outline-none focus:border-gray-400 transition-colors duration-200"
              />
            </div>

            {/* Soyad Input */}
            <div className="w-full md:w-1/2 md:pl-2">
              <input 
                type="text" 
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder="Soyad"
                className="w-full h-[50px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] px-[17px] font-inter font-normal text-[14px] leading-[17px] text-black placeholder-[#A1A1AA] focus:outline-none focus:border-gray-400 transition-colors duration-200"
              />
            </div>
          </div>

          {/* E-Posta Input */}
          <div className="w-full">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-Posta"
              required
              className="w-full h-[50px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] px-[17px] font-inter font-normal text-[12px] md:text-[12.75px] leading-[15px] text-black placeholder-[#A1A1AA] focus:outline-none focus:border-gray-400 transition-colors duration-200"
            />
          </div>

          {/* Mesaj Textarea */}
          <div className="w-full">
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Mesaj"
              required
              className="w-full h-[120px] md:h-[150px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] px-[17px] py-[17px] font-inter font-normal text-[14px] leading-[24px] text-black placeholder-[#A1A1AA] focus:outline-none focus:border-gray-400 resize-none transition-colors duration-200"
            />
          </div>

          {/* Gönder Butonu */}
          <div className="w-full flex justify-center">
            <button 
              type="submit"
              className="w-[121.64px] h-[50px] md:h-[55px] bg-black hover:bg-gray-800 active:bg-gray-900 rounded-[4px] flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="font-inter font-semibold text-[16px] md:text-[19.2188px] leading-[28px] text-center text-white">
                GÖNDER
              </span>
            </button>
          </div>
        </form>

        {/* Kargo Bilgisi */}
        <p className="w-full text-center font-inter font-medium text-[10px] md:text-[11.9219px] leading-[18px] md:leading-[24px] text-black mt-8 md:mt-12">
          *Aynı gün kargo hafta içi 16:00, Cumartesi ise 11:00' a kadar verilen siparişler icin geçerlidir. Siparişler kargoya verilince e-posta ve sms ile bilgilendirme yapılır.
        </p>

        {/* Telefon Bilgisi */}
        <p className="w-full text-center font-inter font-medium text-[10px] md:text-[11.8125px] leading-[18px] md:leading-[24px] text-black mt-4 mb-10">
          Telefon ile <strong>0850 303 29 89</strong> numarasını arayarak da bizlere sesli mesaj bırakabilirsiniz . Sesli mesajlarınıza hafta içi saat <strong>09:00-17:00</strong> arasında dönüş sağlanmaktadır.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
