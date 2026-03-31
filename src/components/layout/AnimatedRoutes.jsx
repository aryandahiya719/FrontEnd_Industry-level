import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from '../../pages/Home';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';
import AdminDashboard from '../../pages/AdminDashboard';
import AdminOrders from '../../pages/AdminOrders';
import AdminMenu from '../../pages/AdminMenu';
import AdminAnalytics from '../../pages/AdminAnalytics';
import AdminTables from '../../pages/AdminTables';
import AdminLayout from '../admin/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../../pages/LoginPage'; // Keeping for backwards compatibility if needed, but using Gate
import LoginGate from '../../pages/LoginGate';
import CustomerLogin from '../../pages/CustomerLogin';
import AdminLogin from '../../pages/AdminLogin';
import ProfilePage from '../../pages/ProfilePage';
import TableSelection from '../../pages/TableSelection';
import PaymentPage from '../../pages/PaymentPage';
import PageTransition from './PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginGate /></PageTransition>} />
        <Route path="/login/customer" element={<PageTransition><CustomerLogin /></PageTransition>} />
        <Route path="/login/admin" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/tables" element={<PageTransition><TableSelection /></PageTransition>} />
        
        {/* Protected User Dashboard */}
        <Route element={<ProtectedRoute requiredRole="user" />}>
           <Route path="/user" element={<PageTransition><ProfilePage /></PageTransition>} />
           <Route path="/payment" element={<PageTransition><PaymentPage /></PageTransition>} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<PageTransition><AdminDashboard /></PageTransition>} />
            <Route path="orders" element={<PageTransition><AdminOrders /></PageTransition>} />
            <Route path="menu" element={<PageTransition><AdminMenu /></PageTransition>} />
            <Route path="analytics" element={<PageTransition><AdminAnalytics /></PageTransition>} />
            <Route path="tables" element={<PageTransition><AdminTables /></PageTransition>} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
