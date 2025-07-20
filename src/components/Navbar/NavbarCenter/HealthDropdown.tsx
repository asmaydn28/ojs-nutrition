
function HealthDropdown() {
  return (
    <div className="relative group">
      <button className="px-4 py-2">SAĞLIK</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2 w-full max-w-[1200px] bg-white shadow-lg hidden group-hover:flex hover:flex items-stretch z-50 text-black rounded">
        {/* Sol: En Çok Satanlar */}
        <div className="flex flex-col p-4 w-[300px] rounded-s bg-gray-200 h-auto">
          <h3 className="font-bold mb-4">EN ÇOK SATANLAR</h3>
          <ul className="flex flex-col gap-2 flex-1 h-auto">
            {/* 1. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img
                src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/wheyproteinbiscuit-1500cc.webp"
                alt="Greens & Superfoods"
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <div className="font-bold text-xs">GREENS & SUPERFOODS</div>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-700 ml-2 text-xs">1175 Yorum</span>
                </div>
              </div>
            </li>
            {/* 2. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img
                src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/wheyproteinbiscuit-1500cc.webp"
                alt="Deep Sleep"
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <div className="font-bold text-xs">DEEP SLEEP</div>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-700 ml-2 text-xs">1666 Yorum</span>
                </div>
              </div>
            </li>
            {/* 3. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img
                src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/wheyproteinbiscuit-1500cc.webp"
                alt="Green Detox+"
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <div className="font-bold text-xs">GREEN DETOX+</div>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-700 ml-2 text-xs">1684 Yorum</span>
                </div>
              </div>
            </li>
            {/* 4. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img
                src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/wheyproteinbiscuit-1500cc.webp"
                alt="Collagen"
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <div className="font-bold text-xs">COLLAGEN</div>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-700 ml-2 text-xs">880 Yorum</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* Sağ: İçerik */}
        <div className="flex-1 flex flex-col p-4">
          <h3 className="font-bold text-lg mb-4">SAĞLIK</h3>
          <div className="grid grid-cols-3 gap-8">
            {/* FONKSİYONEL GIDALAR */}
            <div>
              <h3 className="font-bold mb-2">FONKSİYONEL GIDALAR</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">Collagen</a></li>
                <li><a href="#" className="cursor-pointer">Deep Sleep</a></li>
                <li><a href="#" className="cursor-pointer">Protein Coffee</a></li>
                <li><a href="#" className="cursor-pointer">Protein Meal (Öğün Tozu)</a></li>
                <li><a href="#" className="cursor-pointer">Prebiyotik</a></li>
                <li><a href="#" className="cursor-pointer">Collagen Coffee</a></li>
                <li><a href="#" className="cursor-pointer">Digestion</a></li>
                <li><a href="#" className="cursor-pointer">Tatlandırıcı</a></li>
                <li><a href="#" className="cursor-pointer">Mct Oil</a></li>
                <li><a href="#" className="cursor-pointer">Inulin</a></li>
              </ul>
            </div>
            {/* BİTKİ TOZLARI */}
            <div>
              <h3 className="font-bold mb-2">BİTKİ TOZLARI</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">Greens & Superfoods</a></li>
                <li><a href="#" className="cursor-pointer">Green Detox</a></li>
                <li><a href="#" className="cursor-pointer">Red Detox</a></li>
                <li><a href="#" className="cursor-pointer">Brokoli Tozu</a></li>
                <li><a href="#" className="cursor-pointer">Maca Kökü Tozu</a></li>
                <li><a href="#" className="cursor-pointer">Spirulina Tozu</a></li>
                <li><a href="#" className="cursor-pointer">Ispanak Tozu</a></li>
                <li><a href="#" className="cursor-pointer">Maydanoz Tozu</a></li>
              </ul>
            </div>
            {/* ZAYIFLAMA */}
            <div>
              <h3 className="font-bold mb-2">ZAYIFLAMA</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">L-Carnitine</a></li>
                <li><a href="#" className="cursor-pointer">Thermo Burner</a></li>
                <li><a href="#" className="cursor-pointer">L-Carnitine Shot</a></li>
                <li><a href="#" className="cursor-pointer">CLA</a></li>
                <li><a href="#" className="cursor-pointer">Hunger Buster</a></li>
                <li><a href="#" className="cursor-pointer">CLA+</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthDropdown;
