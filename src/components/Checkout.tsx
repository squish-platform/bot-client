import * as React from "react"

export type InvoiceType = {
  id: string
  vendor: string
  image: string
  name: string
  amount: string
  description: string
}

type Props = {
  token: string
  invoice: InvoiceType
}

const checkout = () => {
  window.MessengerExtensions.requestCloseBrowser(
    () => {
      // webview closed
    },
    (err: Error) => {
      // an error occurred
    }
  )
}
export default class extends React.Component<Props> {
  state = { updated: null }
  componentDidMount() {
    window.open(this.props.token)
    if (!!EventSource) {
      var source = new EventSource(
        `https://squish.localtunnel.me/subscribe?id=${this.props.invoice.id}`
      )

      source.addEventListener(
        "message",
        (e: MessageEvent) => this.setState({ updated: JSON.parse(e.data) }),
        false
      )

      source.addEventListener(
        "open",
        e => console.log("Connection was opened"),
        false
      )

      source.addEventListener(
        "error",
        (e: Event) => console.log("Connection was closed"),
        false
      )
    }
  }
  render() {
    const { invoice, token } = this.props
    const { updated } = this.state
    return (
      <div className="checkout">
        {updated ? (
          <div>
            <h3>Tack för din betalning!</h3>
            <div className="button-group">
              <button className="btn" onClick={checkout}>
                Stäng
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3>Väntar på betalning...</h3>
            <a className="btn swish" href={token}>
              <img src="https://i0.wp.com/telekomidag.se/files/2017/03/swish_logo_primary_rgb-2.png?fit=480%2C634" />
            </a>
          </div>
        )}
        <pre>{JSON.stringify(updated || invoice, null, 2)}</pre>
      </div>
    )
  }
}
