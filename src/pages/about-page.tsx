import { Lightbulb, ShieldCheck, Zap, Award, Globe, Users } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            About <span className="text-primary">SunPluS</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Powering homes and businesses with reliable, stylish, and innovative electrical accessories.  
            We bring technology, safety, and design together to brighten your world.
          </p>
        </section>

        {/* Company Overview */}
        <section className="bg-white shadow-sm hover:shadow-md transition-all rounded-2xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            SunPluS is a trusted name in modern electrical accessories, offering premium-quality switches, sockets, lighting, and home electrical solutions.
            With a strong commitment to safety, innovation, and sustainability, we deliver products that redefine how people interact with power in their spaces.
            Our goal is simple — to make energy smarter, safer, and more beautiful.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white shadow-sm hover:shadow-md transition-all rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <Lightbulb className="text-primary flex-shrink-0" size={22} />
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              To empower every space with smart, stylish, and sustainable electrical solutions 
              that enhance comfort, safety, and efficiency.
            </p>
          </div>

          <div className="bg-white shadow-sm hover:shadow-md transition-all rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <Zap className="text-primary flex-shrink-0" size={22} />
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              To become a global leader in innovative electrical accessories, setting new standards 
              in design, reliability, and sustainability.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white shadow-sm hover:shadow-md transition-all rounded-2xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Quality & Safety", text: "Every product is built to the highest safety and performance standards." },
              { icon: Lightbulb, title: "Innovation", text: "We continuously develop smart, energy-efficient solutions for modern living." },
              { icon: Users, title: "Customer Focus", text: "Your satisfaction drives everything we do, from design to delivery." },
              { icon: Globe, title: "Sustainability", text: "We prioritize eco-friendly materials and sustainable manufacturing practices." },
              { icon: Zap, title: "Efficiency", text: "Combining design and performance to make everyday electrical use seamless." },
              { icon: Award, title: "Excellence", text: "We take pride in achieving excellence through precision and reliability." },
            ].map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-start gap-3 border border-gray-100 rounded-xl p-4 sm:p-5 hover:border-primary/40 transition-all"
              >
                <value.icon className="text-primary" size={28} />
                <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-white shadow-sm hover:shadow-md transition-all rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-gray-800">
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: "10+", label: "Years of Excellence" },
              { number: "500+", label: "Products Available" },
              { number: "100K+", label: "Happy Customers" },
              { number: "15+", label: "Countries Served" },
            ].map((item) => (
              <div key={item.label}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-2">
                  {item.number}
                </h3>
                <p className="text-gray-600 font-medium text-sm sm:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
