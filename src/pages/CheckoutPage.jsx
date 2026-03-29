import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, User, Phone, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 0 ? 2.00 : 0;
  const total = subtotal + deliveryFee;
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    const formData = new FormData(e.target);
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      customer: {
        name: formData.get('fullName'),
        phone: formData.get('phone'),
        address: formData.get('address'),
      },
      paymentMethod,
      items,
      total,
    };

    const existingOrders = JSON.parse(localStorage.getItem('cremy_orders') || '[]');
    localStorage.setItem('cremy_orders', JSON.stringify([...existingOrders, newOrder]));

    // Simulate order placement
    toast.success('Order placed successfully', {
      icon: '🎉',
    });
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center">
        <h2 className="heading-display text-4xl mb-4 uppercase">Your cart is empty</h2>
        <p className="mb-8 font-bold opacity-70">Add some delicious items before checking out.</p>
        <Link to="/">
          <button className="btn-primary">Back to Menu</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <Link to="/cart" className="inline-flex items-center gap-2 text-[color:var(--color-secondary)]/70 hover:text-[color:var(--color-primary)] font-bold mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Cart
      </Link>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="heading-display text-5xl uppercase mb-12"
      >
        Checkout
      </motion.h1>

      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Form & Payment */}
        <div className="flex-1 space-y-10">
          
          {/* Customer Details */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm"
          >
            <h2 className="heading-display text-2xl uppercase mb-8 flex items-center gap-3 border-b-2 border-dashed border-[color:var(--color-secondary)]/10 pb-6">
              <span className="w-8 h-8 rounded-full bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)] flex items-center justify-center text-sm font-bold">1</span>
              Customer Details
            </h2>
            <div className="space-y-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-secondary)]/40 w-5 h-5" />
                <input required name="fullName" type="text" placeholder="Full Name" className="w-full bg-[color:var(--color-app-bg)]/50 border-2 border-transparent focus:border-[color:var(--color-primary)] rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-[color:var(--color-secondary)] placeholder:text-[color:var(--color-secondary)]/40 hover:bg-[color:var(--color-app-bg)]/80" />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-secondary)]/40 w-5 h-5" />
                <input required name="phone" type="tel" placeholder="Phone Number" className="w-full bg-[color:var(--color-app-bg)]/50 border-2 border-transparent focus:border-[color:var(--color-primary)] rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-[color:var(--color-secondary)] placeholder:text-[color:var(--color-secondary)]/40 hover:bg-[color:var(--color-app-bg)]/80" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-[color:var(--color-secondary)]/40 w-5 h-5" />
                <textarea required name="address" placeholder="Delivery Address" rows="3" className="w-full bg-[color:var(--color-app-bg)]/50 border-2 border-transparent focus:border-[color:var(--color-primary)] rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-[color:var(--color-secondary)] placeholder:text-[color:var(--color-secondary)]/40 resize-none hover:bg-[color:var(--color-app-bg)]/80"></textarea>
              </div>
            </div>
          </motion.section>

          {/* Payment Method */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm"
          >
            <h2 className="heading-display text-2xl uppercase mb-8 flex items-center gap-3 border-b-2 border-dashed border-[color:var(--color-secondary)]/10 pb-6">
              <span className="w-8 h-8 rounded-full bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)] flex items-center justify-center text-sm font-bold">2</span>
              Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`relative cursor-pointer border-2 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300 ${paymentMethod === 'cod' ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/5 scale-[1.02]' : 'border-transparent bg-[color:var(--color-app-bg)]/50 hover:bg-[color:var(--color-app-bg)]'}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                <Banknote className={`w-8 h-8 transition-colors ${paymentMethod === 'cod' ? 'text-[color:var(--color-primary)]' : 'text-[color:var(--color-secondary)]/40'}`} />
                <span className="font-bold text-center">Cash on Delivery</span>
                {paymentMethod === 'cod' && <CheckCircle className="absolute top-4 right-4 text-[color:var(--color-primary)] w-5 h-5" />}
              </label>

              <label className={`relative cursor-pointer border-2 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300 ${paymentMethod === 'card' ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/5 scale-[1.02]' : 'border-transparent bg-[color:var(--color-app-bg)]/50 hover:bg-[color:var(--color-app-bg)]'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="hidden" />
                <CreditCard className={`w-8 h-8 transition-colors ${paymentMethod === 'card' ? 'text-[color:var(--color-primary)]' : 'text-[color:var(--color-secondary)]/40'}`} />
                <span className="font-bold text-center">Credit Card</span>
                {paymentMethod === 'card' && <CheckCircle className="absolute top-4 right-4 text-[color:var(--color-primary)] w-5 h-5" />}
              </label>
            </div>
            {paymentMethod === 'card' && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="mt-6 p-4 bg-[color:var(--color-app-bg)]/50 rounded-xl text-sm font-bold text-center opacity-70 border border-dashed border-[color:var(--color-secondary)]/20"
               >
                 (Credit Card UI active for demonstration - No real processing will occur)
               </motion.div>
            )}
          </motion.section>

        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2rem] p-8 shadow-sm sticky top-32"
          >
            <h2 className="heading-display text-2xl uppercase mb-6 pb-6 border-b-2 border-dashed border-[color:var(--color-secondary)]/10">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 4px; }
              `}} />
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4 group">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[color:var(--color-app-bg)] shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold truncate text-sm">{item.name}</h4>
                      <p className="text-xs opacity-60 font-bold">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-[family-name:var(--font-display)] font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t-2 border-dashed border-[color:var(--color-secondary)]/10 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold opacity-70">Subtotal</span>
                <span className="font-bold font-[family-name:var(--font-display)]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold opacity-70">Delivery Fee</span>
                <span className="font-bold font-[family-name:var(--font-display)]">${deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8 pt-6 border-t border-[color:var(--color-secondary)]/10">
              <span className="font-bold tracking-widest uppercase text-sm">Total</span>
              <span className="text-4xl font-[family-name:var(--font-display)] text-[color:var(--color-primary)] drop-shadow-sm">${total.toFixed(2)}</span>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full text-lg py-4 flex items-center justify-center gap-3 bg-[color:var(--color-secondary)] text-white hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-secondary)] transition-colors duration-300 rounded-full uppercase font-bold tracking-widest font-[family-name:var(--font-display)] shadow-md"
            >
              Place Order
              <CheckCircle className="w-5 h-5" />
            </motion.button>
            <p className="text-center text-xs opacity-50 mt-4 font-bold">By placing this order, you agree to our awesome terms.</p>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
