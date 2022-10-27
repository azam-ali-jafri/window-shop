import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loader from "../Loader/Loader"
import { useNavigate } from "react-router-dom"
import "../../stylesheets/Orders.css"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import axios from "axios"

function Orders() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState(null)

  const { user } = useSelector(state => state.user)

  const getOrders = async () => {
    await axios
      .get("/api/v1/orders/me")
      .then(res => setOrders(res.data.orders))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getOrders()
  }, [])
  return (
    <>
      <Header />
      {!orders || !user ? (
        <Loader />
      ) : (
        <div className="orders-outer-container">
          <h1
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {user.name}'s Orders
          </h1>
          {orders.length > 0 ? (
            <div className="orders-inner-container card">
              <div className="orders-attribute-row">
                <span style={{ flex: 0.3 }}>Order ID</span>
                <span style={{ flex: 0.3 }}>Status</span>
                <span style={{ flex: 0.2, textAlign: "right" }}>Items Qty</span>
                <span style={{ flex: 0.2, textAlign: "right" }}>Amount</span>
              </div>
              <hr style={{ marginBottom: "1rem" }} />
              {orders &&
                orders.map(item => (
                  <>
                    <div className="orders-row" onClick={() => navigate(`/me/order/${item._id}`)} style={{ cursor: "pointer" }}>
                      <span style={{ flex: 0.3, marginRight: "5px" }}>{item._id}</span>
                      <span
                        style={{
                          color: item.orderStatus === "Delivered" ? "green" : "red",
                          flex: 0.3
                        }}
                      >
                        {item.orderStatus}
                      </span>
                      <span style={{ flex: 0.2, textAlign: "right" }}>{item.orderItems.length}</span>
                      <span style={{ flex: 0.2, textAlign: "right" }}>${item.totalPrice}</span>
                    </div>
                    <hr />
                  </>
                ))}
            </div>
          ) : (
            <h1
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30vh"
              }}
            >
              No orders
            </h1>
          )}
        </div>
      )}
      <Footer />
    </>
  )
}

export default Orders
