import React from 'react';
import { motion } from 'framer-motion';

const Offers = () => {
  return (
    <section id="offers" className="py-24 px-6 max-w-7xl mx-auto space-y-8">
      
      {/* Banner Card 1: Flavor Built for the History Books */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="card-base relative overflow-hidden flex flex-col md:flex-row bg-[color:var(--color-primary)] min-h-[400px] md:h-[400px] group cursor-pointer"
      >
        <div className="p-10 md:p-16 w-full md:w-1/2 flex flex-col justify-center relative z-20">
          <h3 className="heading-display text-5xl md:text-6xl text-[color:var(--color-secondary)] uppercase leading-[0.95] drop-shadow-sm transition-transform duration-500 group-hover:scale-105 origin-left">
            Flavor <br/> 
            Built For <br/> 
            The History <br/> 
            Books
          </h3>
          <div className="mt-8">
             <button className="bg-[color:var(--color-secondary)] text-white font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all">
                Explore Now
             </button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-64 md:h-full relative z-10 overflow-hidden mt-auto md:mt-0 flex justify-end">
          <img 
            src="https://images.unsplash.com/photo-1594212202875-c546419d1d1f?auto=format&fit=crop&q=80&w=1000" 
            alt="Feast platter" 
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Soft gradient overlay for blending if needed */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-primary)] to-transparent pointer-events-none hidden md:block"></div>
        </div>
      </motion.div>

      {/* Grid for Card 2 & 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 2: Bold Flavors That Define History */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-base relative overflow-hidden flex flex-col bg-[color:var(--color-secondary)] min-h-[400px] group cursor-pointer"
        >
          <div className="h-3/5 relative overflow-hidden">
             <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800" 
                alt="Delicious Burger" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
          </div>
          <div className="h-2/5 p-8 flex items-center justify-center relative z-20">
            <h4 className="heading-display text-3xl md:text-4xl text-[color:var(--color-primary)] uppercase text-center leading-[1]">
              Bold Flavors <br/> That Define <br/> History
            </h4>
          </div>
        </motion.div>

        {/* Card 3: Taste That Stands The Test of Time */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card-base relative overflow-hidden flex flex-col sm:flex-row bg-[color:var(--color-secondary)] min-h-[400px] group cursor-pointer"
        >
           <div className="w-full sm:w-1/2 h-64 sm:h-full relative overflow-hidden order-1 sm:order-2">
             <img 
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800" 
                alt="Cheesy Pizza" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[color:var(--color-secondary)]/50 pointer-events-none sm:hidden"></div>
          </div>
          <div className="w-full sm:w-1/2 p-8 flex items-center justify-center sm:justify-end relative z-20 order-2 sm:order-1 sm:text-right">
            <h4 className="heading-display text-3xl md:text-4xl text-[color:var(--color-primary)] uppercase leading-[1]">
              Taste That <br/> Stands The <br/> Test Of <br/> Time
            </h4>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Offers;
