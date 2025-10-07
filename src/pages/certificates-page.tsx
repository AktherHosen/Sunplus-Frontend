import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Award } from "lucide-react";

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
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Award className="w-6 h-6" />
            <span className="uppercase font-semibold tracking-wide">
              Recognition & Certifications
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Our <span className="text-primary">Certificates</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            A testament to our dedication, innovation, and commitment to
            excellence. Every recognition reflects our unwavering pursuit of
            quality and trust.
          </p>
        </div>

        <Separator className="bg-primary/20 mb-12" />

        {/* Certificate Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <Card
              key={cert.title}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl bg-white/90 backdrop-blur-sm"
            >
              <div className="overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {cert.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {cert.description}
                </p>
                <div className="mt-4">
                  <Badge variant="secondary" className="text-xs uppercase">
                    Certified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
