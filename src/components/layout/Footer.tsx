import React, { FC } from 'react';

interface Props {
  year: number;
}

const Footer: FC<Props> = ({ year }) => {
  return (
    <footer className="bg-inherit rounded-lg m-4 bottom-0  w-[90%] flex-shrink-0">
      <div className="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          © {year} <a href="https://ampath.or.ke/" className="hover:underline">AMPATH Kenya</a>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Documentation</a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Help</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;