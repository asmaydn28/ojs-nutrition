import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Lütfen zorunlu alanları doldurun!');
      return;
    }
    alert('Mesajınız başarıyla gönderildi!');
    console.log('Form Data:', formData);
    setFormData({ name: '', surname: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="İsim *"
            required
            className="w-full h-[50px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] px-[17px] font-inter font-normal text-[14px] text-black placeholder-[#A1A1AA] focus:outline-none focus:border-gray-400 transition-colors duration-200"
          />
        </div>
        <div className="w-full md:w-1/2">
          <input 
            type="text" 
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            placeholder="Soyad"
            className="w-full h-[50px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] px-[17px] font-inter font-normal text-[14px] text-black placeholder-[#A1A1AA] focus:outline-none focus:border-gray-400 transition-colors duration-200"
          />
        </div>
      </div>
      <div className="w-full">
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="E-Posta *"
          required
          className="w-full h-[50px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] px-[17px] font-inter font-normal text-[14px] text-black placeholder-[#A1A1AA] focus:outline-none focus:border-gray-400 transition-colors duration-200"
        />
      </div>
      <div className="w-full">
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Mesaj *"
          required
          className="w-full h-[150px] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] px-[17px] py-[17px] font-inter font-normal text-[14px] text-black placeholder-[#A1A1AA] focus:outline-none focus:border-gray-400 resize-none transition-colors duration-200"
        />
      </div>
      <div className="w-full flex justify-center">
        <button 
          type="submit"
          className="w-[121.64px] h-[55px] bg-black hover:bg-gray-800 active:bg-gray-900 rounded-[4px] flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <span className="font-inter font-semibold text-[19px] text-center text-white">
            GÖNDER
          </span>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
