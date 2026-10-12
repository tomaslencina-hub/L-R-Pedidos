import { createContext, use, useState, type PropsWithChildren } from 'react';

import type { CartLine } from '@/context/cart';

export type PaymentMethod = 'cash' | 'card';

export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  address: string;
  paymentMethod: PaymentMethod;
  createdAt: number;
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: 'Efectivo',
  card: 'Tarjeta al recibir',
};

export const orderSteps = ['Confirmado', 'En preparación', 'En camino', 'Entregado'] as const;

// There is no backend yet: the status advances on its own so the tracking screen can be tried out.
const STEP_SECONDS = [0, 10, 25, 45];

/** Index into `orderSteps` for an order created at `createdAt`. */
export function getOrderStep(createdAt: number, now: number) {
  const elapsed = (now - createdAt) / 1000;
  return STEP_SECONDS.findLastIndex((seconds) => elapsed >= seconds);
}

type OrdersContextValue = {
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Order;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: PropsWithChildren) {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder: OrdersContextValue['placeOrder'] = (data) => {
    const createdAt = Date.now();
    const order: Order = { ...data, id: createdAt.toString(36).toUpperCase(), createdAt };
    setOrders((current) => [order, ...current]);
    return order;
  };

  return <OrdersContext value={{ orders, placeOrder }}>{children}</OrdersContext>;
}

export function useOrders() {
  const orders = use(OrdersContext);
  if (!orders) {
    throw new Error('useOrders must be used inside <OrdersProvider>');
  }
  return orders;
}
