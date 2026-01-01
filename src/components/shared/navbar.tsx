import logo from "@/assets/logo.svg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Headphones, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import ProductSearch from "./product-search";
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  type MenuItem = {
    title: string;
    href: string;
    popover?: boolean;
  };

  const leftMenuItems: MenuItem[] = [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  const rightMenuItems: MenuItem[] = [
    { title: "Support", href: "/support", popover: true },
    { title: "Management", href: "/chairman-message" },
  ];

  const allMenuItems: MenuItem[] = [...leftMenuItems, ...rightMenuItems];

  return (
    <header className="sticky top-0 z-50 bg-accent/95 border-b border-border backdrop-blur-md supports-[backdrop-filter]:bg-accent/80">
      <div className="container mx-auto px-4 sm:px-0">
        {/* Desktop Navbar */}
        <div className="hidden lg:grid grid-cols-3 w-full gap-4 xl:gap-6 py-3.5 items-center">
          {/* Logo - Left (Column 1) */}
          <div className="flex items-center ">
            <Link
              to="/"
              aria-label="Go to homepage"
              className="flex items-center"
            >
              <Avatar className="h-full w-full">
                <AvatarImage
                  src={logo}
                  alt="SunPluS Logo"
                  className="object-contain aspect-auto"
                />
              </Avatar>
            </Link>
          </div>

          {/* Search Bar - Center (Column 2) */}
          <div className="flex justify-center items-center">
            <ProductSearch />
          </div>

          {/* All Navigation Links - Right (Columns 3-4) */}
          <div className="flex flex-1 justify-end items-center">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-x-4 xl:gap-x-6">
                {allMenuItems.map((item) =>
                  item.popover ? (
                    <NavigationMenuItem key={item.title} className="relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-sm xl:text-base uppercase font-semibold hover:text-primary hover:bg-transparent transition-colors focus:outline-none">
                            {item.title}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          className="w-64 p-4 rounded-xs shadow-sm border border-border bg-background mt-2.5"
                        >
                          <h4 className="font-semibold text-lg mb-3 text-foreground">
                            Customer Support
                          </h4>
                          <div className="space-y-3 text-sm">
                            <a
                              href="tel:+8801835926605"
                              className="flex items-center gap-2 hover:text-primary transition"
                            >
                              <Phone size={16} /> +880 1835 926 605
                            </a>
                            <a
                              href="mailto:support@sunplus.com"
                              className="flex items-center gap-2 hover:text-primary transition"
                            >
                              <Mail size={16} /> support@sunplusbd.com
                            </a>
                            <Link
                              to="/contact"
                              className="flex items-center gap-2 hover:text-primary transition"
                            >
                              <Headphones size={16} /> Service Centers
                            </Link>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        asChild
                        className="text-sm xl:text-base uppercase font-semibold hover:text-primary hover:bg-transparent transition-colors"
                      >
                        <Link to={item.href}>{item.title}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Tablet Navbar (md to lg) */}
        <div className="hidden md:flex lg:hidden items-center justify-between w-full gap-3 py-3">
          {/* Logo - Left */}
          <div className="flex-shrink-0 flex items-center h-10 w-10 sm:h-11 sm:w-11">
            <Link to="/" aria-label="Go to homepage">
              <Avatar className="h-full w-full">
                <AvatarImage
                  src={logo}
                  alt="SunPluS Logo"
                  className="object-contain aspect-auto"
                />
              </Avatar>
            </Link>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 flex items-center justify-center min-w-0 mx-2 sm:mx-4">
            <ProductSearch />
          </div>

          {/* Menu Button - Right */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 border border-border rounded-lg h-9 w-9"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="py-10 px-6 w-72 sm:w-80 bg-background"
            >
              <nav className="flex flex-col gap-6">
                {allMenuItems
                  .filter(
                    (item) => item.title !== "Login" && item.title !== "Admin"
                  )
                  .map((item: MenuItem) =>
                    item.popover ? (
                      <div key={item.title} className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">
                          {item.title}
                        </p>
                        <div className="flex flex-col pl-3 space-y-2 text-sm text-muted-foreground">
                          <a
                            href="tel:+8801835926605"
                            className="flex items-center gap-2 hover:text-primary transition"
                          >
                            <Phone size={16} /> +880 1835 926 605
                          </a>
                          <a
                            href="mailto:support@sunplus.com"
                            className="flex items-center gap-2 hover:text-primary transition"
                          >
                            <Mail size={16} /> support@sunplusbd.com
                          </a>
                          <Link
                            to="/contact"
                            className="flex items-center gap-2 hover:text-primary transition"
                          >
                            <Headphones size={16} /> Service Centers
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.title}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                    )
                  )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Navbar (sm and below) */}
        <div className="flex lg:hidden items-center w-full gap-2 sm:gap-3 py-2.5">
          {/* Logo - Left */}
          <div className="flex-shrink-0 flex items-center h-10 w-20">
            <Link to="/" aria-label="Go to homepage">
              <Avatar className="h-full w-full">
                <AvatarImage
                  src={logo}
                  alt="SunPluS Logo"
                  className="object-contain aspect-auto"
                />
              </Avatar>
            </Link>
          </div>

          {/* Mobile Search - Center */}
          <div className="flex-1 flex items-center min-w-0 mx-2">
            <ProductSearch />
          </div>

          {/* Mobile Menu - Right */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 border border-border rounded-lg h-9 w-9"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="py-10 px-6 w-72 sm:w-80 bg-background"
            >
              <nav className="flex flex-col gap-6">
                {allMenuItems
                  .filter(
                    (item) => item.title !== "Login" && item.title !== "Admin"
                  )
                  .map((item: MenuItem) =>
                    item.popover ? (
                      <div key={item.title} className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">
                          {item.title}
                        </p>
                        <div className="flex flex-col pl-3 space-y-2 text-sm text-muted-foreground">
                          <a
                            href="tel:+8801835926605"
                            className="flex items-center gap-2 hover:text-primary transition"
                          >
                            <Phone size={16} /> +880 1835 926 605
                          </a>
                          <a
                            href="mailto:support@sunplus.com"
                            className="flex items-center gap-2 hover:text-primary transition"
                          >
                            <Mail size={16} /> support@sunplusbd.com
                          </a>
                          <Link
                            to="/contact"
                            className="flex items-center gap-2 hover:text-primary transition"
                          >
                            <Headphones size={16} /> Service Centers
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.title}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                    )
                  )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
