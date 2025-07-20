// src/components/navbar/Dropdowns/SporGidalariDropdown.tsx

function SportsDropdown() {
  return (
    <div className="relative group">
      <button className="px-4 py-2">SPOR GIDALARI</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2 w-full max-w-[1200px] bg-white shadow-lg hidden group-hover:flex hover:flex items-stretch flex-row z-50 text-black rounded">
        {/* Sol: En Çok Satanlar */}
        <div className="flex flex-col p-4 w-[300px] rounded-s bg-gray-200 h-auto">
          <h3 className="font-bold mb-4">EN ÇOK SATANLAR</h3>
          <ul className="flex flex-col gap-2 flex-1 h-auto">
            {[1,2,3,4,5].map((_, i) => (
              <li key={i} className="flex items-center gap-3 cursor-pointer flex-none">
                <img
                  src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/wheyproteinbiscuit-1500cc.webp"
                  alt="Ürün"
                  className="w-14 h-14 object-contain rounded"
                />
                <div>
                  <div className="font-bold text-xs">CREATINE</div>
                  <div className="flex items-center text-yellow-400 text-sm">
                    ★★★★★
                    <span className="text-gray-700 ml-2 text-xs">15118 Yorum</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Sağ: İçerik */}
        <div className="flex-1 flex flex-col p-4 h-full">
          <h2 className="font-bold text-xl mb-6 ml-2">SPOR GIDALARI</h2>
          <div className="grid grid-cols-4 gap-8">
            {/* AMİNO ASİTLER */}
            <div>
              <h3 className="font-bold mb-2">AMİNO ASİTLER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">Creatine</a></li>
                <li><a href="#" className="cursor-pointer">L-Carnitine</a></li>
                <li><a href="#" className="cursor-pointer">Creatine Creapure</a></li>
                <li><a href="#" className="cursor-pointer">BCAA</a></li>
                <li><a href="#" className="cursor-pointer">Glutamine</a></li>
                <li><a href="#" className="cursor-pointer">EAA</a></li>
                <li><a href="#" className="cursor-pointer">Arginine</a></li>
                <li><a href="#" className="cursor-pointer">Taurine</a></li>
                <li><a href="#" className="cursor-pointer">Leucine</a></li>
              </ul>
            </div>
            {/* PRE-WORKOUT */}
            <div>
              <h3 className="font-bold mb-2">PRE-WORKOUT</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">Pre-Workout Supreme</a></li>
                <li><a href="#" className="cursor-pointer">HydroPrime</a></li>
                <li><a href="#" className="cursor-pointer">Thermo Burner</a></li>
                <li><a href="#" className="cursor-pointer">Heavy Duty Pre-Workout</a></li>
                <li><a href="#" className="cursor-pointer">Hydration</a></li>
                <li><a href="#" className="cursor-pointer">Citrulline</a></li>
                <li><a href="#" className="cursor-pointer">Supreme Pump (Stim Free)</a></li>
                <li><a href="#" className="cursor-pointer">Beta Alanine</a></li>
                <li><a href="#" className="cursor-pointer">Betaine</a></li>
              </ul>
            </div>
            {/* KARBONHİDRATLAR */}
            <div>
              <h3 className="font-bold mb-2">KARBONHİDRATLAR</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">Pirinç Kreması</a></li>
                <li><a href="#" className="cursor-pointer">Mass Gainer</a></li>
                <li><a href="#" className="cursor-pointer">Maltodekstrin</a></li>
                <li><a href="#" className="cursor-pointer">Dekstroz</a></li>
                <li><a href="#" className="cursor-pointer">Vegan Gainer</a></li>
              </ul>
            </div>
            {/* DİĞER */}
            <div>
              <h3 className="font-bold mb-2">DİĞER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">Ultra Focus</a></li>
                <li><a href="#" className="cursor-pointer">Gamer Hack</a></li>
                <li><a href="#" className="cursor-pointer">Intra Workout</a></li>
                <li><a href="#" className="cursor-pointer">Elektrolit Blend</a></li>
                <li><a href="#" className="cursor-pointer">Hydration</a></li>
                <li><a href="#" className="cursor-pointer">CLA</a></li>
                <li><a href="#" className="cursor-pointer">Protein Meal (Öğün Tozu)</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SportsDropdown;