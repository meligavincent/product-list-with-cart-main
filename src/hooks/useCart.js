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
