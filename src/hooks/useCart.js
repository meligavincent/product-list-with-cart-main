import { useCallback, useMemo, useState } from "react";

export function useCart(products) {
  const [quantities, setQuantities] = useState({});

  const increment = useCallback((productId) => {
    setQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  }, []);

  const decrement = useCallback((productId) => {
    setQuantities((current) => {
      const nextQuantity = Math.max((current[productId] ?? 0) - 1, 0);

      if (nextQuantity === 0) {
        const nextState = { ...current };
        delete nextState[productId];
        return nextState;
      }

      return {
        ...current,
        [productId]: nextQuantity,
      };
    });
  }, []);

  const remove = useCallback((productId) => {
    setQuantities((current) => {
      const nextState = { ...current };
      delete nextState[productId];
      return nextState;
    });
  }, []);

  const reset = useCallback(() => {
    setQuantities({});
  }, []);

  const cartItems = useMemo(() => {
    return products
      .filter((product) => (quantities[product.id] ?? 0) > 0)
      .map((product) => {
        const quantity = quantities[product.id];
        const subtotal = quantity * product.price;

        return {
          ...product,
          quantity,
          subtotal,
        };
      });
  }, [products, quantities]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0);
  }, [cartItems]);

  return {
    quantities,
    cartItems,
    totalItems,
    totalPrice,
    increment,
    decrement,
    remove,
    reset,
  };
}
import { useCallback, useMemo, useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState({})

  const add = useCallback((product) => setCart((items) => ({ ...items, [product.name]: { product, quantity: (items[product.name]?.quantity ?? 0) + 1 } })), [])
  const decrement = useCallback((name) => setCart((items) => {
    const next = { ...items }
    if (next[name].quantity === 1) delete next[name]
    else next[name] = { ...next[name], quantity: next[name].quantity - 1 }
    return next
  }), [])
  const remove = useCallback((name) => setCart((items) => {
    const next = { ...items }
    delete next[name]
    return next
  }), [])
  const reset = useCallback(() => setCart({}), [])
  const items = useMemo(() => Object.values(cart), [cart])
  const count = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return { cart, items, count, total, add, decrement, remove, reset }
}
