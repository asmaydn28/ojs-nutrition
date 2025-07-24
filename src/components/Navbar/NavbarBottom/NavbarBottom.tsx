
function NavbarBottom() {
  return (
    <>
      <div className="w-[1200px] h-full flex items-center justify-center">
          {/* 1. Bilgi */}
          <div className="flex items-center gap-2 w-1/3 justify-center">
            {/* İkon */}
            <img src="/Header/image_180.webp.png" alt="Kargo" className="w-4 h-4" />
            {/* Metin */}
            <strong className="font-bold text-[11px] text-[#222] leading-4">AYNI GÜN KARGO</strong>
            <span className="text-[11px] text-[#222] ml-1">16:00'dan önceki siparişlerde</span>
          </div>
          {/* 2. Bilgi */}
          <div className="flex items-center gap-2 w-1/3 justify-center">
            <img src="/Header/image_180-1.webp.png" alt="Ücretsiz Kargo" className="w-4 h-4" />
            <strong className="font-bold text-[11px] text-[#222] leading-4">ÜCRETSİZ KARGO</strong>
            <span className="text-[11px] text-[#222] ml-1">1000 TL üzeri siparişlerde</span>
          </div>
          {/* 3. Bilgi */}
          <div className="flex items-center gap-2 w-1/3 justify-center">
            <img src="/Header/image_180-2.webp.png" alt="Güvenli Alışveriş" className="w-4 h-4" />
            <strong className="font-bold text-[11px] text-[#222] leading-4">GÜVENLİ ALIŞVERİŞ</strong>
            <span className="text-[11px] text-[#222] ml-1">1.000.000+ mutlu müşteri</span>
          </div>
        </div>
    </>
  )
}

export default NavbarBottom
