import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "@/assets/logo.svg"
const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/sunplus", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/sunplus", label: "Twitter" },
    {
      icon: Instagram,
      href: "https://instagram.com/sunplus",
      label: "Instagram",
    },
    { icon: Youtube, href: "https://youtube.com/sunplus", label: "YouTube" },
  ];

  const linkSections = [
    {
      title: "Who We Are",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Message from Chairman", href: "/chairman-message" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Store Locator", href: "/contact" },
        { name: "Customer Care", href: "/customer-care" },
      ],
    },
    {
      title: "Newsroom",
      links: [
        { name: "Media & Events", href: "/media-events" },
        { name: "Special Events", href: "/special-events" },
      ],
    },
  ];

  return (
    <footer className="relative bg-muted text-accent-foreground mt-auto">
      {/* Decorative Top Shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] bg-muted">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 V60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 V0 H0 Z"
            className="fill-accent"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 lg:px-0 pt-20 pb-10 flex flex-col lg:flex-row justify-between gap-12">
        {/* Company Info */}
        <div className="flex-1 space-y-4">
          <div className="flex-1 flex justify-start items-center h-16">
              <Link to="/" aria-label="Go to homepage">
                <Avatar className="h-52 w-52">
                  <AvatarImage
                    src={logo}
                    alt="SunPluS Logo"
                    className="object-contain"
                  />
                  <AvatarFallback className="bg-primary text-white flex items-center justify-center">
                    SP
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          <p className="text-sm text-accent-foreground/70 max-w-sm">
            Leading provider of high-quality electrical and electronic
            solutions. Delivering innovation, safety, and reliability across the
            globe.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
          {linkSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-lg mb-3 text-accent-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="hover:text-primary transition-colors duration-200"
                      aria-label={link.name}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="border-t border-border/50 pt-6 pb-6 text-center">
        <div className="flex justify-center gap-3 mb-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-primary/10 transition-colors"
              aria-label={label}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${label}`}
              >
                <Icon size={20} />
              </a>
            </Button>
          ))}
        </div>

        <p className="text-xs md:text-sm text-accent-foreground/70">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">SunPlus</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
