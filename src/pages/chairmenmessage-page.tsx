import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Quote } from "lucide-react";

export default function ChairmanMessagePage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Message from Our{" "}
            <span className="text-primary">Chairman</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            A word of inspiration and vision from our Chairman at SunPlus.
            Empowering innovation, integrity, and excellence in everything we do.
          </p>
        </div>

        {/* Chairman Card */}
        <Card className="overflow-hidden border-0 shadow-xl bg-white/90 backdrop-blur-sm rounded-3xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Chairman Image */}
            <div className="relative">
              <img
                src="/images/chairman.jpg"
                alt="Chairman"
                className="h-full w-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"></div>
            </div>

            {/* Message Content */}
            <CardContent className="flex flex-col justify-center p-10 md:p-12 space-y-6">
              <div className="flex items-center gap-3">
                <Quote className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  A Vision for Tomorrow
                </h2>
              </div>
              <Separator className="bg-primary/20" />
              <p className="text-gray-600 text-base leading-relaxed">
                At <span className="font-semibold text-primary">SunPlus</span>, our journey has
                always been about more than technology — it’s about transforming
                lives through innovation and sustainable progress. We strive to
                deliver excellence that empowers communities and creates lasting
                impact across generations.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                As we move forward, our mission remains clear — to be a global
                leader in energy-efficient and future-ready electrical solutions,
                built upon trust, quality, and human values.
              </p>
              <div className="pt-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Engr. Md. Akther Hosen
                </h3>
                <p className="text-sm text-gray-500">Chairman, SunPlus Group</p>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
