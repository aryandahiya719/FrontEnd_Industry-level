import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Navigation, ExternalLink } from 'lucide-react';

const Location = () => {
  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: '75 9th Ave, New York, NY 10011',
      subValue: '(Chelsea Market)',
      link: 'https://maps.google.com/?q=Chelsea+Market'
    },
    {
      icon: Phone,
      label: 'Phone number',
      value: '+1 (212) 555-CREMY',
      link: 'tel:+12125552736'
    }
  ];

  const hours = [
    { day: 'Mon - Thu', time: '11:00 AM - 10:00 PM' },
    { day: 'Fri - Sat', time: '11:00 AM - 11:30 PM' },
    { day: 'Sunday', time: '12:00 PM - 09:00 PM' }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="location" className="py-40 px-8 bg-[color:var(--color-app-bg)] overflow-hidden relative">
      {/* Background Decorative Blobs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-[color:var(--color-primary)]/10 rounded-full blur-[150px] pointer-events-none" 
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-stretch">
          
          {/* Left Side: Premium Information Card with Staggered Slide In */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1"
          >
            <div className="bg-white/70 backdrop-blur-2xl rounded-[4rem] p-12 md:p-20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-white h-full flex flex-col justify-between space-y-16">
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <motion.p 
                    variants={itemVariants}
                    className="font-bold text-[10px] uppercase tracking-[0.3em] text-slate-500"
                  >
                    Visit our flagship
                  </motion.p>
                  <motion.h2 
                    variants={itemVariants}
                    className="text-8xl heading-display text-[color:var(--color-secondary)] uppercase tracking-tight leading-none"
                  >
                    Find Us
                  </motion.h2>
                </div>

                {/* Staggered Contact Details */}
                <div className="space-y-12">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      className="flex items-start gap-10 group"
                    >
                      <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shrink-0 group-hover:bg-[color:var(--color-primary)] transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-slate-50/50 group-hover:rotate-12 group-hover:scale-110">
                        <info.icon className="w-8 h-8 text-slate-300 group-hover:text-[color:var(--color-secondary)] transition-colors duration-500" />
                      </div>
                      <div className="space-y-2 pt-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">{info.label}</p>
                        <p className="text-3xl font-bold text-slate-800 leading-tight group-hover:text-[color:var(--color-primary)] transition-colors tracking-tight">
                          {info.value}
                        </p>
                        {info.subValue && (
                          <p className="text-sm font-bold text-slate-400 opacity-60 uppercase tracking-widest">{info.subValue}</p>
                        )}
                      </div>
                    </motion.a>
                  ))}

                  {/* Staggered Opening Hours */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex items-start gap-10 pt-4"
                  >
                    <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shrink-0 shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-slate-50/50">
                       <Clock className="w-8 h-8 text-slate-200" />
                    </div>
                    <div className="space-y-8 pt-3 flex-1">
                       <div className="flex flex-col gap-2">
                          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">Operational Hours</p>
                          <div className="w-16 h-1 bg-[color:var(--color-primary)] rounded-full" />
                       </div>
                       <div className="grid grid-cols-1 gap-6">
                          {hours.map((h, i) => (
                            <div key={i} className="flex justify-between items-center group/hour border-b border-dashed border-slate-100 pb-4 last:border-none">
                              <span className="font-bold text-slate-400 text-xs group-hover/hour:text-slate-700 transition-colors uppercase tracking-[0.15em]">{h.day}</span>
                              <span className="font-black text-slate-800 text-sm tracking-tight">{h.time}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Button with Fade & Slide */}
              <motion.a 
                href="https://maps.google.com/?q=Chelsea+Market"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'var(--color-primary)',
                  boxShadow: '0 25px 50px -12px rgba(244, 183, 64, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full py-6 flex items-center justify-center gap-4 text-xs shadow-2xl shadow-slate-200 uppercase font-black tracking-[0.2em] group transition-all duration-300 border-none"
              >
                <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                Open in Google Maps
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side: Smooth Appearance of Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex-1 w-full min-h-[700px] rounded-[5rem] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.18)] border-[24px] border-white relative group preserve-3d"
          >
            <motion.iframe 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1511.555906164!2d-74.0062269!3d40.7420544!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf6a3b6329%3A0xc3f5aedafe8163f9!2sChelsea%20Market!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 saturate-0 contrast-[1.1] brightness-[1.02] group-hover:saturate-100 transition-all duration-1000 ease-in-out px-1"
              title="Cremy Strategic Location"
            />
            
            {/* Absolute Legend Overlay Integration */}
            <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
            
            <div className="absolute top-12 left-12 right-12 flex justify-between items-start pointer-events-none">
               <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-5 border border-slate-50"
               >
                  <div className="relative">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping absolute inset-0" />
                    <div className="w-4 h-4 bg-emerald-500 rounded-full relative z-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Platform Presence</span>
                    <span className="text-sm font-bold text-slate-800 tracking-tight leading-none mt-1">NYC Flagship Kitchen</span>
                  </div>
               </motion.div>
            </div>

            {/* Cinematic Map Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Location;
