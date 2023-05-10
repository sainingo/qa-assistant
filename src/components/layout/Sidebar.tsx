import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:block w-64 bg-gray-100 border-r border-gray-200">
      <nav className="px-4 pt-4">
        <h1 className="text-xl font-bold">My App</h1>
        <ul className="mt-6">
          <li className="mb-2">
            <a href="/" className="block px-4 py-2 rounded hover:bg-gray-200">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="/" className="block px-4 py-2 rounded hover:bg-gray-200">
              About
            </a>
          </li>
          <li className="mb-2">
            <a href="/" className="block px-4 py-2 rounded hover:bg-gray-200">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
