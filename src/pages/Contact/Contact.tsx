import Footer from "@/components/Footer/Footer";
import ContactForm from "@/components/Form/ContactForm";

function Contact() {
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
        <ContactForm />

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
