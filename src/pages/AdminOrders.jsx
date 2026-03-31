import React from 'react';
import { ShoppingBag, Search, Filter, Download, Trash2, Table } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminOrders = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    // Fetch from localStorage as requested
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    
    // For demonstration purposes, if localStorage is empty, we'll still show dummy data
    if (savedOrders.length === 0) {
      setOrders([
        { 
          id: '#ORD-7721', 
          customer: { name: 'John Doe', address: '123 Maple St, NY' }, 
          items: [{ name: 'Classic Cheeseburger', price: 15, qty: 1 }, { name: 'French Fries', price: 5, qty: 1 }], 
          total: 20.00, 
          status: 'Pending', 
          date: 'Oct 24, 2023',
          tableId: null
        },
        { 
          id: '#ORD-7722', 
          customer: { name: 'Jane Smith', address: '456 Oak Ave, LA' }, 
          items: [{ name: 'Spicy Chicken Wings', price: 18.99, qty: 1 }], 
          total: 18.99, 
          status: 'Delivered', 
          date: 'Oct 23, 2023',
          tableId: 3
        },
        { 
          id: '#ORD-7723', 
          customer: { name: 'Robert Brown', address: '789 Pine Ln, CHI' }, 
          items: [{ name: 'Margherita Pizza', price: 25, qty: 1 }, { name: 'Coke Zero', price: 3, qty: 2 }], 
          total: 31.00, 
          status: 'Preparing', 
          date: 'Oct 23, 2023',
          tableId: null
        },
        { 
          id: '#ORD-7724', 
          customer: { name: 'Alice Wilson', address: '321 Birch Rd, SEA' }, 
          items: [{ name: 'Garden Salad', price: 12, qty: 2 }, { name: 'Iced Tea', price: 4, qty: 1 }], 
          total: 28.00, 
          status: 'Cancelled', 
          date: 'Oct 22, 2023',
          tableId: 7
        },
      ]);
    } else {
      setOrders(savedOrders);
    }
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl heading-display text-[color:var(--color-secondary)] uppercase">Order Management</h2>
          <p className="font-bold opacity-40 text-sm tracking-wide">Monitor and update all processing orders effectively.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3.5 bg-white border border-slate-100 rounded-full shadow-sm hover:bg-slate-50 transition-all hover:scale-105">
            <Download className="w-5 h-5 text-slate-500" />
          </button>
          <button className="btn-primary text-xs py-3 px-8">Export Data</button>
        </div>
      </div>

      <div className="admin-card !p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search orders..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pb-5 pt-0 px-10"><p className="admin-label">Order ID</p></th>
                <th className="pb-5 pt-0 px-10"><p className="admin-label">Customer Name</p></th>
                <th className="pb-5 pt-0 px-10"><p className="admin-label">Type / Table</p></th>
                <th className="pb-5 pt-0 px-10"><p className="admin-label">Items</p></th>
                <th className="pb-5 pt-0 px-10"><p className="admin-label">Total Price</p></th>
                <th className="pb-5 pt-0 px-10"><p className="admin-label">Status</p></th>
                <th className="pb-5 pt-0 px-10 text-right"><p className="admin-label">Actions</p></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <motion.tr 
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group even:bg-slate-50/40 hover:bg-slate-100/60 transition-colors duration-300 border-b border-slate-50/50 last:border-none"
                  >
                    <td className="py-7 px-10 font-bold text-sm text-[color:var(--color-secondary)]">{order.id}</td>
                    <td className="py-7 px-10">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-xl bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] flex items-center justify-center font-bold text-xs shadow-sm">
                          {order.customer?.name ? order.customer.name[0] : '#'}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-slate-700">{order.customer?.name || 'Unknown Customer'}</span>
                          <span className="text-[10px] font-bold opacity-30 tracking-tight">{order.customer?.address || 'No address provided'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-7 px-10">
                      {order.tableId ? (
                        <div className="flex items-center gap-2 text-emerald-600">
                          <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center">
                            <Table className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-widest">Table #{order.tableId}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-[10px] font-black uppercase tracking-widest">Delivery</span>
                        </div>
                      )}
                    </td>
                    <td className="py-7 px-10 max-w-[240px]">
                      <p className="text-xs font-bold text-slate-500 line-clamp-1 group-hover:line-clamp-none transition-all duration-500">
                        {Array.isArray(order.items) 
                          ? order.items.map(item => item.name).join(', ') 
                          : `${order.items} Items`}
                      </p>
                    </td>
                    <td className="py-7 px-10 text-sm font-bold text-slate-800 tracking-tight">
                      ₹{typeof order.total === 'number' ? order.total.toFixed(2) : order.total}
                    </td>
                    <td className="py-7 px-10">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm border-none outline-none cursor-pointer transition-all duration-300 ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                          order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-7 px-10 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td colSpan="7" className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <p className="text-xl font-bold text-slate-400">No orders yet</p>
                    </div>
                  </td>
                </motion.tr>
              )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
