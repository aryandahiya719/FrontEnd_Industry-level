import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Lock, ShieldCheck, ArrowLeft, CheckCircle2, QrCode, Copy } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const entryTotal = location.state?.total || 0;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [vpa, setVpa] = useState('');

  const [stagedTotal, setStagedTotal] = useState(entryTotal);

  useEffect(() => {
    const stagedOrder = sessionStorage.getItem('staged_order');
    if (!stagedOrder) {
      navigate('/checkout');
    } else {
      const parsedOrder = JSON.parse(stagedOrder);
      setStagedTotal(parsedOrder.total || entryTotal);
    }
  }, [navigate, entryTotal]);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("restaurant@upi");
    toast.success("UPI ID Copied!", {
      style: { borderRadius: '15px', background: '#1f1f1f', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Payment Processing Delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // FINALIZE: Move order from staged to permanent storage
    const stagedOrder = JSON.parse(sessionStorage.getItem('staged_order'));
    if (stagedOrder) {
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, { ...stagedOrder, paymentStatus: 'Paid' }]));
      
      // Cleanup
      sessionStorage.removeItem('staged_order');
      localStorage.removeItem("current_selected_table");
      clearCart();
    }

    setIsProcessing(false);
    setIsSuccess(true);

    // Redirect to Dashboard after success animation
    setTimeout(() => {
      navigate('/user');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[color:var(--color-app-bg)] px-6 relative overflow-hidden">
        {/* Success Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30 opacity-60" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-200/20 rounded-full blur-[120px]"
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 15,
            duration: 1 
          }}
          className="bg-white p-12 md:p-20 rounded-[5rem] shadow-[0_120px_200px_-40px_rgba(16,185,129,0.2)] text-center space-y-12 max-w-xl w-full border-b-8 border-emerald-500/10 relative z-10"
        >
          <div className="relative inline-block">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 10 }}
              className="w-32 h-32 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-3xl shadow-emerald-500/30"
            >
              <CheckCircle2 className="w-16 h-16 stroke-[1.5]" />
            </motion.div>
            
            {/* Success Ripple Effect */}
            <motion.div 
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-emerald-500 rounded-full -z-10"
            />
          </div>
          
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="heading-display text-6xl uppercase text-slate-900 tracking-tighter leading-none italic"
            >
              Payment <span className="text-emerald-500">Confirmed</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-bold text-slate-400 text-sm italic tracking-wide"
            >
              Your transaction was secured with 256-bit encryption.
            </motion.p>
          </div>

          <div className="space-y-6">
            <div className="relative h-1 w-48 mx-auto bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 animate-pulse">Syncing with User Dashboard</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-32 pb-24 px-6 bg-[color:var(--color-app-bg)] relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_40%)]" />
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[color:var(--color-primary)]/5 rounded-full blur-[150px] pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-20">
        <div className="flex items-center justify-between px-4">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/checkout" className="flex items-center gap-4 text-slate-400 hover:text-slate-900 font-black uppercase text-[11px] tracking-[0.3em] transition-all group">
               <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center bg-white shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <ArrowLeft className="w-4 h-4" />
               </div>
               Safe Exit
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-emerald-500/80 font-black uppercase text-[11px] tracking-[0.3em]"
          >
            <ShieldCheck className="w-5 h-5" /> Secured by Cremy
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[6rem] p-16 md:p-28 shadow-[0_120px_250px_-60px_rgba(0,0,0,0.15)] border border-slate-50 relative overflow-hidden text-center"
        >
          {/* Authorization Spinner Overlay */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-[20px] z-50 flex flex-col items-center justify-center space-y-12"
              >
                <div className="relative scale-125">
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-40 h-40 border-[8px] border-emerald-50 border-t-emerald-500 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.15)]" 
                   />
                   <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-3xl shadow-xl"
                   >
                    <Smartphone className="w-10 h-10 text-emerald-500" />
                   </motion.div>
                </div>
                <div className="space-y-4">
                  <h3 className="heading-display text-5xl uppercase tracking-tighter text-slate-900 leading-none">Validating</h3>
                  <p className="text-[12px] font-black text-slate-300 uppercase tracking-[0.4em]">UPI Transaction Handshake</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <header className="mb-24 space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.5 }}
                className="bg-slate-50 inline-block px-8 py-2 rounded-full border border-slate-100"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Payment Authorization</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="heading-display text-[10rem] uppercase tracking-tighter text-slate-900 leading-[0.75] italic font-black"
              >
                STARK <span className="text-emerald-500 block">GATE</span>
              </motion.h1>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative inline-block"
            >
               <div className="absolute inset-0 bg-emerald-500/10 blur-[40px] rounded-full" />
               <div className="relative flex items-center gap-10 px-20 py-8 bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
                  <div className="text-left">
                    <p className="font-black text-slate-300 text-[11px] uppercase tracking-[0.3em] mb-1">Settlement Amount</p>
                    <span className="text-6xl font-[family-name:var(--font-display)] font-bold text-slate-900 drop-shadow-sm tracking-tighter">₹{stagedTotal.toFixed(2)}</span>
                  </div>
                  <div className="h-16 w-px bg-slate-100" />
                  <Smartphone className="w-12 h-12 text-emerald-500 opacity-20" />
               </div>
            </motion.div>
          </header>

          <div className="flex flex-col items-center space-y-28">
            
            {/* PREMIUM QR INTERFACE */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 100, damping: 20 }}
              className="relative group px-6"
            >
              <motion.div 
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="bg-white p-16 rounded-[6rem] shadow-[0_100px_180px_-40px_rgba(0,0,0,0.25)] border-[12px] border-slate-50 relative z-10 overflow-hidden"
              >
                <div className="relative">
                  <QrCode className="w-80 h-80 text-slate-900 transition-all duration-1000 group-hover:scale-105" />
                  
                  {/* Cinematic Laser Scan Animation */}
                  <motion.div 
                    animate={{ top: ["-5%", "105%", "-5%"] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                    className="absolute left-[-10%] right-[-10%] h-[3px] bg-emerald-400 blur-[1px] shadow-[0_0_30px_rgba(52,211,153,1)] z-20 pointer-events-none"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </motion.div>

              {/* Orbital Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-[120px] pointer-events-none group-hover:from-emerald-500/20 transition-all duration-1000" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="space-y-6 text-center"
            >
              <div className="inline-flex items-center gap-4 text-emerald-600 font-bold text-[13px] uppercase tracking-[0.5em] bg-emerald-50 px-12 py-5 rounded-full border border-emerald-100 shadow-sm">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                Ready to Secure
              </div>
              <p className="text-[12px] font-black text-slate-300 uppercase tracking-widest italic opacity-40">Scan with any major UPI gateway</p>
            </motion.div>

            {/* Merchant Identity Card */}
            <div className="w-full space-y-16">
               <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ y: -10, shadow: "0 60px 100px -30px rgba(0,0,0,0.15)" }}
                className="bg-slate-100/50 backdrop-blur-xl p-12 rounded-[4rem] flex items-center justify-between border border-white/50 max-w-xl mx-auto transition-all group"
               >
                  <div className="flex flex-col text-left">
                     <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Merchant VPA Address</span>
                     <span className="text-4xl font-black text-slate-900 tracking-tighter font-[family-name:var(--font-display)]">restaurant@upi</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopyUPI} 
                    className="w-20 h-20 bg-white rounded-[2rem] text-slate-300 hover:bg-emerald-500 hover:text-white transition-all shadow-2xl border border-slate-100 flex items-center justify-center relative group/copy"
                  >
                     <Copy className="w-8 h-8" />
                     <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/copy:opacity-100 transition-opacity text-[10px] font-black uppercase text-slate-400 whitespace-nowrap">Duplicate ID</span>
                  </motion.button>
               </motion.div>

               <form onSubmit={handlePay} className="space-y-12 max-w-xl mx-auto">
                  <div className="relative group">
                    <Smartphone className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 w-8 h-8 transition-colors" />
                    <input 
                      required
                      name="vpa"
                      type="text" 
                      placeholder="Input User VPA handle" 
                      className="w-full bg-slate-100/30 border-4 border-transparent focus:border-emerald-500/20 rounded-[3rem] py-12 pl-28 pr-12 outline-none transition-all font-black text-3xl hover:bg-slate-100/50 focus:bg-white text-slate-900 placeholder:text-slate-200" 
                      value={vpa}
                      onChange={(e) => setVpa(e.target.value)}
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, y: -10, shadow: "0 60px 120px -30px rgba(16,185,129,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-slate-900 text-white py-12 rounded-full heading-display text-5xl uppercase tracking-[0.25em] shadow-[0_60px_100px_-30px_rgba(0,0,0,0.5)] hover:bg-emerald-600 transition-all flex items-center justify-center gap-10 relative overflow-hidden"
                  >
                    <span className="relative z-10 pt-2">Authorize Pay</span>
                  </motion.button>
               </form>
            </div>
          </div>

          <footer className="mt-40 pt-20 border-t border-slate-50 flex flex-wrap items-center justify-center gap-20 opacity-20 hover:opacity-40 transition-opacity">
             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-10 grayscale" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/GPay_logo.svg" alt="GPay" className="h-10 grayscale" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" className="h-10 grayscale" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-10 grayscale" />
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
