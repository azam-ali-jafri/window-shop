import React, { useState } from "react"
import "../../stylesheets/ForgetPassword.css"
import { useAlert } from "react-alert"
import "../../stylesheets/ForgetPassword.css"
import axios from "axios"

function ForgetPassword() {
  const alert = useAlert()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await axios
      .post("/api/v1/password/forgot", { email })
      .then(res => {
        alert.success("Mail sent")
        setLoading(false)
      })
      .catch(error => {
        alert.error(error.response.data.message)
        setLoading(false)
      })
  }

  return (
    <div className="outerContainer">
      <h1>Forget Password</h1>
      <div className="forgetPassword-container card">
        <form onSubmit={handleSubmit}>
          <label className="form-label forgetPassword-label" htmlFor="email">
            Enter your email to recieve a password reset token
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="form-control"
            id="email"
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%" }} disabled={loading ? true : false}>
            Send mail
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
