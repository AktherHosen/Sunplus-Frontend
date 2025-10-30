import img6 from "@/assets/img/gallary/Bullet-led-35.jpg";
import img1 from "@/assets/img/gallary/Color-led-light.jpg";
import img7 from "@/assets/img/gallary/Fan-02.png";
import img2 from "@/assets/img/gallary/Others-12.png";
import img3 from "@/assets/img/gallary/UFO-led-Bulb.jpg";
import img4 from "@/assets/img/gallary/led-bulb-tube-light-20w.jpg";
import img5 from "@/assets/img/gallary/mosquete bat.png";
import { motion } from "framer-motion";
import SectionTitle from "../ui/section-title";

export default function Gallery() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section>
      <SectionTitle title="Product Gallery" align="center" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
        {/* Image 1 */}
        <motion.div
          className="relative overflow-hidden rounded-xl lg:row-span-2 group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <img
            src={img7}
            alt="LED Light"
            className="w-full h-full  transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Image 2 */}
        <motion.div
          className="relative overflow-hidden rounded-xl group"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src={img2}
            alt="Product 2"
            className="w-full h-full  transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Image 3 - Wide */}
        <motion.div
          className="relative overflow-hidden rounded-xl col-span-2 group"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={img4}
            alt="LED Tube Light"
            className="w-full h-full  transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Image 4 */}
        <motion.div
          className="relative overflow-hidden rounded-xl group"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <img
            src={img3}
            alt="UFO Led Light"
            className="w-full h-full  transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Image 5 - Tall */}
        <motion.div
          className="relative overflow-hidden rounded-xl row-span-2 group"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <img
            src={img5}
            alt="Mosquito Bat"
            className="w-full h-full  transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Image 6 */}
        <motion.div
          className="relative overflow-hidden rounded-xl group"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <img
            src={img6}
            alt="Bullet LED"
            className="w-full h-full  transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>

        {/* Image 7 - Wide */}
        <motion.div
          className="relative overflow-hidden rounded-xl col-span-2 group"
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <img
            src={img1}
            alt="Color LED"
            className="w-full h-full  transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </motion.div>
      </div>
    </section>
  );
}
