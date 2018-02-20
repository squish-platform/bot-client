import * as React from "react"

export type ItemType = {
  id: string
  vendor: string
  image: string
  name: string
  amount: string
  description: string
}

type Props = {
  quantity: string
  onInc: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDec: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default ({ quantity = 0, onInc, onDec }: Props) => (
  <div className="actions">
    <button className="btn" disabled={quantity < 1} onClick={onDec}>
      -
    </button>
    <strong>{quantity}</strong>
    <button className="btn" disabled={quantity > 10} onClick={onInc}>
      +
    </button>
  </div>
)
