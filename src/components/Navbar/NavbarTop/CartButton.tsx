import { ShoppingCart } from "lucide-react";
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function CartButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
     

      <div>
      <button
        onClick={() => setOpen(true)}
        className="relative flex gap-2 px-4 h-[46px] rounded-md bg-[#919191] hover:bg-gray-400 transition text-white min-w-[110px] justify-center items-center"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="font-medium">SEPET</span>
        {/* Red badge */}
        <span className="absolute -top-2 -right-2 bg-[#ED2727] text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white">
          0
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
                <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900 text-center">SEPETİM</DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">{/* Your content */}</div>
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
