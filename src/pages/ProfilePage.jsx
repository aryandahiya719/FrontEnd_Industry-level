import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Package, Settings, LogOut, Clock, ChevronRight, ShoppingBag, Table } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Cremy Lover",
    email: "lover@cremy.app"
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Shared localStorage key 'orders' used by AdminOrders.jsx
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Preparing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-app-bg)] pt-44 pb-32 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-8"
        >
          <div className="bg-white/80 backdrop-blur-2xl rounded-[3.5rem] p-12 shadow-2xl shadow-slate-200/60 border border-white/40 text-center sticky top-40">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-10 border-8 border-[color:var(--color-app-bg)] shadow-inner-lg overflow-hidden">
               <User className="w-20 h-20 text-slate-200" />
            </div>
            
            <div className="space-y-8 text-left">
              <div className="space-y-3">
                <label className="admin-label text-[11px] uppercase tracking-[0.2em] opacity-40 font-black ml-1">Account Holder</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[color:var(--color-primary)] transition-colors" />
                  <input 
                    type="text" 
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50/50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-4 focus:ring-[color:var(--color-primary)]/10 transition-all font-[family-name:var(--font-body)]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="admin-label text-[11px] uppercase tracking-[0.2em] opacity-40 font-black ml-1">Contact Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[color:var(--color-primary)] transition-colors" />
                  <input 
                    type="email" 
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50/50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-4 focus:ring-[color:var(--color-primary)]/10 transition-all font-[family-name:var(--font-body)]"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => {}}
              className="btn-primary w-full mt-12 py-5 text-sm tracking-widest shadow-xl shadow-[color:var(--color-primary)]/20"
            >
              Update Profile
            </button>
            
            <button 
              onClick={handleLogout}
              className="mt-8 flex items-center justify-center gap-3 w-full text-[10px] font-black text-slate-300 hover:text-red-500 transition-all uppercase tracking-[0.25em]"
            >
              <LogOut className="w-4 h-4" /> Sign Out Securely
            </button>
          </div>
        </motion.div>

        {/* Right Column: Order History */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 space-y-10"
        >
          <div className="bg-white/80 backdrop-blur-2xl rounded-[3.5rem] p-16 shadow-2xl shadow-slate-200/60 border border-white/40 h-full">
            <div className="flex items-center justify-between mb-16">
              <div className="space-y-2">
                <h3 className="text-4xl heading-display text-[color:var(--color-secondary)] uppercase tracking-tight">Order History</h3>
                <p className="font-bold opacity-30 text-sm tracking-widest uppercase">Your culinary journey, curated.</p>
              </div>
              <div className="p-5 bg-[color:var(--color-app-bg)]/50 rounded-[1.5rem] shadow-sm border border-white">
                <Package className="w-8 h-8 text-[color:var(--color-primary)]" />
              </div>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.08,
                        type: "spring",
                        damping: 20,
                        stiffness: 100
                      }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="group p-8 rounded-[2.5rem] bg-white hover:bg-slate-50/10 border border-slate-100/50 hover:border-[color:var(--color-primary)]/10 hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                          <div className={`w-16 h-16 bg-slate-50 group-hover:bg-white rounded-2xl flex items-center justify-center shadow-inner-sm transition-colors duration-500 ${order.tableId ? 'border-2 border-emerald-100' : ''}`}>
                             {order.tableId ? (
                               <Table className="w-7 h-7 text-emerald-500" />
                             ) : (
                               <Clock className="w-7 h-7 text-slate-300 group-hover:text-[color:var(--color-primary)] transition-colors duration-500" />
                             )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <p className="font-bold text-[color:var(--color-secondary)] text-xl mb-0 tracking-tight">{order.id}</p>
                              {order.tableId && (
                                <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border border-emerald-100">Table #{order.tableId}</span>
                              )}
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{order.date}</p>
                              <p className="text-[11px] font-bold text-[color:var(--color-primary)] opacity-60 uppercase tracking-[0.1em] max-w-[280px] line-clamp-1 italic">
                                {Array.isArray(order.items) 
                                  ? order.items.map(item => typeof item === 'string' ? item : item.name).join(' • ') 
                                  : `${order.items} Items`}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-8 md:gap-14">
                          <div className="text-left md:text-right space-y-1">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.25em]">Total Amount</p>
                            <p className="text-2xl font-[family-name:var(--font-display)] font-bold text-[color:var(--color-secondary)]">
                              ₹{typeof order.total === 'number' ? order.total.toFixed(2) : order.total}
                            </p>
                          </div>
                          <div className="text-left md:text-right space-y-2">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.25em]">Delivery Status</p>
                            <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm border border-white/50 ${getStatusStyle(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <button className="p-4 bg-slate-50 group-hover:bg-[color:var(--color-primary)] rounded-2xl text-slate-300 group-hover:text-white shadow-sm transition-all duration-500">
                            <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-32 text-center space-y-8">
                    <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto shadow-inner-lg">
                      <ShoppingBag className="w-14 h-14 text-slate-100" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-2xl font-bold text-slate-300 uppercase tracking-widest">No orders yet</h4>
                      <p className="text-xs font-black text-slate-200 uppercase tracking-[0.3em]">Ambrosia awaits your presence.</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
