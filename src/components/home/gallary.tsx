import { motion } from "framer-motion";
import SectionTitle from "../ui/section-title";
import img1 from "@/assets/img/gallary/Color-led-light.jpg";
import img2 from "@/assets/img/gallary/Others-12.png";
import img3 from "@/assets/img/gallary/UFO-led-Bulb.jpg";
import img4 from "@/assets/img/gallary/led-bulb-tube-light-20w.jpg";
import img7 from "@/assets/img/gallary/Fan-02.png";

const products = [
  { src: img7, name: "Ceiling Fan", desc: "High-speed energy-saving ceiling fan" },
  { src: img2, name: "LED Light Product", desc: "Premium LED for indoor use" },
  { src: img3, name: "UFO LED Bulb", desc: "Bright & efficient UFO-style bulb" },
  { src: img4, name: "Tube Light", desc: "20W LED tube for workspace lighting" },
  { src: img1, name: "Color LED", desc: "Vibrant RGB lighting solution" },
];

export default function Gallery() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--primary)/0.1),transparent_70%)] pointer-events-none" />
      <div className="relative container mx-auto px-3 sm:px-6 lg:px-8">
        <SectionTitle title="Our Products" align="center" />
        <div
          className="
            mt-10 grid 
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
            gap-5 sm:gap-6 md:gap-8
          "
        >
          {products.map((product, i) => (
            <motion.div
              key={i}
              className="
                group bg-card rounded-2xl overflow-hidden border border-border/50 
                 transition-all duration-500
                flex flex-col
              "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Image Section */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.src}
                  alt={product.name}
                  className="
                    w-full h-full object-cover transition-transform duration-700 
                    group-hover:scale-110
                  "
                />

                {/* Overlay effect */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Content */}
              <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 sm:mt-2 line-clamp-2">
                  {product.desc}
                </p>

                {/* Optional Footer (price / button placeholder) */}
                <div className="mt-4 border-t border-border/40 pt-3">
                  <button
                    className="
                      inline-flex items-center justify-center w-full 
                      text-sm font-medium px-4 py-2 rounded-xl 
                      bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground
                      transition-colors duration-300
                    "
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
