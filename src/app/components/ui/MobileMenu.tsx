"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { NAV_LINKS } from "@/utils/navLinks";

const MobileMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <nav className="absolute top-16 left-0 w-full bg-background shadow-md p-4 border border-border">
          {NAV_LINKS.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className="block py-2 text-textPrimary hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default MobileMenu;
