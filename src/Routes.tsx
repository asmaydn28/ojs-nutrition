import { createBrowserRouter, type RouteObject } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import AllProducts from "./pages/AllProducts/AllProducts";
import RootLayout from "./Root";
import Contact from "./pages/Contact/Contact";
import Faq from "./pages/Faq/Faq";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import MyAccount from "./pages/MyAccount/MyAccount";
import AboutUs from "./pages/AboutUs/AboutUs";
import Payment from "./pages/Payment/Payment";

// API fonksiyonları
import { getBestSellers, getAllProducts, getProductBySlug, getProductComments, DEFAULT_LIMIT } from "./api";
import { calculateTotalPages } from "./utils/formatters";

// HomePage loader - Çok satanları çeker
async function homePageLoader() {
  const bestSellers = await getBestSellers();
  return { bestSellers };
}

// AllProducts loader - Tüm ürünleri sayfalı çeker
async function allProductsLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const products = await getAllProducts(page, DEFAULT_LIMIT);
  const totalPages = calculateTotalPages(products.count, DEFAULT_LIMIT);
  return { products, currentPage: page, totalPages };
}

// ProductDetails loader - Tek ürün detayını ve yorumlarını çeker
async function productDetailsLoader({ params }: { params: { slug?: string } }) {
  if (!params.slug) {
    throw new Error("Ürün bulunamadı");
  }
  
  try {
    // Ürün ve yorumları paralel olarak çek
    const [product, commentsData] = await Promise.all([
      getProductBySlug(params.slug),
      getProductComments(params.slug, 1, 100).catch((error) => {
        // Yorumlar çekilemezse boş response döndür
        console.warn("Yorumlar çekilemedi, boş liste döndürülüyor:", error);
        return {
          count: 0,
          next: null,
          previous: null,
          results: [],
        };
      }),
    ]);
    
    return { product, commentsData };
  } catch (error) {
    console.error("ProductDetails loader hatası:", error);
    throw error;
  }
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      {
        path: "/product/:slug",
        element: <ProductDetails />,
        loader: productDetailsLoader,
      },
      {
        path: "/urunler",
        element: <AllProducts />,
        loader: allProductsLoader,
      },
      {
        path: "/iletisim",
        element: <Contact />,
      },
      {
        path: "/sss",
        element: <Faq />,
      },
      {
        path: "/giris-yap",
        element: <LoginRegister />,
      },
      {
        path: "/kayit-ol",
        element: <LoginRegister />,
      },
      {
        path: "/hesabım",
        element: <MyAccount />,
      },
      {
        path: "/hakkımızda",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/ödeme",
    element: <Payment />,
  },
];

const router = createBrowserRouter(routes);

export default router;
