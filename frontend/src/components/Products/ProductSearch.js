import React, { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import Loader from "../Loader/Loader"
import Pagination from "react-js-pagination"
import "../../stylesheets/ProductSearch.css"
import Slider from "@mui/material/Slider"
import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import axios from "axios"

function ProductSearch() {
  const [products, setProducts] = useState(null)
  const [productsCount, setProductsCount] = useState(null)
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    setLoading(true)
    await axios
      .get(`/api/v1/products?keyword=${keyword}&page=${currentPage}&gtPrice=${price[0]}&ltPrice=${price[1]}&category=${category}`)
      .then(res => {
        setProducts(res.data.products)
        setProductsCount(res.data.productsCount)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  const categories = ["Smartphone", "Laptop", "Camera", "Headphone", "Accessories", "Watch", "Men Clothing"]

  const [sliderValue, setSliderValue] = React.useState([0, 100000])

  const priceFilterChange = (event, newValue) => {
    setSliderValue(newValue)
    console.log(newValue)
  }

  const handlePriceSubmit = () => {
    setPrice(sliderValue)
  }

  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 100000])
  const [category, setCategory] = useState("")

  const searchBarSubmit = e => {
    e.preventDefault()
    setKeyword(keyword.trim())
    getProducts()
  }

  useEffect(() => {
    getProducts()
    window.scrollTo(0, 0)
  }, [price, category, currentPage])

  return (
    <>
      <Header />
      <div className="searchPage-container">
        <form
          onSubmit={searchBarSubmit}
          style={{
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <input
            placeholder="search items . . ."
            className="search-bar form-control"
            type="text"
            value={keyword}
            onChange={e => {
              setKeyword(e.target.value)
            }}
          />
          <button class="btn btn-primary search-btn" type="submit" style={{ marginLeft: "1rem" }}>
            Search
          </button>
        </form>
        {!products ? (
          <Loader />
        ) : (
          <div className="searchPage-mid-container">
            <div className="searchPage-mid-left">
              <p>
                <button
                  class="btn btn-primary btn-lg show-filter-btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Show Filters
                </button>
              </p>
              <div class="collapse" id="collapseExample">
                <div class="card card-body collapse-container">
                  <p>
                    <button
                      class="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample1"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Categories
                    </button>
                  </p>
                  <div class="collapse" id="collapseExample1">
                    <div className="categories-container">
                      <ul class="list-group">
                        <li value="" onClick={() => setCategory("")} className="list-group-item">
                          None
                        </li>
                        {categories.map(category => (
                          <li className="list-group-item" key={category} onClick={() => setCategory(category)}>
                            {category}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card card-body collapse-container">
                  <p>
                    <button
                      class="btn btn-primary"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample2"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      size="large"
                    >
                      Price Filter
                    </button>
                  </p>
                  <div class="collapse" id="collapseExample2">
                    <div class="card card-body price-filter">
                      <Slider
                        value={sliderValue}
                        onChange={priceFilterChange}
                        valueLabelDisplay="auto"
                        className="text-primary price-slider"
                        min={0}
                        max={100000}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <label className="form-label" htmlFor="min-price">
                            Min Price (₹)
                          </label>
                          <input className="form-control" id="min-price" value={sliderValue[0]} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <label className="form-label" htmlFor="max-price">
                            Max Price (₹)
                          </label>
                          <input className="form-control" id="max-price" value={sliderValue[1]} />
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={handlePriceSubmit} style={{ width: "100%" }}>
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className="searchPage-mid-right">
                {products.length > 0 ? (
                  <>{products && products.map(item => <ProductCard product={item} />)}</>
                ) : (
                  <h1 style={{ padding: "25%", height: "70vh" }}>No products</h1>
                )}
              </div>
            )}
          </div>
        )}
        {products && products.length > 0 && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={8}
            totalItemsCount={keyword || category ? products.length : productsCount}
            onChange={e => {
              setCurrentPage(e)
            }}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="pageItem"
            linkClass="pageLink"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </div>
      <Footer />
    </>
  )
}

export default ProductSearch
