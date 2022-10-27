import React from "react"
import { useNavigate } from "react-router-dom"
import "../../stylesheets/NotFound.css"

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="notfound-container">
      <h1>Page you're looking for does not exist.</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/", { replace: true })
        }}
      >
        Go to home page
      </button>
    </div>
  )
}

export default NotFound
