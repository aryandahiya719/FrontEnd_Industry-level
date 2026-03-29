import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const Cart = ({ isOpen, onClose }) => {
  const { items, increaseQuantity, decreaseQuantity, removeItem, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 0 ? 2.00 : 0;
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[color:var(--color-secondary)]/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/85 backdrop-blur-3xl border-l border-white/40 z-[60] flex flex-col shadow-[-20px_0_60px_rgba(139,46,15,0.15)]"
          >
            <div className="flex items-center justify-between p-6 border-b border-[color:var(--color-secondary)]/10">
              <h2 className="text-xl heading-display uppercase flex items-center gap-2 text-[color:var(--color-secondary)]">
                <ShoppingBag className="w-6 h-6 text-[color:var(--color-primary)]" />
                Your Selection
              </h2>
              <button 
                onClick={onClose}
                className="p-2 text-[color:var(--color-secondary)] hover:bg-[color:var(--color-app-bg)] rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[color:var(--color-secondary)]/50">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                  <p className="font-bold tracking-wide uppercase">Your cart is empty</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: -30, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 30, scale: 0.9, transition: { duration: 0.2 } }}
                      key={item.id} 
                      className="flex gap-4 origin-left"
                    >
                      <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-2xl"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="heading-display text-[color:var(--color-secondary)] text-xl leading-tight mb-1">{item.name}</h4>
                      <div className="text-[color:var(--color-secondary)] font-bold mb-3">${item.price}</div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-4 bg-[color:var(--color-app-bg)] rounded-full inline-flex px-3 py-1 w-fit">
                          <motion.button 
                            whileHover={{ scale: 1.2, color: "var(--color-primary)" }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => decreaseQuantity(item.id)}
                            className="text-[color:var(--color-secondary)] transition-colors p-1 flex items-center justify-center rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <div className="w-4 h-6 overflow-hidden relative flex justify-center items-center">
                             <AnimatePresence mode="popLayout">
                               <motion.span 
                                 key={item.quantity}
                                 initial={{ opacity: 0, y: -15 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, y: 15 }}
                                 transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                 className="text-sm text-center font-bold text-[color:var(--color-secondary)] absolute"
                               >
                                 {item.quantity}
                               </motion.span>
                             </AnimatePresence>
                          </div>
                          <motion.button 
                            whileHover={{ scale: 1.2, color: "var(--color-primary)" }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => increaseQuantity(item.id)}
                            className="text-[color:var(--color-secondary)] transition-colors p-1 flex items-center justify-center rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => removeItem(item.id)}
                          className="text-[color:var(--color-secondary)]/50 hover:text-red-500 hover:bg-red-50 transition-all p-2 rounded-full flex items-center justify-center ml-2"
                          title="Remove item"
                        >
                           <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[color:var(--color-secondary)]/10 p-6 bg-[color:var(--color-app-bg)]/80 backdrop-blur-md mt-auto shadow-[0_-10px_30px_rgba(0,0,0,0.03)] relative z-20">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold opacity-70">Subtotal</span>
                    <span className="font-bold font-[family-name:var(--font-display)]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold opacity-70">Delivery Fee</span>
                    <span className="font-bold font-[family-name:var(--font-display)]">${deliveryFee.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-6 pt-4 border-t border-dashed border-[color:var(--color-secondary)]/20">
                  <span className="text-[color:var(--color-secondary)] font-bold tracking-widest uppercase text-sm">Total</span>
                  <span className="text-4xl font-[family-name:var(--font-display)] text-[color:var(--color-primary)] drop-shadow-sm">${total.toFixed(2)}</span>
                </div>
                <MotionLink 
                  to="/checkout"
                  onClick={onClose} 
                  style={{ display: 'flex' }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary text-lg items-center justify-center shadow-md relative z-10"
                >
                  Checkout
                </MotionLink>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
