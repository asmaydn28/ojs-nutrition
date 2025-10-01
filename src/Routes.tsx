import { createBrowserRouter, type RouteObject } from "react-router";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductList from "./pages/ProductList/ProductList";
import RootLayout from "./Root";


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
            }
        ]
    }
]

const router = createBrowserRouter(routes);

export default router;