import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    { title: "Contact", href: "/contact" },
    { title: "About Us", href: "/about" },
  ];

  const rightMenuItems: MenuItem[] = [
    { title: "Support", href: "/support", popover: true },
    ...(user ? [] : [{ title: "Login", href: "/login" }]),

  ];

  const allMenuItems: MenuItem[] = [...leftMenuItems, ...rightMenuItems];


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
                              href="tel:+880123456789"
                              className="flex items-center gap-2 hover:text-primary transition"
                            >
                              <Phone size={16} /> +880 123 456 789
                            </a>
                            <a
                              href="tel:+880987654321"
                              className="flex items-center gap-2 hover:text-primary transition"
                            >
                              <Phone size={16} /> +880 987 654 321
                            </a>
                            <a
                              href="mailto:support@sunplus.com"
                              className="flex items-center gap-2 hover:text-primary transition"
                            >
                              <Mail size={16} /> support@sunplus.com
                            </a>
                            <Link
                              to="/service-centers"
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

            {/* User Avatar */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="w-10 h-10 rounded-full border border-border shadow-sm">
                      <AvatarFallback className="bg-primary text-white flex items-center justify-center rounded-full">
                        {user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" bg-background border border-border shadow-lg rounded-lg p-2">
                  <div className="px-2 py-1 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator className="my-1" />
                  {user.role === "SUPER_ADMIN" && (
                    <DropdownMenuItem className="hover:bg-primary/10 rounded-md px-2 py-1">
                      <Link to="/dashboard" className="w-full block">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={logout}
                    className="hover:bg-red-500/10 text-red-600 rounded-md px-2 py-1"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" aria-label="Go to homepage">
            <span className="text-2xl font-extrabold tracking-wide text-primary transition-transform duration-300 hover:scale-105">
              SunPluS
            </span>
          </Link>

          {/* Mobile Menu */}
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
                            href="tel:+880123456789"
                            className="hover:text-primary"
                          >
                            +880 123 456 789
                          </a>
                          <a
                            href="tel:+880987654321"
                            className="hover:text-primary"
                          >
                            +880 987 654 321
                          </a>
                          <a
                            href="mailto:support@sunplus.com"
                            className="hover:text-primary"
                          >
                            support@sunplus.com
                          </a>
                          <Link
                            to="/service-centers"
                            className="hover:text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Service Centers
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

                {/* Mobile User Section */}
                {user ? (
                  <div className="mt-6 flex flex-col gap-2">
                    {user.role === "SUPER_ADMIN" && (
                      <Link
                        to="/dashboard"
                        className="hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      className="hover:text-primary text-left"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="hover:text-primary mt-6"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
