export const CartIcon = () => <img src="./assets/images/icon-add-to-cart.svg" alt="" />
export const CarbonIcon = () => <img src="./assets/images/icon-carbon-neutral.svg" alt="" />
export const ConfirmedIcon = () => <img className="size-12" src="./assets/images/icon-order-confirmed.svg" alt="" />
export const EmptyCartIcon = () => <img src="./assets/images/illustration-empty-cart.svg" alt="" />

export function QuantityIcon({ type }) {
  return <img src={`./assets/images/icon-${type}-quantity.svg`} alt="" />
}
