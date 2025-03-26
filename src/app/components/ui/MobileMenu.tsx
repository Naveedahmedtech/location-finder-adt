"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Menu, Globe } from "lucide-react";
import { NAV_LINKS } from "@/utils/navLinks";
import { useContent } from "@/context/ContentContext";

const MobileMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentLanguage, setLanguage } = useContent();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    // Optional: close menu after language selection
    // setMenuOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Menu Toggle Button */}
      <button
        className="text-textPrimary focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-background shadow-md p-4 border border-border z-50">
          {NAV_LINKS.map(({ name, href, icon }) => (
            <Link
              key={name}
              href={href}
              className="flex items-center gap-2 py-2.5 text-textPrimary hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              <span>{icon}</span>
              {name}
            </Link>
          ))}
          
          {/* Language Selector */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 absolute left-3 text-textSecondary" />
              <select 
                value={currentLanguage} 
                onChange={handleLanguageChange}
                className="w-full appearance-none bg-surface border border-border rounded-md pl-9 pr-8 py-2.5 
                text-textPrimary cursor-pointer hover:bg-primaryHover transition-colors 
                focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-textSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default MobileMenu;
