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
    { title: "Products", href: "/products" },
    { title: "About Us", href: "/about" },
  ];

  const rightMenuItems = [
    { title: "Support", href: "/support" },
    { title: "Contact", href: "/contact" },
    { title: "Categories", href: "/categories" },
  ];

  const allMenuItems = [...leftMenuItems, ...rightMenuItems];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 lg:px-0 py-2.5">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left Menu */}
          <NavigationMenu>
            <NavigationMenuList className="flex gap-x-6">
              {leftMenuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    asChild
                    className="uppercase font-semibold hover:text-primary transition-colors hover:bg-transparent"
                  >
                    <Link to={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Center Logo */}
          <div className="flex-1 flex justify-center items-center">
            <Link to="/" aria-label="Go to homepage">
              <span className="text-2xl font-extrabold tracking-wide text-primary transition-transform duration-300 hover:scale-105">
                SunPluS
              </span>
            </Link>
          </div>

          {/* Right Menu */}
          <NavigationMenu>
            <NavigationMenuList className="flex gap-x-6">
              {rightMenuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    asChild
                    className="uppercase font-semibold hover:text-primary hover:bg-transparent transition-colors"
                  >
                    <Link to={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" aria-label="Go to homepage">
            <span className="text-2xl font-extrabold tracking-wide text-primary transition-transform duration-300 hover:scale-105">
              SunPluS
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border border-border rounded-full"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>

            {/* Mobile Menu Content */}
            <SheetContent
              side="right"
              className="py-10 px-6 w-72 sm:w-80 bg-background"
            >
              <nav className="flex flex-col gap-6">
                {allMenuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
