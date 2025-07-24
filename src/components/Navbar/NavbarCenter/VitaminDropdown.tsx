

function VitaminDropdown() {
  return (
    <div className="relative group">
      <button className="px-4 py-2">VİTAMİN</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2
        w-[99vw] sm:w-[95vw] md:w-[90vw] lg:w-[1200px]
        max-w-[99vw] sm:max-w-[95vw] md:max-w-[900px] lg:max-w-[1200px]
        min-w-0 bg-white shadow-2xl hidden group-hover:flex hover:flex z-50 text-black rounded-2xl flex-col md:flex-row p-2 md:p-6 transition-all duration-200 overflow-x-auto border border-gray-200 font-sans">
        {/* Left Panel: Best Sellers */}
        <div className="bg-gray-100 flex flex-col p-2 md:p-4 w-full md:w-[240px] lg:w-[260px] flex-shrink-0 min-w-0 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-extrabold mb-2 md:mb-4 text-xs md:text-base text-gray-900 tracking-tight font-sans">EN ÇOK SATANLAR</h3>
          <ul className="flex flex-col gap-2 flex-1 h-auto">
            {[1,2,3,4,5].map((_, i) => (
              <li key={i} className="flex items-center gap-2 md:gap-3 min-w-0">
                <img
                  src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/multivitamin.webp"
                  alt="Ürün"
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain rounded flex-shrink-0 border border-gray-200 bg-white"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-xs md:text-sm truncate text-gray-800 font-sans">MULTIVITAMIN</div>
                  <div className="flex items-center text-yellow-400 text-xs md:text-sm">
                    ★★★★★
                    <span className="text-gray-400 ml-2 text-xs truncate font-sans">3029 Yorum</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Right Panel: Categories */}
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 p-2 md:p-4 items-start">
          {/* Map categories here, each as a column */}
          <div className="min-w-0">
            <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 tracking-tight font-sans text-left whitespace-normal">ÖZEL FORMÜL<br/>ÜRÜNLER</h3>
            <ul className="space-y-1">
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Thermo Burner</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">LVR</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">KDNY</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">T-Prime</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Hunger Buster</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Beauty Formula</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Relax</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Focus Formula</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Gamer Multivitamin</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">GDA</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">C-Blocker</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Sleep Formula</a></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 tracking-tight font-sans text-left whitespace-normal">POPÜLER<br/>TAKVİYELER</h3>
            <ul className="space-y-1">
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">ZMA</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Thermo Burner</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Omega 3</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Multivitamin</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">C Vitamini Efervesan</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Kafein</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Kolajen + Hyaluronik Asit</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Glikozamin Kondroitin</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">MSM</a></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 tracking-tight font-sans text-left whitespace-normal">VİTAMİNLER</h3>
            <ul className="space-y-1">
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">C Vitamini</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">B Vitamini</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">D Vitamini</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">K Vitamini</a></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 tracking-tight font-sans text-left whitespace-normal">MİNERALLER</h3>
            <ul className="space-y-1">
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Magnezyum</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Demir</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Krom</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Selenyum</a></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 tracking-tight font-sans text-left whitespace-normal">BİTKİSEL<br/>ÜRÜNLER</h3>
            <ul className="space-y-1">
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Green Detox</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Milk Thistle</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Tribulus Terrestris</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Saw Palmetto</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">L-Theanine</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Panax Ginseng</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">5-HTP</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">L-Tyrosine</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Rhodiola Rosea</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Gingko Biloba</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Beta Glukan</a></li>
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 tracking-tight font-sans text-left whitespace-normal">DİĞER</h3>
            <ul className="space-y-1">
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">CLA</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Bromelain</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Koenzim Q 10</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Alpha GPC</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Glutatyon</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">NMN</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Hyaluronik Asit</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-400 hover:text-gray-700 transition-colors duration-150 font-sans">Laktaz</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VitaminDropdown;
