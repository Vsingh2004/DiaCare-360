"use client"
import { useState } from 'react';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const links = [
    { href: '/', label: 'Product' },
    { href: '/', label: 'Features' },
    { href: '/', label: 'Pricing' },
    { href: '/about', label: 'About us' },
  ];

  return (
    <div className="fixed top-0  left-0 w-full bg-white shadow-md   px-8 py-5  z-50">
      <div className="flex items-center justify-between ">
        <div className=" flex items-center">
          <a href="/" className="inline-flex items-center mr-15">
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth={2}
              strokeLinecap="round"
              strokeMiterlimit={10}
              stroke="currentColor"
              fill="none"
            >
              <rect x={3} y={1} width={7} height={12} />
              <rect x={3} y={17} width={7} height={6} />
              <rect x={14} y={1} width={7} height={6} />
              <rect x={14} y={11} width={7} height={12} />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              DiaCare 360
            </span>
          </a>
          <ul className="hidden lg:flex items-center space-x-8">
            {links.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-[#25BF76]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
    <div className='flex gap-5 items-center'>
        <ul className="flex items-center space-x-8 lg:flex">
          <li>
            <a
              href="/login"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-[#25BF76]"
            >
              Sign in
            </a>
          </li>
          <li>
            <a
              href="/signup"
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-[#25BF76] hover:bg-white hover:text-[#25BF76] focus:shadow-outline focus:outline-none"
            >
              Sign up
            </a>
          </li>
        </ul>
        {/* Mobile menu */}
        <div className=" lg:hidden ">
          <button
            onClick={toggleMenu}
            className="p-2 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
              <path d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
              <path d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
            </svg>
          </button>
        </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col items-center space-y-4 mt-4">
            {links.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-[#25BF76]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
