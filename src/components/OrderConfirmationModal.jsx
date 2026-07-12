import { useEffect, useRef } from "react";
import { ConfirmedIcon } from "./Icons";

export function OrderConfirmationModal({
  isOpen,
  items,
  totalPrice,
  onClose,
  onStartNewOrder,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previouslyFocusedElement = document.activeElement;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-end justify-center
        bg-black/50
        sm:items-center sm:p-6
      "
      role="presentation"
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        aria-describedby="confirmation-description"
        tabIndex={-1}
        className="
          max-h-[90dvh] w-full overflow-y-auto
          rounded-t-xl bg-white px-6 py-10
          outline-none
          sm:max-w-[592px] sm:rounded-xl sm:p-10
        "
      >
        <ConfirmedIcon className="mb-6 size-12 text-[#1ea575]" />

        <h2
          id="confirmation-title"
          className="
            max-w-xs text-[2.5rem] font-bold leading-[1.05]
            text-[#260f08] sm:max-w-none
          "
        >
          Order Confirmed
        </h2>

        <p
          id="confirmation-description"
          className="mt-3 text-base text-[#87635a]"
        >
          We hope you enjoy your food!
        </p>

        <div className="mt-8 rounded-lg bg-[#fcf8f6] px-6">
          <ul className="divide-y divide-[#f5eeec]">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 py-4"
              >
                <img
                  src={item.images.thumbnail}
                  alt=""
                  className="size-12 shrink-0 rounded object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-[#260f08]">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex gap-3 text-sm">
                    <span className="font-semibold text-[#c73b0f]">
                      {item.quantity}x
                    </span>

                    <span className="text-[#87635a]">
                      @ ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <strong className="shrink-0 text-[#260f08]">
                  ${item.subtotal.toFixed(2)}
                </strong>
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
        </div>

        <button
          type="button"
          onClick={onStartNewOrder}
          className="
            mt-8 min-h-14 w-full rounded-full
            bg-[#c73b0f] px-6 py-3
            font-semibold text-white
            transition-colors hover:bg-[#952c0c]
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]
          "
        >
          Start New Order
        </button>
      </section>
    </div>
  );
}
import { useEffect, useRef } from 'react'
import { ConfirmedIcon } from './Icons.jsx'

export default function OrderConfirmationModal({ items, total, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    const handleClose = () => onClose()
    dialog.addEventListener('cancel', handleClose)
    return () => dialog.removeEventListener('cancel', handleClose)
  }, [onClose])

  return (
    <dialog ref={dialogRef} className="modal" onClick={(event) => event.target === dialogRef.current && onClose()}>
      <div className="modal-card">
        <ConfirmedIcon />
        <h2 className="mt-6 text-[2.5rem] font-bold leading-12 text-rose-900">Order Confirmed</h2>
        <p className="mt-2 text-rose-500">We hope you enjoy your food!</p>
        <div className="mt-8 rounded-lg bg-rose-50 p-6">
          <ul>{items.map(({ product, quantity }) => <li className="flex items-center border-b border-rose-100 py-4 first:pt-0" key={product.name}><img className="mr-4 size-12 rounded" src={product.image.thumbnail} alt="" /><div className="min-w-0 grow"><h3 className="truncate text-sm font-semibold">{product.name}</h3><p className="mt-1 text-sm"><span className="mr-4 font-semibold text-red">{quantity}x</span><span className="text-rose-500">@ ${product.price.toFixed(2)}</span></p></div><strong>${(product.price * quantity).toFixed(2)}</strong></li>)}</ul>
          <div className="flex items-center justify-between pt-6"><span className="text-sm">Order Total</span><strong className="text-2xl">${total.toFixed(2)}</strong></div>
        </div>
        <button className="primary-button mt-8" onClick={onClose}>Start New Order</button>
      </div>
    </dialog>
  )
}
