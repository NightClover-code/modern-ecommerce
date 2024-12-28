import { createContext, useContext, useState } from 'react';
import { CartItem } from '@apps/shared/types/cart';
import { apiClient } from '@/lib/api-client';

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addItem: (productId: string, qty: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const { data } = await apiClient.get('/cart');
      setItems(data.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addItem = async (productId: string, qty: number) => {
    setLoading(true);
    try {
      const { data } = await apiClient.post('/cart/items', { productId, qty });
      setItems(data.items);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    setLoading(true);
    try {
      const { data } = await apiClient.delete(`/cart/items/${productId}`);
      setItems(data.items);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, qty: number) => {
    setLoading(true);
    try {
      const { data } = await apiClient.put(`/cart/items/${productId}`, { qty });
      setItems(data.items);
    } catch (error) {
      console.error('Error updating cart item:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await apiClient.delete('/cart');
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{ items, loading, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
