"use client";
import Link from "next/link";
import { navItems } from "@/data/navItems";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-[999]">
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="#home" className="font-semibold text-lg text-white">
            My Portofolio
          </Link>
        </div>

        {/* Mobile */}
        <div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Links */}
        <ul
          className={`absolute top-14 right-2 flex flex-col w-40 bg-[#13181c] rounded-lg shadow-[0_4px_12px_rgba(255,255,255,0.1)] md:flex-row md:space-x-6
          md:p-0 md:static md:w-auto md:bg-transparent md:shadow-none
          items-start md:items-center md:space-y-0
          transition-all duration-300 overflow-hidden 
          ${isOpen ? "max-h-60" : "max-h-0 md:max-h-full"}`}
        >
          {navItems.map((item, index) => (
            <li key={index} className="w-full">
              <Link
                href={item.href}
                className="text-white block px-4 py-3  font-semibold hover:bg-[#404549] active:bg-[#404549] transition"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
