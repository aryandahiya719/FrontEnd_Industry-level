import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[color:var(--color-secondary)] text-white pt-24 pb-12 px-8 mt-auto relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row flex-wrap justify-between gap-16 border-b border-[color:var(--color-primary)]/20 pb-16 mb-8">
        
        {/* Branding & Address */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <h2 className="heading-display text-5xl text-[color:var(--color-primary)] mb-2 tracking-tight">
            FreshBox
          </h2>
          <div className="text-[color:var(--color-app-bg)]/80 font-bold leading-relaxed tracking-wide text-lg">
             <p>123 Flavor Avenue,</p>
             <p>Suite 456,</p>
             <p>Culinary District, NY 10012</p>
          </div>
          <div className="flex gap-4 mt-4 text-[color:var(--color-secondary)] font-bold">
             <a href="#" className="w-10 h-10 flex items-center justify-center bg-[color:var(--color-app-bg)] rounded-full hover:scale-110 transition-all duration-300">
                FB
             </a>
             <a href="#" className="w-10 h-10 flex items-center justify-center bg-[color:var(--color-app-bg)] rounded-full hover:scale-110 transition-all duration-300">
                X
             </a>
             <a href="#" className="w-10 h-10 flex items-center justify-center bg-[color:var(--color-app-bg)] rounded-full hover:scale-110 transition-all duration-300">
                IG
             </a>
             <a href="#" className="w-10 h-10 flex items-center justify-center bg-[color:var(--color-app-bg)] rounded-full hover:scale-110 transition-all duration-300">
                YT
             </a>
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="w-full lg:w-auto flex-1 flex flex-wrap justify-start lg:justify-around gap-12 lg:gap-8">
          
          {/* Company Links */}
          <div className="flex flex-col gap-5 min-w-[140px]">
             <h4 className="heading-display text-2xl tracking-wide mb-2 text-white">Company</h4>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Our Story</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Careers</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Press & Media</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Franchise</a>
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-5 min-w-[140px]">
             <h4 className="heading-display text-2xl tracking-wide mb-2 text-white">Support</h4>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Help Center</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Track Order</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Contact Us</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Feedback</a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-5 min-w-[140px]">
             <h4 className="heading-display text-2xl tracking-wide mb-2 text-white">Legal</h4>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Terms of Service</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Privacy Policy</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Cookie Policy</a>
             <a href="#" className="text-[color:var(--color-app-bg)]/70 hover:text-[color:var(--color-primary)] font-bold transition-colors">Allergens Guide</a>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[color:var(--color-app-bg)]/50 text-sm font-bold tracking-wider">
         <p>&copy; {new Date().getFullYear()} FreshBox Restaurants. All rights reserved.</p>
         <p>Crafted with bold flavors and code.</p>
      </div>
    </footer>
  );
};

export default Footer;
