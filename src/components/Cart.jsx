import { CarbonIcon, EmptyCartIcon } from './Icons.jsx'

export default function Cart({ items, count, total, onRemove, onConfirm }) {
  return (
    <aside className="rounded-xl bg-white p-6 lg:sticky lg:top-10">
      <h2 className="mb-6 text-2xl font-bold text-red">Your Cart ({count})</h2>
      {!items.length ? (
        <div className="flex flex-col items-center pb-4 pt-4">
          <EmptyCartIcon />
          <p className="mt-4 text-sm font-semibold text-rose-500">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul>
            {items.map(({ product, quantity }) => (
              <li className="flex items-center border-b border-rose-100 py-4 first:pt-0" key={product.name}>
                <div className="grow">
                  <h3 className="text-sm font-semibold text-rose-900">{product.name}</h3>
                  <p className="mt-1 text-sm"><span className="mr-4 font-semibold text-red">{quantity}x</span><span className="text-rose-400">@ ${product.price.toFixed(2)}</span><span className="ml-2 font-semibold text-rose-500">${(product.price * quantity).toFixed(2)}</span></p>
                </div>
                <button className="remove-button" onClick={() => onRemove(product.name)} aria-label={`Remove ${product.name} from cart`}>×</button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between py-6"><span className="text-sm">Order Total</span><strong className="text-2xl">${total.toFixed(2)}</strong></div>
          <div className="flex items-center justify-center gap-2 rounded-lg bg-rose-50 px-3 py-4 text-sm"><CarbonIcon /><span>This is a <strong>carbon-neutral</strong> delivery</span></div>
          <button className="primary-button mt-6" onClick={onConfirm}>Confirm Order</button>
        </>
      )}
    </aside>
  )
}
