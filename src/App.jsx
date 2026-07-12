import { useCallback, useState } from "react";
import { Cart } from "./components/Cart";
import { OrderConfirmationModal } from "./components/OrderConfirmationModal";
import { ProductCard } from "./components/ProductCard";
import { desserts } from "./data/desserts";
import { useCart } from "./hooks/useCart";

export default function App() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const {
    quantities,
    cartItems,
    totalItems,
    totalPrice,
    increment,
    decrement,
    remove,
    reset,
  } = useCart(desserts);

  const closeConfirmation = useCallback(() => {
    setIsConfirmationOpen(false);
  }, []);

  const startNewOrder = useCallback(() => {
    reset();
    setIsConfirmationOpen(false);
  }, [reset]);

  return (
    <>
      <main className="min-h-screen bg-[#fcf8f6]">
        <div
          className="
            mx-auto w-full max-w-[1280px]
            px-6 py-8
            sm:px-10 sm:py-12
            lg:px-8 lg:py-20
          "
        >
          <div
            className="
              grid items-start gap-8
              lg:grid-cols-[minmax(0,1fr)_24rem]
            "
          >
            <section aria-labelledby="desserts-title">
              <h1
                id="desserts-title"
                className="
                  mb-8 text-[2.5rem] font-bold leading-none
                  text-[#260f08]
                "
              >
                Desserts
              </h1>

              <div
                className="
                  grid grid-cols-1 gap-x-6 gap-y-8
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {desserts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantities[product.id] ?? 0}
                    onIncrement={increment}
                    onDecrement={decrement}
                  />
                ))}
              </div>
            </section>

            <Cart
              items={cartItems}
              totalItems={totalItems}
              totalPrice={totalPrice}
              onRemove={remove}
              onConfirm={() => setIsConfirmationOpen(true)}
            />
          </div>
        </div>
      </main>

      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        items={cartItems}
        totalPrice={totalPrice}
        onClose={closeConfirmation}
        onStartNewOrder={startNewOrder}
      />

      <p className="sr-only" aria-live="polite">
        {totalItems === 0
          ? "Your cart is empty"
          : `${totalItems} items in your cart. Total ${totalPrice.toFixed(2)} dollars.`}
      </p>
    </>
  );
}
import { useCallback, useState } from 'react'
import Cart from './components/Cart.jsx'
import OrderConfirmationModal from './components/OrderConfirmationModal.jsx'
import ProductCard from './components/ProductCard.jsx'
import desserts from './data/desserts.js'
import { useCart } from './hooks/useCart.js'

export default function App() {
  const cart = useCart()
  const [confirmed, setConfirmed] = useState(false)
  const startNewOrder = useCallback(() => { cart.reset(); setConfirmed(false) }, [cart.reset])

  return (
    <>
      <main className="mx-auto grid max-w-[1272px] gap-8 px-6 py-6 sm:px-10 sm:py-10 lg:grid-cols-[1fr_384px] lg:gap-8 lg:py-[88px]">
        <section>
          <h1 className="mb-8 text-[2.5rem] font-bold leading-none text-rose-900">Desserts</h1>
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {desserts.map((product) => <ProductCard key={product.name} product={product} quantity={cart.cart[product.name]?.quantity ?? 0} onAdd={() => cart.add(product)} onDecrement={() => cart.decrement(product.name)} />)}
          </div>
        </section>
        <Cart items={cart.items} count={cart.count} total={cart.total} onRemove={cart.remove} onConfirm={() => setConfirmed(true)} />
      </main>
      <footer className="px-6 pb-6 text-center text-xs text-rose-500">Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. Coded by <a href="https://github.com/meligavincent">Meli Gavincent</a>.</footer>
      {confirmed && <OrderConfirmationModal items={cart.items} total={cart.total} onClose={startNewOrder} />}
    </>
  )
}
