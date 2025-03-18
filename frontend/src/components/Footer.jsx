import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#F0FDF4] text-gray-700 py-10 px-6 md:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Key Links Section */}
                <div>
                    <h3 className="text-xl font-bold text-[#25BF76] mb-4">Key Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-[#25BF76]">About Us</a></li>
                        <li><a href="/contact" className="hover:text-[#25BF76]">Contact Us</a></li>
                        <li><a href="/privacy-policy" className="hover:text-[#25BF76]">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-[#25BF76]">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div>
                    <h3 className="text-xl font-bold text-[#25BF76] mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-[#25BF76] text-white p-2 rounded-full hover:scale-110 transition"><FaFacebookF /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-[#25BF76] text-white p-2 rounded-full hover:scale-110 transition"><FaTwitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[#25BF76] text-white p-2 rounded-full hover:scale-110 transition"><FaInstagram /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-[#25BF76] text-white p-2 rounded-full hover:scale-110 transition"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div>
                    <h3 className="text-xl font-bold text-[#25BF76] mb-4">Stay Updated</h3>
                    <form className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-[#25BF76] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25BF76]"
                        />
                        <button type="submit" className="bg-[#25BF76] text-white py-2 rounded-lg hover:bg-[#1DA964] transition">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-8">
                &copy; {new Date().getFullYear()} Diabetes Care Platform. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
