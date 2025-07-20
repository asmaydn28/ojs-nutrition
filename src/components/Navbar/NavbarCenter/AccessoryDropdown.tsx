
function AccessoryDropdown() {
  return (
    <div className="relative group">
      <button className="px-4 py-2">AKSESUAR</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2 w-full max-w-[1200px] bg-white shadow-lg hidden group-hover:flex hover:flex items-stretch z-50 text-black rounded">
        {/* Sol: En Çok Satanlar */}
        <div className="flex flex-col p-4 w-[300px] rounded-s bg-gray-200 h-auto">
          <h3 className="font-bold mb-4">EN ÇOK SATANLAR</h3>
          <ul className="flex flex-col gap-2 flex-1 h-auto">
            {/* 1. Ürün */}
            <li className="flex items-center gap-3 cursor-pointer flex-none">
              <img src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/1949128a-b45b-4cde-9b6e-5f2910a43e48/image_3840.webp" alt="Termal Korse" className="w-14 h-14 object-contain rounded" />
              <div>
                <div className="font-bold text-xs">TERMAL KORSE</div>
                <div className="flex items-center text-yellow-400 text-sm">★★★★★<span className="text-gray-700 ml-2 text-xs">986 Yorum</span></div>
              </div>
            </li>
            {/* 2. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5423c07a-0160-4db7-b2b7-7123567a8335/image_3840.webp" alt="Wrist Wraps" className="w-14 h-14 object-contain rounded" />
              <div>
                <div className="font-bold text-xs">WRIST WRAPS</div>
                <div className="flex items-center text-yellow-400 text-sm">★★★★★<span className="text-gray-700 ml-2 text-xs">1858 Yorum</span></div>
              </div>
            </li>
            {/* 3. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/26a90f42-fe0f-42fa-b238-a5bfaaf5499a/3840/shaker3.webp" alt="Pocket Shaker" className="w-14 h-14 object-contain rounded" />
              <div>
                <div className="font-bold text-xs">POCKET SHAKER</div>
                <div className="flex items-center text-yellow-400 text-sm">★★★★★<span className="text-gray-700 ml-2 text-xs">14628 Yorum</span></div>
              </div>
            </li>
            {/* 4. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5c9b28de-7b3e-4d96-b959-f00366ecf2f1/3840/relentless.webp" alt="Relentless Gym Handbag" className="w-14 h-14 object-contain rounded" />
              <div>
                <div className="font-bold text-xs">RELENTLESS GYM HANDBAG</div>
                <div className="flex items-center text-yellow-400 text-sm">★★★★★<span className="text-gray-700 ml-2 text-xs">903 Yorum</span></div>
              </div>
            </li>
          </ul>
        </div>
        {/* Sağ: İçerik */}
        <div className="flex-1 flex flex-col p-4">
          <h3 className="font-bold text-lg mb-4">AKSESUAR</h3>
          <div>
            <h3 className="font-bold mb-2">AKSESUAR</h3>
            <ul className="space-y-1">
              <li><a href="#" className="cursor-pointer">Termal Korse</a></li>
              <li><a href="#" className="cursor-pointer">Wrist Wraps (Bilek Sargısı)</a></li>
              <li><a href="#" className="cursor-pointer">Lifting Straps</a></li>
              <li><a href="#" className="cursor-pointer">Tişörtler</a></li>
              <li><a href="#" className="cursor-pointer">Relentless Shaker</a></li>
              <li><a href="#" className="cursor-pointer">Pocket Shaker</a></li>
              <li><a href="#" className="cursor-pointer">Pillbox</a></li>
              <li><a href="#" className="cursor-pointer">Huni</a></li>
              <li><a href="#" className="cursor-pointer">Proteinocean Havlu</a></li>
              <li><a href="#" className="cursor-pointer">Relentless Gym Handbag</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessoryDropdown;
