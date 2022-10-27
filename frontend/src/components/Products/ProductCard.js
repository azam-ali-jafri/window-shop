import React from "react"
import { useNavigate } from "react-router-dom"
import "../../stylesheets/ProductCard.css"
import { useSelector } from "react-redux"
import { useAlert } from "react-alert"
import axios from "axios"

function ProductCard({ product }) {
  var windowWidth = window.innerWidth

  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth
  })

  const navigate = useNavigate()
  const alert = useAlert()

  const { user } = useSelector(state => state.user)

  const addToCartHandler = async e => {
    if (!user) {
      alert.error("Login to access this feature")
      return navigate("/login")
    } else if (product.stock === 0) {
      alert.info("This product is currently out of stock")
    } else {
      await axios
        .post("/api/v1/cart", { product, quantity: 1 })
        .then(res => {
          alert.success("Item added to cart")
        })
        .catch(error => {
          alert.error(error.response.data.message)
        })
    }
  }

  return (
    <div className="card productCard-container">
      <div
        className="card-img-top productCard-img"
        onClick={() => {
          navigate(`/product/${product._id}`)
        }}
      >
        <img src={product.images[0].url} alt="img" />
      </div>
      <hr />
      <div className="card-body productCard-body">
        <div
          className="card-title productCard-name"
          onClick={() => {
            navigate(`/product/${product._id}`)
          }}
        >
          {product.name}
        </div>
        <div className="card-text productCard-price">₹{product.price}</div>
        <button className="btn btn-primary productCard-btn" onClick={addToCartHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={windowWidth > 426 ? 16 : 11}
            height={windowWidth > 426 ? 16 : 11}
            fill="currentColor"
            class="bi bi-bag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
