import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';

const FloatingCart = () => {
  const items = useCartStore((state) => state.items);
  const location = useLocation();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Hide on cart and checkout pages
  if (location.pathname === '/cart' || location.pathname === '/checkout') {
    return null;
  }

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          id="floating-cart-btn-wrapper"
          className="fixed bottom-6 right-6 z-[60]"
        >
          <Link to="/cart">
            <div className="bg-[color:var(--color-primary)] text-[color:var(--color-secondary)] w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(244,183,64,0.4)] relative border-2 border-[color:var(--color-secondary)]/10">
              <ShoppingBag className="w-7 h-7" />
              <motion.div 
                key={totalItems}
                initial={{ scale: 1.5, rotate: -45, y: -10 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute -top-2 -right-2 bg-white text-[color:var(--color-secondary)] w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold font-[family-name:var(--font-display)] shadow-sm border-2 border-[color:var(--color-primary)]"
              >
                {totalItems}
              </motion.div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCart;
