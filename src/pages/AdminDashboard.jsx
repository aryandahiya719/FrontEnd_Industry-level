import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '₹24,560', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'New Orders', value: '145', change: '+5.2%', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Customers', value: '1,240', change: '+8.1%', icon: Users, color: 'text-[color:var(--color-primary)]', bg: 'bg-[color:var(--color-primary)]/10' },
    { label: 'Avg. Delivery', value: '24 min', change: '-2.4%', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl heading-display text-[color:var(--color-secondary)] uppercase">Dashboard Overview</h2>
          <p className="font-bold opacity-40 text-sm tracking-wide">Welcome back, Admin! Here's your restaurant's snapshot for today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-white rounded-full shadow-sm border border-[color:var(--color-secondary)]/5 text-sm font-bold flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            Live Status: Active
          </div>
          <button className="btn-primary text-xs py-3 px-8">Generate Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="admin-card !p-7 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-white shadow-sm border border-slate-50 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                {stat.change}
                <TrendingUp className={`w-3 h-3 ${stat.change.startsWith('+') ? '' : 'rotate-180'}`} />
              </div>
            </div>
            <p className="admin-label">{stat.label}</p>
            <h3 className="text-4xl font-[family-name:var(--font-display)] font-bold text-[color:var(--color-secondary)] tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

        {/* Recent Activity Section Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 admin-card !p-10 min-h-[400px]">
           <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-dashed border-slate-100">
              <h4 className="heading-display text-3xl uppercase tracking-tighter">Recent Orders</h4>
              <button className="text-sm font-bold text-[color:var(--color-primary)] hover:underline underline-offset-4">View All Activity</button>
           </div>
           <div className="flex flex-col items-center justify-center h-64 text-center space-y-5 opacity-20">
              <ShoppingBag className="w-20 h-20 stroke-[1.5]" />
              <p className="font-extrabold tracking-widest uppercase text-xs">Awaiting real-time stream...</p>
           </div>
        </div>

        <div className="admin-card !p-10">
           <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-dashed border-slate-100">
              <h4 className="heading-display text-3xl uppercase tracking-tighter">Daily Goal</h4>
              <ArrowUpRight className="w-6 h-6 opacity-30" />
           </div>
           <div className="space-y-10">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-40 h-40 rounded-full border-[12px] border-slate-50 border-t-[color:var(--color-primary)] flex items-center justify-center font-bold text-4xl text-[color:var(--color-secondary)] shadow-inner">
                   75%
                </div>
                <p className="mt-6 font-bold text-sm text-[color:var(--color-secondary)]/60">Revenue Target Progress</p>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center bg-slate-50 p-5 rounded-3xl border border-slate-100">
                    <span className="font-extrabold text-xs uppercase tracking-widest text-slate-400">Current Sales</span>
                     <span className="text-[color:var(--color-primary)] font-bold text-xl">₹24k <span className="text-[10px] text-slate-300">/ ₹32k</span></span>
                 </div>
                 <p className="text-[10px] font-extrabold opacity-30 uppercase text-center tracking-[0.2em]">Refreshed 2m ago</p>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
