export interface Product {
    id: number;
    ProductName: string;
    img: string;
    ShortDescription: string;
    CommentNumber: number;
    Stars: number;
    Price: string | number;
    DiscountedPrice?: string | number;
  }

export const products: Product[] = [
    {
      id: 1,
      ProductName: "WHEY PROTEIN",
      img: "/Header/whey-protein.png",
      ShortDescription: "EN ÇOK TERCİH EDİLEN PROTEİN TAKVİYESİ",
      CommentNumber: 10869,
      Stars: 5,
      Price: "549 TL",
      DiscountedPrice: "449 TL"
    },
    {
      id: 2,
      ProductName: "CREATINE",
      img: "/Header/whey-protein.png",
      ShortDescription: "GÜÇ VE PERFORMANS ARTIRICI",
      CommentNumber: 7562,
      Stars: 4,
      Price: "299 TL",
      DiscountedPrice: "249 TL"
    },
    {
      id: 3,
      ProductName: "BCAA",
      img: "/Header/whey-protein.png",
      ShortDescription: "KAS YORGUNLUĞUNU AZALTIR",
      CommentNumber: 4321,
      Stars: 5,
      Price: "199 TL"
    },
    {
      id: 4,
      ProductName: "VITAMIN D",
      img: "/Header/whey-protein.png",
      ShortDescription: "BAĞIŞIKLIK SİSTEMİ DESTEĞİ",
      CommentNumber: 3214,
      Stars: 4,
      Price: "89 TL",
      DiscountedPrice: "69 TL"
    },
    {
      id: 5,
      ProductName: "OMEGA 3",
      img: "/Header/whey-protein.png",
      ShortDescription: "KALP SAĞLIĞI İÇİN",
      CommentNumber: 5678,
      Stars: 5,
      Price: "159 TL"
    },
    {
      id: 6,
      ProductName: "MULTIVITAMIN",
      img: "/Header/whey-protein.png",
      ShortDescription: "GÜNLÜK VİTAMİN İHTİYACI",
      CommentNumber: 2345,
      Stars: 4,
      Price: "129 TL",
      DiscountedPrice: "99 TL"
    }
  ];