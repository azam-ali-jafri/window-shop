import React, { useEffect, useState } from "react"
import "../../stylesheets/DashboardUsers.css"
import DashboardNavbar from "./DashboardNavbar"
import Loader from "../Loader/Loader"
import UsersListItemCard from "./UsersListItemCard"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import axios from "axios"

function DashboardUsers() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsersList()
  }, [])

  const getUsersList = async () => {
    await axios
      .get("/api/v1/users")
      .then(res => {
        setUsers(res.data.users)
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Header />
      {!users ? (
        <Loader />
      ) : (
        <div className="dashboardUsers-container">
          <DashboardNavbar />
          <div className="usersList">
            <div className="usersList-attributes">
              <span className="usersList-name">Name</span>
              <span className="usersList-email">Email</span>
              <span className="usersList-actions">Role</span>
            </div>
            <hr style={{ marginBottom: "1rem" }} />
            {users &&
              users.map(user => {
                return <UsersListItemCard user={user} getUsersList={getUsersList} />
              })}
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default DashboardUsers
