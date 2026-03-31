import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Target, Wallet, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminAnalytics = () => {
  const chartPlaceholder = [
    { day: 'Mon', revenue: '65%' },
    { day: 'Tue', revenue: '45%' },
    { day: 'Wed', revenue: '85%' },
    { day: 'Thu', revenue: '55%' },
    { day: 'Fri', revenue: '95%' },
    { day: 'Sat', revenue: '75%' },
    { day: 'Sun', revenue: '40%' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl heading-display text-[color:var(--color-secondary)] uppercase">Business Analytics</h2>
          <p className="font-bold opacity-40 text-sm tracking-wide">Deep-dive into performance and revenue metrics across your restaurant.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Revenue Performance Chart Placeholder */}
        <div className="admin-card !p-10 min-h-[400px]">
          <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-dashed border-slate-50">
            <h4 className="heading-display text-2xl uppercase">Revenue Performance</h4>
            <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-extrabold uppercase tracking-widest">+18.2% vs prev</span>
          </div>
          <div className="flex items-end justify-between h-56 px-4">
            {chartPlaceholder.map((data) => (
              <div key={data.day} className="flex flex-col items-center gap-5 group">
                <div className="w-12 bg-slate-50 rounded-2xl relative group-hover:bg-slate-100 transition-all cursor-pointer shadow-inner" style={{ height: '180px' }}>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: data.revenue }}
                    className="absolute bottom-0 left-0 right-0 bg-[color:var(--color-primary)] rounded-2xl shadow-lg"
                  />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-[color:var(--color-secondary)] text-white text-[10px] px-3 py-1.5 rounded-lg font-bold shadow-xl">
                      {data.revenue}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="space-y-8">
           <div className="admin-card !p-8 flex items-center justify-between group">
              <div className="space-y-1">
                <p className="admin-label">Average Ticket Size</p>
                <p className="text-4xl font-[family-name:var(--font-display)] font-bold text-[color:var(--color-secondary)] tracking-tight">₹32.50</p>
              </div>
              <div className="p-5 bg-blue-50 text-blue-600 rounded-3xl shadow-sm group-hover:scale-110 transition-transform"><Wallet className="w-7 h-7" /></div>
           </div>
           
           <div className="admin-card !p-8 flex items-center justify-between group">
              <div className="space-y-1">
                <p className="admin-label">Peak Delivery Hours</p>
                <p className="text-4xl font-[family-name:var(--font-display)] font-bold text-[color:var(--color-secondary)] tracking-tight">18:00 - 20:30</p>
              </div>
              <div className="p-5 bg-orange-50 text-orange-600 rounded-3xl shadow-sm group-hover:scale-110 transition-transform"><Clock className="w-7 h-7" /></div>
           </div>

           <div className="admin-card !p-8 !bg-[color:var(--color-secondary)] flex items-center justify-between group shadow-2xl">
              <div className="space-y-1">
                <p className="admin-label !text-white/40">New Customers Weekly</p>
                <p className="text-4xl font-[family-name:var(--font-display)] font-bold text-white tracking-tight">+245</p>
              </div>
              <div className="p-5 bg-white/10 rounded-3xl text-[color:var(--color-primary)] group-hover:rotate-12 transition-transform"><Target className="w-7 h-7" /></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
