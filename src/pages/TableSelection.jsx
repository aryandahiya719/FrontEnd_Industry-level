import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Info, CheckCircle2, XCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import tablesData from '../data/tables.json';

const TableSelection = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);

  useEffect(() => {
    // Persistent Repository check: Load from localStorage or initialize with default data
    const savedTables = JSON.parse(localStorage.getItem("cremy_tables"));
    if (savedTables) {
      setTables(savedTables);
    } else {
      setTables(tablesData);
      localStorage.setItem("cremy_tables", JSON.stringify(tablesData));
    }
  }, []);

  const handleTableClick = (table) => {
    // UX: Disable click on booked tables
    if (table.status === 'available') {
      setSelectedTable(table.id === selectedTable ? null : table.id);
    }
  };

  const handleReserveTable = () => {
    if (!selectedTable) return;

    const updatedTables = tables.map(t => 
      t.id === selectedTable ? { ...t, status: 'booked' } : t
    );

    setTables(updatedTables);
    localStorage.setItem("cremy_tables", JSON.stringify(updatedTables));
    
    // BINDING: Store table for the current order session
    localStorage.setItem("current_selected_table", selectedTable.toString());

    // High-fidelity success feedback
    toast.success(`Table #${selectedTable} Reserved Successfully!`, {
      duration: 4000,
      position: 'bottom-center',
      icon: '🥂',
      style: {
        borderRadius: '20px',
        background: '#fff',
        color: '#0f172a',
        fontWeight: 'bold',
        padding: '16px 24px',
        border: '2px solid #10b981'
      }
    });

    // Reset local selection state and redirect to order flow
    setSelectedTable(null);
    setTimeout(() => {
      navigate('/cart'); // Redirect to cart so they can finish ordering for their table
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-app-bg)] pt-40 pb-24 px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Cinematic Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[color:var(--color-primary)] transition-colors mb-4 group w-fit">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl heading-display text-[color:var(--color-secondary)] uppercase tracking-tight"
            >
              Choose Your Table
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-bold opacity-30 text-sm tracking-[0.25em] uppercase"
            >
              Select your preferred dining environment.
            </motion.p>
          </div>
          
          {/* Explicit Legend */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-10 bg-white/50 backdrop-blur-xl p-6 px-10 rounded-[2rem] border border-white shadow-xl shadow-slate-200/40"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                <span className="text-xs font-bold text-slate-700">Available</span>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.3)]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                <span className="text-xs font-bold text-slate-700">Booked</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {tables.map((table, index) => (
              <motion.div
                key={table.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  boxShadow: selectedTable === table.id 
                    ? "0 35px 60px -15px rgba(234, 179, 8, 0.25)" 
                    : "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                  borderColor: table.status === 'booked' 
                    ? "rgba(244, 63, 94, 0.2)" 
                    : selectedTable === table.id 
                      ? "var(--color-primary)" 
                      : "rgba(16, 185, 129, 0.1)"
                }}
                transition={{ 
                  delay: index * 0.04,
                  type: "spring",
                  damping: 20,
                  stiffness: 120,
                  layout: { duration: 0.3 }
                }}
                whileHover={table.status === 'available' ? { 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.2 } 
                } : { 
                  // Muted hover for booked tables
                  scale: 0.98,
                  opacity: 0.3
                }}
                onMouseEnter={() => setHoveredTable(table.id)}
                onMouseLeave={() => setHoveredTable(null)}
                onClick={() => handleTableClick(table)}
                className={`group relative p-10 rounded-[3rem] transition-all duration-500 cursor-pointer border-4 ${
                  table.status === 'booked' 
                    ? 'bg-rose-50/20 grayscale opacity-40 cursor-not-allowed' 
                    : selectedTable === table.id
                      ? 'bg-white ring-[12px] ring-[color:var(--color-primary)]/5 scale-[1.03] z-10'
                      : 'bg-white hover:border-emerald-500/30'
                }`}
              >
                {/* Visual Status Indicator Bar */}
                <motion.div 
                  layout
                  className={`absolute top-0 left-0 right-0 h-2.5 transition-colors duration-700 ${
                    table.status === 'booked' ? 'bg-rose-500' : 'bg-emerald-500'
                  }`} 
                />

                {/* UX Tooltip: Already Reserved */}
                <AnimatePresence>
                  {table.status === 'booked' && hoveredTable === table.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl z-20 whitespace-nowrap flex items-center gap-2 pointer-events-none"
                    >
                      <AlertCircle className="w-3 h-3" />
                      Already Reserved
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <motion.p 
                        layout
                        className={`text-5xl heading-display transition-colors duration-500 ${
                          selectedTable === table.id ? 'text-[color:var(--color-primary)]' : 'text-[color:var(--color-secondary)]'
                        }`}
                      >
                        Table #{table.id}
                      </motion.p>
                      <motion.p 
                        layout
                        className={`text-[10px] font-black uppercase tracking-[0.3em] font-[family-name:var(--font-body)] ${
                           table.status === 'booked' ? 'text-rose-500/80' : 'text-emerald-500/80'
                         }`}
                      >
                         {table.status === 'available' ? 'Available' : 'Reserved'}
                       </motion.p>
                    </div>
                    <motion.div 
                      layout
                      className={`p-4 rounded-2xl shadow-sm border border-white/50 transition-all duration-500 ${
                        table.status === 'booked' ? 'bg-rose-50 text-rose-500 rotate-0' : 'bg-emerald-50 text-emerald-500'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {table.status === 'available' ? (
                          <motion.div key="available" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                            <CheckCircle2 className="w-7 h-7" />
                          </motion.div>
                        ) : (
                          <motion.div key="booked" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }}>
                            <XCircle className="w-7 h-7" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <motion.div layout className="space-y-6 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-2">Max Capacity</p>
                        <p className="text-2xl font-bold text-slate-700">Seats: {table.seats}</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Selection Confirmation Portal */}
                  <AnimatePresence>
                    {selectedTable === table.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, scale: 0.9 }}
                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.9 }}
                        className="overflow-hidden bg-slate-50/50 rounded-[2rem] mt-6"
                      >
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleReserveTable(); }}
                          className="btn-primary w-full py-5 text-xs shadow-2xl shadow-[color:var(--color-primary)]/30 uppercase tracking-[0.2em] font-black"
                        >
                          Book Table #{table.id} & Order
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TableSelection;
