import axios from "axios"
import React from "react"
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"
import "../../stylesheets/DashboardProductCard.css"

function DashboardProductCard({ product, getProducts }) {
  const alert = useAlert()
  const navigate = useNavigate()

  const handleDelete = async e => {
    await axios
      .delete(`/api/v1/product/${product._id}`)
      .then(res => {
        getProducts()
        alert.info("Product Deleted")
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="dashboardProduct-card card">
      <div className="dashboardProduct-img-name" onClick={() => navigate(`/product/${product._id}`)}>
        <div className="dashboardProduct-img">
          <img src={product.images[0].url} alt="img" />
        </div>
        <div className="dashboardProduct-name">{product.name}</div>
      </div>
      <div className="dashboardProduct-actions">
        <button
          className="btn btn-success"
          onClick={() => {
            navigate(`/dashboard/product/update/${product._id}`)
          }}
        >
          Update
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default DashboardProductCard
