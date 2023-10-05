import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  paymentIntent: string;
  setPaymentItent: (val: string) => void;
  onCheckout: string;
  setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: "",
      onCheckout: "cart",
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) => {
        set((state) => {
          const existingitem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingitem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        });
      },
      removeProduct: (item) => {
        set((state) => {
          // Check if the item exist and remove quantity - 1
          const existingitem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingitem && existingitem.quantity! > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            // remove item from cart
            const filterCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            );
            return { cart: filterCart };
          }
        });
      },
      setPaymentItent: (val: string) => set({ paymentIntent: val }),
      setCheckout: (val: string) => set({ onCheckout: val }),
      clearCart: () => set((state) => ({ cart: [] })),
    }),
    { name: "cart-store" }
  )
);
