import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OnboardProtected({ children }) {
  const { user, userLoading } = useSelector(state => state.user)

  if (!userLoading) {
    if (user) {
      return <Navigate replace to="/" />
    }
  }

  return children
}

export default OnboardProtected
