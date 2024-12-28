'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@apps/shared/types/cart';
import { apiClient } from '@/lib/api-client';
import { useUser } from '@/modules/auth/hooks/use-user';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  // Load initial cart data
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (user) {
          // Get local cart before fetching server cart
          const localCart = localStorage.getItem(CART_STORAGE_KEY);
          const localItems = localCart ? JSON.parse(localCart) : [];

          // Fetch server cart
          const { data } = await apiClient.get('/cart');

          // If we have local items and just logged in, merge carts
          if (localItems.length > 0) {
            toast({
              title: 'Syncing your cart...',
              description: "We're adding your saved items to your account.",
            });
            await mergeCarts(localItems, data.items);
            toast({
              title: 'Cart synced!',
              description: 'Your items have been saved to your account.',
            });
            // Clear local storage after successful merge
            localStorage.removeItem(CART_STORAGE_KEY);
          } else {
            setItems(data.items);
          }
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
        toast({
          title: 'Item added to cart',
          description: 'Your item has been added to your cart successfully.',
        });
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
        toast({
          title: 'Item added to cart',
          description: 'Your item has been saved to your local cart.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error adding item',
        description: 'There was a problem adding your item to the cart.',
        variant: 'destructive',
      });
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
      toast({
        title: 'Item removed',
        description: 'The item has been removed from your cart.',
      });
    } catch (error) {
      toast({
        title: 'Error removing item',
        description: 'There was a problem removing the item from your cart.',
        variant: 'destructive',
      });
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
      toast({
        title: 'Cart cleared',
        description: 'All items have been removed from your cart.',
      });
    } catch (error) {
      toast({
        title: 'Error clearing cart',
        description: 'There was a problem clearing your cart.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const mergeCarts = async (
    localItems: CartItem[],
    serverItems: CartItem[],
  ) => {
    // Create a map of server items for quick lookup
    const serverItemsMap = new Map(
      serverItems.map(item => [item.productId, item]),
    );

    // Merge local items with server items
    for (const localItem of localItems) {
      const serverItem = serverItemsMap.get(localItem.productId);
      if (serverItem) {
        // If item exists in both carts, take the higher quantity
        await updateQuantity(
          localItem.productId,
          Math.max(localItem.qty, serverItem.qty),
        );
      } else {
        // If item only exists locally, add it to server cart
        await addItem(localItem.productId, localItem.qty);
      }
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
