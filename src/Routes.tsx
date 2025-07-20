import { createBrowserRouter, type RouteObject } from "react-router";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
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
                path: "/product",
                element: <ProductDetails/>
            }
        ]
    }
]

const router = createBrowserRouter(routes);

export default router;