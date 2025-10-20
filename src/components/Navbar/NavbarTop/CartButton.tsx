import { ShoppingCart } from "lucide-react";
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore, selectCartCount, selectCartTotal } from '../../../store/cart'

function CartButton() {
  const [open, setOpen] = useState(false)
  const count = useCartStore(selectCartCount)
  const items = useCartStore(s => s.items)
  const increment = useCartStore(s => s.increment)
  const decrement = useCartStore(s => s.decrement)
  const removeItem = useCartStore(s => s.removeItem)
  const total = useCartStore(selectCartTotal)
  return (
    <>
     

      <div>
      <button
        onClick={() => setOpen(true)}
        className="relative flex gap-1 h-[46px] rounded-md md:bg-[#919191] md:hover:bg-gray-400 transition text-white md:min-w-[110px] justify-center items-center"
      >
        <ShoppingCart className="w-4 h-4 md:text-white text-black" />
        <span className="font-medium">SEPET</span>
        {/* Red badge */}
        <span className="absolute md:-top-2 md:-right-2 bg-[#ED2727] text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white">
          {count}
        </span>
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-100">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="relative flex h-full flex-col bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900 text-center">SEPETİM</DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6 overflow-y-auto">
                    {items.length === 0 ? (
                      <div className="text-center text-gray-500">Sepetiniz boş</div>
                    ) : (
                      <ul className="space-y-4">
                        {items.map(item => (
                          <li key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-white rounded border" />
                              <div>
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.price} TL</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => decrement(item.id)} className="w-8 h-8 grid place-items-center border rounded">-</button>
                              <div className="min-w-[24px] text-center">{item.quantity}</div>
                              <button onClick={() => increment(item.id)} className="w-8 h-8 grid place-items-center border rounded">+</button>
                              <button onClick={() => removeItem(item.id)} className="ml-2 w-8 h-8 grid place-items-center border rounded" aria-label="remove">🗑️</button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="px-4 sm:px-6 mt-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>TOPLAM</span>
                      <span>{Math.round(total)} TL</span>
                    </div>
                    <button className="mt-3 w-full bg-black text-white h-[44px] rounded-lg font-bold">
                      DEVAM ET
                    </button>
                  </div>
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
