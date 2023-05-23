import { useState } from 'react';
import ActiveOrders from './PatientActiveOrders.component';
import VoidedOrders from './PatientVoidedOrders.component';
import Sidebar from '../../../components/layout/Sidebar';
import Header from '../../../components/layout/headers/Header';
import SimpleFooter from '../../../components/layout/SimpleFooter';
import PatientBanner from '../banners/PatientBanner';

const Orders = () => {
  const [openTab, setOpenTab] = useState(0);

  const tabContent = [
    { tabName: 'Active Orders', componentName: <ActiveOrders /> },
    { tabName: 'Void Orders', componentName: <VoidedOrders /> },
  ];

  const openTabStyle = 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active mt-2';
  const closeTabStyle =
    'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 mt-2';

  return (
    <>
      <PatientBanner />
      <div className="">
        <ul className="ml-[25%] text-sm font-medium text-center text-gray-500 flex flex-wrap">
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
            <div key={index} className={openTab === index ? 'block' : 'hidden'}>
              {tab.componentName}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const PatientOrders = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-2 overflow-y-auto">
            <Orders />
          </main>
          <SimpleFooter />
        </div>
      </div>
    </>
  );
};

export default PatientOrders;
