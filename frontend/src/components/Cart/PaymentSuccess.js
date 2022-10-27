import React from "react"
import "../../stylesheets/PaymentSuccess.css"
import { useNavigate } from "react-router-dom"

function PaymentSuccess() {
  const navigate = useNavigate()

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="card paymentSuccess-container">
        <h1>
          Order has been placed successfully{" "}
          <span role="img" aria-label="">
            ✅
          </span>
        </h1>
        <button className="btn btn-primary paymentSuccess-btn" onClick={() => navigate("/me/orders", { replace: true })}>
          View orders
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccess
