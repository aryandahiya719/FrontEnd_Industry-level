import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import useCartStore from '../../store/useCartStore';

const Menu = () => {
  const [foods, setFoods] = useState(() => {
    return JSON.parse(localStorage.getItem("foods")) || [];
  });
  const [activeCategory, setActiveCategory] = useState('All');
  const [flyingItems, setFlyingItems] = useState([]);
  const addItem = useCartStore((state) => state.addItem);

  const categories = [
    { id: 'All', name: 'All', icon: '🍽️' },
    { id: 'Burger', name: 'Burger', icon: '🍔' },
    { id: 'Pizza', name: 'Pizza', icon: '🍕' },
    { id: 'Indian', name: 'Indian', icon: '🍛' },
    { id: 'Pasta', name: 'Pasta', icon: '🍝' },
    { id: 'Drinks', name: 'Drinks', icon: '🥤' },
    { id: 'Desserts', name: 'Desserts', icon: '🍰' }
  ];

  useEffect(() => {
    if (foods.length === 0) {
      import('../../data/foods.json').then((module) => {
        setFoods(module.default);
        localStorage.setItem("foods", JSON.stringify(module.default));
      });
    }
  }, []);

  const filteredFoods = activeCategory === 'All' 
    ? foods 
    : foods.filter(item => item.category === activeCategory);

  const handleAddToCart = (e, item) => {
    const btnRect = e.currentTarget.getBoundingClientRect();
    const cartDom = document.getElementById('floating-cart-btn-wrapper');
    const cartRect = cartDom 
      ? cartDom.getBoundingClientRect() 
      : { left: window.innerWidth - 80, top: window.innerHeight - 80, width: 64, height: 64 };

    const newFlyingItem = {
      id: Date.now(),
      image: item.image,
      startX: btnRect.left + btnRect.width / 2,
      startY: btnRect.top + btnRect.height / 2,
      endX: cartRect.left + cartRect.width / 2,
      endY: cartRect.top + cartRect.height / 2
    };

    setFlyingItems(prev => [...prev, newFlyingItem]);
    addItem(item);
    toast.success(`${item.name} Added!`, { icon: '🛍️' });

    // Clean up animation elements after completion
    setTimeout(() => {
      setFlyingItems(prev => prev.filter(i => i.id !== newFlyingItem.id));
    }, 800);
  };

  return (
    <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl heading-display text-[color:var(--color-secondary)] uppercase">
          Taste That Stands<br/>The Test of Time
        </h3>
      </div>
      
      {/* Horizontal Category Selector */}
      <div className="flex overflow-x-auto gap-4 pb-12 mb-10 w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          ::-webkit-scrollbar { display: none; }
        `}} />
        
        <div className="flex mx-auto gap-4 px-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative whitespace-nowrap px-8 py-3 rounded-[1.5rem] font-[family-name:var(--font-display)] font-bold uppercase tracking-wider transition-colors duration-300 flex gap-2 items-center justify-center min-w-[120px] shadow-sm ${
                  isActive 
                    ? 'text-[color:var(--color-secondary)]' 
                    : 'bg-white/70 border-2 border-transparent hover:border-[color:var(--color-secondary)]/10 text-[color:var(--color-secondary)]/70 hover:text-[color:var(--color-secondary)] hover:bg-white hover:shadow-md'
                }`}
              >
                {/* Smooth Sliding Active Background Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-[color:var(--color-primary)] rounded-[1.5rem] shadow-[0_8px_20px_rgba(244,183,64,0.4)] z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10 text-xl filter drop-shadow-sm">{cat.icon}</span>
                <span className="relative z-10 pt-1">{cat.name}</span>
                
                {/* Additional Underneath Indicator just in case they meant a line */}
                {isActive && (
                  <motion.div 
                    layoutId="activeCategoryUnderline"
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-[color:var(--color-primary)] rounded-full z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredFoods.map((item, index) => (
            <motion.div 
              layout
              key={item.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, delay: index * 0.05, type: "spring", stiffness: 200, damping: 20 }}
              className="card-base group bg-white p-4 flex flex-col hover:-translate-y-3 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-56 rounded-[1.5rem] overflow-hidden mb-4 bg-[color:var(--color-app-bg)]/30">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Floating Category Tag */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[color:var(--color-secondary)] uppercase tracking-wider shadow-sm z-10 transition-opacity duration-300 group-hover:opacity-0">
                  {item.category}
                </div>

                {/* Slide-in Hover Button Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAddToCart(e, item)}
                  className="absolute bottom-4 left-4 right-4 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-[color:var(--color-primary)] text-[color:var(--color-secondary)] hover:bg-white py-3 rounded-full font-[family-name:var(--font-display)] uppercase tracking-wider text-sm font-bold shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-auto"
                >
                  Add to Cart
                </motion.button>
              </div>
              
              <div className="px-2 flex flex-col flex-1">
                <h4 className="text-xl heading-display text-[color:var(--color-secondary)] uppercase leading-tight mb-2 pr-2">{item.name}</h4>
                <p className="text-[color:var(--color-secondary)]/70 font-bold text-sm mb-6 flex-1 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-dashed border-[color:var(--color-secondary)]/10">
                   <span className="text-2xl font-[family-name:var(--font-display)] text-[color:var(--color-secondary)] font-bold drop-shadow-sm">
                     ₹{item.price.toFixed(2)}
                   </span>
                   {/* Minimal visual placeholder since primary button handles add to cart */}
                   <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[color:var(--color-app-bg)] text-[color:var(--color-secondary)]/40 font-bold group-hover:bg-[color:var(--color-primary)] group-hover:text-[color:var(--color-secondary)] transition-colors duration-300">
                     +
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Flying Item Animations overlaying the viewport */}
      {flyingItems.map(item => (
        <motion.img
          key={item.id}
          src={item.image}
          initial={{ x: item.startX - 30, y: item.startY - 30, scale: 1, opacity: 1 }}
          animate={{ x: item.endX - 30, y: item.endY - 30, scale: 0.1, opacity: 0.3 }}
          transition={{ duration: 0.8, ease: [0.17, 0.67, 0.83, 0.67] }}
          className="fixed z-[9999] w-[60px] h-[60px] object-cover rounded-full shadow-2xl pointer-events-none"
          style={{ top: 0, left: 0 }}
        />
      ))}
    </section>
  );
};

export default Menu;
