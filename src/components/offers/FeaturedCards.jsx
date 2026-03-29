import React from 'react';
import { motion } from 'framer-motion';
import useCartStore from '../../store/useCartStore';
import toast from 'react-hot-toast';

const featuredItems = [
  {
    id: 1,
    name: 'Flavor Built for the History Books',
    description: 'Experience our timeless culinary masterpieces crafted to perfection.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800',
    bgColor: 'bg-[color:var(--color-primary)]',
    textColor: 'text-[color:var(--color-secondary)]',
    btnBg: 'bg-white',
    btnText: 'text-[color:var(--color-secondary)]'
  },
  {
    id: 2,
    name: 'Bold Flavors That Define History',
    description: 'Every bite tells a story. Savor the legendary taste today.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    bgColor: 'bg-orange-500',
    textColor: 'text-white',
    btnBg: 'bg-[color:var(--color-secondary)]',
    btnText: 'text-white'
  }
];

const FeaturedCards = () => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto space-y-12">
      {featuredItems.map((item, index) => {
        const isEven = index % 2 !== 0; // alternating layout
        return (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`card-base relative overflow-hidden flex flex-col md:flex-row min-h-[400px] ${item.bgColor} group`}
            style={{ borderRadius: '2rem' }}
          >
            {/* Text Content */}
            <div className={`p-10 md:p-16 w-full md:w-1/2 flex flex-col justify-center relative z-20 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
              <h3 className={`heading-display text-5xl md:text-6xl uppercase leading-[0.95] mb-4 ${item.textColor}`}>
                {item.name}
              </h3>
              <p className={`font-bold mb-8 max-w-sm ${item.textColor} opacity-90`}>
                {item.description}
              </p>
              
              <div className="mt-auto md:mt-12 flex flex-col items-start gap-4">
                <button 
                  onClick={() => {
                    const mockItem = {
                      id: `featured-${item.id}`,
                      name: item.name,
                      price: 24.99,
                      image: item.image,
                      category: 'Featured'
                    };
                    addItem(mockItem);
                    toast.success('Item added to cart', { icon: '🛒' });
                  }}
                  className={`${item.btnBg} ${item.btnText} font-bold uppercase tracking-wider text-sm px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300`}
                >
                  Buy Now
                </button>
              </div>
            </div>
            
            {/* Image Content */}
            <div className={`w-full md:w-1/2 h-72 md:h-auto relative z-10 overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 md:scale-105"
                style={{ clipPath: isEven ? 'circle(70% at 30% 50%)' : 'circle(70% at 70% 50%)' }}
              />
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default FeaturedCards;
