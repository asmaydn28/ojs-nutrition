// src/components/navbar/Dropdowns/SporGidalariDropdown.tsx

function SportsDropdown() {
  return (
    <div className="relative group">
      <button className="px-4 py-2">SPOR GIDALARI</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2
        w-[99vw] sm:w-[95vw] md:w-[90vw] lg:w-[1200px]
        max-w-[99vw] sm:max-w-[95vw] md:max-w-[900px] lg:max-w-[1200px]
        min-w-0 bg-white shadow-2xl hidden group-hover:flex hover:flex z-50 text-black rounded-2xl flex-col md:flex-row p-2 md:p-6 transition-all duration-200 overflow-x-auto border border-gray-200 font-sans">
        {/* Sol: En Çok Satanlar */}
        <div className="flex flex-col p-2 md:p-4 md:w-[260px] rounded-xl bg-gray-100 min-w-0 border border-gray-200 shadow-sm">
          <h3 className="font-extrabold mb-2 md:mb-4 text-xs md:text-base text-gray-900 tracking-tight font-sans">EN ÇOK SATANLAR</h3>
          <ul className="flex flex-col gap-2">
            {[1,2,3,4,5].map((_, i) => (
              <li key={i} className="flex items-center gap-2 md:gap-3 cursor-pointer flex-none min-w-0">
                <img
                  src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/wheyproteinbiscuit-1500cc.webp"
                  alt="Ürün"
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain rounded flex-shrink-0 border border-gray-200 bg-white"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-xs md:text-sm truncate text-gray-800 font-sans">CREATINE</div>
                  <div className="flex items-center text-yellow-400 text-xs md:text-sm">
                    ★★★★★
                    <span className="text-gray-400 ml-2 text-xs truncate font-sans">15118 Yorum</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Sağ: İçerik */}
        <div className="flex-1 min-w-0 flex flex-col p-2 md:p-4">
          <h2 className="font-extrabold text-base md:text-xl mb-2 md:mb-6 ml-2 text-gray-900 tracking-tight font-sans">SPOR GIDALARI</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 min-w-0">
            {/* AMİNO ASİTLER */}
            <div className="min-w-0">
              <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 font-sans opacity-90">AMİNO ASİTLER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Creatine</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">L-Carnitine</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Creatine Creapure</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">BCAA</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Glutamine</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">EAA</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Arginine</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Taurine</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Leucine</a></li>
              </ul>
            </div>
            {/* PRE-WORKOUT */}
            <div className="min-w-0">
              <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 font-sans opacity-90">PRE-WORKOUT</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Pre-Workout Supreme</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">HydroPrime</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Thermo Burner</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Heavy Duty Pre-Workout</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Hydration</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Citrulline</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Supreme Pump (Stim Free)</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Beta Alanine</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Betaine</a></li>
              </ul>
            </div>
            {/* KARBONHİDRATLAR */}
            <div className="min-w-0">
              <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 font-sans opacity-90">KARBONHİDRATLAR</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Pirinç Kreması</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Mass Gainer</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Maltodekstrin</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Dekstroz</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Vegan Gainer</a></li>
              </ul>
            </div>
            {/* DİĞER */}
            <div className="min-w-0">
              <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 font-sans opacity-90">DİĞER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Ultra Focus</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Gamer Hack</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Intra Workout</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Elektrolit Blend</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Hydration</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">CLA</a></li>
                <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Protein Meal (Öğün Tozu)</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SportsDropdown;