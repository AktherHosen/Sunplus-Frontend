export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            Reach out to us for any queries, support, or business inquiries.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Address */}
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-3">Head Office</h2>
            <p className="text-gray-600">
              123 Walton Street
              <br />
              Suite 400
              <br />
              Dhaka, Bangladesh
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-3">Phone</h2>
            <p className="text-gray-600">+880 123 456 789</p>
            <p className="text-gray-600 mt-1">+880 987 654 321</p>
          </div>

          {/* Email */}
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-3">Email</h2>
            <p className="text-gray-600">support@walton.com</p>
            <p className="text-gray-600 mt-1">info@walton.com</p>
          </div>
        </div>

        {/* Support & Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Customer Support</h2>
            <p className="text-gray-600">
              For product inquiries, warranty support, or service requests,
              please contact our support team via phone or email.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-blue-600 hover:underline">
                Facebook
              </a>
              <a href="#" className="text-blue-400 hover:underline">
                Twitter
              </a>
              <a href="#" className="text-pink-500 hover:underline">
                Instagram
              </a>
              <a href="#" className="text-blue-700 hover:underline">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow">
          <iframe
            title="Walton Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d90.123456!3d23.810331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4c123456789%3A0xabcdef123456789!2sWalton%20HQ!5e0!3m2!1sen!2sbd!4v1696567890123!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
