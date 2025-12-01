import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function ChairmanMessagePage() {
  const membersRow1 = [
    {
      name: "Nur Mohammad Modhu",
      role: "Managing Director (MD)",
      message:
        "Our commitment to excellence drives SunPlus forward as we continue to innovate, grow, and deliver sustainable value.",
    },
  ];

  const membersRow2 = [
    {
      name: "Anowar Hossain Manik",
      role: "Deputy Managing Director (DMD)",
      message: "Working together to build a stronger, smarter organization.",
    },
    {
      name: "Shadat Hossain Sagor",
      role: "Director",
      message: "Dedicated to ensuring progress with integrity and vision.",
    },
    {
      name: "Mohiuddin Turjo",
      role: "General Manager (GM)",
      message: "Leading teams to achieve operational excellence every day.",
    },
  ];

  const membersRow3 = [
    {
      name: "Jane Alam",
      role: "Senior Manager",
      message: "Focused on delivering consistent quality and performance.",
    },
    {
      name: "Minar Mishu",
      role: "Senior HR Officer",
      message: "Committed to building a motivated and empowered workforce.",
    },
  ];

  const CardBox = ({ person, index }: any) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="w-full"
    >
      <Card className="rounded-xl py-0 border bg-white border-border shadow-none transition-all duration-300">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
            <Quote className="text-primary w-6 h-6" />
          </div>

          <h2 className="text-lg font-semibold text-gray-900">{person.name}</h2>

          <p className="text-primary font-medium text-sm">{person.role}</p>

          {person.message && (
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              {person.message}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section className="min-h-screen bg-background py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center space-y-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Leadership Team
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The visionaries guiding{" "}
            <span className="text-primary font-semibold">SunPlus</span> Group
            toward innovation and excellence.
          </p>
        </motion.div>

        {/* Tree Layout */}
        <div className="space-y-14">
          {/* Row 1 */}
          <div className="grid grid-cols-1 place-items-center">
            {membersRow1.map((person, index) => (
              <div className="w-full max-w-md" key={index}>
                <CardBox person={person} index={index} />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {membersRow2.map((person, index) => (
              <CardBox person={person} index={index} key={index} />
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-content-center justify-center max-w-3xl mx-auto">
            {membersRow3.map((person, index) => (
              <CardBox person={person} index={index} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
