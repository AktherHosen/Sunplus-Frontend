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
import { useAuth } from "@/context/auth-context";
import { Headphones, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  type MenuItem = {
    title: string;
    href: string;
    popover?: boolean;
  };

  const leftMenuItems: MenuItem[] = [
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  const rightMenuItems: MenuItem[] = [
    { title: "Support", href: "/support", popover: true },
    ...(user ? [] : [{ title: "Message", href: "/chairman-message" }]),
  ];

  const allMenuItems: MenuItem[] = [...leftMenuItems, ...rightMenuItems];

  return (
    <header className="sticky top-0 z-50 bg-accent border-b border-border backdrop-blur supports-[backdrop-filter]:bg-accent/80">
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
          <div className="flex-1 flex justify-center items-center h-12">
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

          {/* Right Menu */}
          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-x-6">
                {rightMenuItems.map((item) =>
                  item.popover ? (
                    <NavigationMenuItem key={item.title} className="relative">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="uppercase text-sm font-semibold hover:text-primary hover:bg-transparent transition-colors focus:outline-none">
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
                        className="uppercase font-semibold hover:text-primary hover:bg-transparent transition-colors"
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

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex-1 flex  items-center h-12">
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
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border border-border rounded-lg"
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
