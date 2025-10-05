import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-muted text-accent-foreground">
      {/* Clipped Top Edge */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] bg-muted">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 V60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 V0 H0 Z"
            className="fill-accent"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-10 pt-16 pb-4 flex flex-col lg:flex-row justify-between gap-12">
        {/* Company Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl title-font text-primary">SunPlus.</h2>
          <p className="text-sm text-accent-foreground/70">
            Leading provider of high-quality electrical and electronic
            solutions. Delivering excellence globally.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
          <div>
            <h4 className="font-semibold text-lg mb-3">Who We Are</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary cursor-pointer transition-colors">
                Home
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                About
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Message from Chairman
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Certificates
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary cursor-pointer transition-colors">
                Contact Us
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Sales Outlet
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Store Locator
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Customer Care
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3">Newsroom</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-primary cursor-pointer transition-colors">
                Press Release
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Media & Events
              </li>
              <li className="hover:text-primary cursor-pointer transition-colors">
                Special Events
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="border-t border-border/50  pt-4 pb-4 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant="ghost"
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Facebook />
          </Button>
          <Button
            variant="ghost"
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Twitter />
          </Button>
          <Button
            variant="ghost"
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Instagram />
          </Button>
          <Button
            variant="ghost"
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Youtube />
          </Button>
        </div>
        <p className="text-sm text-accent-foreground/70">
          © 2025 SUNPLUS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
