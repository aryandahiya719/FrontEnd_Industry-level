import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, ArrowRight, Utensils, LayoutDashboard } from 'lucide-react';

const LoginGate = () => {
  const navigate = useNavigate();

  const paths = [
    {
      id: 'customer',
      title: 'Dine with Us',
      subtitle: 'Experience the Flavors of Cremy',
      icon: Utensils,
      description: 'Order your favorite meals, track deliveries, and manage your culinary journey.',
      buttonText: 'Enter Customer Portal',
      color: 'from-orange-400 to-rose-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      route: '/login/customer'
    },
    {
      id: 'admin',
      title: 'Manage Operations',
      subtitle: 'Control the Kitchen & Logistics',
      icon: LayoutDashboard,
      description: 'Oversee orders, manage the menu, and analyze restaurant performance.',
      buttonText: 'Enter Staff Suite',
      color: 'from-slate-800 to-black',
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-900',
      route: '/login/admin'
    }
  ];

  return (
    <div className="min-h-screen bg-[color:var(--color-app-bg)] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-[color:var(--color-primary)] rounded-full blur-[150px] opacity-[0.1] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[40vw] h-[40vw] bg-[color:var(--color-secondary)] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 space-y-4 relative z-10"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Identity Selection</span>
        <h1 className="text-6xl heading-display uppercase tracking-tight text-[color:var(--color-secondary)]">Choose Your Path</h1>
        <p className="font-bold text-slate-400 max-w-md mx-auto italic">Select your access point to the Cremy ecosystem.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl w-full relative z-10 px-4">
        {paths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, type: 'spring', stiffness: 100, damping: 20 }}
            whileHover={{ y: -10 }}
            onClick={() => navigate(path.route)}
            className="group cursor-pointer"
          >
            <div className="h-full bg-white rounded-[4rem] p-12 md:p-16 border border-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-12 transition-all group-hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.12)] relative overflow-hidden">
               
               {/* Orbital Gradient Glow */}
               <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-5 transition-opacity blur-3xl`} />

               <div className="space-y-8">
                  <div className={`w-24 h-24 ${path.bgColor} ${path.textColor} rounded-[2.5rem] flex items-center justify-center shadow-inner transition-transform group-hover:rotate-12 duration-500`}>
                     <path.icon className="w-10 h-10" />
                  </div>

                  <div className="space-y-3">
                     <h2 className={`text-4xl heading-display uppercase tracking-tight ${path.textColor}`}>{path.title}</h2>
                     <p className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-300 italic">{path.subtitle}</p>
                  </div>

                  <p className="font-bold text-slate-400 leading-relaxed text-sm">
                    {path.description}
                  </p>
               </div>

               <div className="flex items-center justify-between pt-6 border-t border-slate-50 group-hover:border-slate-100 transition-colors">
                  <span className={`heading-display text-xl uppercase tracking-widest ${path.textColor}`}>{path.buttonText}</span>
                  <div className={`w-14 h-14 ${path.bgColor} ${path.textColor} rounded-full flex items-center justify-center group-hover:translateX-4 transition-all`}>
                     <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 text-center opacity-30 hover:opacity-100 transition-opacity cursor-default"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Powered by Cremy Gastronomy Group</p>
      </motion.div>
    </div>
  );
};

export default LoginGate;
