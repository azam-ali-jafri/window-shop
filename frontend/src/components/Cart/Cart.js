import React, { useEffect, useState } from "react"
import CartItem from "./CartItem"
import { useSelector } from "react-redux"
import "../../stylesheets/Cart.css"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import Loader from "../Loader/Loader"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"

function Cart() {
  const alert = useAlert()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.user)
  const [cartItems, setCartItems] = useState(null)

  const checkoutHandler = () => {
    if (user.cart.length === 0) alert.error("can't proceed with empty cart")
    else navigate("/shipping")
  }

  let subtotal = 0
  cartItems &&
    cartItems.forEach(item => {
      subtotal += item.quantity * item.product.price
    })

  const shippingCharge = subtotal < 500 ? 0 : 60
  let discount = subtotal * 0.05
  const total = subtotal + shippingCharge - discount

  useEffect(() => {
    user && setCartItems(user.cart)
  }, [user])

  return (
    <>
      <Header />
      {!user || !cartItems ? (
        <Loader />
      ) : (
        <>
          {!user ? (
            <div
              style={{
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <h1>Sign in to access this page</h1>
            </div>
          ) : (
            <div className="wholeContainer">
              <div className="leftContainer">
                {cartItems.length === 0 ? (
                  <h1
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "30vh"
                    }}
                  >
                    cart is empty
                  </h1>
                ) : (
                  <>
                    <div className="cartItems-container">
                      <h5>Your shopping cart</h5>
                      {cartItems.map(item => {
                        return (
                          <>
                            <CartItem item={item} setCartItems={setCartItems} />
                            <hr />
                          </>
                        )
                      })}
                    </div>
                    <div className="cart-delivery-text">
                      <div style={{ display: "flex", alignItems: "c" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={window.innerWidth < 426 ? "10" : "25"}
                          height={window.innerWidth < 426 ? "10" : "25"}
                          fill="currentColor"
                          class="bi bi-truck"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                        <h4>Fast Delivery within 1-2 weeks</h4>
                      </div>
                      <span>Say goodbye to the days of waiting around for a package with your favorite online delivery service!</span>
                    </div>
                  </>
                )}
              </div>

              <div className="rightContainer">
                <div className=" card cart-total-container">
                  <div className="cart-subtotal-container">
                    <div>
                      <span>Subtotal</span> <span>₹{subtotal}</span>
                    </div>
                    <div>
                      <span>Discount</span> <span style={{ color: "green" }}>₹{discount}</span>
                    </div>
                    <div>
                      <span>Shipping Charge</span> <span style={{ color: "red" }}>₹{shippingCharge}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="cart-grossTotal-container">
                    <div>
                      <span>Total</span>
                      <h5>₹{total}</h5>
                    </div>
                    <button className="btn btn-success make-purchase" onClick={checkoutHandler}>
                      Proceed
                    </button>
                    <button type="button" class="btn btn-outline-danger" onClick={() => navigate("/products")}>
                      Back to shop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}{" "}
        </>
      )}
      <Footer />
    </>
  )
}

export default Cart
