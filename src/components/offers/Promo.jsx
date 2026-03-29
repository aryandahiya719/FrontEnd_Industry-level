import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Promo = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const offersList = [
    '25% Off First Order',
    'Happy Hour Drinks',
    'Combo Deals'
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="card-base relative overflow-hidden flex flex-col md:flex-row bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl min-h-[400px] rounded-[2rem]"
      >
        {/* Abstract Background Splash */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Side: Content */}
        <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col justify-center relative z-20">
          <h3 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-[0.9] mb-8">
            More Bites, <br/> 
            <span className="text-yellow-300 drop-shadow-md">More Savings!</span>
          </h3>
          
          <ul className="space-y-5 mb-10 z-10 relative">
            {offersList.map((offer, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1), duration: 0.4 }}
                className="flex items-center gap-4 text-white font-bold text-lg md:text-xl tracking-wide"
              >
                <span className="bg-white text-orange-600 rounded-full p-1 shadow-sm">
                   <CheckCircle2 className="w-5 h-5 flex-shrink-0" strokeWidth={3} />
                </span>
                {offer}
              </motion.li>
            ))}
          </ul>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.6 }}
          >
            <button className="bg-white text-red-600 hover:bg-yellow-300 hover:text-red-700 font-[family-name:var(--font-display)] tracking-wider text-lg uppercase px-12 py-4 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 w-fit font-bold">
              Order Now
            </button>
          </motion.div>
        </div>

        {/* Right Side: Large Image */}
        <div className="w-full md:w-[45%] h-72 md:h-auto relative z-10 overflow-hidden">
          {/* Angled cutoff on desktop perfectly linking the sections */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-red-600 to-transparent pointer-events-none z-20 hidden md:block" />
          
          <motion.img 
            style={{ y: imgY, scale: 1.35 }}
            src="https://images.unsplash.com/photo-1594993877014-a90184e6133d?auto=format&fit=crop&q=80&w=1000" 
            alt="Delicious loaded burger and fries"
            whileHover={{ scale: 1.45 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full object-cover object-center cursor-pointer origin-center shadow-2xl"
          />
        </div>
        
      </motion.div>
    </section>
  );
};

export default Promo;
