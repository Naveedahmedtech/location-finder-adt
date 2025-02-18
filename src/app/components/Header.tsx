"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/utils/navLinks";
import MobileMenu from "./ui/MobileMenu";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full bg-primary shadow-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-text flex items-center gap-1">
          <span className="text-text">TRAVEL</span>
          <span className="text-secondary">HOURS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map(({ name, href, icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition border border-transparent ${
                pathname === href
                  ? "bg-primaryHover text-text border-border"
                  : "text-text hover:bg-white/20"
              }`}
            >
              {icon}
              {name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
