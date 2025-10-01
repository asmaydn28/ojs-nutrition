export interface ProductListItem {
  id: number;
  ProductName: string;
  img: string;
  ShortDescription: string;
  CommentNumber: number;
  Stars: number;
  Price: string | number;
  DiscountedPrice?: string | number;
  category: string;
}

// Tüm ürünler için whey-protein.png kullan
const productImage = "/ProductCard/whey-protein.png";

// Figma tasarımına uygun 12 ürün listesi - tüm kategoriler için aynı ürünler
export const fixedProducts: ProductListItem[] = [
  {
    id: 1,
    ProductName: "WHEY PROTEIN",
    img: productImage,
    ShortDescription: "EN ÇOK TERCİH EDİLEN PROTEİN TAKVİYESİ",
    CommentNumber: 10869,
    Stars: 5,
    Price: "549 TL",
    category: "PROTEİN"
  },
  {
    id: 2,
    ProductName: "WHEY ISOLATE",
    img: productImage,
    ShortDescription: "500 PROTEINLIEN SAF WHEY",
    CommentNumber: 887,
    Stars: 5,
    Price: "749 TL",
    category: "PROTEİN"
  },
  {
    id: 3,
    ProductName: "FITNESS PAKETİ",
    img: productImage,
    ShortDescription: "EN POPÜLER ÜRÜNLER BİR ARADA",
    CommentNumber: 7650,
    Stars: 4,
    Price: "799 TL",
    DiscountedPrice: "1126 TL",
    category: "PROTEİN"
  },
  {
    id: 4,
    ProductName: "PEA PROTEIN",
    img: productImage,
    ShortDescription: "EN POPÜLER VEGAN PROTEIN KAYNAĞI",
    CommentNumber: 1778,
    Stars: 4,
    Price: "349 TL",
    category: "PROTEİN"
  },
  {
    id: 5,
    ProductName: "MICELLAR CASEIN",
    img: productImage,
    ShortDescription: "YAVAŞ SİNDİRİLEN PROTEIN KAYNAĞI",
    CommentNumber: 188,
    Stars: 4,
    Price: "599 TL",
    category: "PROTEİN"
  },
  {
    id: 6,
    ProductName: "EGG WHITE POWDER",
    img: productImage,
    ShortDescription: "PROTEİNİN ALTIN STANDARTI",
    CommentNumber: 330,
    Stars: 5,
    Price: "899 TL",
    category: "PROTEİN"
  },
  {
    id: 7,
    ProductName: "MILK PROTEIN",
    img: productImage,
    ShortDescription: "580 KAZEIN, %20 WHEY PROTEIN",
    CommentNumber: 205,
    Stars: 5,
    Price: "699 TL",
    category: "PROTEİN"
  },
  {
    id: 8,
    ProductName: "SOYA PROTEIN",
    img: productImage,
    ShortDescription: "VEGAN PROTEIN KAYNAĞI",
    CommentNumber: 214,
    Stars: 4,
    Price: "449 TL",
    category: "PROTEİN"
  },
  {
    id: 9,
    ProductName: "PROTEIN BAR 2'Lİ PAKET",
    img: productImage,
    ShortDescription: "130 PROTEIN ŞEKER İLAVESİZ",
    CommentNumber: 166,
    Stars: 5,
    Price: "59 TL",
    DiscountedPrice: "90 TL",
    category: "PROTEİN"
  },
  {
    id: 10,
    ProductName: "MASS GAINER LANSMAN",
    img: productImage,
    ShortDescription: "YÜKSEK KALORİLİ PRATİK ÖĞÜN",
    CommentNumber: 339,
    Stars: 4,
    Price: "699 TL",
    DiscountedPrice: "999 TL",
    category: "PROTEİN"
  },
  {
    id: 11,
    ProductName: "PROTEIN BAR",
    img: productImage,
    ShortDescription: "530 PROTEIN, ŞEKER İLAVESİZ",
    CommentNumber: 508,
    Stars: 5,
    Price: "249 TL",
    DiscountedPrice: "349 TL",
    category: "PROTEİN"
  },
  {
    id: 12,
    ProductName: "COLLAGEN COFFEE",
    img: productImage,
    ShortDescription: "KOLAJENLİ KAHVE",
    CommentNumber: 377,
    Stars: 5,
    Price: "349 TL",
    category: "PROTEİN"
  }
];

// Tüm kategoriler için aynı ürün listesi
export const productListData: Record<string, ProductListItem[]> = {
  "PROTEİN": fixedProducts,
  "VİTAMİNLER": fixedProducts,
  "SAĞLIK": fixedProducts,
  "SPOR GIDALARI": fixedProducts,
  "GIDA": fixedProducts,
  "AKSESUAR": fixedProducts
} as const;
