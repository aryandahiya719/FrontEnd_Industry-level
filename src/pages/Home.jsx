import React from 'react';
import Hero from '../components/hero/Hero';
import Offers from '../components/offers/Offers';
import FeaturedCards from '../components/offers/FeaturedCards';
import Menu from '../components/menu/Menu';
import Promo from '../components/offers/Promo';
import Cta from '../components/cta/Cta';
import PromoCards from '../components/offers/PromoCards';
import Location from '../components/location/Location';
import FinalCta from '../components/cta/FinalCta';

const Home = () => {
  return (
    <div className="pt-20 relative overflow-hidden bg-[color:var(--color-app-bg)] min-h-screen">
      
      {/* Premium Startup Abstract Background Blobs */}
      <div className="absolute top-0 right-[-10%] w-[60vw] h-[60vw] bg-[color:var(--color-primary)] rounded-full blur-[200px] opacity-[0.25] pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute top-[30%] left-[-15%] w-[50vw] h-[50vw] bg-[color:var(--color-secondary)] rounded-full blur-[200px] opacity-[0.15] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[60vw] h-[60vw] bg-orange-400 rounded-full blur-[220px] opacity-[0.2] pointer-events-none" />
      
      {/* Subtle Dot Pattern (Architectural High-End Feel) */}
      <div className="absolute inset-0 bg-subtle-pattern pointer-events-none opacity-[0.15]" />

      {/* Main Hierarchical Content Stack */}
      <div className="relative z-10 flex flex-col gap-16 md:gap-32 pb-10">
        <Hero />
        <Menu />
        <Offers />
        <FeaturedCards />
        <Cta />
        <PromoCards />
        <Location />
        <Promo />
        <FinalCta />
      </div>
    </div>
  );
};

export default Home;
