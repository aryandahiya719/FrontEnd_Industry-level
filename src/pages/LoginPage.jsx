import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleCustomerLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("role", "user");
    navigate("/user");
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("role", "admin");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-app-bg)] px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring",
          damping: 25,
          stiffness: 300
        }}
        className="w-full max-w-md bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 p-12 text-center border border-white"
      >
        <div className="space-y-3 mb-10">
          <h2 className="text-4xl heading-display uppercase tracking-tight text-[color:var(--color-secondary)]">Welcome Back</h2>
          <p className="font-bold opacity-40 text-sm tracking-wide">Enter your details to access your account.</p>
        </div>

        <form className="space-y-6 text-left">
          <div className="space-y-2">
            <label className="admin-label ml-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all font-[family-name:var(--font-body)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="admin-label ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all font-[family-name:var(--font-body)]"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCustomerLogin}
              className="btn-primary w-full py-5 flex items-center justify-center gap-3"
            >
              <User className="w-5 h-5" /> Login as Customer
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAdminLogin}
              className="w-full py-5 bg-[color:var(--color-secondary)] text-white rounded-full font-[family-name:var(--font-display)] uppercase tracking-wider text-sm font-bold shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-3"
            >
              <ShieldCheck className="w-5 h-5" /> Login as Admin
            </motion.button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-100">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Rapid Feature Access (Demo Mode)</p>
           <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { localStorage.setItem("role", "admin"); window.location.href = "/admin"; }}
                className="py-4 bg-emerald-50 text-emerald-600 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all border border-emerald-100"
              >
                Explore Admin
              </button>
              <button 
                onClick={() => { localStorage.setItem("role", "user"); window.location.href = "/user"; }}
                className="py-4 bg-blue-50 text-blue-600 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all border border-blue-100"
              >
                Explore User
              </button>
           </div>
        </div>

        <p className="mt-10 font-bold text-xs text-slate-400 tracking-widest uppercase">
          Don't have an account? <span className="text-[color:var(--color-primary)] cursor-pointer">Sign up</span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
