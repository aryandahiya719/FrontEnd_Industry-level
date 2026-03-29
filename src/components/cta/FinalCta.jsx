import React from 'react';
import { motion } from 'framer-motion';

const FinalCta = () => {
  // Bouncing float animations for the peripheral images
  const floatAnim1 = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const floatAnim2 = {
    animate: {
      y: [0, 20, 0],
      rotate: [0, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className="relative py-32 bg-[color:var(--color-primary)] overflow-hidden flex items-center justify-center min-h-[500px]">
      
      {/* Top Wavy Shape Divider (SVG) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 w-[150%] md:w-full rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-[color:var(--color-app-bg)]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      
      {/* Bottom Wavy Shape Divider (SVG) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 w-[150%] md:w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] fill-[color:var(--color-app-bg)]">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V3C1132.19,26.09,1055.71,18.48,985.66,92.83Z"></path>
        </svg>
      </div>

      {/* Floating Left Image */}
      <motion.img
        variants={floatAnim1}
        animate="animate"
        src="https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80"
        alt="Floating french fries"
        className="absolute left-[-2rem] md:left-20 top-20 md:top-32 w-40 md:w-56 h-40 md:h-56 object-cover rounded-full shadow-2xl mix-blend-multiply z-20"
      />

      {/* Floating Right Image */}
      <motion.img
        variants={floatAnim2}
        animate="animate"
        src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=400&q=80"
        alt="Floating hotdog"
        className="absolute right-[-2rem] md:right-24 bottom-10 md:bottom-24 w-40 md:w-64 h-40 md:h-64 object-cover rounded-full shadow-2xl mix-blend-multiply z-20"
      />

      {/* Central Content */}
      <div className="relative z-30 text-center max-w-2xl px-6 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading-display text-5xl md:text-7xl lg:text-8xl text-[color:var(--color-secondary)] uppercase leading-none md:leading-tight mb-8 drop-shadow-sm"
        >
          Hungry? <br className="md:hidden" /> We Are Ready.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white bg-[color:var(--color-secondary)] px-6 py-2 rounded-full text-lg md:text-xl font-bold mb-10 shadow-lg tracking-wide"
        >
          Secure your spot at our table today.
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white text-[color:var(--color-secondary)] hover:bg-[color:var(--color-secondary)] hover:text-white font-[family-name:var(--font-display)] tracking-widest text-lg uppercase px-12 py-5 rounded-full shadow-[0_15px_30px_rgba(139,46,15,0.2)] hover:-translate-y-2 transition-all duration-300"
        >
          Book a Table
        </motion.button>
      </div>

    </section>
  );
};

export default FinalCta;
