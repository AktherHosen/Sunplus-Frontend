import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function ChairmanMessagePage() {
  return (
    <section className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Message from Our{" "}
            <span className="text-primary">Chairman</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            A word of inspiration and vision from our Chairman at SunPlus.
            Empowering innovation, integrity, and excellence in everything we do.
          </p>
        </motion.div>

        {/* Chairman Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="overflow-hidden border-0  bg-white/90 backdrop-blur-sm rounded-3xl">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Chairman Image */}
              <motion.div
                className="relative"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/images/chairman.jpg"
                  alt="Chairman"
                  className="h-full w-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"></div>
              </motion.div>

              {/* Message Content */}
              <CardContent className="flex flex-col justify-center p-10 md:p-12 space-y-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <Quote className="text-primary w-6 h-6" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    A Vision for Tomorrow
                  </h2>
                </motion.div>

                <Separator className="bg-primary/20" />

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4 text-gray-600 text-base leading-relaxed"
                >
                  <p>
                    At <span className="font-semibold text-primary">SunPlus</span>, our journey has
                    always been about more than technology — it’s about transforming
                    lives through innovation and sustainable progress. We strive to
                    deliver excellence that empowers communities and creates lasting
                    impact across generations.
                  </p>
                  <p>
                    As we move forward, our mission remains clear — to be a global
                    leader in energy-efficient and future-ready electrical solutions,
                    built upon trust, quality, and human values.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="pt-6"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    Engr. Md. Akther Hosen
                  </h3>
                  <p className="text-sm text-gray-500">Chairman, SunPlus Group</p>
                </motion.div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
