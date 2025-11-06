import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { motion } from "framer-motion";

const certificates = [
  {
    title: "ISO 9001:2015 Certification",
    image: "/images/certificates/iso.jpg",
    description:
      "Certified for maintaining international quality management standards in product design and manufacturing.",
  },
  {
    title: "Best Electrical Brand Award 2024",
    image: "/images/certificates/award2024.jpg",
    description:
      "Recognized for excellence and innovation in electrical solutions and sustainable manufacturing.",
  },
  {
    title: "Environment Sustainability Recognition",
    image: "/images/certificates/green.jpg",
    description:
      "Awarded for our commitment to eco-friendly production and green technology integration.",
  },
  {
    title: "National Export Excellence Award",
    image: "/images/certificates/export.jpg",
    description:
      "Acknowledged as a leading contributor to the national export industry through innovative electrical solutions.",
  },
];

export default function CertificatesPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-background/95 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-primary">
            <Award className="w-6 h-6" />
            <span className="uppercase font-semibold tracking-wide">
              Recognition & Certifications
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
            Our <span className="text-primary">Certificates</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            A testament to our dedication, innovation, and commitment to
            excellence. Every recognition reflects our unwavering pursuit of
            quality and trust.
          </p>
        </motion.div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group flex flex-col h-full overflow-hidden pt-0 shadow-none border border-border transition-transform duration-300 rounded-lg bg-white/90 backdrop-blur-sm ">
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-48 sm:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-grow">
                  <CardHeader className="px-4">
                    <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
                      {cert.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow justify-between px-4 ">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {cert.description}
                    </p>
                    <div className="mt-4 self-start">
                      <Badge variant="secondary" className="text-xs uppercase">
                        Certified
                      </Badge>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
