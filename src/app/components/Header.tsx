"use client";

import Link from "next/link";
import React from 'react'
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/utils/navLinks";
import MobileMenu from "./ui/MobileMenu";
import { APP_NAME } from "@/config/constants";
import { useContent } from "@/context/ContentContext";
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const {  currentLanguage, setLanguage } = useContent();
  if (pathname.startsWith("/admin")) return null;
  return (
    <header className="fixed top-0 left-0 w-full bg-primary shadow-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-text flex items-center gap-1">
          <span className="text-text">{APP_NAME}</span>
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
          
          {/* Language Selector */}
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 absolute left-3 text-textSecondary" />
            <select 
              value={currentLanguage} 
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-surface border border-border rounded-full pl-9 pr-8 py-2 
              text-textPrimary cursor-pointer hover:bg-primaryHover transition-colors 
              focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="pt">PT</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-4 h-4 text-textSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
