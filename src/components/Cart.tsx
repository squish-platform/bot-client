import { Component } from "react"

type Item = {
  id: string
  amount: string
}

function addToCart(n: number, item: Item) {
  return (state: CartType) => ({
    ...state,
    cart: {
      ...state.cart,
      [item.id]: (state.cart[item.id] || 0) + n
    },
    count: state.count + n,
    sum: state.sum + n * +item.amount
  })
}

type IProps = {
  render: Function
}
export type CartType = {
  cart: object
  count: number
  sum: number
}

const initialState = {
  cart: {},
  count: 0,
  sum: 0
}

export interface CartState {
  cart: {}
  count: number
  sum: number
  onInc: Function
  onDec: Function
  onReset: Function
}

export default class extends Component<IProps, CartType> {
  state = initialState
  updateState(): CartState {
    return {
      ...this.state,
      onInc: (item: Item) => this.setState(addToCart(1, item)),
      onDec: (item: Item) => this.setState(addToCart(-1, item)),
      onReset: () => this.setState(initialState)
    }
  }
  render() {
    return this.props.render(this.updateState())
  }
}
