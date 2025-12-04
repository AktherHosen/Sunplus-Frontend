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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Card className="rounded-2xl border-border shadow-none bg-white/60 backdrop-blur  hover:shadow-lg transition-all duration-300 p-0">
        <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 shadow-sm">
            <Quote className="text-primary w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {person.name}
          </h2>

          <p className="text-primary font-semibold text-sm uppercase tracking-wide">
            {person.role}
          </p>

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
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-2xl md:text-4xl font-extrabold text-primary tracking-tight drop-shadow-sm">
            Leadership Team
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            The visionaries guiding{" "}
            <span className="text-primary font-semibold">SunPlus</span> Group
            toward innovation and excellence.
          </p>

          {/* Signature Line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mt-6"
          >
            <div className="w-48 h-[2px] bg-primary/70 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Tree Layout */}
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 place-items-center">
            {membersRow1.map((person, index) => (
              <div className="w-full max-w-md" key={index}>
                <CardBox person={person} index={index} />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {membersRow2.map((person, index) => (
              <CardBox person={person} index={index} key={index} />
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-content-center justify-center max-w-3xl mx-auto">
            {membersRow3.map((person, index) => (
              <CardBox person={person} index={index} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
