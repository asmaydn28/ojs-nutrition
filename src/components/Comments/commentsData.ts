import type { Comment } from './types';

// Merkezi yorum verisi - Backend'den gelecek şekilde hazır
// Şimdilik mock data, backend entegrasyonunda bu dosya API çağrısı ile değiştirilecek
export const commentsData: Comment[] = [
  {
    id: 1,
    starCount: 5,
    name: "Ahmet Yılmaz",
    title: "Mükemmel ürün!",
    content: "Gerçekten çok kaliteli bir ürün. Tavsiye ederim. Hızlı teslimat ve güvenilir satıcı.",
    date: "15/01/2025",
    isVerified: true,
    productName: "L carnitine",
    productLink: "#"
  },
  {
    id: 2,
    starCount: 4,
    name: "Ayşe Demir",
    title: "İyi ama fiyat biraz yüksek",
    content: "Ürün kalitesi güzel ama fiyat biraz pahalı. Yine de memnunum.",
    date: "12/01/2025",
    isVerified: false,
    productName: "Whey Protein",
    productLink: "#"
  },
  {
    id: 3,
    starCount: 5,
    name: "Mehmet Kaya",
    title: "Harika!",
    content: "Beklentilerimi aştı. Çok memnun kaldım. Tekrar alacağım.",
    date: "08/01/2025",
    isVerified: true,
    productName: "BCAA",
    productLink: "#"
  },
  {
    id: 4,
    starCount: 3,
    name: "Fatma Özkan",
    title: "Orta seviye",
    content: "Ürün fena değil ama daha iyi olabilirdi. Fiyat performans orta.",
    date: "05/01/2025",
    isVerified: false,
    productName: "Creatine",
    productLink: "#"
  },
  {
    id: 5,
    starCount: 5,
    name: "Ali Çelik",
    title: "Süper kalite",
    content: "Gerçekten kaliteli ürün. Paketleme de çok güzel. Teşekkürler.",
    date: "02/01/2025",
    isVerified: true,
    productName: "Vitamin D3",
    productLink: "#"
  },
  {
    id: 6,
    starCount: 2,
    name: "Zeynep Arslan",
    title: "Hayal kırıklığı",
    content: "Beklediğim gibi değildi. Kalite düşük geldi bana.",
    date: "28/12/2024",
    isVerified: false,
    productName: "Omega 3",
    productLink: "#"
  },
  {
    id: 7,
    starCount: 4,
    name: "Mustafa Şahin",
    title: "Güzel ürün",
    content: "Genel olarak memnunum. Hızlı kargo ve güvenilir.",
    date: "25/12/2024",
    isVerified: true,
    productName: "Multivitamin",
    productLink: "#"
  },
  {
    id: 8,
    starCount: 5,
    name: "Elif Yıldız",
    title: "Mükemmel!",
    content: "Çok beğendim. Kalite çok iyi. Herkese tavsiye ederim.",
    date: "22/12/2024",
    isVerified: true,
    productName: "L carnitine",
    productLink: "#"
  },
  {
    id: 9,
    starCount: 3,
    name: "Okan Bulut",
    title: "İdare eder",
    content: "Fena değil ama daha iyi olabilirdi. Fiyat biraz yüksek.",
    date: "20/12/2024",
    isVerified: false,
    productName: "Glutamine",
    productLink: "#"
  },
  {
    id: 10,
    starCount: 4,
    name: "Selin Aktaş",
    title: "İyi ürün",
    content: "Kaliteli ve güvenilir. Hızlı teslimat. Memnunum.",
    date: "18/12/2024",
    isVerified: true,
    productName: "ZMA",
    productLink: "#"
  },
  {
    id: 11,
    starCount: 5,
    name: "Burak Özdemir",
    title: "Harika kalite",
    content: "Gerçekten çok kaliteli. Beklentilerimi aştı. Teşekkürler.",
    date: "15/12/2024",
    isVerified: true,
    productName: "Pre Workout",
    productLink: "#"
  },
  {
    id: 12,
    starCount: 1,
    name: "Gamze Kılıç",
    title: "Çok kötü",
    content: "Hiç beğenmedim. Kalite çok düşük. Para kaybı.",
    date: "12/12/2024",
    isVerified: false,
    productName: "Casein Protein",
    productLink: "#"
  },
  {
    id: 13,
    starCount: 4,
    name: "Emre Doğan",
    title: "Güzel ürün",
    content: "Genel olarak iyi. Hızlı kargo. Memnunum.",
    date: "10/12/2024",
    isVerified: false,
    productName: "L carnitine",
    productLink: "#"
  },
  {
    id: 14,
    starCount: 5,
    name: "Deniz Yılmaz",
    title: "Süper!",
    content: "Mükemmel kalite. Çok memnun kaldım. Tekrar alacağım.",
    date: "08/12/2024",
    isVerified: true,
    productName: "Whey Protein",
    productLink: "#"
  },
  {
    id: 15,
    starCount: 3,
    name: "Cem Öztürk",
    title: "Orta",
    content: "Fena değil ama daha iyi olabilirdi. Fiyat performans orta.",
    date: "05/12/2024",
    isVerified: false,
    productName: "BCAA",
    productLink: "#"
  },
  {
    id: 16,
    starCount: 4,
    name: "Pınar Aydın",
    title: "İyi kalite",
    content: "Kaliteli ürün. Hızlı teslimat. Güvenilir satıcı.",
    date: "02/12/2024",
    isVerified: true,
    productName: "Creatine",
    productLink: "#"
  },
  {
    id: 17,
    starCount: 5,
    name: "Tolga Korkmaz",
    title: "Mükemmel ürün",
    content: "Gerçekten çok kaliteli. Paketleme de güzel. Teşekkürler.",
    date: "30/11/2024",
    isVerified: true,
    productName: "Vitamin D3",
    productLink: "#"
  },
  {
    id: 18,
    starCount: 2,
    name: "Seda Yıldırım",
    title: "Hayal kırıklığı",
    content: "Beklediğim gibi değildi. Kalite düşük. Memnun değilim.",
    date: "28/11/2024",
    isVerified: false,
    productName: "Omega 3",
    productLink: "#"
  },
  {
    id: 19,
    starCount: 4,
    name: "Kemal Güneş",
    title: "Güzel",
    content: "İyi ürün. Hızlı kargo. Genel olarak memnunum.",
    date: "25/11/2024",
    isVerified: false,
    productName: "Multivitamin",
    productLink: "#"
  },
  {
    id: 20,
    starCount: 5,
    name: "Nurcan Erdoğan",
    title: "Harika!",
    content: "Çok beğendim. Kalite mükemmel. Herkese tavsiye ederim.",
    date: "22/11/2024",
    isVerified: true,
    productName: "L carnitine",
    productLink: "#"
  },
  {
    id: 21,
    starCount: 5,
    name: "Mustafa Ü.",
    title: "Gayet şeffaf ve güzel kargoyla geldi çok memnun kaldım",
    content: "Gayet şeffaf ve güzel kargoyla geldi çok memnun kaldım",
    date: "06/05/24",
    isVerified: true,
    productName: "L carnitine",
    productLink: "#"
  }
];

