'use client';

import { createContext, useContext, useState } from 'react';

interface CheckoutContextType {
  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: string) => void;
  clearCheckout: () => void;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const clearCheckout = () => {
    setShippingAddress(null);
    setPaymentMethod(null);
  };

  return (
    <CheckoutContext.Provider
      value={{
        shippingAddress,
        paymentMethod,
        setShippingAddress,
        setPaymentMethod,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
