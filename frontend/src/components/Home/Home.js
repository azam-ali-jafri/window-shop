import React, { useState } from "react"
import ProductCard from "../Products/ProductCard"
import { useEffect } from "react"
import Loader from "../Loader/Loader"
import "../../stylesheets/Home.css"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import axios from "axios"

function Home() {
  var windowWidth = window.innerWidth

  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth
  })

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    await axios
      .get("/api/v1/products")
      .then(res => {
        setProducts(res.data.products)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <Header />
      {!products ? (
        <Loader />
      ) : (
        <div className="home-container">
          <div className="home-banner-container bg-primary">
            <div className="home-banner">
              <h1>Best Products & brands in our store</h1>
              <span>Trendy Products, Factory Prices, Excellent Service</span>
              <div className="banner-buttons">
                <a href="/products">
                  <button className="btn btn-dark btn-lg">Shop Now</button>
                </a>
                <button className="btn btn-light btn-lg">Learn More</button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2
              style={{
                fontWeight: "500",
                fontSize: "2rem",
                alignSelf: "center",
                paddingTop: "2rem"
              }}
            >
              New Products
            </h2>
            <hr style={{ width: "18rem", alignSelf: "center" }} />
            <div className="home-product-cards-container">{products && products.map(product => <ProductCard product={product} />)}</div>
          </div>
          <div className="home-features-container bg-primary">
            <h1>Why choose us?</h1>
            <div className="home-features">
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={windowWidth > 426 ? "80" : "40"}
                  height={windowWidth > 426 ? "80" : "40"}
                  fill="currentColor"
                  class="bi bi-cash"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                </svg>
                <div>
                  <h2>Reasonable prices</h2>
                  <span>Don’t wait. The time will never be just right.</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={windowWidth > 426 ? "80" : "40"}
                  height={windowWidth > 426 ? "80" : "40"}
                  fill="currentColor"
                  class="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <div>
                  <h2>Best quality</h2>
                  <span>Good quality you accomplish, so clients don’t take off.</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={windowWidth > 426 ? "80" : "40"}
                  height={windowWidth > 426 ? "80" : "40"}
                  fill="currentColor"
                  class="bi bi-airplane-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
                </svg>
                <div>
                  <h2>Worldwide shipping</h2> <span>Shipping to your destination.</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={windowWidth > 426 ? "80" : "40"}
                  height={windowWidth > 426 ? "80" : "40"}
                  fill="currentColor"
                  class="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                  />
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
                <div>
                  <h2>Customer satisfaction</h2>
                  <span>We believe in satisfaction, not apology.</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={windowWidth > 426 ? "80" : "40"}
                  height={windowWidth > 426 ? "80" : "40"}
                  fill="currentColor"
                  class="bi bi-hand-thumbs-up-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                </svg>
                <div>
                  <h2>Happy customers</h2>
                  <span>We have Power that Brings a Smile to your Fact.</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={windowWidth > 426 ? "80" : "40"}
                  height={windowWidth > 426 ? "80" : "40"}
                  fill="currentColor"
                  class="bi bi-box2-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6l.5.667Z" />
                </svg>
                <div>
                  <h2>Thousand items</h2> <span> The pleasure of variety on your plate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default Home
