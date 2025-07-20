function ProteinDropdown() {
  return (
    <>
      <div className="relative group">
        <button className="px-4 py-2">PROTEİN</button>
        <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2 w-full max-w-[1200px] bg-white shadow-lg hidden group-hover:flex hover:flex items-stretch z-50 text-black rounded">
          {/* Sol: En Çok Satanlar */}
          <div className="flex flex-col p-4 w-[300px] rounded-s bg-gray-200 h-auto">
            <h3 className="font-bold mb-4">EN ÇOK SATANLAR</h3>
            <ul className="flex flex-col gap-2 flex-1 h-auto">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <li key={i} className="flex items-center gap-3 cursor-pointer flex-none">
                  <img
                    src="https://cdn.myikas.com/images/00b6c111-71dc-4400-932f-8db87e5da64c/5bc3a9e3-33db-4a58-b660-ee16b2a54ea8/3840/wheyproteinbiscuit-1500cc.webp"
                    alt="Ürün"
                    className="w-14 h-14 object-contain rounded"
                  />
                  <div>
                    <div className="font-bold text-xs">WHEY PROTEIN</div>
                    <div className="flex items-center text-yellow-400 text-sm">
                      ★★★★★
                      <span className="text-gray-700 ml-2 text-xs">
                        18002 Yorum
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Sağ: İçerik */}
          <div className="flex-1 flex flex-col p-4">
            <h3 className="font-bold text-lg mb-4">PROTEİN</h3>
            <div className="flex flex-row gap-12">
              {/* Orta: PROTEİNLER */}
              <div className="flex-1">
                <h3 className="font-bold mb-2">PROTEİNLER</h3>
                <ul className="space-y-1">
                  <li><a href="#" className="cursor-pointer">Whey Protein</a></li>
                  <li><a href="#" className="cursor-pointer">Whey İzole</a></li>
                  <li><a href="#" className="cursor-pointer">Clear Whey</a></li>
                  <li><a href="#" className="cursor-pointer">Bezelye Proteini</a></li>
                  <li><a href="#" className="cursor-pointer">Kolajen Proteini</a></li>
                  <li><a href="#" className="cursor-pointer">Süt Proteini</a></li>
                  <li><a href="#" className="cursor-pointer">Soya Proteini</a></li>
                </ul>
              </div>
              {/* Sağ: PROTEİNLİ ÜRÜNLER */}
              <div className="flex-1">
                <h3 className="font-bold mb-2">PROTEİNLİ ÜRÜNLER</h3>
                <ul className="space-y-1">
                  <li><a href="#" className="cursor-pointer">Mass Gainer</a></li>
                  <li><a href="#" className="cursor-pointer">Protein Bar</a></li>
                  <li><a href="#" className="cursor-pointer">Protein Meal (Öğün Tozu)</a></li>
                  <li><a href="#" className="cursor-pointer">Protein Coffee</a></li>
                  <li><a href="#" className="cursor-pointer">Collagen Coffee</a></li>
                  <li><a href="#" className="cursor-pointer">Vegan Gainer</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProteinDropdown;
