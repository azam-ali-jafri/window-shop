import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import "../../stylesheets/RegisterPage.css"
import axios from "axios"

function RegisterPage() {
  const alert = useAlert()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [avatar, setAvatar] = useState("https://res.cloudinary.com/dcvd0hhwh/image/upload/v1667142834/Image-asset/profile_f798y6.png")
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/dcvd0hhwh/image/upload/v1667142834/Image-asset/profile_f798y6.png"
  )
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: ""
  })

  const formChangeHandler = e => {
    if (e.target.name === "avatar") {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      setUserDetail(state => ({
        ...state,
        [e.target.name]: e.target.value
      }))
    }
  }

  const registerSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await axios
      .post("/api/v1/register", {
        name: userDetail.name,
        email: userDetail.email,
        password: userDetail.password,
        avatar
      })
      .then(res => {
        setLoading(false)
        alert.success("registered successfully")
        navigate("/", { replace: true })
        window.location.reload()
      })
      .catch(error => {
        alert.error(error.response.data.message)
        setLoading(false)
      })
  }

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={registerSubmit}>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-person-fill text-primary"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userDetail.name}
            onChange={formChangeHandler}
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            autoComplete="off"
            required
          />
        </div>
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
            placeholder="Email"
            value={userDetail.email}
            onChange={formChangeHandler}
            class="form-control"
            aria-label="Sizing example input"
            autoComplete="off"
            aria-describedby="inputGroup-sizing-default"
            required
          />
        </div>
        <div id="emailHelp" className="form-text" style={{ margin: "-20px 0px 15px" }}>
          <p>We'll never share your email with anyone else.</p>
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
            type="password"
            name="password"
            placeholder="Password"
            value={userDetail.password}
            onChange={formChangeHandler}
            class="form-control "
            aria-label="Sizing example input"
            autoComplete="off"
            aria-describedby="inputGroup-sizing-default"
            required
          />
        </div>
        <div class="input-group mb-3">
          <label class="form-label" for="inputGroupFile02" style={{ marginBottom: "0.6rem" }}>
            Profile picture
          </label>

          <input
            type="file"
            name="avatar"
            accept="image/*"
            class="form-control file-input"
            onChange={formChangeHandler}
            id="inputGroupFile02"
            style={{ width: "80%" }}
          />
          <img src={avatarPreview} className="avatar-preview" alt="img" />
        </div>
        <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: "1rem" }} disabled={loading ? true : false}>
          Register
        </button>
      </form>
      <div className="redirect-links">
        <p
          style={{ cursor: "pointer" }}
          onClick={e => {
            e.preventDefault()
            navigate("/login")
          }}
        >
          Already have an account?
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
