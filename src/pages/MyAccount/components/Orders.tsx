import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Backend entegrasyonu için hazır interface'ler
export interface OrderItem {
  id: number;
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  size?: string; // Boyut bilgisi (örn: "1 KUTU", "1 Paket x 2 Adet")
}

export interface Order {
  id: number;
  orderNumber: string;
  date: string;
  status: "Teslim Edildi" | "Kargoda" | "Hazırlanıyor" | "İptal Edildi";
  items: OrderItem[];
  subtotal: number; // Ara Toplam
  shipping: number; // Kargo
  tax: number; // Toplam Vergi
  discount?: number; // İndirim
  discountText?: string; // İndirim açıklaması (örn: "Yüzde 10 indirim!")
  total: number;
  address?: {
    label: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    district: string;
    phone: string;
    postalCode?: string;
  };
  payment?: {
    method: string;
    amount: number;
    maskedCardNumber?: string; // Maskelenmiş kart numarası (örn: "**** **** **** **61")
  };
  shippingInfo?: {
    carrier: string; // Kargo firması (örn: "hepsiJet")
    trackingNumber: string; // Takip numarası
  };
}

function Orders() {
  const navigate = useNavigate();
  // Backend'den gelecek - şimdilik boş array (sipariş yoksa boş state gösterilecek)
  const [orders] = useState<Order[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  // Sipariş Detay Sayfası
  if (selectedOrder) {
    return (
      <div>
        {/* Geri Dön Butonu */}
        <button
          onClick={handleBackToList}
          className="mb-6 text-black hover:text-[#2126AB] transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Siparişlerime Dön</span>
        </button>

        {/* Başlık: Sipariş Teslim Edildi */}
        <h2 className="font-inter font-semibold text-[17.1875px] leading-[28px] text-black mb-2">
          Sipariş {selectedOrder.status}
        </h2>

        {/* Tarih ve Sipariş No */}
        <p className="font-inter font-normal text-[13.875px] leading-[24px] text-black mb-4">
          {selectedOrder.date} Tarihinde Sipariş Verildi - {selectedOrder.orderNumber} numaralı sipariş
        </p>


        {/* Ana İçerik: Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Sol: Ürünler */}
          <div className="lg:col-span-2 space-y-6 border-t py-2 border-black ">
            {selectedOrder.items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Ürün Resmi */}
                <div className="shrink-0">
                  <img
                    src={item.image || "/ProductCard/whey-protein.png"}
                    alt={item.name}
                    className="w-[181px] h-[181px] object-contain bg-white rounded border"
                  />
                </div>

                {/* Ürün Bilgileri */}
                <div className="flex-1">
                  <p className="font-inter font-semibold text-[15px] sm:text-[14.875px] leading-[24px] text-black">
                    {item.name} x {item.quantity} {item.price} TL
                    {item.size && (
                      <>
                        <br />
                        {item.size}
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}

            {/* Kargo Bilgisi - Ürünlerin Altında */}
            {selectedOrder.shippingInfo && (
              <div className="pt-4 border-t border-black">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="font-inter font-normal text-[11px] sm:text-[12px] md:text-[12.5px] leading-[20px] sm:leading-[24px] text-black whitespace-nowrap">
                    {selectedOrder.shippingInfo.carrier}
                  </span>
                  <span className="font-inter font-normal text-[12px] sm:text-[13px] md:text-[13.75px] leading-[20px] sm:leading-[24px] text-black whitespace-nowrap">
                    Takip Numarası:
                  </span>
                  <a
                    href="#"
                    className="font-inter font-normal text-[11px] sm:text-[12px] md:text-[12.625px] leading-[20px] sm:leading-[24px] text-black hover:underline break-all sm:break-normal"
                  >
                    {selectedOrder.shippingInfo.trackingNumber}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sağ: Adres, Ödeme, Özet, Yardım */}
          <div className="space-y-0">
            {/* Adres */}
            {selectedOrder.address && (
              <>
                <div className="pt-4 pb-4 lg:border-t border-b border-black">
                  <h3 className="font-inter font-semibold text-[14.125px] leading-[24px] text-black mb-3">
                    Adres
                  </h3>
                  <p className="font-inter font-normal text-[14px] leading-[24px] text-black">
                    {selectedOrder.address.firstName} {selectedOrder.address.lastName}
                    <br />
                    {selectedOrder.address.address}
                    {selectedOrder.address.postalCode && `, ${selectedOrder.address.postalCode}`}
                    <br />
                    {selectedOrder.address.district}/{selectedOrder.address.city}
                  </p>
                </div>
              </>
            )}

            {/* Ödeme */}
            {selectedOrder.payment && (
              <>
                <div className="pt-4 pb-4 border-b border-black">
                  <h3 className="font-inter font-semibold text-[14.75px] leading-[24px] text-black mb-3">
                    Ödeme
                  </h3>
                  <p className="font-inter font-normal text-[16px] leading-[24px] text-black">
                    {selectedOrder.payment.method} - {selectedOrder.payment.amount} TL
                    {selectedOrder.payment.maskedCardNumber && (
                      <>
                        <br />
                        {selectedOrder.payment.maskedCardNumber}
                      </>
                    )}
                  </p>
                </div>
              </>
            )}

            {/* Özet */}
            <>
              <div className="pt-4 pb-4 border-b border-black">
                <h3 className="font-inter font-semibold text-[14.375px] leading-[24px] text-black mb-4">
                  Özet
                </h3>
                <div className="space-y-2">
                  {/* Ara Toplam */}
                  <div className="flex justify-between items-center">
                    <span className="font-inter font-normal text-[13.875px] leading-[32px] text-black">
                      Ara Toplam
                    </span>
                    <span className="font-inter font-normal text-[13px] leading-[32px] text-black text-right">
                      {selectedOrder.subtotal} TL
                    </span>
                  </div>

                  {/* Kargo */}
                  <div className="flex justify-between items-center">
                    <span className="font-inter font-normal text-[14px] leading-[32px] text-black">
                      Kargo
                    </span>
                    <span className="font-inter font-normal text-[12.375px] leading-[32px] text-black text-right">
                      {selectedOrder.shipping} TL
                    </span>
                  </div>

                  {/* Toplam Vergi */}
                  {selectedOrder.tax > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="font-inter font-normal text-[13.625px] leading-[32px] text-black">
                        Toplam Vergi
                      </span>
                      <span className="font-inter font-normal text-[12.375px] leading-[32px] text-black text-right">
                        {selectedOrder.tax} TL
                      </span>
                    </div>
                  )}

                  {/* İndirim */}
                  {selectedOrder.discount && selectedOrder.discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="font-inter font-normal text-[13.75px] leading-[32px] text-black">
                        {selectedOrder.discountText || "İndirim"}
                      </span>
                      <span className="font-inter font-normal text-[12.75px] leading-[32px] text-black text-right">
                        - {selectedOrder.discount} TL
                      </span>
                    </div>
                  )}

                  {/* Toplam */}
                  <div className="flex justify-between items-center">
                    <span className="font-inter font-normal text-[13.5px] leading-[32px] text-black">
                      Toplam
                    </span>
                    <span className="font-inter font-normal text-[13.25px] leading-[32px] text-black text-right">
                      {selectedOrder.total} TL
                    </span>
                  </div>
                </div>
              </div>
            </>

            {/* Yardıma mı ihtiyacın var? */}
            <>
              <div className="pt-4 pb-4">
                <h3 className="font-inter font-semibold text-[16.1719px] leading-[28px] text-black mb-4">
                  Yardıma mı ihtiyacın var?
                </h3>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="block font-inter font-medium text-[13.5px] leading-[32px] text-black hover:underline"
                  >
                    Sıkça Sorulan Sorular
                  </a>
                  <a
                    href="#"
                    className="block font-inter font-medium text-[13.5px] leading-[32px] text-black hover:underline"
                  >
                    Satış Sözleşmesi
                  </a>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    );
  }

  // Sipariş Listesi
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-[#222222] text-2xl font-normal mb-8 text-center">
            Henüz herhangi bir sipariş oluşturmadınız.
          </p>
          <button
            onClick={() => navigate("/urunler")}
            className="bg-black text-white px-6 py-3 rounded-lg text-base font-normal hover:bg-gray-800 transition-colors"
          >
            Tüm ürünler
          </button>
        </div>
      ) : (
        <div className="space-y-0">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border-b border-black py-4 flex flex-col sm:flex-row sm:items-start gap-4"
            >
              {/* Ürün Resmi */}
              <div className="shrink-0">
                <img
                  src={order.items[0]?.image || "/ProductCard/whey-protein.png"}
                  alt={order.items[0]?.name || "Ürün"}
                  className="w-[49px] h-[49px] sm:w-16 sm:h-16 object-contain bg-white rounded border"
                />
              </div>

              {/* Orta Kısım: Durum, Ürün Adı, Tarih */}
              <div className="flex-1 min-w-0">
                {/* Durum */}
                <div className="mb-2">
                  <span
                    className={`text-[13.25px] font-normal leading-[1.81em] ${
                      order.status === "Teslim Edildi"
                        ? "text-[#52C41A]"
                        : order.status === "Kargoda"
                        ? "text-blue-600"
                        : order.status === "Hazırlanıyor"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Ürün Adı */}
                <div className="mb-2">
                  <h3 className="text-[13.25px] sm:text-base font-semibold leading-[1.81em] text-black">
                    {order.items[0]?.name || "Ürün"}
                  </h3>
                </div>

                {/* Tarih ve Sipariş No */}
                <div className="text-[13.875px] font-normal leading-[1.73em] text-black">
                  <p>{order.date} Tarihinde Sipariş Verildi</p>
                  <p>{order.orderNumber} numaralı sipariş</p>
                </div>
              </div>

              {/* Sağ: Detayı Görüntüle Butonu */}
              <div className="shrink-0 self-center sm:self-start">
                <button
                  onClick={() => handleViewDetails(order)}
                  className="border border-black rounded px-4 py-2 text-[13.75px] font-normal leading-[1.75em] text-black hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Detayı Görüntüle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

