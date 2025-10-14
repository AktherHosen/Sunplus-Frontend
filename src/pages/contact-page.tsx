import {
  MapPin,
  Phone,
  Mail,
  Headphones,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We’re here to answer your questions, provide support, and explore
            new business opportunities.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: MapPin,
              title: "Head Office",
              text: (
                <>
                  Kader tower electric market, <br />
                  Jubliee road, <br />
                  Chittagong, Bangladesh
                </>
              ),
            },
            {
              icon: Phone,
              title: "Phone",
              text: (
                <>
                  +8801835-926605 <br /> +88001835-926605
                </>
              ),
            },
            {
              icon: Mail,
              title: "Email",
              text: (
                <>
                  support@sunplus.com <br /> info@sunplus.com
                </>
              ),
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white shadow-sm hover:shadow-md transition-all rounded-2xl p-6 flex flex-col items-start border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="text-primary" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base">{text}</p>
            </div>
          ))}
        </div>

        {/* Support & Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Headphones className="text-primary" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Customer Support
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              For product inquiries, warranty support, or service requests,
              please contact our dedicated support team. We’re committed to
              ensuring your satisfaction and solving your issues promptly.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Facebook className="text-primary" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Connect With Us
              </h2>
            </div>
            <div className="flex flex-wrap gap-4 mt-3">
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                <Facebook size={20} /> <span>Facebook</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                <Twitter size={20} /> <span>Twitter</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                <Instagram size={20} /> <span>Instagram</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                <Linkedin size={20} /> <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">

          
          <iframe
            title="Sunplus HQ Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922.6060376199395!2d91.83025222852348!3d22.337607998723456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a797445159%3A0xbbf5f064c4fc5a99!2sKader%20Tower%20Building%20Complex!5e0!3m2!1sen!2sbd!4v1760429567692!5m2!1sen!2sbd"
            width="100%"
            height="450"
            loading="lazy"
            className="border-0 w-full"></iframe>
        </div>
      </div>
    </div>
  );
}
