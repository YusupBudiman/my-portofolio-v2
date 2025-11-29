"use client";
import Link from "next/link";
import { navItems } from "@/data/navItems";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // IntersectionObserver untuk scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[999]">
      <div className="flex items-center justify-center px-10 py-2 lg:py-1">
        {/* Logo */}
        <div className="relative flex items-center justify-center mr-2 px-1.5 py-0.5 rounded-full p-[2px] bg-gradient-to-br from-green-900 via-green-700 to-green-500">
          <div className="flex items-center justify-center rounded-full bg-[#161616] backdrop-blur-sm">
            <Link
              href="#home"
              className="text-md font-bold bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent"
            >
              YS
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Links */}
        <ul
          className={`absolute top-14 right-2 flex flex-col w-40 bg-[#13181c] rounded-lg shadow-[0_4px_12px_rgba(255,255,255,0.1)]
            md:flex-row md:space-x-0.5 md:rounded-none md:p-0 md:static md:w-auto 
            md:bg-transparent md:shadow-none items-start md:items-center md:space-y-0
            transition-all duration-300 overflow-hidden 
            ${isOpen ? "max-h-60" : "max-h-0 md:max-h-full"}`}
        >
          {navItems.map((item, index) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    setActiveSection(id); // set state saat klik
                  }}
                  className={`text-white md:text-sm block px-4 py-3 lg:py-0 hover:bg-[#e3e8b8] hover:text-black active:bg-[#80872c]
                    md:border-1 md:border-[#272427] md:rounded-sm md:bg-[#202020]
                    transition-colors duration-300
                    ${
                      isActive
                        ? "bg-[#f9fc9f] text-black md:bg-[#f9fc9f] md:text-black"
                        : ""
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
