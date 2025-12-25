import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ToastProvider from "./components/Toast/ToastProvider";

const RootLayout = () => {
    return (
        <ToastProvider>
          <Navbar/>
          <Outlet/>
        </ToastProvider>
    )
}

export default RootLayout;