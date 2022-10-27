import React, { useState } from "react"
import "../../stylesheets/PasswordReset.css"
import { useAlert } from "react-alert"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

function PasswordReset() {
  const navigate = useNavigate()
  const alert = useAlert()
  const { token } = useParams()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await axios
      .put(`/api/v1/password/reset/${token}`, { password: newPassword, confirmPassword })
      .then(res => {
        setLoading(false)
        alert.success("password reset successful")
        navigate("/login")
      })
      .catch(error => {
        console.log(error)
        alert.error(error.response.data.message)
        setLoading(false)
      })
  }

  return (
    <div className="container outerContainer">
      <span style={{ fontWeight: "500", fontSize: "2rem", marginBottom: "1rem" }}>Reset Password</span>

      <div className="resetPassword-container card">
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="password">
            New Password
          </label>
          <input
            type="text"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
            className="form-control"
            id="password"
            autoComplete="off"
          />
          <label className="form-label" htmlFor="confirmPassword" style={{ marginTop: "1rem" }}>
            Confirm Password
          </label>
          <input
            type="text"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="form-control"
            id="confirmPassword"
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem", width: "100%" }} disabled={loading ? true : false}>
            Change password
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordReset
