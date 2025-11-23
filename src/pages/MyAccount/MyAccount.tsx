import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import AccountDetails from "./components/AccountDetails";
import Addresses from "./components/Addresses";
import Orders from "./components/Orders";

export interface Country {
  code: string;
  name: string;
  flag: string;
  prefix: string;
}

function MyAccount() {

  const [activeTab, setActiveTab] = useState("accountDetails");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  }

  const countries: Country[] = [
    { code: "TR", name: "Türkiye", flag: "🇹🇷", prefix: "+90" },
    { code: "US", name: "Amerika", flag: "🇺🇸", prefix: "+1" },
    { code: "DE", name: "Almanya", flag: "🇩🇪", prefix: "+49" },
    { code: "FR", name: "Fransa", flag: "🇫🇷", prefix: "+33" }
  ];

  return (
  <>  
    <div className="md:mt-50 mt-40 mb-15 max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="text-center md:text-left mb-5 md:mb-0">
            <h1 className="font-bold mb-5 text-4xl leading-10">Hesabım</h1>

            <button
              className={`group block mb-5 font-semibold leading-6 text-[14.25px] hover:text-red-500 active:text-red-700 focus:text-gray-500 ${activeTab === "accountDetails" ? "text-black" : "text-gray"}`} onClick={() => handleTabClick("accountDetails")}>
                <span className="flex">
                  <img alt="hesap" src="/MyAccount/Group.svg" className="mr-2" /> Hesap Bilgilerim
                </span>
            </button>

            <button
              className={`block mb-5 font-semibold leading-6 text-[14.25px]
              hover:text-red-500 active:text-red-700 focus:text-gray-500 ${activeTab === "orders" ? "text-black" : "text-gray"}`} onClick={() => handleTabClick("orders")}>
                <span className="flex">
                  <img alt="hesap" src="/MyAccount/SVG.svg" className="mr-2" /> Siparişlerim
                </span>
            </button>

            <button
              className={`block font-semibold leading-6 text-[14.25px]
              hover:text-red-500 active:text-red-700 focus:text-gray-500 ${activeTab === "addresses" ? "text-black" : "text-gray"}`} onClick={() => handleTabClick("addresses")}>
                <span className="flex">
                  <img alt="hesap" src="/MyAccount/SVG (1).svg" className="mr-2" /> Adreslerim
                </span>
            </button>
        </div>

        <div className="col-span-2">
            {activeTab === "accountDetails" && (
              <AccountDetails countries={countries} />
            )}

            {activeTab === "orders" && (
              <Orders />
            )}

            {activeTab === "addresses" && (
              <Addresses countries={countries} />
            )}
        </div>
      </div>
    </div>
    <Footer />
  </>  
  )
}

export default MyAccount