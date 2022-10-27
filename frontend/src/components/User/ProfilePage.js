import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "../Loader/Loader"
import ChangePassword from "./ChangePassword"
import "../../stylesheets/ProfilePage.css"
import UpdateProfile from "./UpdateProfile.js"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"

function ProfilePage() {
  const navigate = useNavigate()

  const { user } = useSelector(state => state.user)

  const [profileModal, setProfileModal] = useState(false)
  const toggleProfileModal = () => {
    setProfileModal(prev => !prev)
  }
  const [passwordModal, setPasswordModal] = useState(false)
  const togglePasswordModal = () => {
    setPasswordModal(prev => !prev)
  }

  return (
    <>
      <Header />
      {!user ? (
        <Loader />
      ) : (
        <div>
          <ChangePassword togglePasswordModal={togglePasswordModal} passwordModal={passwordModal} />
          <UpdateProfile toggleProfileModal={toggleProfileModal} profileModal={profileModal} />
          <div class="profile-box">
            <div class="row g-0">
              <div
                class="col-md-4"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <img src={user.avatar.url} class="img-fluid rounded-start" alt="..." />
                <button type="button" class="btn btn-warning update-profile-button" onClick={toggleProfileModal}>
                  Update Profile
                </button>
              </div>
              <div class="col-md-8">
                <div class="card-body profile-card-body">
                  <h5 class="card-title username">{user.name}</h5>
                  <div className="user-detail">
                    <span>Email: </span>
                    <span>{user.email}</span>
                  </div>
                  <div className="user-detail">
                    <span>Joined At: </span>
                    <span>{user.createdAt.substring(0, 10)}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }} className="profile-buttons">
                    <button type="button" class="btn btn-info" onClick={() => navigate("/me/orders")}>
                      Show orders
                    </button>
                    <button type="button" class="btn btn-danger" onClick={togglePasswordModal}>
                      Change password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default ProfilePage
