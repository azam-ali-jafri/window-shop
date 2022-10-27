import axios from "axios"
import React, { useState } from "react"
import { useAlert } from "react-alert"

function UsersListItemCard({ user, getUsersList }) {
  const alert = useAlert()
  const [role, setRole] = useState(user.role)

  const handleRoleChange = async e => {
    if (user.role === "admin") {
      return alert.error("you cannot change admin's role")
    }
    await axios
      .put(`/api/v1/user/${user._id}`, { role })
      .then(res => {
        getUsersList()
        alert.info(`${user.name} role has been updated`)
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <div className="usersList-item">
        <span className="usersList-name">{user.name}</span>
        <span className="usersList-email">{user.email}</span>
        <div className="usersList-actions">
          <select
            value={role}
            onChange={e => {
              setRole(e.target.value)
            }}
          >
            <option value={user.role}>{user.role}</option>
            {user.role === "user" ? <option value="admin">admin</option> : <option value="user">user</option>}
          </select>
          {role !== user.role && (
            <button className="btn btn-danger" onClick={handleRoleChange}>
              Update
            </button>
          )}
        </div>
      </div>
      <hr />
    </div>
  )
}

export default UsersListItemCard
