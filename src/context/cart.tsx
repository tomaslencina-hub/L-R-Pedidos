import { createContext, use, useReducer, type PropsWithChildren } from 'react';

import type { Product } from '@/data/restaurants';

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartState = {
  /** The cart only holds products from one restaurant at a time */
  restaurantId: string | null;
  lines: CartLine[];
};

type CartAction =
  | { type: 'add'; restaurantId: string; product: Product }
  | { type: 'remove'; productId: string }
  | { type: 'clear' };

const emptyCart: CartState = { restaurantId: null, lines: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      // Adding from another restaurant starts a new cart
      const lines = state.restaurantId === action.restaurantId ? state.lines : [];
      const exists = lines.some((line) => line.product.id === action.product.id);

      return {
        restaurantId: action.restaurantId,
        lines: exists
          ? lines.map((line) =>
              line.product.id === action.product.id
                ? { ...line, quantity: line.quantity + 1 }
                : line,
            )
          : [...lines, { product: action.product, quantity: 1 }],
      };
    }
    case 'remove': {
      const lines = state.lines
        .map((line) =>
          line.product.id === action.productId ? { ...line, quantity: line.quantity - 1 } : line,
        )
        .filter((line) => line.quantity > 0);

      return lines.length > 0 ? { ...state, lines } : emptyCart;
    }
    case 'clear':
      return emptyCart;
  }
}

type CartContextValue = CartState & {
  count: number;
  subtotal: number;
  quantityOf: (productId: string) => number;
  add: (restaurantId: string, product: Product) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, emptyCart);

  const value: CartContextValue = {
    ...state,
    count: state.lines.reduce((total, line) => total + line.quantity, 0),
    subtotal: state.lines.reduce((total, line) => total + line.product.price * line.quantity, 0),
    quantityOf: (productId) =>
      state.lines.find((line) => line.product.id === productId)?.quantity ?? 0,
    add: (restaurantId, product) => dispatch({ type: 'add', restaurantId, product }),
    remove: (productId) => dispatch({ type: 'remove', productId }),
    clear: () => dispatch({ type: 'clear' }),
  };

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const cart = use(CartContext);
  if (!cart) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return cart;
}
