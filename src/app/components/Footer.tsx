"use client";

import Link from "next/link";
import { useContent } from '@/context/ContentContext';
import { Globe, Shield } from 'lucide-react';
import { NAV_LINKS } from "@/utils/navLinks";
import { APP_NAME } from "@/config/constants";
import {usePathname} from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const { currentLanguage, setLanguage } = useContent();

  if (pathname.startsWith("/admin")) return null;

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy", icon: <Shield className="w-4 h-4" /> },
    // { name: "Terms of Service", href: "/terms", icon: <FileText className="w-4 h-4" /> },
    // { name: "Contact Us", href: "/contact", icon: <Mail className="w-4 h-4" /> },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'pt', label: 'Português' },
  ];

  return (
    <footer className="bg-primary mt-auto border-t border-border">
      <div className="max-w-7xl mx-auto py-8 sm:py-10 px-4 sm:px-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-text hover:text-accent transition-colors">
              {APP_NAME}
            </Link>
            <p className="text-sm text-text/80 max-w-sm">
              Calculate travel times and distances between locations worldwide.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text text-lg">Navigation</h3>
            <div className="grid gap-2.5">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-text/80 hover:text-accent transform hover:translate-x-1 
                    transition-all duration-200 text-sm sm:text-base"
                >
                  <span className="mr-2 opacity-70 group-hover:opacity-100">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text text-lg">Legal</h3>
            <div className="grid gap-2.5">
              {legalLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-text/80 hover:text-accent transform hover:translate-x-1 
                    transition-all duration-200 text-sm sm:text-base"
                >
                  <span className="mr-2 opacity-70 group-hover:opacity-100">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text text-lg">Language</h3>
            <div className="flex items-center">
              <Globe className="w-4 h-4 text-text/80 mr-2" />
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-surface text-text w-full max-w-[200px] px-3 py-1.5 rounded-md 
                  border border-border hover:border-accent focus:outline-none focus:ring-2 
                  focus:ring-accent text-sm transition-all duration-200"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/30 text-center sm:text-left">
          <p className="text-sm text-text/80">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
