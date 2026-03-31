import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AnimatedRoutes from './components/layout/AnimatedRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingCart from './components/cart/FloatingCart';
import CustomCursor from './components/layout/CustomCursor';
import LoadingScreen from './components/layout/LoadingScreen';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Simulate initial asset loading time for premium feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-[family-name:var(--font-body)] text-[color:var(--color-secondary)] bg-[color:var(--color-app-bg)] min-h-screen flex flex-col overflow-x-hidden selection:bg-[color:var(--color-primary)] selection:text-[color:var(--color-secondary)]">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loadingScreen" />}
      </AnimatePresence>
      
      <CustomCursor />
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-secondary)',
            color: 'var(--color-primary)',
            fontWeight: 'bold',
            borderRadius: '999px',
            padding: '12px 24px',
            fontFamily: 'var(--font-display)',
            boxShadow: '0 10px 30px rgba(139,46,15,0.3)'
          },
        }} 
      />
      
      {!isAdmin && <Navbar />}
      {!isAdmin && <FloatingCart />}
      
      <main className={`flex-grow flex flex-col ${!isAdmin ? 'pt-0' : ''}`}>
        <AnimatedRoutes />
      </main>
      
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
