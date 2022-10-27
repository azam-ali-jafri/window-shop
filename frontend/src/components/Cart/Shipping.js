import React, { useEffect, useState } from "react"
import { Country, State } from "country-state-city"
import { useSelector } from "react-redux"
import "../../stylesheets/Shipping.css"
import { useAlert } from "react-alert"
import CheckoutSteps from "./CheckoutSteps"
import { useNavigate } from "react-router-dom"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import Loader from "../Loader/Loader"
import axios from "axios"

function Shipping() {
  const navigate = useNavigate()
  const alert = useAlert()
  const { user } = useSelector(state => state.user)

  const [shipInfo, setShipInfo] = useState({
    address: null,
    city: null,
    pincode: null,
    phoneNo: null,
    country: null,
    state: null
  })

  const changeHandler = e => {
    setShipInfo(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (shipInfo.phoneNo.length < 10 || shipInfo.phoneNo.length > 10) {
      alert.error("phone number must be of 10 digits")
      return
    }
    await axios
      .put("/api/v1/update/shipinfo", { shipInfo })
      .then(res => {
        navigate("/order/confirm")
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (user) {
      setShipInfo({
        address: user.shipInfo.address,
        city: user.shipInfo.city,
        pincode: user.shipInfo.pincode,
        phoneNo: user.shipInfo.phoneNo,
        country: user.shipInfo.country,
        state: user.shipInfo.state
      })
    }
  }, [user])

  return (
    <>
      {!user ? (
        <Loader />
      ) : (
        <>
          <Header />
          <CheckoutSteps activeStep={0} />
          <div className="shippingInfo-container">
            <h1>Shipping Details</h1>
            <form onSubmit={handleSubmit}>
              <lable className="form-label" htmlFor="address">
                Address
              </lable>
              <input type="String" className="form-control" value={shipInfo.address} name="address" id="address" onChange={changeHandler} />
              <lable className="form-label" htmlFor="city">
                City
              </lable>
              <input type="String" className="form-control" value={shipInfo.city} name="city" id="city" onChange={changeHandler} />
              <lable className="form-label" htmlFor="pincode">
                Pincode
              </lable>
              <input type="Number" className="form-control" value={shipInfo.pincode} name="pincode" id="pincode" onChange={changeHandler} />
              <lable className="form-label" htmlFor="phoneNo">
                Phone No.
              </lable>
              <input type="Number" className="form-control" value={shipInfo.phoneNo} name="phoneNo" id="phoneNo" onChange={changeHandler} />
              <lable className="form-label" htmlFor="country">
                Country
              </lable>
              <select className="form-control" name="country" value={shipInfo.country} id="country" onChange={changeHandler} required>
                <option value="">None</option>
                {Country && Country.getAllCountries().map(item => <option value={item.isoCode}>{item.name}</option>)}
              </select>
              {shipInfo.country && (
                <>
                  <lable className="form-label" htmlFor="state">
                    State
                  </lable>
                  <select className="form-control" name="state" value={shipInfo.state} id="state" onChange={changeHandler} required>
                    <option value="">None</option>
                    {State.getStatesOfCountry(shipInfo.country).map(item => (
                      <option value={item.isoCode}>{item.name}</option>
                    ))}
                  </select>
                </>
              )}

              <button className="btn btn-success shipping-continue-btn">Continue</button>
            </form>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default Shipping
