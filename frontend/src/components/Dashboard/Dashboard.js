import axios from "axios"
import React, { useEffect, useState } from "react"
import "../../stylesheets/Dashboard.css"
import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import Loader from "../Loader/Loader"
import DashboardNavbar from "./DashboardNavbar"

function Dashboard() {
  const [usersCount, setUsersCount] = useState(null)
  const [orders, setOrders] = useState(null)
  const [ordersCount, setOrdersCount] = useState(null)
  const [productsCount, setProductsCount] = useState(null)

  const getOrders = async () => {
    await axios.get("/api/v1/orders").then(res => {
      setOrders(res.data.orders)
      setOrdersCount(res.data.ordersCount)
    })
  }
  const getUsersCount = async () => {
    await axios.get("/api/v1/users").then(res => setUsersCount(res.data.usersCount))
  }
  const getProductsCount = async () => {
    await axios.get("/api/v1/products").then(res => setProductsCount(res.data.productsCount))
  }

  let totalAmount = 0

  orders &&
    orders.forEach(ele => {
      totalAmount += ele.totalPrice
    })

  useEffect(() => {
    getOrders()
    getUsersCount()
    getProductsCount()
  }, [])
  return (
    <>
      <Header />
      {!orders || !usersCount || !productsCount ? (
        <Loader />
      ) : (
        <div className="dashboard-container">
          <DashboardNavbar />
          <div className="dashboard-body-container">
            <h2>Dashboard</h2>
            <hr />
            <div className="dashboard-amount bg-primary text-light" style={{ textAlign: "center" }}>
              Total Amount <br /> ₹ {totalAmount}
            </div>
            <div className="dashboard-summary">
              <div className="dashboard-summary-div text-light" style={{ backgroundColor: "#5cb85c" }}>
                <span style={{ textAlign: "center" }}>
                  Products <br /> {productsCount}
                </span>
                <br />
              </div>
              <div className="dashboard-summary-div text-light" style={{ backgroundColor: "#f0ad4e" }}>
                <span style={{ textAlign: "center" }}>
                  Orders
                  <br /> {ordersCount}
                </span>
                <br />
              </div>
              <div className="dashboard-summary-div text-light" style={{ backgroundColor: "#d9534f" }}>
                <span style={{ textAlign: "center" }}>
                  Users
                  <br />
                  {usersCount}
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default Dashboard
