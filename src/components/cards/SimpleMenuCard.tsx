import React from 'react';
// eslint-disable-next-line import/named
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface SimpleMenuProps {
  title: string;
  icon: IconType;
  path: string;
  description: string;
}

const SimpleMenuCard: React.FC<SimpleMenuProps> = ({ title, icon: Icon, path, description }: SimpleMenuProps) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg transition duration-300 ease-in-out hover:scale-105">
      <Link to={path}>
        <div className="px-2 py-3 sm:p-6 flex justify-center">
          <Icon size={64} color={'gray'} />
        </div>
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">{description}</div>
        </div>
      </Link>
    </div>
  );
};

export default SimpleMenuCard;
