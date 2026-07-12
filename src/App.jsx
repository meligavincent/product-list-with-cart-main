import { useCallback, useState } from 'react'
import Cart from './components/Cart.jsx'
import OrderConfirmationModal from './components/OrderConfirmationModal.jsx'
import ProductCard from './components/ProductCard.jsx'
import desserts from './data/desserts.js'
import { useCart } from './hooks/useCart.js'

export default function App() {
  const cart = useCart()
  const { reset } = cart
  const [confirmed, setConfirmed] = useState(false)
  const startNewOrder = useCallback(() => { reset(); setConfirmed(false) }, [reset])

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
