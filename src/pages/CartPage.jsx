import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { items, increaseQuantity, decreaseQuantity, removeItem, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  // Simplified delivery logic
  const deliveryFee = subtotal > 0 ? 2.00 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="heading-display text-5xl md:text-6xl uppercase flex items-center gap-4">
          <ShoppingBag className="w-12 h-12 text-[color:var(--color-primary)]" />
          Your Cart
        </h1>
      </motion.div>

      {items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 bg-white rounded-[2rem] shadow-sm flex flex-col items-center"
        >
          <ShoppingBag className="w-24 h-24 mb-6 opacity-20 text-[color:var(--color-secondary)]" />
          <h2 className="heading-display text-3xl mb-4">Your cart is empty</h2>
          <p className="text-[color:var(--color-secondary)]/70 font-bold mb-8">Looks like you haven't added any delicious items yet.</p>
          <Link to="/">
            <button className="btn-primary">Browse Menu</button>
          </Link>
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Cart Items */}
          <div className="flex-1 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-white p-4 md:p-6 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center relative group"
                >
                  <div className="relative w-full md:w-32 h-32 shrink-0 rounded-2xl overflow-hidden bg-[color:var(--color-app-bg)]/30">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="heading-display text-2xl mb-1 truncate pr-8">{item.name}</h3>
                    <p className="text-[color:var(--color-secondary)]/60 font-bold text-sm mb-4 line-clamp-1">{item.description || item.category}</p>
                    <div className="text-2xl font-[family-name:var(--font-display)] font-bold text-[color:var(--color-secondary)]">
                      ₹{item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
                    <div className="flex items-center gap-4 bg-[color:var(--color-app-bg)] rounded-full px-4 py-2">
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-[color:var(--color-secondary)] hover:text-[color:var(--color-primary)] transition-colors p-1"
                      >
                        <Minus className="w-5 h-5" />
                      </motion.button>
                      <span className="text-lg w-6 text-center font-bold text-[color:var(--color-secondary)]">{item.quantity}</span>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => increaseQuantity(item.id)}
                        className="text-[color:var(--color-secondary)] hover:text-[color:var(--color-primary)] transition-colors p-1"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.button>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 right-4 md:relative md:top-0 md:right-0 p-2 text-[color:var(--color-secondary)]/30 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      title="Remove item"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm sticky top-32"
            >
              <h3 className="heading-display text-2xl uppercase mb-8 pb-6 border-b-2 border-dashed border-[color:var(--color-secondary)]/10">Order Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold opacity-70">Subtotal</span>
                  <span className="font-[family-name:var(--font-display)] font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold opacity-70">Delivery Fee</span>
                  <span className="font-[family-name:var(--font-display)] font-bold">₹{deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-[color:var(--color-secondary)]/10 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold uppercase tracking-wider text-sm opacity-70">Total</span>
                  <span className="text-4xl font-[family-name:var(--font-display)] font-bold text-[color:var(--color-primary)] drop-shadow-sm">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

            <Link to="/checkout" className="block w-full">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full text-lg py-4 flex items-center justify-center gap-3 bg-[color:var(--color-secondary)] text-white hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-secondary)] transition-colors duration-300 rounded-full uppercase font-bold tracking-widest font-[family-name:var(--font-display)]"
              >
                Checkout Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
