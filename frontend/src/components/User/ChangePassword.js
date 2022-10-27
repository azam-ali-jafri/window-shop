import React, { useState } from "react"
import { useAlert } from "react-alert"
import Loader from "../Loader/Loader"
import "../../stylesheets/ChangePassword.css"
import "../../stylesheets/Modal.css"
import axios from "axios"

function ChangePassword({ togglePasswordModal, passwordModal }) {
  const alert = useAlert()

  const [loading, setLoading] = useState(false)

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleChange = e => {
    setPasswords(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await axios
      .put("/api/v1/password/update", {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword
      })
      .then(res => {
        togglePasswordModal()
        alert.info("password changed")
        setLoading(false)
      })
      .catch(error => {
        alert.error(error.response.data.message)
        setLoading(false)
      })
  }

  return (
    <div>
      <div className={`modal ${passwordModal ? "show" : "hidden"}`} tabindex="2" style={{ zIndex: "3" }}>
        <div
          class="modal-dialog"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh"
          }}
        >
          <div class="modal-content">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div class="modal-header">
                  <h5 class="modal-title">Change Password</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={togglePasswordModal}></button>
                </div>
                <div class="modal-body" style={{ display: "flex", flexDirection: "column" }}>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="oldPassword" className="form-label" style={{ marginTop: "0.7rem" }}>
                      Old password
                    </label>
                    <input
                      value={passwords.oldPassword}
                      onChange={handleChange}
                      name="oldPassword"
                      id="oldPassword"
                      className="form-control"
                      required
                      autoComplete="off"
                    />

                    <label htmlFor="newPassword" className="form-label" style={{ marginTop: "0.7rem" }}>
                      New password
                    </label>
                    <input
                      value={passwords.newPassword}
                      onChange={handleChange}
                      name="newPassword"
                      id="newPassword"
                      className="form-control"
                      required
                      autoComplete="off"
                    />

                    <label htmlFor="confirmPassword" className="form-label" style={{ marginTop: "0.7rem" }}>
                      Confirm password
                    </label>
                    <input
                      value={passwords.confirmPassword}
                      onChange={handleChange}
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-control"
                      required
                      autoComplete="off"
                    />
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={togglePasswordModal}>
                        Close
                      </button>
                      <button type="submit" class="btn btn-danger">
                        Change
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
