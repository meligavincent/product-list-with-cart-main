import {
  CartIcon,
  MinusIcon,
  PlusIcon,
} from "./Icons";

export function ProductCard({
  product,
  quantity,
  onIncrement,
  onDecrement,
}) {
  const isSelected = quantity > 0;

  return (
    <article>
      <div className="relative mb-9">
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet={product.images.desktop}
          />

          <source
            media="(min-width: 640px)"
            srcSet={product.images.tablet}
          />

          <img
            src={product.images.mobile}
            alt={product.name}
            className={[
              "aspect-[1.43/1] w-full rounded-lg object-cover",
              "transition-[border-color,box-shadow] duration-200",
              isSelected
                ? "border-2 border-[#c73b0f]"
                : "border-2 border-transparent",
            ].join(" ")}
          />
        </picture>

        <div className="absolute inset-x-0 -bottom-5 flex justify-center">
          {isSelected ? (
            <div
              className="
                flex h-11 w-40 items-center justify-between rounded-full
                bg-[#c73b0f] px-3 text-white
              "
            >
              <button
                type="button"
                onClick={() => onDecrement(product.id)}
                className="
                  grid size-5 place-items-center rounded-full border border-white
                  transition-colors hover:bg-white hover:text-[#c73b0f]
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]
                "
                aria-label={`Remove one ${product.name}`}
              >
                <MinusIcon />
              </button>

              <span
                className="text-sm font-semibold"
                aria-live="polite"
                aria-label={`${quantity} ${product.name} in cart`}
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => onIncrement(product.id)}
                className="
                  grid size-5 place-items-center rounded-full border border-white
                  transition-colors hover:bg-white hover:text-[#c73b0f]
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]
                "
                aria-label={`Add another ${product.name}`}
              >
                <PlusIcon />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onIncrement(product.id)}
              className="
                group flex h-11 w-40 items-center justify-center gap-2
                rounded-full border border-[#ad8a85] bg-white
                px-4 text-sm font-semibold text-[#260f08]
                transition-colors
                hover:border-[#c73b0f] hover:text-[#c73b0f]
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]
              "
            >
              <CartIcon className="size-5 text-[#c73b0f]" />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <div>
        <p className="mb-1 text-sm text-[#87635a]">
          {product.category}
        </p>

        <h2 className="text-base font-semibold leading-tight text-[#260f08]">
          {product.name}
        </h2>

        <p className="mt-1 font-semibold text-[#c73b0f]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
}
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
