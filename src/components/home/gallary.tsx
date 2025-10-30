import React from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/img/circuit-breaker-3.jpg";
import img2 from "../../assets/img/gangswitchs.jpg";
import img3 from "../../assets/img/socket.png";
import img4 from "../../assets/img/gangswitchs.jpg";

export default function Gallery() {
  const images = [img1, img2, img3, img4];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* First column */}
          <motion.div
            className="lg:row-span-2 h-64 sm:h-80 lg:h-[400px]"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={images[0]}
              alt="Gallery"
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>

          {/* Middle column - stacked images */}
          <div className="grid grid-rows-2 gap-4 h-64 sm:h-80 lg:h-[400px]">
            <motion.img
              src={images[1]}
              alt="Gallery"
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.img
              src={images[3]}
              alt="Gallery"
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            />
          </div>

          {/* Third column */}
          <motion.div
            className="lg:row-span-2 h-64 sm:h-80 lg:h-[400px]"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={images[2]}
              alt="Gallery"
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
