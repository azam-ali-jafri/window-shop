import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAlert } from "react-alert"
import "../../stylesheets/ProductDetail.css"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "../Loader/Loader"
import { Rating } from "react-simple-star-rating"
import SuggestedProductCard from "./SuggestedProductCard"
import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import axios from "axios"

function ProductDetail() {
  var windowWidth = window.innerWidth

  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth
  })

  const navigate = useNavigate()
  const { id } = useParams() // accessing the product id from the url

  const alert = useAlert()

  const [starRating, setStarRating] = useState(100) // rating component rating
  const [rating, setRating] = useState(5) // actual rating data
  const [quantity, setQuantity] = useState(1)
  const [comment, setComment] = useState("")
  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState(null)

  const getProductDetails = async () => {
    await axios
      .get(`/api/v1/product/${id}`)
      .then(res => {
        setProduct(res.data.product)
      })
      .catch(error => {
        alert.error(error.response.data.message)
      })
  }

  const getSimilarProducts = async () => {
    await axios
      .get(`/api/v1/products?category=${product.category}`)
      .then(res => {
        setSimilarProducts(res.data.products)
      })
      .catch(error => {
        alert.error(error.response.data.message)
      })
  }

  const { user } = useSelector(state => state.user)

  const handleReviewSubmit = async e => {
    e.preventDefault()
    await axios
      .post(`/api/v1/product/${product._id}/review`, { comment, rating })
      .then(res => {
        alert.success("Review added")
        getProductDetails()
      })
      .catch(error => {
        alert.error(error.response.data.message)
      })
    setComment("")
    setStarRating(100)
  }

  const addToCartHandler = async e => {
    await axios
      .post("/api/v1/cart", { product, quantity })
      .then(res => {
        alert.success("Item added to cart")
      })
      .catch(error => {
        alert.error(error.response.data.message)
      })
  }

  useEffect(() => {
    if (!product) getProductDetails()
    if (product) getSimilarProducts()
    window.scrollTo(0, 0)
  }, [product])

  return (
    <>
      <Header />
      {!product || !similarProducts ? (
        <Loader />
      ) : (
        <div className="detail-whole-container">
          <div className="detail-product-container">
            <div className="detail-left-container">
              {product.images && (
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={product.images[0].url} className="d-block w-100" alt="img" />
                    </div>
                    {product.images.map((item, i) => {
                      if (i > 0) {
                        return (
                          <div className="carousel-item">
                            <img src={product.images[i].url} className="d-block w-100" alt="img" />
                          </div>
                        )
                      } else return null
                    })}
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              )}
            </div>
            <div className="detail-right-container">
              <span className="detail-title">{product.name}</span>
              <div className="detail-subDetail">
                <span className="detail-rating">
                  <Rating
                    onClick={rate => {
                      setStarRating(rate)
                      setRating(starRating / 10)
                    }}
                    initialValue={Math.round(product.ratings)}
                    style={{ margin: "0.5rem 0rem" }}
                    size={windowWidth < 426 ? "1.2rem" : "1.5rem"}
                    readonly={true}
                    fillColor={"#FF884B"}
                  />
                </span>
                <span
                  style={{
                    color: "#FF884B",
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginLeft: "10px"
                  }}
                >
                  {Math.round(product.ratings)}
                </span>
                <span style={{ color: "rgba(0, 0, 0, 0.3)", margin: "0rem 1rem" }}>●</span>
                {product.stock > 0 ? <span style={{ color: "green" }}>In stock</span> : <span style={{ color: "red" }}>Out of stock</span>}
              </div>
              <span className="detail-price">₹{product.price}</span>
              {product && product.stock > 0 && (
                <div className="detail-addToCart">
                  {user && (
                    <div className="addToCart-quantity">
                      <button
                        onClick={() => {
                          if (quantity - 1 <= 0) return
                          setQuantity(quantity - 1)
                        }}
                      >
                        -
                      </button>
                      <input type="number" value={quantity} disabled />
                      <button
                        onClick={() => {
                          if (quantity + 1 > product.stock) return alert.info("Reached stock limit")
                          setQuantity(quantity + 1)
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <br />
                  {product.stock > 0 && (
                    <>
                      {user ? (
                        <button className="btn btn-primary addToCart-btn" onClick={addToCartHandler}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={windowWidth < 426 ? "13" : "16"}
                            height={windowWidth < 426 ? "13" : "16"}
                            fill="currentColor"
                            class="bi bi-basket-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z" />
                          </svg>
                          Add to cart
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            navigate("/login")
                          }}
                        >
                          Login to shop
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
              <div className="detail-description">
                <h3>Product Details</h3>
                <span>{product.description}</span>
              </div>
            </div>
          </div>
          <hr style={{ width: "100%", margin: "1rem 0rem" }} />
          {similarProducts.length > 0 && (
            <div className="suggested-products-container">
              <h2>Related Products</h2>
              <div className="suggested-products">
                {similarProducts.map(item => {
                  if (item._id !== product._id) return <SuggestedProductCard product={item} />
                  else return null
                })}
              </div>
            </div>
          )}
          <hr style={{ width: "100%", margin: "1rem 0rem" }} />
          <div className="detail-review-container">
            {user && (
              <div className="submit-review">
                <h1>Leave a review</h1>
                <form onSubmit={handleReviewSubmit}>
                  <Rating
                    initialValue={starRating}
                    style={{ margin: "0.5rem 0rem" }}
                    size={windowWidth < 426 ? "2rem" : "2.3rem"}
                    fillColor={"#FF884B"}
                    onClick={rate => {
                      setStarRating(rate)
                      setRating(rate / 20)
                    }}
                  />
                  <textarea
                    className="form-control"
                    rows={5}
                    cols={60}
                    value={comment}
                    onChange={e => {
                      setComment(e.target.value)
                    }}
                    required
                  />
                  <button className="btn btn-primary btn-lg">Submit</button>
                </form>
              </div>
            )}
            <div className="reviews-container">
              {product.reviews &&
                product.reviews.map(item => (
                  <div className="review-card">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {item.avatar && <img src={item.avatar} alt="profile-img" />}
                      <h5 style={{ fontSize: "1rem" }}>{item.name}</h5>
                    </div>
                    <Rating
                      initialValue={item.rating}
                      readonly={true}
                      style={{ margin: "0.5rem 0rem" }}
                      size={windowWidth < 800 ? "1.3rem" : "1.3rem"}
                      fillColor={"#FF884B"}
                    />
                    <span>{item.comment}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default ProductDetail
