"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  size: string;
  color: string;
  quantity: number;
}

export interface DiscountInfo {
  type: string;
  percent: number;
  couponId: string;
  label: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  discount: DiscountInfo | null;
  setDiscount: (d: DiscountInfo | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<DiscountInfo | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load cart and discount from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
    const savedDiscount = localStorage.getItem("cart_discount");
    if (savedDiscount) {
      setDiscount(JSON.parse(savedDiscount));
    }
    setLoaded(true);
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, loaded]);

  // Save discount to localStorage on change
  useEffect(() => {
    if (loaded) {
      if (discount) {
        localStorage.setItem("cart_discount", JSON.stringify(discount));
      } else {
        localStorage.removeItem("cart_discount");
      }
    }
  }, [discount, loaded]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(null);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, discount, setDiscount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
