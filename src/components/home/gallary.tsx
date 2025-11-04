import img5 from "@/assets/img/gallary/Bullet-led-35.jpg";
import img1 from "@/assets/img/gallary/Color-led-light.jpg";
import img7 from "@/assets/img/gallary/Fan-02.png";
import img2 from "@/assets/img/gallary/Others-08.png";
import img3 from "@/assets/img/gallary/UFO-led-Bulb.jpg";
import img4 from "@/assets/img/gallary/led-bulb-tube-light-20w.jpg";
import { motion } from "framer-motion";
import SectionTitle from "../ui/section-title";

const products = [
  { src: img7, name: "Ceiling Fan" },
  { src: img2, name: "Junction Box" },
  { src: img3, name: "UFO LED Bulb" },
  { src: img4, name: "Tube Light" },
  { src: img1, name: "Color LED" },
  { src: img5, name: "Bullet LED" },
];

export default function Gallery() {
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Our Products" align="center" />

        {/* Masonry-style grid (Flowbite pattern) */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((col) => (
            <div key={col} className="grid gap-4">
              {products
                .filter((_, i) => i % 4 === col) // distribute items into 4 columns
                .map((product, i) => (
                  <motion.div
                    key={i}
                    className="relative overflow-hidden rounded-xl group"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={product.src}
                      alt={product.name}
                      className="h-auto max-w-full rounded-lg object-cover"
                    />
                    <div className="absolute bottom-2 left-2 text-sm text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.name}
                    </div>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <section>
        
      </section>
    </section>
  );
}
