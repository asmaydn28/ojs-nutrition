
function AccessoryDropdown() {
  return (
    <div className="relative group">
      <button className="px-4 py-2">AKSESUAR</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2
        w-[99vw] sm:w-[95vw] md:w-[90vw] lg:w-[1200px]
        max-w-[99vw] sm:max-w-[95vw] md:max-w-[900px] lg:max-w-[1200px]
        min-w-0 bg-white shadow-2xl hidden group-hover:flex hover:flex z-50 text-black rounded-2xl flex-col md:flex-row p-2 md:p-6 transition-all duration-200 overflow-x-auto border border-gray-200 font-sans">
        {/* Left Panel: Best Sellers */}
        <div className="bg-gray-100 flex flex-col p-2 md:p-4 w-full md:w-[240px] lg:w-[260px] flex-shrink-0 min-w-0 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-extrabold mb-2 md:mb-4 text-xs md:text-base text-gray-900 tracking-tight font-sans">EN ÇOK SATANLAR</h3>
          <ul className="flex flex-col gap-2 flex-1 h-auto">
            {[1,2,3,4].map((_, i) => (
              <li key={i} className="flex items-center gap-2 md:gap-3 min-w-0">
                <img
                  src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/1949128a-b45b-4cde-9b6e-5f2910a43e48/image_3840.webp"
                  alt="Ürün"
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain rounded flex-shrink-0 border border-gray-200 bg-white"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-xs md:text-sm truncate text-gray-800 font-sans">TERMAL KORSE</div>
                  <div className="flex items-center text-yellow-400 text-xs md:text-sm">
                    ★★★★★
                    <span className="text-gray-400 ml-2 text-xs truncate font-sans">986 Yorum</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Right Panel: Categories */}
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6 p-2 md:p-4">
          <div className="min-w-0">
            <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 font-sans">AKSESUAR</h3>
            <ul className="space-y-1">
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Termal Korse</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Wrist Wraps (Bilek Sargısı)</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Lifting Straps</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Tișörtler</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Relentless Shaker</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Pocket Shaker</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Pillbox</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Huni</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Proteinocean Havlu</a></li>
              <li><a href="#" className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans">Relentless Gym Handbag</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessoryDropdown;
