import { FaFlask, FaSearch, FaSync } from 'react-icons/fa';
import SimpleMenuCard from '../cards/SimpleMenuCard';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  const homeMenuItems = [
    {
      title: 'Patient Search',
      description: 'Patient oriented activities e.g voiding orders',
      icon: FaSearch,
      path: '/patient-search',
    },
    {
      title: 'Lab Results Sync',
      description: 'Sync EID data dump',
      icon: FaFlask,
      path: '/lab-results-sync',
    },
    {
      title: 'MOH-731 Sync',
      description: "Re-process patient's data",
      icon: FaSync,
      path: '/moh-731-sync',
    },
  ];

  return (
    <>
      <Header shouldRenderSearchLink={false} />
      <div className="flex justify-center">
        <div className="max-w-screen-lg p-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeMenuItems.map((card) => (
            <SimpleMenuCard
              key={card.title}
              title={card.title}
              icon={card?.icon}
              path={card?.path}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <Footer year={2023} />
    </>
  );
};

export default Home;
