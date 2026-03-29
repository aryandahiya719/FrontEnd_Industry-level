import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999999] bg-[color:var(--color-app-bg)] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Pulsing Glow Background Behind Burger */}
      <div className="absolute w-64 h-64 bg-[color:var(--color-primary)] rounded-full blur-[80px] opacity-40 animate-pulse" />

      <motion.div
        animate={{ 
          rotate: 360,
          y: [-10, 10, -10]
        }}
        transition={{ 
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="text-8xl md:text-9xl drop-shadow-2xl mb-8 relative z-10"
      >
        🍔
      </motion.div>

      <div className="flex flex-col items-center z-10">
        <h2 className="text-2xl md:text-4xl font-[family-name:var(--font-display)] font-bold text-[color:var(--color-secondary)] uppercase tracking-widest text-center mb-6">
          Firing up <br className="md:hidden"/> the grills...
        </h2>
        
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex gap-3 justify-center items-center"
        >
          <span className="w-3 h-3 rounded-full bg-[color:var(--color-secondary)]"></span>
          <span className="w-3 h-3 rounded-full bg-[color:var(--color-primary)]"></span>
          <span className="w-3 h-3 rounded-full bg-orange-500"></span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
