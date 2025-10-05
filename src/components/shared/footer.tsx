import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-gray-200">
      {/* Clipped Top Edge */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 V60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 V0 H0 Z"
            fill="accent"
          />
        </svg>
      </div>
      {/* <div className="flex justify-center lg:justify-start mb-6 lg:mb-0">
          <img src={CompanyLogo} alt="Company Logo" className="h-16 w-auto" />
        </div> */}
      <div className="container mx-auto px-6 lg:px-20 pt-12 pb-6 flex flex-col lg:flex-row justify-between gap-10">
        {/* Company Logo */}

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
          <div>
            <h4 className="font-bold mb-3">Who We Are</h4>
            <ul className="space-y-1 text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Message from Chairman</li>
              <li>Global Operation</li>
              <li>Certificates</li>
              <li>Accreditation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Support</h4>
            <ul className="space-y-1 text-sm">
              <li>Contact Us</li>
              <li>Sales Outlet</li>
              <li>Store Locator</li>
              <li>Customer Care</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Newsroom</h4>
            <ul className="space-y-1 text-sm">
              <li>Press Release</li>
              <li>Media & Events</li>
              <li>Special Events</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 pb-4 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <a href="#" className="p-2 rounded-full hover:bg-gray-700">
            <Facebook />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-gray-700">
            <Twitter />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-gray-700">
            <Instagram />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-gray-700">
            <Youtube />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          Copyright © 2025. All rights reserved by - Sunplus
        </p>
      </div>
    </footer>
  );
};

export default Footer;
