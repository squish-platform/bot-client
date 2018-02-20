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
  key: string
  item: ItemType
  actions: JSX.Element
}

export default ({ item, actions }: Props) => (
  <div className="item">
    <img className="item-image" src={item.image} />
    <div className="item-body">
      <div className="item-name">{item.name}</div>
      <small>{item.amount}</small>
    </div>
    <div className="item-actions">{actions}</div>
  </div>
)
