import React from 'react';
import ShieldIcon from '@mui/icons-material/Shield';

const Footer = () => {
  return (
    <footer className="flex sm:block justify-center md:h-16 h-3 py-2  bg-white border-t border-gray-300 transition-all duration-300">
      <div className="px-2 md:px-6 md:py-3">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="flex items-center flex-wrap space-x-2 md:space-x-6">
            <h1 className="text-sm text-gray-600 hover:text-blue-600 border-r pr-2 md:border-none md:pr-0 transition-colors cursor-pointer">
              Privacy Policy
            </h1>
            <h1 className="text-sm text-gray-600 hover:text-blue-600 border-r pr-2 md:border-none md:pr-0 transition-colors cursor-pointer">
              Terms of Service
            </h1>
            <h1 className="text-sm text-gray-600 hover:text-blue-600 md:pr-0 transition-colors cursor-pointer">
              Support
            </h1>
          </div>
          <div className="flex items-center text-sm text-gray-500 md:mt-0">
            <ShieldIcon fontSize="small" className="mr-2 text-green-600" />
            <span>Enterprise-grade security &amp; compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
