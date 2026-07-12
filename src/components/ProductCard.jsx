import { CartIcon, QuantityIcon } from './Icons.jsx'

export default function ProductCard({ product, quantity, onAdd, onDecrement }) {
  const selected = quantity > 0
  return (
    <article>
      <div className="relative mb-9">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 640px)" srcSet={product.image.tablet} />
          <img className={`aspect-[327/212] w-full rounded-lg object-cover sm:aspect-square ${selected ? 'ring-2 ring-red' : ''}`} src={product.image.mobile} alt={product.name} />
        </picture>
        {selected ? (
          <div className="quantity-control" aria-label={`${quantity} ${product.name} in cart`}>
            <button onClick={onDecrement} aria-label={`Remove one ${product.name}`}><QuantityIcon type="decrement" /></button>
            <span aria-live="polite">{quantity}</span>
            <button onClick={onAdd} aria-label={`Add one more ${product.name}`}><QuantityIcon type="increment" /></button>
          </div>
        ) : (
          <button className="add-button" onClick={onAdd}><CartIcon /> Add to Cart</button>
        )}
      </div>
      <p className="text-sm text-rose-500">{product.category}</p>
      <h2 className="font-semibold text-rose-900">{product.name}</h2>
      <p className="font-semibold text-red">${product.price.toFixed(2)}</p>
    </article>
  )
}
