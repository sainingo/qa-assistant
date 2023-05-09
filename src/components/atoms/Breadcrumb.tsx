import React, { FC } from 'react';

interface BreadcrumbProps {
  items: { label: string; link?: string }[];
}

const RightChervon = (
  <svg
    aria-hidden="true"
    className="w-4 h-4 mr-2"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
  </svg>
);

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map(({ label, link }, index) => (
          <li key={index} className="inline-flex items-center">
            <a href={link} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
              {index !== items.length - 1 && RightChervon}
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
