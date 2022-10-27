import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardProductCard from "./DashboardProductCard"
import Pagination from "react-js-pagination"
import "../../stylesheets/DashboardProducts.css"
import Loader from "../Loader/Loader"
import DashboardNavbar from "./DashboardNavbar"
import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import axios from "axios"

function DashboardProducts() {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState(null)
  const [productsCount, setProductsCount] = useState(null)

  const getProducts = async () => {
    await axios.get(`/api/v1/products?page=${currentPage}`).then(res => {
      setProductsCount(res.data.productsCount)
      setProducts(res.data.products)
    })
  }

  useEffect(() => {
    getProducts()
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <>
      <Header />
      <div className="dashboardProducts-container">
        <DashboardNavbar />
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/dashboard/product/new")}>
          Add New Product
        </button>
        {!products ? (
          <Loader />
        ) : (
          <>
            {products.map(ele => (
              <DashboardProductCard product={ele} getProducts={getProducts} />
            ))}
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={8}
              totalItemsCount={productsCount}
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
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default DashboardProducts
