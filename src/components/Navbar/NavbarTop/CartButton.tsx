import { ShoppingCart } from "lucide-react";

function CartButton() {
  return (
    <button className="relative flex gap-2 px-4 h-[46px] rounded-md bg-[#919191] hover:bg-gray-400 transition text-white min-w-[110px] justify-center items-center">
      <ShoppingCart className="w-5 h-5" />
      <span className="font-medium">SEPET</span>
      {/* Red badge */}
      <span className="absolute -top-2 -right-2 bg-[#ED2727] text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white">0</span>
    </button>
  );
}

export default CartButton; 