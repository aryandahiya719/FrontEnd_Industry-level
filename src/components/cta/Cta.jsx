import React from 'react';
import { motion } from 'framer-motion';

const Cta = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="card-base relative overflow-hidden flex flex-col md:flex-row bg-[color:var(--color-secondary)] min-h-[400px] shadow-2xl"
      >
        {/* Subtle Background Pattern/Overlay effect on the dark brown side */}
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-5 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                 <pattern id="bubbles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="10" fill="currentColor" />
                    <circle cx="80" cy="70" r="15" fill="currentColor" />
                    <circle cx="40" cy="90" r="5" fill="currentColor" />
                 </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#bubbles)" />
           </svg>
        </div>

        {/* Left Side: Split Layout Text Container */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-20">
          <h3 className="heading-display text-4xl lg:text-6xl text-white uppercase leading-tight mb-6">
            Sit, Savor, or Order Fast — <span className="text-yellow-400">Your Meal, Your Rules</span>
          </h3>
          <p className="text-white/80 font-bold mb-10 max-w-sm tracking-wide">
            Visit our restaurant or order instantly from the app—always fresh, always fast.
          </p>
          <button className="btn-primary w-fit shadow-[0_10px_40px_rgba(244,183,64,0.3)]">
            Book A Table
          </button>
        </div>

        {/* Right Side: Large Chef Image */}
        <div className="w-full md:w-1/2 min-h-[300px] relative z-10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800" 
            alt="Chef cooking fresh ingredients"
            className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-110"
          />
          {/* Blend gradient from the brown background into the image horizontally */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[color:var(--color-secondary)] via-[color:var(--color-secondary)]/50 to-transparent w-full md:w-1/3"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Cta;
