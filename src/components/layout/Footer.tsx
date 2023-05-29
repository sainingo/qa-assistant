import { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white rounded-lg m-4 bottom-0 absolute flex-shrink-0">
      <div className="w-full mx-auto md:p-6 p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          © {currentYear}{' '}
          <a href="/" className="hover:underline">
            AMPATH KE
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
          <li>
            <a href="/docs" className="mr-4 hover:underline md:mr-6">
              Documentation
            </a>
          </li>
          <li>
            <a href="/privacy" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/help" className="mr-4 hover:underline md:mr-6">
              Help
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
