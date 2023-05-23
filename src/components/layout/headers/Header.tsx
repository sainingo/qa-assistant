import React from 'react';

import storage from '../../../app/localStorage';
import { Logout } from '../../../app/authentication/authentication.resource';

const Header: React.FC = () => {
  const handleSignOut = () => {
    Logout();
  };

  const { user } = storage.loadData();

  return (
    <header className="p-4 bg-white shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">QA Assistant Tool</h1>
        <div className="flex item-right">
          Logged in as{' '}
          <span className="bold">
            <strong>{user && user.display}</strong>
          </span>
        </div>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default Header;
