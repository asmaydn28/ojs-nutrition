import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  useCartStore,
  selectCartCount,
  selectCartTotal,
} from "../../../store/cart";
import { Link } from "react-router-dom";

function CartButton() {
  const [open, setOpen] = useState(false);
  const count = useCartStore(selectCartCount);
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore(selectCartTotal);

  return (
    <>
      <div>
        <button
          onClick={() => setOpen(true)}
          className="relative flex gap-1 h-[46px] rounded-md md:bg-[#919191] md:hover:bg-gray-400 transition text-white md:min-w-[110px] justify-center items-center"
        >
          <ShoppingCart className="w-4 h-4 md:text-white text-black" />
          <span className="font-medium hidden md:inline">SEPET</span>
          {/* Red badge */}
          <span className="absolute md:-top-2 md:-right-2 -top-1 -right-1 bg-[#ED2727] text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white min-w-[20px] text-center">
            {count}
          </span>
        </button>

        <Dialog open={open} onClose={setOpen} className="relative z-100">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out data-closed:opacity-0"
          />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <DialogPanel
                  transition
                  className="pointer-events-auto relative w-screen max-w-md transform transition duration-300 ease-in-out data-closed:translate-x-full"
                >
                  <TransitionChild>
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-300 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Kapat</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </TransitionChild>

                  <div className="relative flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="px-4 sm:px-6 py-4 border-b">
                      <DialogTitle className="text-lg font-bold text-gray-900 text-center">
                        SEPETİM ({count})
                      </DialogTitle>
                    </div>

                    {/* İçerik */}
                    <div className="relative flex-1 px-4 sm:px-6 py-4 overflow-y-auto">
                      {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          <ShoppingCart className="w-16 h-16 mb-4 text-gray-300" />
                          <p className="text-lg font-medium">Sepetiniz boş</p>
                          <p className="text-sm mt-1">
                            Hemen alışverişe başlayın!
                          </p>
                          <button
                            onClick={() => setOpen(false)}
                            className="mt-4 px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                          >
                            Alışverişe Başla
                          </button>
                        </div>
                      ) : (
                        <ul className="space-y-4">
                          {items.map((item) => (
                            <li
                              key={item.id}
                              className="flex gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100"
                            >
                              {/* Ürün Görseli */}
                              <Link
                                to={`/product/${item.productSlug}`}
                                onClick={() => setOpen(false)}
                                className="shrink-0"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 object-contain bg-white rounded-lg border"
                                />
                              </Link>

                              {/* Ürün Bilgileri */}
                              <div className="flex-1 min-w-0">
                                <Link
                                  to={`/product/${item.productSlug}`}
                                  onClick={() => setOpen(false)}
                                  className="font-semibold text-gray-900 hover:text-[#2126AB] transition-colors line-clamp-1"
                                >
                                  {item.name}
                                </Link>
                                <div className="text-xs text-gray-500 mt-1">
                                  {item.aroma} / {item.size}
                                </div>
                                <div className="font-bold text-black mt-1">
                                  {item.price} TL
                                </div>

                                {/* Miktar Kontrolleri */}
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-1 bg-white border rounded-lg">
                                    <button
                                      onClick={() => decrement(item.id)}
                                      className="w-8 h-8 grid place-items-center text-gray-600 hover:text-black transition-colors"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <div className="min-w-[28px] text-center font-medium">
                                      {item.quantity}
                                    </div>
                                    <button
                                      onClick={() => increment(item.id)}
                                      className="w-8 h-8 grid place-items-center text-gray-600 hover:text-black transition-colors"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    aria-label="Ürünü kaldır"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="px-4 sm:px-6 py-4 border-t bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-600">Ara Toplam</span>
                          <span className="text-xl font-bold text-black">
                            {Math.round(total)} TL
                          </span>
                        </div>
                        <Link
                          to="/ödeme"
                          onClick={() => setOpen(false)}
                          className="block w-full bg-black text-white h-[52px] rounded-lg font-bold text-center leading-[52px] hover:bg-gray-800 transition-colors"
                        >
                          DEVAM ET
                        </Link>
                        <p className="text-xs text-gray-500 text-center mt-2">
                          Kargo ücreti ödeme sayfasında hesaplanacaktır
                        </p>
                      </div>
                    )}
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default CartButton;
