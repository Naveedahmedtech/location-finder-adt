import { Home, Plane, Car, Info, Globe } from "lucide-react";

export type NavLink = {
  name: string;
  href: string;
  icon: any;
};

export const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/", icon: <Home size={18} /> },
  { name: "About", href: "/about", icon: <Info size={18} /> },
  { name: "Drive Distance", href: "/driving-distance", icon: <Car size={18} /> },
  { name: "Flight Distance", href: "/flight-distance", icon: <Plane size={18} /> },
  { name: "Cities", href: "/cities/list", icon: <Globe size={18} /> },
  { name: "Countries", href: "/countries/list", icon: <Globe size={18} /> },
];
