import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftMenuItems = [
    { title: "Product", href: "/books" },
    { title: "About Us", href: "/about" },
  ];

  const rightMenuItems = [
    { title: "Support", href: "/support" },
    { title: "Contact Us", href: "/contact" },
    { title: "Categories", href: "/categories" },
  ];

  const allMenuItems = [...leftMenuItems, ...rightMenuItems];

  return (
    <header className="flex items-center justify-between py-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Left links */}
        <NavigationMenu>
          <NavigationMenuList>
            {leftMenuItems.map((item) => (
              <NavigationMenuItem
                key={item.title}
                className="uppercase font-bold"
              >
                <NavigationMenuLink
                  asChild
                  className="px-3 py-2 hover:underline"
                >
                  <Link to={item.href}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Center logo */}
        <div className="text-3xl font-bold text-center tracking-wide text-primary">
          <Link to="/">SUNPLUS</Link>
        </div>

        {/* Right links */}
        <NavigationMenu>
          <NavigationMenuList>
            {rightMenuItems.map((item) => (
              <NavigationMenuItem
                key={item.title}
                className="uppercase font-bold"
              >
                <NavigationMenuLink
                  asChild
                  className="px-3 py-2 hover:underline"
                >
                  <Link to={item.href}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between w-full">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide text-primary">
          <Link to="/">SUNPLUS</Link>
        </div>

        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="border border-border">
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </SheetTrigger>

          {/* Slide-in menu content */}
          <SheetContent side="right" className="py-12 px-6 w-64">
            <nav className="flex flex-col gap-4">
              {allMenuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium uppercase text-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
