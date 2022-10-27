import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../../stylesheets/OrderDetail.css"
import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import Loader from "../Loader/Loader"

function OrderDetail() {
  const { orderId } = useParams()

  const getOrderDetail = async () => {
    await axios
      .get(`/api/v1/order/${orderId}`)
      .then(res => setOrder(res.data.order))
      .catch(error => console.log(error))
  }
  const [order, setOrder] = useState(null)

  useEffect(() => {
    getOrderDetail()
  }, [])

  return (
    <>
      <Header />
      {!order ? (
        <Loader />
      ) : (
        <div className="orderDetail-container">
          <div className="orderDetail-left">
            <div className="orderDetail-left-sub">
              <h2>Shipping Info</h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>
                  <b>Name:</b> {order.customer && order.customer.name}
                </span>
                <span>
                  <b>Phone:</b> {order.shippingInfo && order.shippingInfo.phoneNo}
                </span>
                <span>
                  <b>Address:</b>{" "}
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                </span>
              </div>
            </div>
            <hr />

            <div className="orderDetail-left-sub">
              <h2>Payment Info</h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ display: "flex" }}>
                  <b>Status: </b> <p style={{ color: "green", margin: "0 5px" }}>{order.paymentInfo && order.paymentInfo.status}</p>
                </span>
                <span>
                  <b>Amount:</b> {order.totalPrice && `$${order.totalPrice}`}
                </span>
              </div>
            </div>
            <hr />
            <div className="orderDetail-left-sub">
              <h2>Order Status</h2>
              <span>
                <b style={{ color: "red" }}>{order.orderStatus && order.orderStatus}</b>
              </span>
            </div>
          </div>
          <div className="orderDetail-right">
            <h2>Ordered Items</h2>
            <div className="cartItems-cards">
              {order.orderItems &&
                order.orderItems.map(item => (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }} className="orderDetail-item-card">
                      <div className="cartItems-details-img">
                        <img src={item.product && item.product.images[0].url} alt="img" />
                      </div>
                      <div className="cartItems-details-body">
                        <h5
                          style={{
                            fontWeight: "500"
                          }}
                        >
                          {item.product.name}
                        </h5>
                        <span>
                          {item.quantity} x {item.product.price} = ${item.quantity * item.product.price}
                        </span>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default OrderDetail
