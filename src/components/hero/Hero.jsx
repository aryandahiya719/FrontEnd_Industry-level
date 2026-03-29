import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  // Enhanced floating animations with pronounced rotation
  const floatAnimation1 = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-20, 20, -20],
      rotate: [-15, 15, -15],
      transition: { duration: 6, ease: "easeInOut", repeat: Infinity }
    }
  };

  const floatAnimation2 = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [20, -20, 20],
      rotate: [15, -15, 15],
      transition: { duration: 7, ease: "easeInOut", repeat: Infinity }
    }
  };
  
  const floatAnimation3 = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-15, 25, -15],
      rotate: [20, -20, 20],
      transition: { duration: 5.5, ease: "easeInOut", repeat: Infinity }
    }
  };

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const imageY = useTransform(scrollY, [0, 800], ["0%", "20%"]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }} // Smooth entrance on page load
      id="home" 
      className="relative min-h-[100vh] pt-32 pb-16 flex flex-col items-center justify-center overflow-hidden bg-[color:var(--color-app-bg)] px-6"
    >
      
      {/* Background Abstract Blobs (With Parallax) */}
      <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[color:var(--color-primary)] rounded-full mix-blend-multiply filter blur-[150px] opacity-40 animate-pulse pointer-events-none"></motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-white rounded-full mix-blend-overlay filter blur-[120px] opacity-60 pointer-events-none"></motion.div>

      {/* Headline (partially overlapping the image below via positioning) */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none mx-auto w-full max-w-7xl">
        <motion.h1 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-[14vw] md:text-[min(12vw,180px)] xl:text-[220px] heading-display text-[color:var(--color-secondary)] uppercase text-center leading-[0.85] tracking-tight w-full drop-shadow-sm mix-blend-darken"
        >
          FLAVOR <br className="hidden md:block"/>
          <span className="block md:inline lg:-ml-12"> THAT MAKES </span><br className="hidden md:block"/>
          HISTORY!
        </motion.h1>
      </div>

      {/* Floating Icons Container */}
      <div className="absolute inset-0 z-20 pointer-events-none max-w-7xl mx-auto">
        <motion.img 
          variants={floatAnimation1}
          initial="initial"
          animate="animate"
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400" 
          alt="Burger" 
          className="absolute left-4 md:left-24 top-40 md:top-64 w-28 md:w-44 h-28 md:h-44 object-cover rounded-full mix-blend-multiply shadow-2xl"
        />

        <motion.img 
          variants={floatAnimation2}
          initial="initial"
          animate="animate"
          src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=400" 
          alt="Strawberry" 
          className="absolute right-4 md:right-32 top-32 md:top-48 w-20 md:w-32 h-20 md:h-32 object-cover rounded-full mix-blend-multiply shadow-2xl"
        />

        <motion.img 
          variants={floatAnimation3}
          initial="initial"
          animate="animate"
          src="https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&q=80&w=400" 
          alt="Fries" 
          className="absolute left-10 md:left-[20%] bottom-32 md:bottom-1/4 w-24 md:w-36 h-24 md:h-36 object-cover rounded-full mix-blend-multiply shadow-2xl"
        />
      </div>

      {/* Foreground Elements Container (Negative Margin for overlap) */}
      <div className="relative z-30 w-full max-w-5xl mx-auto flex flex-col items-center justify-end -mt-16 md:-mt-40 xl:-mt-64">
        
        {/* Central Image overlapping the text with Scale In and Shadow Depth */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8, y: 40 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
           className="relative w-full max-w-sm md:max-w-[550px] mx-auto flex flex-col items-center"
        >
          {/* Subtext */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl mb-8 text-center max-w-md mx-auto hidden md:block border border-white"
          >
             <p className="text-[color:var(--color-secondary)] font-bold tracking-wide text-lg">
                Experience premium meals crafted with passion, delivered fast and fresh.
             </p>
          </motion.div>

          {/* Deep Shadow Image overlapping the text */}
          <div className="rounded-t-full overflow-hidden border-[12px] md:border-[16px] border-[color:var(--color-app-bg)] shadow-[0_40px_80px_rgba(139,46,15,0.35)] aspect-[4/5] w-full max-w-sm relative bg-white transition-transform duration-700 hover:scale-[1.02]">
            <motion.img 
              style={{ y: imageY, scale: 1.25 }}
              src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800"
              alt="Person enjoying food" 
              className="w-full h-full object-cover object-top origin-top"
            />
          </div>
          
          {/* CTA Button overlapping the bottom edge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full flex justify-center z-40"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-xl md:text-2xl shadow-[0_20px_40px_rgba(244,183,64,0.5)] hover:shadow-[0_25px_50px_rgba(244,183,64,0.7)] px-14 py-6"
            >
              Order Now
            </motion.button>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Hero;
