import { useState } from "react";
import Header from "../Header";
import SideNavBar from "../SideNavBar";
import ActiveOrders from "./ActiveOrders";
import VoidedOrders from "./VoidedOrders";

function Orders() {
  const [openTab, setOpenTab] = useState(1);

  const tabContent = [
    { tabName: "Active Orders", componentName: <ActiveOrders /> },
    { tabName: "Void Orders", componentName: <VoidedOrders /> },
  ];

  const openTabStyle =
    "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 mt-2";
  const closeTabStyle =
    "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 mt-2";

  return (
    <>
      <Header />
      <SideNavBar />
      <div className="">
        <ul className="ml-[25%] text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700 flex flex-wrap -mb-px md:w-[60%]">
          {tabContent.map((tab, index) => (
            <button
              key={index}
              className={openTab === index ? openTabStyle : closeTabStyle}
              onClick={() => setOpenTab(index)}
            >
              {tab.tabName}
            </button>
          ))}
        </ul>
        <div>
          {tabContent.map((tab, index) => (
            <div key={index} className={openTab === index ? "block" : "hidden"}>
              {tab.componentName}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Orders;
