import React, { useState } from "react"
import CheckoutSteps from "./CheckoutSteps"
import { useAlert } from "react-alert"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import { CreditCard, CalendarMonth, VpnKey } from "@mui/icons-material"
import "../../stylesheets/Payment.css"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"

function Payment() {
  const [disableBtn, setDisableBtn] = useState(false)

  const alert = useAlert()
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()

  const { user } = useSelector(state => state.user)

  const orderInfo = JSON.parse(window.sessionStorage.getItem("orderInfo"))

  const order = {
    shippingInfo: user.shipInfo,
    orderItems: user.cart,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.total
  }

  const createOrder = async () => {
    await axios.post("/api/v1/order/new", order)
  }

  const handlePayment = async e => {
    e.preventDefault()
    setDisableBtn(true)
    try {
      const { data } = await axios.post("/api/v1/payment/process", {
        amount: orderInfo.total * 100
      })

      const client_secret = data.client_secret

      if (!stripe || !elements) return

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: user.shipInfo.address,
              city: user.shipInfo.city,
              state: user.shipInfo.state,
              postal_code: user.shipInfo.pincode,
              country: user.shipInfo.country
            }
          }
        }
      })

      if (result.error) {
        setDisableBtn(false)
        alert.error(result.error.message)
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }

          createOrder()

          navigate("/payment/success", { replace: true })
          alert.success("Payment succeeded")
        } else {
          setDisableBtn(false)
          alert.error("There's some issuse while procssing payment")
        }
      }
    } catch (error) {
      setDisableBtn(false)
      alert.error(error.response.data.message)
    }
  }
  return (
    <>
      <Header />
      <div style={{ display: "flex", flexDirection: "column" }} className="payment-wholeContainer">
        <CheckoutSteps activeStep={2} />
        <div className="payment-container">
          <h1 style={{ alignSelf: "center", marginBottom: "-0.5rem" }}>Card Info</h1>
          <hr
            style={{
              margin: "1rem 0rem",
              border: "0.1px solid rgba(0, 0, 0, 0.7)"
            }}
          />
          <div className="paymentForm-container">
            <form onSubmit={handlePayment}>
              <span>Card Number</span>
              <div className="cardInfo-input">
                <CreditCard style={{ transform: "translateX(1.8rem)" }} />
                <CardNumberElement className="stripeCard-element" />
              </div>
              <span>Expiry Date</span>
              <div className="cardInfo-input">
                <CalendarMonth style={{ transform: "translateX(1.8rem)" }} />
                <CardExpiryElement className="stripeCard-element" />
              </div>
              <span>CVC</span>
              <div className="cardInfo-input">
                <VpnKey style={{ transform: "translateX(1.8rem)" }} />
                <CardCvcElement className="stripeCard-element" />
              </div>

              <button
                type="submit"
                className="btn btn-success payment-btn"
                style={{ width: "95%", marginTop: "1rem" }}
                disabled={disableBtn ? true : false}
              >{`Pay ₹${orderInfo.total}`}</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Payment
