import * as React from "react"
import "./App.css"

import Actions from "./components/Actions"
import Checkout from "./components/Checkout"
import Cart, { CartState, CartType } from "./components/Cart"
import Item, { ItemType } from "./components/Item"

export type Invoice = {
  amount: string
  customer: string
}

const price = n =>
  n.toLocaleString("sv-SE", {
    style: "currency",
    currency: "SEK"
  })

type Props = {
  items: ItemType[]
}
class App extends React.Component<Props> {
  state = {
    invoice: null,
    token: null,
    items: []
  }
  componentDidMount() {
    fetch("https://squish.localtunnel.me/items", {
      credentials: "same-origin"
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(items => this.setState({ items }))
  }
  checkout(cart?: CartType | {}) {
    return fetch("https://squish.localtunnel.me/checkout", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cart)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ invoice: res.invoice, token: res.token })
        return res
      })
      .catch(err => console.log("CHECKOUT ERROR", err))
  }
  render() {
    const { items } = this.props
    const { token, invoice } = this.state
    console.log(token, invoice, this.state)

    if (token && invoice) {
      return <Checkout token={token} invoice={invoice} />
    }
    return (
      <Cart
        render={({ cart, count, sum, onInc, onDec, onReset }: CartState) => {
          return (
            <div className="App">
              {/* <button className="btn secondary" onClick={() => onReset()}>
                Rensa
              </button> */}
              <div>
                {items.map(item => (
                  <Item
                    key={item.id}
                    item={item}
                    actions={
                      <Actions
                        quantity={cart[item.id]}
                        onInc={_ => onInc(item)}
                        onDec={_ => onDec(item)}
                      />
                    }
                  />
                ))}
              </div>
              <h5>Summa: {price(sum)}</h5>
              <div className="button-group">
                <button
                  disabled={!count}
                  className="btn"
                  onClick={_ => this.checkout(cart)}
                >
                  Till betalning
                </button>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default App
