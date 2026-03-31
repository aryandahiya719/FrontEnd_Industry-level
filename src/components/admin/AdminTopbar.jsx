import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu as MenuIcon, 
  Bell, 
  LogOut,
  User
} from 'lucide-react';

const AdminTopbar = ({ onMenuClick }) => {
  const location = useLocation();

  // Map route paths to dynamic page titles
  const getPageTitle = (path) => {
    if (path === '/admin') return 'Dashboard Overview';
    if (path === '/admin/orders') return 'Order Management';
    if (path === '/admin/menu') return 'Menu Editor';
    if (path === '/admin/analytics') return 'Business Analytics';
    return 'Admin Panel';
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-6">
        {/* Toggle for Mobile */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        
        {/* Dynamic Title */}
        <h2 className="text-xl font-[family-name:var(--font-display)] font-bold text-slate-800 uppercase tracking-tight">
          {pageTitle}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </motion.button>

        <div className="w-px h-8 bg-slate-200 mx-2" />

        {/* Admin Profile */}
        <div className="flex items-center gap-3 pr-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700">Aryan Dahiya</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
            <User className="w-6 h-6" />
          </div>
        </div>

        {/* Logout Button (UI only) */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>
    </header>
  );
};

export default AdminTopbar;
