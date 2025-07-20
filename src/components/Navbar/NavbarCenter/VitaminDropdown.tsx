

function VitaminDropdown() {
  return (
    <div className="relative group">
      <button className="px-4 py-2">VİTAMİN</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2 w-full max-w-[1200px] bg-white shadow-lg hidden group-hover:flex hover:flex items-stretch z-50 text-black rounded">
        {/* Sol: En Çok Satanlar */}
        <div className="flex flex-col p-4 w-[300px] rounded-s bg-gray-200 h-auto">
          <h3 className="font-bold mb-4">EN ÇOK SATANLAR</h3>
          <ul className="flex flex-col gap-2 flex-1 h-auto">
            {/* 1. Ürün */}
            <li className="flex items-center gap-3 cursor-pointer flex-none">
              <img src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/multivitamin.webp" alt="Multivitamin" className="w-14 h-14 object-contain rounded" />
              <div>
                <div className="font-bold text-xs">MULTIVITAMIN</div>
                <div className="flex items-center text-yellow-400 text-sm">★★★★★<span className="text-gray-700 ml-2 text-xs">3029 Yorum</span></div>
              </div>
            </li>
            {/* 2. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/omega3.webp" alt="Omega 3" className="w-14 h-14 object-contain rounded" />
              <div>
                <div className="font-bold text-xs">OMEGA 3</div>
                <div className="flex items-center text-yellow-400 text-sm">★★★★★<span className="text-gray-700 ml-2 text-xs">3121 Yorum</span></div>
              </div>
            </li>
            {/* 3. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/thermoburner.webp" alt="Thermo Burner" className="w-14 h-14 object-contain rounded" />
              <div>
                <div className="font-bold text-xs">THERMO BURNER</div>
                <div className="flex items-center text-yellow-400 text-sm">★★★★★<span className="text-gray-700 ml-2 text-xs">2504 Yorum</span></div>
              </div>
            </li>
            {/* 4. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/zma.webp" alt="ZMA" className="w-14 h-14 object-contain rounded" />
              <div>
                <div className="font-bold text-xs">ZMA</div>
                <div className="flex items-center text-yellow-400 text-sm">★★★★★<span className="text-gray-700 ml-2 text-xs">5047 Yorum</span></div>
              </div>
            </li>
            {/* 5. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/tprime.webp" alt="T-Prime" className="w-14 h-14 object-contain rounded" />
              <div>
                <div className="font-bold text-xs">T-PRIME</div>
                <div className="flex items-center text-yellow-400 text-sm">★★★★★<span className="text-gray-700 ml-2 text-xs">1175 Yorum</span></div>
              </div>
            </li>
          </ul>
        </div>
        {/* Sağ: İçerik */}
        <div className="flex-1 flex flex-col p-4">
          <h3 className="font-bold text-lg mb-4">VİTAMİN</h3>
          <div className="grid grid-cols-6 gap-8">
            {/* ÖZEL FORMÜL ÜRÜNLER */}
            <div>
              <h3 className="font-bold mb-2">ÖZEL FORMÜL ÜRÜNLER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">Thermo Burner</a></li>
                <li><a href="#" className="cursor-pointer">LVR</a></li>
                <li><a href="#" className="cursor-pointer">KDNY</a></li>
                <li><a href="#" className="cursor-pointer">T-Prime</a></li>
                <li><a href="#" className="cursor-pointer">Hunger Buster</a></li>
                <li><a href="#" className="cursor-pointer">Beauty Formula</a></li>
                <li><a href="#" className="cursor-pointer">Relax</a></li>
                <li><a href="#" className="cursor-pointer">Focus Formula</a></li>
                <li><a href="#" className="cursor-pointer">Gamer Multivitamin</a></li>
                <li><a href="#" className="cursor-pointer">GDA</a></li>
                <li><a href="#" className="cursor-pointer">C-Blocker</a></li>
                <li><a href="#" className="cursor-pointer">Sleep Formula</a></li>
              </ul>
            </div>
            {/* POPÜLER TAKVİYELER */}
            <div>
              <h3 className="font-bold mb-2">POPÜLER TAKVİYELER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">ZMA</a></li>
                <li><a href="#" className="cursor-pointer">Thermo Burner</a></li>
                <li><a href="#" className="cursor-pointer">Omega 3</a></li>
                <li><a href="#" className="cursor-pointer">Multivitamin</a></li>
                <li><a href="#" className="cursor-pointer">C Vitamini Efervesan</a></li>
                <li><a href="#" className="cursor-pointer">Kafein</a></li>
                <li><a href="#" className="cursor-pointer">Kolajen + Hyaluronik Asit</a></li>
                <li><a href="#" className="cursor-pointer">Glikozamin Kondroitin</a></li>
                <li><a href="#" className="cursor-pointer">MSM</a></li>
              </ul>
            </div>
            {/* VİTAMİNLER */}
            <div>
              <h3 className="font-bold mb-2">VİTAMİNLER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">C Vitamini</a></li>
                <li><a href="#" className="cursor-pointer">B Vitamini</a></li>
                <li><a href="#" className="cursor-pointer">D Vitamini</a></li>
                <li><a href="#" className="cursor-pointer">K Vitamini</a></li>
              </ul>
            </div>
            {/* MİNERALLER */}
            <div>
              <h3 className="font-bold mb-2">MİNERALLER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">Magnezyum</a></li>
                <li><a href="#" className="cursor-pointer">Demir</a></li>
                <li><a href="#" className="cursor-pointer">Krom</a></li>
                <li><a href="#" className="cursor-pointer">Selenyum</a></li>
              </ul>
            </div>
            {/* BİTKİSEL ÜRÜNLER */}
            <div>
              <h3 className="font-bold mb-2">BİTKİSEL ÜRÜNLER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">Green Detox</a></li>
                <li><a href="#" className="cursor-pointer">Milk Thistle</a></li>
                <li><a href="#" className="cursor-pointer">Tribulus Terrestris</a></li>
                <li><a href="#" className="cursor-pointer">Saw Palmetto</a></li>
                <li><a href="#" className="cursor-pointer">L-Theanine</a></li>
                <li><a href="#" className="cursor-pointer">Panax Ginseng</a></li>
                <li><a href="#" className="cursor-pointer">5-HTP</a></li>
                <li><a href="#" className="cursor-pointer">L-Tyrosine</a></li>
                <li><a href="#" className="cursor-pointer">Rhodiola Rosea</a></li>
                <li><a href="#" className="cursor-pointer">Gingko Biloba</a></li>
                <li><a href="#" className="cursor-pointer">Beta Glukan</a></li>
              </ul>
            </div>
            {/* DİĞER */}
            <div>
              <h3 className="font-bold mb-2">DİĞER</h3>
              <ul className="space-y-1">
                <li><a href="#" className="cursor-pointer">CLA</a></li>
                <li><a href="#" className="cursor-pointer">Bromelain</a></li>
                <li><a href="#" className="cursor-pointer">Koenzim Q 10</a></li>
                <li><a href="#" className="cursor-pointer">Alpha GPC</a></li>
                <li><a href="#" className="cursor-pointer">Glutatyon</a></li>
                <li><a href="#" className="cursor-pointer">NMN</a></li>
                <li><a href="#" className="cursor-pointer">Hyaluronik Asit</a></li>
                <li><a href="#" className="cursor-pointer">Laktaz</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VitaminDropdown;
