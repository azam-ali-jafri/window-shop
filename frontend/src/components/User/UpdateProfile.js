import React, { useState } from "react"
import "../../stylesheets/Modal.css"
import "../../stylesheets/UpdateProfile.css"
import { useSelector } from "react-redux"
import { useAlert } from "react-alert"
import Loader from "../Loader/Loader"
import axios from "axios"

function UpdateProfile({ toggleProfileModal, profileModal }) {
  const alert = useAlert()

  const { user } = useSelector(state => state.user)

  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url)
  const [name, setName] = useState(user.name)
  const [loading, setLoading] = useState(false)

  const avatarChange = e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const updateSubmitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    await axios
      .put("/api/v1/me/update", { name, avatar })
      .then(res => {
        toggleProfileModal()
        alert.success("profile updated, refresh to see changes")
        setLoading(false)
      })
      .catch(error => {
        alert.error(error.response.data.message)
        setLoading(false)
      })
  }

  return (
    <div>
      <div className={`modal ${profileModal ? "show" : "hidden"}`} tabindex="2" style={{ zIndex: "3" }}>
        <div
          class="modal-dialog"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh"
          }}
        >
          <div class="modal-content modal-container">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div class="modal-header">
                  <h5 class="modal-title">Update Profile</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggleProfileModal}></button>
                </div>
                <div class="modal-body" style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <label
                      htmlFor="avatar-input"
                      style={{
                        textAlign: "center",
                        display: "inline",
                        marginLeft: "40%"
                      }}
                    >
                      <img src={avatarPreview} alt="avatar-preview" className="modal-avatar-preview" />
                    </label>

                    <input type="file" id="avatar-input" onChange={avatarChange} style={{ display: "none" }} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2rem"
                    }}
                  >
                    <span style={{ fontWeight: "500", marginRight: "1rem" }}>Name: </span>
                    <input
                      type="text"
                      value={name}
                      className="form-control update-name-input"
                      onChange={e => setName(e.target.value)}
                      required
                      style={{ marginBottom: "0" }}
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={toggleProfileModal}>
                    Close
                  </button>
                  <button type="button" class="btn btn-success" onClick={updateSubmitHandler} disabled={loading ? true : false}>
                    Update
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
