import {
  CarbonNeutralIcon,
  RemoveIcon,
} from "./Icons";

export function Cart({
  items,
  totalItems,
  totalPrice,
  onRemove,
  onConfirm,
}) {
  const isEmpty = totalItems === 0;

  return (
    <aside
      aria-labelledby="cart-title"
      className="
        h-fit rounded-xl bg-white p-6
        lg:sticky lg:top-6
      "
    >
      <h2
        id="cart-title"
        className="text-2xl font-bold text-[#c73b0f]"
      >
        Your Cart ({totalItems})
      </h2>

      {isEmpty ? (
        <div className="flex min-h-52 flex-col items-center justify-center">
          <img
            src="/assets/images/illustration-empty-cart.svg"
            alt=""
            className="mb-4 w-32"
          />

          <p className="text-center text-sm font-semibold text-[#87635a]">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <ul
            className="divide-y divide-[#f5eeec]"
            aria-label="Items in cart"
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[#260f08]">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm">
                    <span className="font-semibold text-[#c73b0f]">
                      {item.quantity}x
                    </span>

                    <span className="text-[#ad8a85]">
                      @ ${item.price.toFixed(2)}
                    </span>

                    <span className="font-semibold text-[#87635a]">
                      ${item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="
                    grid size-5 shrink-0 place-items-center rounded-full
                    border border-[#ad8a85] text-[#87635a]
                    transition-colors
                    hover:border-[#260f08] hover:text-[#260f08]
                    focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]
                  "
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <RemoveIcon />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between py-6">
            <span className="text-sm text-[#260f08]">
              Order Total
            </span>

            <strong className="text-2xl text-[#260f08]">
              ${totalPrice.toFixed(2)}
            </strong>
          </div>

          <div
            className="
              mb-6 flex items-center justify-center gap-2 rounded-lg
              bg-[#fcf8f6] px-3 py-4 text-sm text-[#260f08]
            "
          >
            <CarbonNeutralIcon className="size-5 shrink-0 text-[#1ea575]" />

            <span>
              This is a{" "}
              <strong className="font-semibold">
                carbon-neutral
              </strong>{" "}
              delivery
            </span>
          </div>

          <button
            type="button"
            onClick={onConfirm}
            className="
              min-h-14 w-full rounded-full bg-[#c73b0f]
              px-6 py-3 font-semibold text-white
              transition-colors hover:bg-[#952c0c]
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]
            "
          >
            Confirm Order
          </button>
        </>
      )}
    </aside>
  );
}
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
