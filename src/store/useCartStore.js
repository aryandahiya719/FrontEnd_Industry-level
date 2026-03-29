import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => set((state) => {
        const existing = state.items.find(item => item.id === product.id);
        if (existing) {
          return {
            items: state.items.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      increaseQuantity: (id) => set((state) => ({
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      })),
      
      decreaseQuantity: (id) => set((state) => {
        const existingItem = state.items.find(item => item.id === id);
        if (existingItem?.quantity === 1) {
          return { items: state.items.filter(item => item.id !== id) };
        }
        return {
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        };
      }),
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'cremy-cart-storage',
    }
  )
);

export default useCartStore;
