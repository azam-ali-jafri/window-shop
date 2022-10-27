import React from "react"
import "../../stylesheets/SuggestedProductCard.css"

function SuggestedProductCard({ product }) {
  return (
    <div className="card suggestedProductCard-container">
      <div className="card-img-top suggestedProductCard-img">
        <a href={`/product/${product._id}`} target="_blank" rel="noopener noreferrer">
          <img src={product.images[0].url} alt="img" />
        </a>
      </div>
      <hr />
      <div className="card-body suggestedProductCard-body">
        <div className="card-title suggestedProductCard-name">{product.name}</div>
        <div className="card-text suggestedProductCard-price">₹{product.price}</div>
      </div>
    </div>
  )
}

export default SuggestedProductCard
