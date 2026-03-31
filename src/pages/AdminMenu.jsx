import React from 'react';
import { Utensils, Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import foodsData from '../data/foods.json';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = React.useState(() => {
    return JSON.parse(localStorage.getItem("foods")) || [];
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [deleteId, setDeleteId] = React.useState(null);
  const [newItem, setNewItem] = React.useState({
    name: '',
    category: 'Burger',
    price: '',
    image: '',
    description: ''
  });

  React.useEffect(() => {
    if (menuItems.length === 0) {
      const formattedData = foodsData.map(item => ({
        ...item,
        status: 'In Stock'
      }));
      setMenuItems(formattedData);
      localStorage.setItem("foods", JSON.stringify(formattedData));
    }
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    if (editingId) {
      const updatedMenu = menuItems.map(item => 
        item.id === editingId ? { ...item, ...newItem, price: parseFloat(newItem.price) } : item
      );
      setMenuItems(updatedMenu);
      localStorage.setItem("foods", JSON.stringify(updatedMenu));
    } else {
      const dish = {
        ...newItem,
        id: Date.now(),
        status: 'In Stock',
        price: parseFloat(newItem.price)
      };
      const updatedMenu = [dish, ...menuItems];
      setMenuItems(updatedMenu);
      localStorage.setItem("foods", JSON.stringify(updatedMenu));
    }
    
    // Reset and close
    setNewItem({ name: '', category: 'Burger', price: '', image: '', description: '' });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEditClick = (item) => {
    setNewItem({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      image: item.image,
      description: item.description || ''
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setNewItem({ name: '', category: 'Burger', price: '', image: '', description: '' });
  };

  const handleDeleteItem = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    const updatedMenu = menuItems.filter(item => item.id !== deleteId);
    setMenuItems(updatedMenu);
    localStorage.setItem("foods", JSON.stringify(updatedMenu));
    setDeleteId(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl heading-display text-[color:var(--color-secondary)] uppercase">Manage Menu</h2>
          <p className="font-bold opacity-40 text-sm tracking-wide">Configure dish details, prices, and availability.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setNewItem({ name: '', category: 'Burger', price: '', image: '', description: '' });
              setEditingId(null);
              setIsModalOpen(true);
            }}
            className="btn-primary text-xs py-3 px-8 flex items-center gap-3"
          >
            <Plus className="w-5 h-5" /> Add New Item
          </button>
        </div>
      </div>

      <div className="admin-card !p-12 !rounded-[3rem] shadow-2xl shadow-slate-200/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search menu..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all font-[family-name:var(--font-body)]" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select className="bg-transparent border-none outline-none font-bold text-sm text-slate-600">
                <option>All Categories</option>
                <option>Burgers</option>
                <option>Appetizers</option>
                <option>Drinks</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100/50">
                <th className="pb-8 pt-0 px-12"><p className="admin-label">Image</p></th>
                <th className="pb-8 pt-0 px-12"><p className="admin-label">Name</p></th>
                <th className="pb-8 pt-0 px-12"><p className="admin-label">Category</p></th>
                <th className="pb-8 pt-0 px-12"><p className="admin-label">Price</p></th>
                <th className="pb-8 pt-0 px-12 text-right"><p className="admin-label">Actions</p></th>
              </tr>
            </thead>
            <motion.tbody 
              className="divide-y divide-slate-50/50"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              <AnimatePresence mode="popLayout">
                {menuItems.map((item) => (
                  <motion.tr 
                    key={item.id}
                    layout
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15,
                      layout: { duration: 0.3 }
                    }}
                    className="group even:bg-slate-50/40 hover:bg-slate-100/60 transition-all duration-300 border-b border-slate-100/20 last:border-none cursor-default"
                  >
                    <td className="py-8 px-12">
                      <div className="w-20 h-20 rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden group-hover:shadow-md transition-shadow">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                    </td>
                    <td className="py-8 px-12">
                      <div className="space-y-1">
                        <p className="font-bold text-lg text-[color:var(--color-secondary)] tracking-tight">{item.name}</p>
                        <span className={`text-[10px] font-extrabold uppercase tracking-widest ${item.status === 'In Stock' ? 'text-green-500' : 'text-red-400'}`}>
                          {item.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-8 px-12">
                      <span className="px-5 py-2 bg-slate-100/80 rounded-full text-[11px] font-bold text-slate-500 tracking-wide">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-8 px-12">
                      <span className="font-bold text-[family-name:var(--font-display)] text-2xl text-[color:var(--color-primary)]">
                        ${item.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-8 px-12 text-right">
                      <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <button 
                          onClick={() => handleEditClick(item)}
                          className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-50 text-slate-400 hover:text-[color:var(--color-primary)] transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            <motion.tbody />
            </motion.tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-slate-900/60"
              onClick={handleCloseModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl p-12 overflow-hidden border border-slate-100"
            >
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl heading-display uppercase">
                    {editingId ? 'Edit Dish' : 'Add New Dish'}
                  </h3>
                  <p className="font-bold opacity-40 text-sm tracking-wide">
                    {editingId ? 'Modify the details of this item.' : 'Enter the details of the new item to expand your menu.'}
                  </p>
                </div>

                <form onSubmit={handleAddItem} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="admin-label">Item Name</label>
                      <input 
                        type="text" 
                        required
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        placeholder="e.g. Double Smash Burger" 
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="admin-label">Category</label>
                      <select 
                        value={newItem.category}
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all"
                      >
                        <option>Burger</option>
                        <option>Pizza</option>
                        <option>Indian</option>
                        <option>Pasta</option>
                        <option>Drinks</option>
                        <option>Desserts</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="admin-label">Price ($)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        required
                        value={newItem.price}
                        onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                        placeholder="0.00" 
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="admin-label">Image URL</label>
                      <input 
                        type="text" 
                        required
                        value={newItem.image}
                        onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                        placeholder="https://unsplash..." 
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="admin-label">Description</label>
                    <textarea 
                      required
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      placeholder="Describe the dish ingredients, taste..." 
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-all min-h-[120px] resize-none" 
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-8 py-4 bg-slate-100 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 btn-primary"
                    >
                      {editingId ? 'Update Item' : 'Add Item'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setDeleteId(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 400
              }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-hidden border border-slate-100 text-center"
            >
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl heading-display uppercase mb-2">Are you sure?</h3>
              <p className="font-bold opacity-40 text-sm tracking-wide mb-8 px-4">
                This action cannot be undone. This dish will be permanently removed.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-6 py-4 bg-slate-100 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-4 bg-red-500 rounded-2xl text-sm font-bold text-white hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMenu;
