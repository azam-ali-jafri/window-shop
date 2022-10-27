import React from "react"
import { useAlert } from "react-alert"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ isAdmin, children }) {
  const { user, userLoading } = useSelector(state => state.user)

  const alert = useAlert()

  if (!userLoading) {
    if (!user) {
      alert.error("Login to access this page")
      return <Navigate replace to="/login" />
    }
    if (isAdmin && user.role !== "admin") {
      alert.error("Only admin can access this page")
      return <Navigate replace to="/" />
    }
  }

  return children
}

export default PrivateRoute
