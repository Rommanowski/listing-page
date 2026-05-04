"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/src/types/apiTypes";
import { addToCartRequest } from "@/src/utils/cart";

type CartContextValue = {
  items: Product[];
  addToCart: (product: Product) => Promise<void>;
  addingIds: Set<string>;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [addingIds, setAddingIds] = useState<Set<string>>(new Set());

  const addToCart = async (product: Product) => {
    setAddingIds((prev) => new Set(prev).add(product.id));
    try {
      await addToCartRequest(product.id);
      setItems((prev) => [...prev, product]);
    } finally {
      setAddingIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }
  };

  const value: CartContextValue = { items, addToCart, addingIds };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
