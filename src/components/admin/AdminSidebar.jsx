import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Utensils, 
  BarChart3, 
  X,
  ChevronRight,
  Table as TableIcon
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { name: 'Menu', icon: Utensils, path: '/admin/menu' },
    { name: 'Tables', icon: TableIcon, path: '/admin/tables' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' }
  ];

  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: { 
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside 
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-screen w-[280px] bg-[#1F1F1F] text-white z-50 lg:translate-x-0 flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header / Logo */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-[family-name:var(--font-display)] font-bold text-[color:var(--color-primary)] uppercase tracking-tight">
              Cremy
            </h1>
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1">
              Restaurant Admin
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-white/50 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-[color:var(--color-primary)] text-[color:var(--color-secondary)] shadow-[0_10px_20_rgba(244,183,64,0.2)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'}
                `}
              >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-bold text-sm tracking-wide">{item.name}</span>
                  </div>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebarActiveIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-secondary)]" 
                    />
                  )}
                  {!isActive && (
                    <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
          ))}
        </nav>

        {/* Footer / User Profile Placeholder */}
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4">
            <div className="w-10 h-10 rounded-xl bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] flex items-center justify-center font-bold">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Admin User</p>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Level 4 Chef</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
