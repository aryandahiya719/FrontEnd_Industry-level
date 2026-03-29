import React from 'react';
import { motion } from 'framer-motion';

const promoData = [
  {
    id: 1,
    text: "Flavor Built for the History Books",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    text: "Bold Flavors That Define History",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    text: "Taste That Stands the Test of Time",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
  }
];

const PromoCards = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {promoData.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative h-80 md:h-96 rounded-[2rem] overflow-hidden cursor-pointer shadow-lg card-base p-0"
          >
            {/* Background Image with Hover Zoom */}
            <img 
              src={promo.image} 
              alt="Promo background" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Text Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 flex items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <h3 className="text-3xl md:text-4xl heading-display text-white uppercase leading-tight drop-shadow-lg">
                {promo.text}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PromoCards;
