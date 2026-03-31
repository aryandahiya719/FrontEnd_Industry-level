import React, { useState } from 'react';
import { ShoppingCart, Menu as MenuIcon, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import Cart from '../cart/Cart';

const Navbar = () => {
  const cartItems = useCartStore((state) => state.items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();
  
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };
  
  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Offers', href: '#offers' },
    { name: 'Find Us', href: '#location' }
  ];

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--color-app-bg)]/80 backdrop-blur-2xl border-b border-white/40 px-4 md:px-8 py-5 flex justify-between items-center shadow-[0_10px_40px_rgba(139,46,15,0.05)]">
        <Link to="/" className="flex items-center gap-2">
          <MenuIcon className="w-6 h-6 md:hidden text-[color:var(--color-secondary)]" />
          <h1 className="text-2xl heading-display text-[color:var(--color-primary)] ml-2 md:ml-0">
            Cremy
          </h1>
        </Link>
        
        <div className="hidden md:flex items-center space-x-10 text-sm font-[family-name:var(--font-body)] font-bold text-[color:var(--color-secondary)]">
          {navLinks.map((link) => (
            <motion.a 
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-2 py-1 transition-colors hover:text-[color:var(--color-primary)] uppercase tracking-widest text-xs"
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.div 
                  layoutId="navbarHover"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[color:var(--color-primary)] rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button className="hidden md:block text-[color:var(--color-secondary)] hover:text-[color:var(--color-primary)] transition-colors">
             <Search className="w-5 h-5" />
          </button>
          
          {role === 'admin' && (
            <Link 
              to="/admin" 
              className="hidden md:block text-xs font-black uppercase tracking-[0.2em] text-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10 px-4 py-2 rounded-full border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-secondary)] transition-all"
            >
              Admin Central
            </Link>
          )}

          {role === 'user' && (
            <Link 
              to="/user" 
              className="hidden md:block text-xs font-black uppercase tracking-[0.2em] text-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10 px-4 py-2 rounded-full border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-secondary)] transition-all"
            >
              My Dashboard
            </Link>
          )}

          {role ? (
            <button 
              onClick={handleLogout}
              className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-all"
            >
              Sign Out
            </button>
          ) : (
            <Link 
              to="/login" 
              className="hidden md:block text-xs font-black uppercase tracking-widest text-[color:var(--color-secondary)] hover:text-[color:var(--color-primary)] transition-all px-4 py-2 bg-white/50 rounded-full border border-white"
            >
              Access
            </Link>
          )}

          <Link to="/" className="btn-primary hidden md:block text-[10px] py-3 px-6 uppercase font-black tracking-widest">
            Order Now
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[color:var(--color-secondary)] hover:bg-black/5 rounded-full transition-colors flex items-center"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-[color:var(--color-primary)] text-[color:var(--color-secondary)] text-xs font-bold flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
