import { type Product } from "../../../../components/ProductCard/ProductArray";
import { useCartStore } from "../../../../store/cart";

interface PurchasePanelProps {
  product: Product;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const PurchasePanel = ({ product, quantity, setQuantity }: PurchasePanelProps) => {
  const addItem = useCartStore(s => s.addItem);
  return (
    <div className="mt-8">
      {/* Fiyat ve Servis Ücreti */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-4xl font-inter font-bold text-black">
          {product.DiscountedPrice ?? product.Price}
        </div>
        <div className="font-inter font-semibold text-[16.92px] leading-[28.5px] tracking-[0] align-middle capitalize text-black">
          34.31 TL /Servis
        </div>
      </div>

      {/* Miktar Seçici ve Sepete Ekle Butonu */}
      <div className="flex items-center gap-4 mb-8">
        {/* Miktar Seçici */}
        <div className="flex items-center bg-gray-100 rounded-lg border h-[55px]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="grid place-items-center w-[44px] h-full text-gray-600 hover:text-black transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          <div className="grid place-items-center px-5 bg-white text-center min-w-[60px] h-full font-inter font-medium">
            {quantity}
          </div>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="grid place-items-center w-[44px] h-full text-gray-600 hover:text-black transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Sepete Ekle Butonu */}
        <button
          onClick={() =>
            addItem(
              {
                id: product.id,
                name: product.ProductName,
                price: parseFloat((product.DiscountedPrice ?? product.Price).toString().replace(" TL", "")),
                image: product.img,
              },
              quantity
            )
          }
          className="bg-black text-white h-[55px] px-7 rounded-lg font-inter font-bold text-lg uppercase flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors flex-1"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          SEPETE EKLE
        </button>
      </div>

      {/* Değer Önerileri - EKLENDİ */}
      <div className="grid grid-cols-3 gap-8 pb-5 lg:border-b-2 mb-5">
        {/* Aynı Gün Kargo */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="font-inter font-medium text-black text-sm">
            Aynı Gün
          </div>
          <div className="font-inter text-black text-sm">
            Ücretsiz Kargo
          </div>
        </div>

        {/* Mutlu Müşteri */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="font-inter font-medium text-black text-sm">
            750.000+
          </div>
          <div className="font-inter text-black text-sm">
            Mutlu Müşteri
          </div>
        </div>

        {/* Memnuniyet Garantisi */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <div className="font-inter font-medium text-black text-sm">
            Memnuniyet
          </div>
          <div className="font-inter text-black text-sm">Garantisi</div>
        </div>
      </div>

    </div>
  );
};

export default PurchasePanel;