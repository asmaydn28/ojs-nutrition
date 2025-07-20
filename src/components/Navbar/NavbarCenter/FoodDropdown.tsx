

function FoodDropdown() {
  return (
    <div className="relative group">
      <button className="px-4 py-2">GIDA</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2 w-full max-w-[1200px] bg-white shadow-lg hidden group-hover:flex hover:flex items-stretch z-50 text-black rounded">
        {/* Sol: En Çok Satanlar */}
        <div className="flex flex-col p-4 w-[300px] rounded-s bg-gray-200 h-auto">
          <h3 className="font-bold mb-4">EN ÇOK SATANLAR</h3>
          <ul className="flex flex-col gap-2 flex-1 h-auto">
            {/* 1. Ürün */}
            <li className="flex items-center gap-3 cursor-pointer flex-none">
              <img
                src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/creamofrice.webp"
                alt="Cream of Rice"
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <div className="font-bold text-xs">CREAM OF RICE</div>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-700 ml-2 text-xs">8902 Yorum</span>
                </div>
              </div>
            </li>
            {/* 2. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img
                src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/proteinbar.webp"
                alt="Protein Bar"
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <div className="font-bold text-xs">PROTEIN BAR</div>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-700 ml-2 text-xs">1919 Yorum</span>
                </div>
              </div>
            </li>
            {/* 3. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img
                src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/fistikezmesi.webp"
                alt="Fıstık Ezmesi"
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <div className="font-bold text-xs">FISTIK EZMESİ</div>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-700 ml-2 text-xs">2135 Yorum</span>
                </div>
              </div>
            </li>
            {/* 4. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img
                src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/ketcap.webp"
                alt="Ketçap"
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <div className="font-bold text-xs">KETÇAP</div>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-700 ml-2 text-xs">2847 Yorum</span>
                </div>
              </div>
            </li>
            {/* 5. Ürün */}
            <li className="flex-1 flex items-center gap-3 cursor-pointer">
              <img
                src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/flavorpowder.webp"
                alt="Flavor Powder"
                className="w-14 h-14 object-contain rounded"
              />
              <div>
                <div className="font-bold text-xs">FLAVOR POWDER</div>
                <div className="flex items-center text-yellow-400 text-sm">
                  ★★★★★
                  <span className="text-gray-700 ml-2 text-xs">1264 Yorum</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* Sağ: İçerik */}
        <div className="flex-1 flex flex-col p-4">
          <h3 className="font-bold text-lg mb-4">GIDA</h3>
          <div>
            <h3 className="font-bold mb-2">GIDA ÜRÜNLERİ</h3>
            <ul className="space-y-1">
              <li><a href="#" className="cursor-pointer">Pirinç Kreması</a></li>
              <li><a href="#" className="cursor-pointer">Protein Bar</a></li>
              <li><a href="#" className="cursor-pointer">Fıstık Ezmeleri</a></li>
              <li><a href="#" className="cursor-pointer">Düşük Kalorili Soslar</a></li>
              <li><a href="#" className="cursor-pointer">Baharatlar</a></li>
              <li><a href="#" className="cursor-pointer">Tatlandırıcılar</a></li>
              <li><a href="#" className="cursor-pointer">Sprey Zeytinyağı</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDropdown;
