import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table as TableIcon, CheckCircle2, XCircle, RefreshCcw, Users, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import tablesData from '../data/tables.json';

const AdminTables = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    // Shared localStorage repository: Load from cremy_tables
    const savedTables = JSON.parse(localStorage.getItem("cremy_tables"));
    if (savedTables) {
      setTables(savedTables);
    } else {
      setTables(tablesData);
      localStorage.setItem("cremy_tables", JSON.stringify(tablesData));
    }
  }, []);

  const handleResetTable = (tableId) => {
    const updatedTables = tables.map(t => 
      t.id === tableId ? { ...t, status: 'available' } : t
    );
    setTables(updatedTables);
    localStorage.setItem("cremy_tables", JSON.stringify(updatedTables));
    
    toast.success(`Table #${tableId} is now Available`, {
      icon: '✅',
      style: {
        borderRadius: '15px',
        background: '#1f1f1f',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    });
  };

  const handleBookTable = (tableId) => {
    const updatedTables = tables.map(t => 
      t.id === tableId ? { ...t, status: 'booked' } : t
    );
    setTables(updatedTables);
    localStorage.setItem("cremy_tables", JSON.stringify(updatedTables));
    
    toast.success(`Table #${tableId} manually Booked`, {
      icon: '🔒',
      style: {
        borderRadius: '15px',
        background: '#1f1f1f',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl heading-display text-[color:var(--color-secondary)] uppercase">Table Management</h2>
          <p className="font-bold opacity-40 text-sm tracking-wide">Monitor and manage real-time restaurant floor occupancy.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex -space-x-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-slate-200 animate-pulse" />
                </div>
              ))}
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Floor Staff Active</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="admin-card !p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search by Table ID or Capacity..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all font-[family-name:var(--font-body)]" />
          </div>
          <div className="flex items-center gap-3">
             <div className="px-5 py-2 bg-emerald-50 rounded-full flex items-center gap-2 border border-emerald-100 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Live Sync Active</span>
             </div>
          </div>
        </div>
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {tables.map((table, index) => (
            <motion.div
              key={table.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.03, type: "spring", damping: 20 }}
              className={`p-10 rounded-[3rem] border-4 transition-all duration-500 bg-white shadow-xl ${
                table.status === 'booked' 
                  ? 'border-rose-100 shadow-rose-200/20' 
                  : 'border-emerald-50 shadow-emerald-200/20'
              }`}
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-4xl heading-display text-[color:var(--color-secondary)] uppercase">#{table.id}</h3>
                    <p className={`text-[9px] font-black uppercase tracking-[0.2em] font-[family-name:var(--font-body)] mt-1 ${
                      table.status === 'booked' ? 'text-rose-500' : 'text-emerald-500'
                    }`}>
                      Current: {table.status}
                    </p>
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    table.status === 'booked' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'
                  }`}>
                    {table.status === 'booked' ? <XCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4 border-y border-slate-50">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Seating</p>
                    <p className="text-lg font-bold text-slate-600">Capacity: {table.seats}</p>
                  </div>
                </div>

                <div className="pt-2">
                  {table.status === 'booked' ? (
                    <button 
                      onClick={() => handleResetTable(table.id)}
                      className="w-full py-4 bg-[color:var(--color-secondary)] text-white hover:bg-emerald-600 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all flex items-center justify-center gap-2 group"
                    >
                      <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                      Reset to Available
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleBookTable(table.id)}
                      className="w-full py-4 bg-slate-100 text-slate-400 hover:bg-rose-500 hover:text-white rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      Manually Book
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-50 p-8 rounded-[2rem] border border-dashed border-slate-200 text-center space-y-2">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Action Legend</p>
         <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full" />
               <span className="text-[9px] font-bold text-slate-500 uppercase">Available for guests</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-rose-500 rounded-full" />
               <span className="text-[9px] font-bold text-slate-500 uppercase">Manually Reserve</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminTables;
