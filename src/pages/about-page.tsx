import { Lightbulb, ShieldCheck, Zap, Award, Globe, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto space-y-12">

        {/* Hero Section */}
        <section className="text-center ">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground ">
            About <span className="text-primary">SunPluS</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Powering homes and businesses with reliable, stylish, and innovative electrical accessories.  
            We bring technology, safety, and design together to brighten your world.
          </p>
        </section>

        {/* Company Overview */}
        <Card className="shadow-none py-0 hover:shadow-md transition-all rounded-lg border-border">
          <CardHeader className="p-6">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-foreground">
              Who We Are
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 text-muted-foreground leading-relaxed text-sm sm:text-base">
            SunPluS is a trusted name in modern electrical accessories, offering premium-quality switches, sockets, lighting, and home electrical solutions.
            With a strong commitment to safety, innovation, and sustainability, we deliver products that redefine how people interact with power in their spaces.
            Our goal is simple — to make energy smarter, safer, and more beautiful.
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 sm:gap-8">
          <Card className="shadow-none  transition-all rounded-lg border-border p-6">
            <CardHeader className="p-0 mb-3 flex items-center gap-2">
              <Lightbulb className="text-primary flex-shrink-0" size={22} />
              <CardTitle className="text-lg sm:text-xl font-semibold text-foreground">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-muted-foreground text-sm sm:text-base leading-relaxed">
              To empower every space with smart, stylish, and sustainable electrical solutions 
              that enhance comfort, safety, and efficiency.
            </CardContent>
          </Card>

          <Card className="shadow-none hover:shadow-md transition-all rounded-lg border-border p-6">
            <CardHeader className="p-0 mb-3 flex items-center gap-2">
              <Zap className="text-primary flex-shrink-0" size={22} />
              <CardTitle className="text-lg sm:text-xl font-semibold text-foreground">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-muted-foreground text-sm sm:text-base leading-relaxed">
              To become a global leader in innovative electrical accessories, setting new standards 
              in design, reliability, and sustainability.
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <Card className="shadow-none  transition-all rounded-lg border-border p-6 sm:p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-foreground">
              Our Core Values
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Quality & Safety", text: "Every product is built to the highest safety and performance standards." },
              { icon: Lightbulb, title: "Innovation", text: "We continuously develop smart, energy-efficient solutions for modern living." },
              { icon: Users, title: "Customer Focus", text: "Your satisfaction drives everything we do, from design to delivery." },
              { icon: Globe, title: "Sustainability", text: "We prioritize eco-friendly materials and sustainable manufacturing practices." },
              { icon: Zap, title: "Efficiency", text: "Combining design and performance to make everyday electrical use seamless." },
              { icon: Award, title: "Excellence", text: "We take pride in achieving excellence through precision and reliability." },
            ].map((value) => (
              <Card
                key={value.title}
                className="flex flex-col shadow-none py-0 items-start gap-3 border border-border rounded-lg p-4 hover:border-primary transition-all"
              >
                <value.icon className="text-primary" size={28} />
                <CardTitle className="text-base sm:text-lg font-semibold text-foreground">
                  {value.title}
                </CardTitle>
                <CardContent className="p-0 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {value.text}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="shadow-none py-0 transition-all rounded-lg border-border p-6 sm:p-8 text-center">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl sm:text-3xl font-semibold text-foreground">
              Our Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
                <p className="text-muted-foreground font-medium text-sm sm:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
