import React from "react"
import "../../stylesheets/ConfirmOrder.css"
import { useSelector } from "react-redux"
import Loader from "../Loader/Loader"
import CheckoutSteps from "./CheckoutSteps"
import { useNavigate } from "react-router-dom"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"

function ConfirmOrder() {
  const navigate = useNavigate()

  const { user } = useSelector(state => state.user)

  let subtotal = 0
  user &&
    user.cart.forEach(item => {
      subtotal += item.quantity * item.product.price
    })
  let discount = subtotal * 0.05
  let shippingCharge = subtotal < 500 ? 0 : 60
  let total = shippingCharge + subtotal - discount

  const handleSubmit = () => {
    const data = {
      subtotal: subtotal,
      shippingCharge: shippingCharge,
      total: total
    }
    window.sessionStorage.setItem("orderInfo", JSON.stringify(data))
    navigate("/process/payment", { replace: true })
  }

  return (
    <>
      <Header />
      {!user ? (
        <Loader />
      ) : (
        <>
          <CheckoutSteps activeStep={1} />
          <div className="confirmOrder-container">
            <div className="confirmOrder-left">
              <div className="shipInfo-container">
                <h2>Shipping info</h2>
                <div className="shipInfo-details">
                  <span>
                    <b>Name:</b> {user.name}
                  </span>
                  <span>
                    <b>Phone:</b> {user.shipInfo.phoneNo}
                  </span>
                  <span>
                    <b>Address:</b>{" "}
                    {user.shipInfo.address +
                      ", " +
                      user.shipInfo.city +
                      ", " +
                      user.shipInfo.state +
                      ", " +
                      user.shipInfo.pincode +
                      ", " +
                      user.shipInfo.country}
                  </span>
                </div>
              </div>
              <hr />
              <div className="cartItem-details">
                <h2>Your cart items</h2>
                <div className="cartItems-cards">
                  {user.cart.map(item => (
                    <>
                      <div style={{ display: "flex", alignItems: "center" }} className="comfirmOrder-itemCard">
                        <div className="cartItems-details-img">
                          <img src={item.product.images[0].url} alt="img" />
                        </div>
                        <div className="cartItems-details-body">
                          <span
                            style={{
                              fontWeight: "500"
                            }}
                            className="confirmOrder-card-name"
                          >
                            {item.product.name}
                          </span>
                          <span className="confirmOrder-card-price">
                            {item.quantity} x {item.product.price} = ₹{item.quantity * item.product.price}
                          </span>
                        </div>
                      </div>
                      <hr />
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div className="confirmOrder-right">
              <h2>Order summary</h2>
              <div className="summary-sub-div">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-sub-div">
                <span>Discount:</span>
                <span style={{ color: "green" }}>₹{discount}</span>
              </div>
              <div className="summary-sub-div">
                <span>Delivery charge:</span>
                <span style={{ color: "red" }}>₹{shippingCharge}</span>
              </div>
              <hr />
              <div className="summary-sub-div" style={{ fontWeight: "600" }}>
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
              <button className="btn btn-success confirmOrder-btn" onClick={handleSubmit}>
                Proceed to payment
              </button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  )
}

export default ConfirmOrder
