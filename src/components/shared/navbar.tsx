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
import { Link } from "react-router"; // ✅ fix import for react-router

export default function Navbar() {
  const [openAddBook, setOpenAddBook] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftMenuItems = [
    { title: "Product", href: "/books" },
    { title: "About Us", href: "#", action: () => setOpenAddBook(true) },
  ];

  const rightMenuItems = [
    { title: "Support", href: "/support" },
    { title: "Contact Us", href: "/contact" },
  ];

  const allMenuItems = [...leftMenuItems, ...rightMenuItems];

  return (
    <header className="flex items-center justify-between py-4 ">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Left links */}
        <NavigationMenu>
          <NavigationMenuList>
            {leftMenuItems.map((item) => (
              <NavigationMenuItem key={item.title} className="uppercase font-bold">
                {item.action ? (
                  <NavigationMenuLink
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      item.action?.();
                    }}
                    className="px-3 py-2 hover:underline uppercase"
                  >
                    {item.title}
                  </NavigationMenuLink>
                ) : (
                  <NavigationMenuLink
                    asChild
                    className="px-3 py-2 hover:underline"
                  >
                    <Link to={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                )}
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
              <NavigationMenuItem key={item.title} className="uppercase font-bold">
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

        {/* Mobile menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="border border-border">
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="py-12 px-4 w-64">
            <nav className="flex flex-col gap-3">
              {allMenuItems.map((item) => (
                <Button
                  key={item.title}
                  variant="outline"
                  onClick={() => {
                    if (item.action) item.action();
                    setMobileMenuOpen(false);
                  }}
                  asChild
                >
                  {item.href !== "#" ? (
                    <Link to={item.href}>{item.title}</Link>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
