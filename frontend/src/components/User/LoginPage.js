import React, { useState } from "react"
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"
import "../../stylesheets/LoginPage.css"
import Loader from "../Loader/Loader"
import axios from "axios"

function LoginPage() {
  const navigate = useNavigate()
  const alert = useAlert()

  const [login, setLogin] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const loginUser = async () => {
    setLoading(true)
    await axios
      .post("/api/v1/login", { email: login.email, password: login.password })
      .then(res => {
        navigate("/", { replace: true })
        window.location.reload()
        alert.success("Logged in")
        setLoading(false)
      })
      .catch(error => {
        alert.error(error.response.data.message)
        setLoading(false)
      })
  }

  const loginSubmit = e => {
    e.preventDefault()
    loginUser()
  }

  const loginChangeHandler = e => {
    setLogin(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-page-container">
          <h1>Login</h1>
          <form onSubmit={loginSubmit}>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-envelope-fill text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
              </span>
              <input
                type="email"
                name="email"
                value={login.email}
                onChange={loginChangeHandler}
                class="form-control"
                placeholder="email"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                autoComplete="off"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-lock-fill text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
              </span>
              <input
                name="password"
                value={login.password}
                onChange={loginChangeHandler}
                placeholder="password"
                type="password"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: "1rem" }}>
              Sign In
            </button>
          </form>
          <div className="redirect-links">
            <p
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={e => {
                e.preventDefault()
                navigate("/register")
              }}
            >
              Don't have an account?
            </p>
            <p
              style={{ cursor: "pointer" }}
              onClick={e => {
                e.preventDefault()
                navigate("/password/forget")
              }}
            >
              Forgot password?
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage
