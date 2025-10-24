import { createBrowserRouter, type RouteObject } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductList from "./pages/ProductList/ProductList";
import RootLayout from "./Root";
import Contact from "./pages/Contact/Contact";
import Faq from "./pages/Faq/Faq";
import LoginRegister from "./pages/LoginRegister/LoginRegister";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "/product/:id",
                element: <ProductDetails/>
            },
            {
                path: "/products/:category",
                element: <ProductList/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/faq",
                element: <Faq/>
            },
            {
                path: "/auth",
                element: <LoginRegister/>
            }
        ]
    }
]

const router = createBrowserRouter(routes);

export default router;