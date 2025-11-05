import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail, MapPin, Phone, } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FaWhatsapp } from "react-icons/fa";
const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1BGFTvK7kz", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/sunplus", label: "Instagram" },
  { 
    icon: FaWhatsapp, 
    href: "https://wa.me/8801835926605", 
    label: "WhatsApp" 
  },
];

const linkSections = [
  {
    title: "Quick Menu",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Latest Products", href: "#latestProducts" },
     
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact", href: "/contact" },
      { name: "FAQs", href: "#faq" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground mt-auto pt-10 pb-10">
      {/* Top Section: Company + Social */}
      <div className="container mx-auto px-4 lg:px-0 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-accent-foreground/10 pb-4 mb-6">
        {/* Company Info */}
        <div className="text-center sm:text-left max-w-4xl">
          <h2 className="text-xl uppercase font-bold mb-2">SunPlus Ltd.</h2>
          <p className="text-sm text-accent-foreground/80">
            Leading provider of high-quality electrical and electronic solutions,
            delivering innovation, safety, and reliability across Bangladesh.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-accent-foreground/10 transition-colors"
              aria-label={label}
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon size={20} />
              </a>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="container mx-auto px-4 lg:px-0 flex flex-col sm:flex-row gap-6">
        {/* Left: Logo + Contact */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <Link to="/" aria-label="Go to homepage">
            <Avatar className="h-full w-full">
              <AvatarImage src={logo} alt="SunPlus Logo" className="object-contain aspect-auto" />
            </Avatar>
          </Link>

          <div className="space-y-2 text-sm text-accent-foreground/80">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Kader tower electric market, Jubliee road, Chittagong, Bangladesh
            </p>
            <a  href="tel:+880835926605" className="flex items-center gap-2">
              <Phone size={16} /> +880 1835 926 605
            </a>
            <p className="flex items-center gap-2">
              <Mail size={16} /> 
              <a href="mailto:support@sunplusbd.com" className="hover:underline">
                support@sunplusbd.com
              </a>
            </p>
          </div>

        </div>

        {/* Right: Links */}
        <div className="flex justify-between gap-12 sm:ml-auto">
          {linkSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-lg mb-3 text-accent-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-accent-foreground/90 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t container mx-auto px-4 lg:px-0 flex justify-between items-center border-accent-foreground/10 mt-6 pt-4 text-center">
        <p className="text-xs md:text-sm text-accent-foreground/70">
          © {new Date().getFullYear()} <span className="font-semibold">SunPlus</span>. All rights reserved.
        </p>
        <div className="flex flex-row gap-2 sm:gap-4 text-xs md:text-sm text-accent-foreground/70">
          <Link to="terms-and-conditions">Terms & Conditions</Link>
          <span className="hidden sm:flex">|</span>
          <Link to="privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
