import React from "react"
import { useAlert } from "react-alert"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../../stylesheets/Header.css"
import axios from "axios"

function Header() {
  const navigate = useNavigate()
  const alert = useAlert()
  const { user } = useSelector(state => state.user)

  const logout = async e => {
    e.preventDefault()
    await axios
      .get("/api/v1/logout")
      .then(res => {
        navigate("/")
        alert.info("logged out")
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <img
            src="https://res.cloudinary.com/dcvd0hhwh/image/upload/v1667142846/Image-asset/Logo_ed4ngk.png"
            class="navbar-brand"
            alt="img"
          />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/">
                  <button className="nav-item-button btn btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-house"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                      />
                    </svg>
                    Home
                  </button>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/products">
                  <button className="nav-item-button btn btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-shop"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                    </svg>
                    Shop
                  </button>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href=""
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <button className="nav-item-button btn btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    User
                  </button>
                </a>
                <ul class="dropdown-menu">
                  {user && (
                    <>
                      <li>
                        <a class="dropdown-item" href="/profile">
                          Profile
                        </a>
                      </li>
                      {user && user.role === "admin" && (
                        <li>
                          <a class="dropdown-item" href="/dashboard">
                            Dashboard
                          </a>
                        </li>
                      )}
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                    </>
                  )}
                  <li>
                    {user ? (
                      <a class="dropdown-item" href="" onClick={logout}>
                        Logout
                      </a>
                    ) : (
                      <a class="dropdown-item" href="/login">
                        Login
                      </a>
                    )}
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/cart">
                  <button className="nav-item-button btn btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    Cart
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr style={{ margin: "0px" }} />
    </>
  )
}

export default Header
