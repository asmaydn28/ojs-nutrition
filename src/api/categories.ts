import { API_BASE_URL } from "./config";

// Alt kategori öğesi (en alt seviye)
export interface SubChild {
  name: string;
  slug: string;
  order: number;
}

// Alt kategori (ikinci seviye)
export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
  sub_children: SubChild[];
}

// Çok satan ürün
export interface TopSeller {
  name: string;
  slug: string;
  description: string;
  picture_src: string;
}

// Ana kategori (üst seviye)
export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  children: SubCategory[];
  top_sellers: TopSeller[];
}

// API response yapısı
interface CategoriesApiResponse {
  status: string;
  data: {
    data: Category[];
    status?: string;
  };
}

/* Navbar dropdown ve mobil menü için kullanılır */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if (!response.ok) {
      console.warn(`Kategoriler getirilemedi (${response.status})`);
      return [];
    }

    const json: CategoriesApiResponse = await response.json();

    // API response'u parse et
    if (json.status === "success" && json.data?.data) {
      return json.data.data;
    }

    // Alternatif response formatı
    if (Array.isArray(json.data)) {
      return json.data as unknown as Category[];
    }

    console.warn("Beklenmeyen kategori API formatı:", json);
    return [];
  } catch (error) {
    console.error("Kategoriler çekilirken hata:", error);
    return [];
  }
}

/* Ürün fotoğrafı için tam URL oluşturur*/
export function getCategoryImageUrl(pictureSrc: string | undefined): string {
  if (!pictureSrc) {
    return "/ProductCard/whey-protein.png";
  }
  if (pictureSrc.startsWith("http")) {
    return pictureSrc;
  }
  const baseUrl = "https://fe1111.projects.academy.onlyjs.com";
  return `${baseUrl}${pictureSrc}`;
}
