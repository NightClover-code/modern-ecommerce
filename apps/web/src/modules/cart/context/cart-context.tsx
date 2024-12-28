'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@apps/shared/types/cart';
import { apiClient } from '@/lib/api-client';
import { useUser } from '@/modules/auth/hooks/use-user';

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addItem: (productId: string, qty: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart_items';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  // Load initial cart data
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (user) {
          // Fetch cart from API for authenticated users
          const { data } = await apiClient.get('/cart');
          setItems(data.items);
        } else {
          // Load cart from localStorage for guests
          const storedCart = localStorage.getItem(CART_STORAGE_KEY);
          if (storedCart) {
            setItems(JSON.parse(storedCart));
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Sync cart to localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, user]);

  const addItem = async (productId: string, qty: number) => {
    setLoading(true);
    try {
      if (user) {
        // Add to server cart for authenticated users
        const { data } = await apiClient.post('/cart/items', {
          productId,
          qty,
        });
        setItems(data.items);
      } else {
        // Add to local cart for guests
        const response = await apiClient.get(`/products/${productId}`);
        const product = response.data;

        const existingItem = items.find(item => item.productId === productId);
        if (existingItem) {
          setItems(
            items.map(item =>
              item.productId === productId ? { ...item, qty: qty } : item,
            ),
          );
        } else {
          const newItem: CartItem = {
            productId: product._id,
            name: product.name,
            image: product.images[0],
            price: product.price,
            countInStock: product.countInStock,
            qty,
          };
          setItems([...items, newItem]);
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await apiClient.delete(`/cart/items/${productId}`);
        setItems(data.items);
      } else {
        setItems(items.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, qty: number) => {
    setLoading(true);
    try {
      if (user) {
        const { data } = await apiClient.put(`/cart/items/${productId}`, {
          qty,
        });
        setItems(data.items);
      } else {
        setItems(
          items.map(item =>
            item.productId === productId ? { ...item, qty } : item,
          ),
        );
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      if (user) {
        await apiClient.delete('/cart');
      }
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
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
