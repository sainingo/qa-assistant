// Footer.tsx
import React from 'react';

const SimpleFooter: React.FC = () => {
  return (
    <footer className="py-4 px-6">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">© {new Date().getFullYear()} AMPATH KE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default SimpleFooter;
