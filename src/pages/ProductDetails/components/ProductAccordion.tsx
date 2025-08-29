import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const accordionItems = [
    {
        title: "ÖZELLİKLER",
        content: "Yüksek kalite içeriklerle formüle edilmiştir. Günlük kullanım için uygundur ve antrenman sonrası toparlanmayı destekleyecek şekilde tasarlanmıştır."
    },
    {
        title: "BESİN İÇERİĞİ",
        content: "1 servis için örnek değerler: 24g protein, 3g karbonhidrat, 1.5g yağ. Vitamin ve mineral içeriği ürün etiketinde belirtilmiştir."
    },
    {
        title: "KULLANIM ŞEKLİ",
        content: "1 ölçek (yaklaşık 30g) ürünü 200-250 ml su veya süt ile karıştırın. Antrenman sonrası veya gün içinde bir kez tüketebilirsiniz."
    }
];

const ProductAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="order-3 md:order-3 lg:order-4 col-start-1 md:col-start-1 md:row-start-2 lg:col-start-2 lg:row-start-auto lg:row-span-1">
            <div className="mt-0 lg:mt-4">
                <p className="font-inter font-medium text-[10.31px] leading-[16px] tracking-[0] align-middle text-black mb-2">
                    Son Kullanma Tarihi: 07.2025
                </p>
                <div>
                    {accordionItems.map((item, index) => (
                        <div key={index} className={index < accordionItems.length - 1 ? "border-b" : ""}>
                            <button
                                type="button"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="relative w-full py-4"
                            >
                                <span className="block w-full text-left font-inter font-bold text-[14.63px] leading-[24px] tracking-[0.4px] align-middle text-black">
                                    {item.title}
                                </span>
                                <ChevronDownIcon
                                    className={`h-5 w-5 text-black transition-transform absolute right-0 top-1/2 -translate-y-1/2 ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                                    openIndex === index
                                        ? "max-h-80 opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <div className="pb-4 font-inter font-medium text-[10.31px] leading-[16px] tracking-[0] align-middle text-gray-700">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductAccordion;
