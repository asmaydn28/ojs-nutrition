import { X } from 'lucide-react';
import MobileAccordionItem from './NavbarMobile';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useCategoriesStore } from '@/store/categories';
import { useToastContext } from '@/components/Toast/useToastContext';

interface NavbarDrawer {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: NavbarDrawer) {
  // Açık sekme anahtarı (örn: 'protein', 'spor' vs.)
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey(prev => (prev === key ? null : key));
  const { isAuthenticated, logout } = useAuthStore();
  const { categories } = useCategoriesStore();
  const { showToast } = useToastContext();
  const navigate = useNavigate();

  // Çıkış yap ve kullanıcıyı ana sayfaya yönlendir
  const handleLogout = () => {
    logout();
    showToast("Çıkış yapıldı. Görüşmek üzere!", "info");
    onClose();
    navigate('/');
  };

  // Kategori verisini MobileAccordionItem formatına dönüştür
  const getCategorySections = (categorySlug: string) => {
    const category = categories.find(c => c.slug === categorySlug);
    if (!category) return [];

    // Children'ları order'a göre sırala
    const sortedChildren = [...category.children].sort((a, b) => a.order - b.order);

    return sortedChildren.map(child => ({
      header: child.name,
      links: [...(child.sub_children || [])]
        .sort((a, b) => a.order - b.order)
        .map(subChild => ({
          label: subChild.name,
          to: `/product/${subChild.slug}`,
        })),
    }));
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Overlay - şeffaf beyaz */}
          <div
            className="fixed inset-0 bg-white/50 z-40 animate-in fade-in duration-300"
            onClick={onClose}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 animate-in slide-in-from-left duration-300 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Menü</h2>
              <button onClick={onClose}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 flex-1 overflow-y-auto overscroll-contain touch-pan-y flex flex-col">
              <ul className="space-y-2">
                {/* Dinamik Kategoriler */}
                {categories.map((category) => (
                  <MobileAccordionItem
                    key={category.id}
                    title={category.name}
                    sections={getCategorySections(category.slug)}
                    isOpen={openKey === category.slug}
                    onToggle={() => toggle(category.slug)}
                    onNavigate={onClose}
                  />
                ))}

                {/* TÜM ÜRÜNLER */}
                <li className="pt-2">
                  <Link 
                    to="/urunler" 
                    className="block py-3 font-bold" 
                    onClick={onClose}
                  >
                    TÜM ÜRÜNLER
                  </Link>
                </li>
              </ul>
            </div>

            {/* Alt gri alan */}
            <div className="mt-auto bg-gray-100 p-4">
                {isAuthenticated && (
                  <Link to="/hesabım" className="block py-2" onClick={onClose}>HESABIM</Link>
                )}
                <Link to="/" className="block py-2" onClick={onClose}>MÜŞTERİ YORUMLARI</Link>
                <Link to="/iletisim" className="block py-2" onClick={onClose}>İLETİŞİM</Link>
                <div className="flex gap-2 mt-4">
                  {!isAuthenticated ? (
                    <>
                      <Link to="/kayit-ol" onClick={onClose} className="flex-1 bg-black text-white text-center py-2 rounded hover:bg-gray-800 transition-colors">Üye Ol</Link>
                      <Link to="/giris-yap" onClick={onClose} className="flex-1 bg-black text-white text-center py-2 rounded hover:bg-gray-800 transition-colors">Üye Girişi</Link>
                    </>
                  ) : (
                    <button 
                      onClick={handleLogout} 
                      className="flex-1 bg-red-600 text-white text-center py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      Çıkış Yap
                    </button>
                  )}
                </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
