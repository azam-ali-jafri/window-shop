import React from "react"
import "../../stylesheets/CartItem.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function CartItem({ item, setCartItems }) {
  const navigate = useNavigate()

  const removeItemHandler = async () => {
    await axios
      .post("/api/v1/cart/delete", { product: item.product })
      .then(res => {
        setCartItems(res.data.cart)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="cartItem-container">
      <div
        className="cartItem-name-img"
        onClick={() => {
          navigate(`/product/${item.product._id}`)
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="cartItem-img">
          <img src={item.product.images[0].url} alt="img" />
        </div>
        <div className="cartItem-name">
          <span>{item.product.name}</span>
        </div>
      </div>
      <div className="cartItem-subContainer">
        <div className="cartItem-quantity-price">
          <div className="cartItem-quantity">{item.quantity}</div>
          <div className="cartItem-price">
            <div>
              <h6>₹{item.product.price * item.quantity}</h6>
              <span>{`₹${item.product.price} / per item`}</span>
            </div>
          </div>
        </div>

        <div className="cartItem-remove">
          <button className="btn btn-danger" onClick={removeItemHandler}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
