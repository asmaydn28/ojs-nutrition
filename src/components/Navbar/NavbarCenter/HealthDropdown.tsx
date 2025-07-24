
function HealthDropdown() {
  return (
    <div className="relative group">
      <button className="px-4 py-2">SAĞLIK</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2
        w-[99vw] sm:w-[95vw] md:w-[90vw] lg:w-[1200px]
        max-w-[99vw] sm:max-w-[95vw] md:max-w-[900px] lg:max-w-[1200px]
        min-w-0 bg-white shadow-2xl hidden group-hover:flex hover:flex z-50 text-black rounded-2xl flex-col md:flex-row p-2 md:p-6 transition-all duration-200 overflow-x-auto border border-gray-200 font-sans">
        {/* Sol: En Çok Satanlar */}
        <div className="bg-gray-100 flex flex-col p-2 md:p-4 w-full md:w-[240px] lg:w-[260px] flex-shrink-0 min-w-0 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-extrabold mb-2 md:mb-9 text-xs md:text-base text-gray-900 tracking-tight font-sans">EN ÇOK SATANLAR</h3>
          <ul className="flex flex-col gap-2 flex-1 h-auto">
            {[1, 2, 3, 4].map((_, i) => (
              <li key={i} className="flex items-center gap-2 md:gap-3 min-w-0">
                <img
                  src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/wheyproteinbiscuit-1500cc.webp"
                  alt="Ürün"
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain rounded flex-shrink-0 border border-gray-200 bg-white"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-xs md:text-sm truncate text-gray-800 font-sans">GREENS & SUPERFOODS</div>
                  <div className="flex items-center text-yellow-400 text-xs md:text-sm">
                    ★★★★★
                    <span className="text-gray-400 ml-2 text-xs truncate font-sans">1175 Yorum</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Sağ: İçerik */}
        <div className="flex-1 min-w-0 flex flex-col p-2 md:p-4">
          <h3 className="font-extrabold text-base md:text-xl mb-2 md:mb-4 text-gray-900 tracking-tight font-sans">SAĞLIK</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 min-w-0">
            {/* FONKSİYONEL GIDALAR */}
            <div className="min-w-0">
              <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 font-sans opacity-90">FONKSİYONEL GIDALAR</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Collagen</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Deep Sleep</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Protein Coffee</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Protein Meal (Öğün Tozu)</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Prebiyotik</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Collagen Coffee</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Digestion</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Tatlandırıcı</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Mct Oil</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Inulin</a></li>
              </ul>
            </div>
            {/* BİTKİ TOZLARI */}
            <div className="min-w-0">
              <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 font-sans opacity-90">BİTKİ TOZLARI</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Greens & Superfoods</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Green Detox</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Red Detox</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Brokoli Tozu</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Maca Kökü Tozu</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Spirulina Tozu</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Ispanak Tozu</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Maydanoz Tozu</a></li>
              </ul>
            </div>
            {/* ZAYIFLAMA */}
            <div className="min-w-0 sm:col-span-2 lg:col-span-1">
              <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 font-sans opacity-90">ZAYIFLAMA</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">L-Carnitine</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Thermo Burner</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">L-Carnitine Shot</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">CLA</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Hunger Buster</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">CLA+</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthDropdown;
