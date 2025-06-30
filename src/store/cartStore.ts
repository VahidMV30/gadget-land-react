import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (productId: number, quantity: number) => void;
  getTotalQuantity: () => number;
  getQuantityByProductId: (productId: number) => number;
  setQuantity: (productId: number, quantity: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  deleteItem: (productId: number) => void;
  isCartEmpty: () => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (productId, quantity) => {
        const items = get().items;
        const existingItem = items.find((item) => item.productId === productId);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
            ),
          });
        } else {
          set({ items: [...items, { productId, quantity }] });
        }
      },

      getTotalQuantity: () => get().items.reduce((total, item) => total + item.quantity, 0),

      getQuantityByProductId: (productId) => get().items.find((item) => item.productId === productId)?.quantity || 0,

      setQuantity: (productId, quantity) => {
        set({
          items: get().items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        });
      },

      increaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        });
      },

      decreaseQuantity: (productId) => {
        if (get().items.find((x) => x.productId === productId)?.quantity === 1) return;

        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        });
      },

      deleteItem: (productId) => {
        set((state) => ({ items: state.items.filter((x) => x.productId !== productId) }));
      },

      isCartEmpty: () => get().items.length === 0,
    }),
    {
      name: "cart",
    },
  ),
);
