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
