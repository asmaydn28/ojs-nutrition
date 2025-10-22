import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import { type FaqItem, genelFaqs, urunlerFaqs, kargoFaqs } from "./faqData";
import ContactForm from "../../components/Form/ContactForm";

type Tab = "genel" | "urunler" | "kargo";


const AccordionItem = ({ item, isOpen, onToggle }: { item: FaqItem, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className="bg-white border border-[#F5F5F5]">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left p-4 focus:outline-none"
      >
        <span className="font-bold text-black text-sm md:text-base">{item.question}</span>
        <span className="transform transition-transform duration-300">
          <svg className={`w-5 h-5 text-gray-500 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? '500px' : '0px' }}
      >
        <div className="px-4 pb-4 text-gray-600 text-sm md:text-base">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState<Tab>("genel");
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setOpenAccordionIndex(null);
  };

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const renderContent = () => {
    let faqs: FaqItem[];
    switch (activeTab) {
      case "urunler": faqs = urunlerFaqs; break;
      case "kargo": faqs = kargoFaqs; break;
      default: faqs = genelFaqs; break;
    }
    return (
        <div className="w-full space-y-2 md:space-y-3">
            {faqs.map((faq, index) => (
                <AccordionItem 
                    key={index}
                    item={faq}
                    isOpen={openAccordionIndex === index}
                    onToggle={() => handleAccordionToggle(index)}
                />
            ))}
        </div>
    );
  };

  return (
    <div className="w-full pt-32 md:pt-50">
      <div className="mx-auto max-w-4xl px-4">
        {/* Sekmeler */}
        <div className="flex items-end h-[51px] border-b border-gray-300 mb-8 gap-x-4">
          <button onClick={() => handleTabClick("genel")} className={`h-[50px] w-[58.72px] flex items-center justify-center font-normal text-sm transition-colors duration-200 ${activeTab === "genel" ? "bg-[#222222] text-white" : "bg-[#E5E5E5] text-black"}`}>
            Genel
          </button>
          <button onClick={() => handleTabClick("urunler")} className={`h-[50px] w-[67.7px] flex items-center justify-center font-normal text-sm transition-colors duration-200 ${activeTab === "urunler" ? "bg-[#222222] text-white" : "bg-[#E5E5E5] text-black"}`}>
            Ürünler
          </button>
          <button onClick={() => handleTabClick("kargo")} className={`h-[50px] w-[58.98px] flex items-center justify-center font-normal text-sm transition-colors duration-200 ${activeTab === "kargo" ? "bg-[#222222] text-white" : "bg-[#E5E5E5] text-black"}`}>
            Kargo
          </button>
        </div>
        
        {/* Akordiyon */}
        <div className="bg-[#E5E5E5] p-2 md:p-4">
            {renderContent()}
        </div>

        {/* İletişim Formu Alanı */}
        <div className="mt-16 md:mt-24">
            <div className="text-center mb-8">
                <h3 className="font-bold text-2xl md:text-3xl text-black">Aradığınızı Bulamadınız mı?</h3>
                <p className="text-gray-600 mt-2">Aşağıdaki formu doldurarak bize her zaman ulaşabilirsiniz.</p>
            </div>
            <ContactForm />
        </div>

      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Faq;