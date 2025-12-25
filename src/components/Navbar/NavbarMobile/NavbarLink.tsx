import { X } from 'lucide-react';
import MobileAccordionItem from './NavbarMobile';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useToastContext } from '@/components/Toast/useToastContext';

interface NavbarDrawer {
  isOpen: boolean;
  onClose: () => void;
}

const toLowerPath = (t: string) => `/products/${encodeURIComponent(t.toLowerCase())}`;

export default function MobileDrawer({ isOpen, onClose }: NavbarDrawer) {
  // Açık sekme anahtarı (örn: 'protein', 'spor' vs.)
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => setOpenKey(prev => (prev === key ? null : key));
  const { isAuthenticated, logout } = useAuthStore();
  const { showToast } = useToastContext();
  const navigate = useNavigate();

  // Çıkış yap ve kullanıcıyı ana sayfaya yönlendir
  const handleLogout = () => {
    logout();
    showToast("Çıkış yapıldı. Görüşmek üzere!", "info");
    onClose();
    navigate('/');
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
              {/* PROTEİN */}
              <MobileAccordionItem
                title="PROTEİN"
                sections={[
                  {
                    header: 'PROTEİNLER',
                    links: [
                      { label: 'Whey Protein', to: toLowerPath('protein') },
                      { label: 'Whey İzole', to: toLowerPath('protein') },
                      { label: 'Clear Whey', to: toLowerPath('protein') },
                      { label: 'Bezelye Proteini', to: toLowerPath('protein') },
                      { label: 'Kolajen Proteini', to: toLowerPath('protein') },
                      { label: 'Süt Proteini', to: toLowerPath('protein') },
                      { label: 'Soya Proteini', to: toLowerPath('protein') },
                    ],
                  },
                  {
                    header: 'PROTEİNLİ ÜRÜNLER',
                    links: [
                      { label: 'Mass Gainer', to: toLowerPath('protein') },
                      { label: 'Protein Bar', to: toLowerPath('protein') },
                      { label: 'Protein Meal (Öğün Tozu)', to: toLowerPath('protein') },
                      { label: 'Protein Coffee', to: toLowerPath('protein') },
                      { label: 'Collagen Coffee', to: toLowerPath('protein') },
                      { label: 'Vegan Gainer', to: toLowerPath('protein') },
                    ],
                  },
                ]}
                isOpen={openKey === 'protein'}
                onToggle={() => toggle('protein')}
                onNavigate={onClose}
              />

              {/* SPOR GIDALARI */}
              <MobileAccordionItem
                title="SPOR GIDALARI"
                sections={[
                  {
                    header: 'AMİNO ASİTLER',
                    links: [
                      { label: 'Creatine', to: toLowerPath('spor gıdaları') },
                      { label: 'L-Carnitine', to: toLowerPath('spor gıdaları') },
                      { label: 'Creatine Creapure', to: toLowerPath('spor gıdaları') },
                      { label: 'BCAA', to: toLowerPath('spor gıdaları') },
                      { label: 'Glutamine', to: toLowerPath('spor gıdaları') },
                      { label: 'EAA', to: toLowerPath('spor gıdaları') },
                      { label: 'Arginine', to: toLowerPath('spor gıdaları') },
                      { label: 'Taurine', to: toLowerPath('spor gıdaları') },
                      { label: 'Leucine', to: toLowerPath('spor gıdaları') },
                    ],
                  },
                  {
                    header: 'PRE-WORKOUT',
                    links: [
                      { label: 'Pre-Workout Supreme', to: toLowerPath('spor gıdaları') },
                      { label: 'HydroPrime', to: toLowerPath('spor gıdaları') },
                      { label: 'Thermo Burner', to: toLowerPath('spor gıdaları') },
                      { label: 'Heavy Duty Pre-Workout', to: toLowerPath('spor gıdaları') },
                      { label: 'Hydration', to: toLowerPath('spor gıdaları') },
                      { label: 'Citrulline', to: toLowerPath('spor gıdaları') },
                      { label: 'Supreme Pump (Stim Free)', to: toLowerPath('spor gıdaları') },
                      { label: 'Beta Alanine', to: toLowerPath('spor gıdaları') },
                      { label: 'Betaine', to: toLowerPath('spor gıdaları') },
                    ],
                  },
                  {
                    header: 'KARBONHİDRATLAR',
                    links: [
                      { label: 'Pirinç Kreması', to: toLowerPath('spor gıdaları') },
                      { label: 'Mass Gainer', to: toLowerPath('spor gıdaları') },
                      { label: 'Maltodekstrin', to: toLowerPath('spor gıdaları') },
                      { label: 'Dekstroz', to: toLowerPath('spor gıdaları') },
                      { label: 'Vegan Gainer', to: toLowerPath('spor gıdaları') },
                    ],
                  },
                  {
                    header: 'DİĞER',
                    links: [
                      { label: 'Ultra Focus', to: toLowerPath('spor gıdaları') },
                      { label: 'Gamer Hack', to: toLowerPath('spor gıdaları') },
                      { label: 'Intra Workout', to: toLowerPath('spor gıdaları') },
                      { label: 'Elektrolit Blend', to: toLowerPath('spor gıdaları') },
                      { label: 'Hydration', to: toLowerPath('spor gıdaları') },
                      { label: 'CLA', to: toLowerPath('spor gıdaları') },
                      { label: 'Protein Meal (Öğün Tozu)', to: toLowerPath('spor gıdaları') },
                    ],
                  },
                ]}
                isOpen={openKey === 'spor'}
                onToggle={() => toggle('spor')}
                onNavigate={onClose}
              />

              {/* SAĞLIK */}
              <MobileAccordionItem
                title="SAĞLIK"
                sections={[
                  {
                    header: 'FONKSİYONEL GIDALAR',
                    links: [
                      { label: 'Collagen', to: toLowerPath('sağlık') },
                      { label: 'Deep Sleep', to: toLowerPath('sağlık') },
                      { label: 'Protein Coffee', to: toLowerPath('sağlık') },
                      { label: 'Protein Meal (Öğün Tozu)', to: toLowerPath('sağlık') },
                      { label: 'Prebiyotik', to: toLowerPath('sağlık') },
                      { label: 'Collagen Coffee', to: toLowerPath('sağlık') },
                      { label: 'Digestion', to: toLowerPath('sağlık') },
                      { label: 'Tatlandırıcı', to: toLowerPath('sağlık') },
                      { label: 'Mct Oil', to: toLowerPath('sağlık') },
                      { label: 'Inulin', to: toLowerPath('sağlık') },
                    ],
                  },
                  {
                    header: 'BİTKİ TOZLARI',
                    links: [
                      { label: 'Greens & Superfoods', to: toLowerPath('sağlık') },
                      { label: 'Green Detox', to: toLowerPath('sağlık') },
                      { label: 'Red Detox', to: toLowerPath('sağlık') },
                      { label: 'Brokoli Tozu', to: toLowerPath('sağlık') },
                      { label: 'Maca Kökü Tozu', to: toLowerPath('sağlık') },
                      { label: 'Spirulina Tozu', to: toLowerPath('sağlık') },
                      { label: 'Ispanak Tozu', to: toLowerPath('sağlık') },
                      { label: 'Maydanoz Tozu', to: toLowerPath('sağlık') },
                    ],
                  },
                  {
                    header: 'ZAYIFLAMA',
                    links: [
                      { label: 'L-Carnitine', to: toLowerPath('sağlık') },
                      { label: 'Thermo Burner', to: toLowerPath('sağlık') },
                      { label: 'L-Carnitine Shot', to: toLowerPath('sağlık') },
                      { label: 'CLA', to: toLowerPath('sağlık') },
                      { label: 'Hunger Buster', to: toLowerPath('sağlık') },
                      { label: 'CLA+', to: toLowerPath('sağlık') },
                    ],
                  },
                ]}
                isOpen={openKey === 'saglik'}
                onToggle={() => toggle('saglik')}
                onNavigate={onClose}
              />

              {/* GIDA */}
              <MobileAccordionItem
                title="GIDA"
                sections={[
                  {
                    header: 'GIDA ÜRÜNLERİ',
                    links: [
                      { label: 'Pirinç Kreması', to: toLowerPath('gıda') },
                      { label: 'Protein Bar', to: toLowerPath('gıda') },
                      { label: 'Fıstık Ezmeleri', to: toLowerPath('gıda') },
                      { label: 'Düşük Kalorili Soslar', to: toLowerPath('gıda') },
                      { label: 'Baharatlar', to: toLowerPath('gıda') },
                      { label: 'Tatlandırıcılar', to: toLowerPath('gıda') },
                      { label: 'Sprey Zeytinyağı', to: toLowerPath('gıda') },
                    ],
                  },
                ]}
                isOpen={openKey === 'gida'}
                onToggle={() => toggle('gida')}
                onNavigate={onClose}
              />

              {/* VİTAMİN */}
              <MobileAccordionItem
                title="VİTAMİN"
                sections={[
                  {
                    header: 'ÖZEL FORMÜL ÜRÜNLER',
                    links: [
                      { label: 'Thermo Burner', to: toLowerPath('vitaminler') },
                      { label: 'LVR', to: toLowerPath('vitaminler') },
                      { label: 'KDNY', to: toLowerPath('vitaminler') },
                      { label: 'T-Prime', to: toLowerPath('vitaminler') },
                      { label: 'Hunger Buster', to: toLowerPath('vitaminler') },
                      { label: 'Beauty Formula', to: toLowerPath('vitaminler') },
                      { label: 'Relax', to: toLowerPath('vitaminler') },
                      { label: 'Focus Formula', to: toLowerPath('vitaminler') },
                      { label: 'Gamer Multivitamin', to: toLowerPath('vitaminler') },
                      { label: 'GDA', to: toLowerPath('vitaminler') },
                      { label: 'C-Blocker', to: toLowerPath('vitaminler') },
                      { label: 'Sleep Formula', to: toLowerPath('vitaminler') },
                    ],
                  },
                  {
                    header: 'POPÜLER TAKVİYELER',
                    links: [
                      { label: 'ZMA', to: toLowerPath('vitaminler') },
                      { label: 'Thermo Burner', to: toLowerPath('vitaminler') },
                      { label: 'Omega 3', to: toLowerPath('vitaminler') },
                      { label: 'Multivitamin', to: toLowerPath('vitaminler') },
                      { label: 'C Vitamini Efervesan', to: toLowerPath('vitaminler') },
                      { label: 'Kafein', to: toLowerPath('vitaminler') },
                      { label: 'Kolajen + Hyaluronik Asit', to: toLowerPath('vitaminler') },
                      { label: 'Glikozamin Kondroitin', to: toLowerPath('vitaminler') },
                      { label: 'MSM', to: toLowerPath('vitaminler') },
                    ],
                  },
                  {
                    header: 'VİTAMİNLER',
                    links: [
                      { label: 'C Vitamini', to: toLowerPath('vitaminler') },
                      { label: 'B Vitamini', to: toLowerPath('vitaminler') },
                      { label: 'D Vitamini', to: toLowerPath('vitaminler') },
                      { label: 'K Vitamini', to: toLowerPath('vitaminler') },
                    ],
                  },
                  {
                    header: 'MİNERALLER',
                    links: [
                      { label: 'Magnezyum', to: toLowerPath('vitaminler') },
                      { label: 'Demir', to: toLowerPath('vitaminler') },
                      { label: 'Krom', to: toLowerPath('vitaminler') },
                      { label: 'Selenyum', to: toLowerPath('vitaminler') },
                    ],
                  },
                  {
                    header: 'BİTKİSEL ÜRÜNLER',
                    links: [
                      { label: 'Green Detox', to: toLowerPath('vitaminler') },
                      { label: 'Milk Thistle', to: toLowerPath('vitaminler') },
                      { label: 'Tribulus Terrestris', to: toLowerPath('vitaminler') },
                      { label: 'Saw Palmetto', to: toLowerPath('vitaminler') },
                      { label: 'L-Theanine', to: toLowerPath('vitaminler') },
                      { label: 'Panax Ginseng', to: toLowerPath('vitaminler') },
                      { label: '5-HTP', to: toLowerPath('vitaminler') },
                      { label: 'L-Tyrosine', to: toLowerPath('vitaminler') },
                      { label: 'Rhodiola Rosea', to: toLowerPath('vitaminler') },
                      { label: 'Gingko Biloba', to: toLowerPath('vitaminler') },
                      { label: 'Beta Glukan', to: toLowerPath('vitaminler') },
                    ],
                  },
                  {
                    header: 'DİĞER',
                    links: [
                      { label: 'CLA', to: toLowerPath('vitaminler') },
                      { label: 'Bromelain', to: toLowerPath('vitaminler') },
                      { label: 'Koenzim Q 10', to: toLowerPath('vitaminler') },
                      { label: 'Alpha GPC', to: toLowerPath('vitaminler') },
                      { label: 'Glutatyon', to: toLowerPath('vitaminler') },
                      { label: 'NMN', to: toLowerPath('vitaminler') },
                      { label: 'Hyaluronik Asit', to: toLowerPath('vitaminler') },
                      { label: 'Laktaz', to: toLowerPath('vitaminler') },
                    ],
                  },
                ]}
                isOpen={openKey === 'vitamin'}
                onToggle={() => toggle('vitamin')}
                onNavigate={onClose}
              />

              {/* AKSESUAR */}
              <MobileAccordionItem
                title="AKSESUAR"
                sections={[
                  {
                    links: [
                      { label: 'Termal Korse', to: toLowerPath('aksesuar') },
                      { label: 'Wrist Wraps (Bilek Sargısı)', to: toLowerPath('aksesuar') },
                      { label: 'Lifting Straps', to: toLowerPath('aksesuar') },
                      { label: 'Tișörtler', to: toLowerPath('aksesuar') },
                      { label: 'Relentless Shaker', to: toLowerPath('aksesuar') },
                      { label: 'Pocket Shaker', to: toLowerPath('aksesuar') },
                      { label: 'Pillbox', to: toLowerPath('aksesuar') },
                      { label: 'Huni', to: toLowerPath('aksesuar') },
                      { label: 'Proteinocean Havlu', to: toLowerPath('aksesuar') },
                      { label: 'Relentless Gym Handbag', to: toLowerPath('aksesuar') },
                    ],
                  },
                ]}
                isOpen={openKey === 'aksesuar'}
                onToggle={() => toggle('aksesuar')}
                onNavigate={onClose}
              />

              {/* TÜM ÜRÜNLER */}
              <li className="pt-2">
                <a className="block py-3 font-bold" href="#" onClick={onClose}>
                  TÜM ÜRÜNLER
                </a>
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
