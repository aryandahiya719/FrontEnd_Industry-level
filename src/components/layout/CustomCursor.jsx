import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Motion values inherently trace mouse positioning 
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  
  // Add robust spring physics wrapping the core coordinates
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const trailX = useSpring(dotX, springConfig);
  const trailY = useSpring(dotY, springConfig);

  useEffect(() => {
    // Disable entirely for coarse pointer interactions (mobile/touchsreens)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return; 
    }
    
    setIsVisible(true);

    const moveCursor = (e) => {
      dotX.set(e.clientX - 6); // offset by half the 12px core element
      dotY.set(e.clientY - 6);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Look for clickable elements up the DOM tree from the target instance
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [dotX, dotY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Tight Responsive Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[color:var(--color-primary)] rounded-full pointer-events-none z-[99999]"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
      
      {/* Ethereal Trailing Animation Blob */}
      <motion.div
        className="fixed top-0 left-0 border-2 border-[color:var(--color-primary)]/60 rounded-full pointer-events-none z-[99998]"
        style={{
          x: trailX,
          y: trailY,
          width: 48,
          height: 48,
          translateX: "-18px", // Mathematical centering based on bounding box diff 
          translateY: "-18px", 
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(244, 183, 64, 0.1)' : 'transparent'
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
