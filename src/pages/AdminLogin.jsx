import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowLeft, LayoutDashboard, Sparkles } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("role", "admin");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-6 py-12 relative overflow-hidden">
      
      {/* Background Hero Abstract (Same warm style as Customer) */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-rose-400/20 rounded-full blur-[200px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-400/20 rounded-full blur-[200px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-[4rem] shadow-[0_80px_160px_-40px_rgba(139,46,15,0.15)] p-12 md:p-20 text-center border border-white relative z-10"
      >
        <Link to="/login" className="absolute top-10 left-10 p-4 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all shadow-sm group">
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>

        <div className="space-y-6 mb-12">
          <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner mb-4">
             <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-5xl heading-display uppercase tracking-tight text-[color:var(--color-secondary)]">Staff Access</h2>
          <p className="font-bold text-slate-400 text-sm max-w-sm mx-auto">Manage orders, oversee the menu, and control the Cremy Hospitality ecosystem.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8 text-left">
          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 ml-5">Admin Email</label>
             <div className="relative">
                <Mail className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cremy.com"
                  className="w-full pl-18 pr-8 py-6 bg-slate-50 border-4 border-transparent focus:border-orange-200 rounded-[2.5rem] outline-none transition-all font-bold text-lg text-slate-800 placeholder:text-slate-200"
                />
             </div>
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 ml-5">Password</label>
             <div className="relative">
                <Lock className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-18 pr-8 py-6 bg-slate-50 border-4 border-transparent focus:border-orange-200 rounded-[2.5rem] outline-none transition-all font-bold text-lg text-slate-800 placeholder:text-slate-200"
                />
             </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, shadow: '0 40px 80px -20px rgba(244,183,64,0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full py-8 text-xl font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 border-none mt-4"
          >
            <LayoutDashboard className="w-6 h-6" /> Access Dashboard
          </motion.button>
        </form>

        <div className="mt-16 pt-8 border-t border-slate-50">
           <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              Need help? <span className="text-orange-500 cursor-pointer hover:underline">Contact support</span>
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
