import React from "react"
import "./stylesheets/App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import ProductDetail from "./components/Products/ProductDetail"
import ProductSearch from "./components/Products/ProductSearch"
import LoginPage from "./components/User/LoginPage"
import RegisterPage from "./components/User/RegisterPage"
import store from "./store"
import { loadUser } from "./actions/userActions"
import ProfilePage from "./components/User/ProfilePage"
import ForgetPassword from "./components/User/ForgetPassword"
import PasswordReset from "./components/User/PasswordReset"
import Cart from "./components/Cart/Cart"
import Cookie from "js-cookie"
import Shipping from "./components/Cart/Shipping"
import ConfirmOrder from "./components/Cart/ConfirmOrder"
import { useEffect, useState } from "react"
import axios from "axios"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Payment from "./components/Cart/Payment"
import PaymentSuccess from "./components/Cart/PaymentSuccess"
import Orders from "./components/User/Orders"
import OrderDetail from "./components/User/OrderDetail"
import Dashboard from "./components//Dashboard/Dashboard"
import DashboardProducts from "./components/Dashboard/DashboardProducts"
import CreateProduct from "./components/Dashboard/CreateProduct"
import UpdateProduct from "./components/Dashboard/UpdateProduct"
import DashboardUsers from "./components/Dashboard/DashboardUsers"
import Protected from "./components/Route/Protected"
import NotFound from "./components/NotFound/NotFound"
import OnboardProtected from "./components/Route/OnboardProtected"

function App() {
  if (Cookie.get("token")) {
    store.dispatch(loadUser())
  }

  const [stripeApiKey, setStripeApiKey] = useState("")
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/payment/getApiKey")
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    getStripeApiKey()
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products" element={<ProductSearch />} />
          <Route
            path="/profile"
            element={
              <Protected>
                <ProfilePage />
              </Protected>
            }
          />
          <Route
            path="/cart"
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          />
          <Route
            path="/shipping"
            element={
              <Protected>
                <Shipping />
              </Protected>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <Protected>
                <ConfirmOrder />
              </Protected>
            }
          />

          <Route
            path="/process/payment"
            element={
              <>
                {stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                )}
              </>
            }
          />
          <Route
            path="/me/orders"
            element={
              <Protected>
                <Orders />
              </Protected>
            }
          />
          <Route
            path="/me/order/:orderId"
            element={
              <Protected>
                <OrderDetail />
              </Protected>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Protected isAdmin={true}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/dashboard/products"
            element={
              <Protected isAdmin={true}>
                <DashboardProducts />
              </Protected>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <Protected isAdmin={true}>
                <DashboardUsers />
              </Protected>
            }
          />
          <Route
            path="/dashboard/product/new"
            element={
              <Protected isAdmin={true}>
                <CreateProduct />
              </Protected>
            }
          />
          <Route
            path="/dashboard/product/update/:id"
            element={
              <Protected isAdmin={true}>
                <UpdateProduct />
              </Protected>
            }
          />
          <Route
            path="/payment/success"
            element={
              <Protected>
                <PaymentSuccess />
              </Protected>
            }
          />
          <Route
            path="/login"
            element={
              <OnboardProtected>
                <LoginPage />
              </OnboardProtected>
            }
          />
          <Route
            path="/register"
            element={
              <OnboardProtected>
                <RegisterPage />
              </OnboardProtected>
            }
          />
          <Route
            path="/password/forget"
            element={
              <OnboardProtected>
                <ForgetPassword />
              </OnboardProtected>
            }
          />
          <Route
            path="/password/reset/:token"
            element={
              <OnboardProtected>
                <PasswordReset />
              </OnboardProtected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
