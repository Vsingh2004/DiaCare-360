"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { cartItems } = useCart();

  const cartCount = cartItems?.length || 0;

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setUser({ token });
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const links = [
    { href: "/products", label: "Product" },
    { href: "/articles", label: "Blogs" },
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact Us" },
  ];

  if (user) {
    links.push({
      href: "/patient/dashboard",
      label: (
        <span className="px-3 py-2 bg-[#25BF76] text-white rounded hover:bg-[#3d4e46] transition">
          Dashboard
        </span>
      ),
    });
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md px-8 py-5 z-50">
      <div className="flex items-center justify-between">
        {/* Logo and nav links */}
        <div className="flex items-center">
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
            {links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className={`font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-[#25BF76] ${
                    typeof link.label !== "string" ? "" : ""}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Icons & Auth */}
        <div className="flex gap-5 items-center">
          {user && (
            <>
              {/* Favourites */}
              <a href="/favourites">
                <FaHeart className="text-gray-600 hover:text-[#25BF76]" size={22} />
              </a>

              {/* Cart */}
              <a href="/patient/cart" className="relative">
                <FaShoppingCart className="text-gray-600 hover:text-[#25BF76]" size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
            </>
          )}

          {/* Auth / Profile */}
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                <FaUserCircle size={26} className="text-gray-700 hover:text-[#25BF76]" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="/patient/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ul className="flex items-center space-x-4">
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
                  className="inline-flex items-center justify-center h-10 px-5 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-[#25BF76] hover:bg-white hover:text-[#25BF76]"
                >
                  Sign up
                </a>
              </li>
            </ul>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="p-2 transition duration-200 rounded focus:outline-none">
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
                <path d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z" />
                <path d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col items-center space-y-4 mt-4">
            {links.map((link, idx) => (
              <li key={idx}>
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
}

export default Navbar;