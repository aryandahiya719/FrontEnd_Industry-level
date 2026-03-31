import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, MessageSquare, Send, Camera, Play, ExternalLink } from 'lucide-react';

const Footer = () => {
  const googleMapsUrl = "https://maps.google.com/?q=Chelsea+Market";

  return (
    <footer className="bg-[color:var(--color-secondary)] text-white pt-24 pb-12 px-8 mt-auto relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row flex-wrap justify-between gap-16 border-b border-[color:var(--color-primary)]/20 pb-16 mb-8">
        
        {/* Branding & Stylized Location Card */}
        <div className="w-full lg:w-1/3 flex flex-col gap-10">
          <div className="space-y-4">
            <h2 className="heading-display text-6xl text-[color:var(--color-primary)] mb-2 tracking-tight">
              Cremy
            </h2>
            <p className="text-[color:var(--color-app-bg)]/50 font-bold uppercase tracking-[0.2em] text-[10px]">Culinary Excellence in Manhattan</p>
          </div>

          {/* Interactive Map Preview Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="group relative bg-white/5 rounded-[2.5rem] p-8 border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[color:var(--color-primary)] rounded-2xl flex items-center justify-center text-[color:var(--color-secondary)]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[color:var(--color-primary)] mb-1">Our Flagship</p>
                    <a 
                      href={googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-white hover:text-[color:var(--color-primary)] transition-colors inline-block leading-tight mb-1"
                    >
                      75 9th Ave, New York, NY 10011
                    </a>
                    <p className="text-xs text-white/40 font-bold italic">Chelsea Market</p>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[color:var(--color-primary)] text-[color:var(--color-secondary)] py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
               </div>
            </div>
            {/* Background Decorative Map Abstract Overlay */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
               <MapPin className="w-32 h-32 rotate-12" />
            </div>
          </motion.div>

          {/* Social Presence */}
          <div className="flex gap-4 mt-4 text-[color:var(--color-secondary)] font-bold">
             {[MessageSquare, Send, Camera, Play].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center bg-[color:var(--color-app-bg)] rounded-2xl hover:scale-110 hover:bg-[color:var(--color-primary)] transition-all duration-300">
                   <Icon className="w-5 h-5" />
                </a>
             ))}
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="w-full lg:w-auto flex-1 flex flex-wrap justify-start lg:justify-around gap-12 lg:gap-8">
          
          {/* Company Links */}
          <div className="flex flex-col gap-5 min-w-[140px]">
             <h4 className="heading-display text-2xl tracking-wide mb-2 text-white">Company</h4>
             <a href="#" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Our Story</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Careers</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Sustainability</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Press</a>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-5 min-w-[140px]">
             <h4 className="heading-display text-2xl tracking-wide mb-2 text-white">Experience</h4>
             <a href="#menu" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">The Menu</a>
             <a href="#offers" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Seasonal Offers</a>
             <a href="/tables" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Reservations</a>
             <a href="#location" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Find Us</a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-5 min-w-[140px]">
             <h4 className="heading-display text-2xl tracking-wide mb-2 text-white">Legal</h4>
             <a href="#" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Terms of Service</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Privacy Policy</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Cookie Policy</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/40 hover:text-[color:var(--color-primary)] font-bold transition-colors">Allergens</a>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[color:var(--color-app-bg)]/30 text-[10px] font-black uppercase tracking-[0.25em]">
         <p>&copy; {new Date().getFullYear()} Cremy Gastronomy Group. All rights reserved.</p>
         <p className="flex items-center gap-2">Crafted with bold flavors <div className="w-1.5 h-1.5 bg-[color:var(--color-primary)] rounded-full" /> New York City</p>
      </div>
    </footer>
  );
};

export default Footer;
