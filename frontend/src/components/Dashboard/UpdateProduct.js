import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loader from "../Loader/Loader"
import { useAlert } from "react-alert"
import axios from "axios"

function EditProduct() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [category, setCategory] = useState("None")
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [newImages, setNewImages] = useState([])

  const categories = ["Smartphone", "Laptop", "Camera", "Headphone", "Accessories", "Watch", "Men Clothing"]

  const alert = useAlert()
  const navigate = useNavigate()
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState(null)

  const handleFileChange = e => {
    const files = Array.from(e.target.files)

    setNewImages([])
    setImages([])
    setImagesPreview([])

    files.forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(old => [...old, reader.result])
          setNewImages(old => [...old, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  useEffect(() => {
    getProductDetail()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("stock", stock)
    formData.append("category", category)
    if (newImages.length === 0) {
      formData.append("images", JSON.stringify(images))
    } else {
      newImages.forEach(image => {
        formData.append("images", image)
      })
    }
    setLoading(true)
    await axios
      .put(`/api/v1/product/${id}`, formData)
      .then(res => {
        setLoading(false)
        navigate(`/product/${id}`, { replace: true })
        alert.success("Product updated successfully")
      })
      .catch(error => {
        setLoading(false)
        alert.error(error.data.response.message)
      })
  }

  const getProductDetail = async () => {
    await axios.get(`/api/v1/product/${id}`).then(res => {
      setProduct(res.data.product)
      setName(res.data.product.name)
      setDescription(res.data.product.description)
      setPrice(res.data.product.price)
      setStock(res.data.product.stock)
      setImages(res.data.product.images)
      setCategory(res.data.product.category)
    })
  }

  return (
    <>
      {!product ? (
        <Loader />
      ) : (
        <div className="createProduct-container">
          <div className="createProduct-h1">
            <h1>Update Product</h1>
          </div>
          <form className="createProduct-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              id="name"
              autoComplete="off"
              onChange={e => {
                setName(e.target.value)
              }}
              required
            />
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={price}
              className="form-control"
              id="price"
              onChange={e => {
                setPrice(e.target.value)
              }}
              required
            />
            <label htmlFor="stock" className="form-label">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={stock}
              className="form-control"
              id="stock"
              onChange={e => {
                setStock(e.target.value)
              }}
              required
            />
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              rows={5}
              cols={50}
              className="form-control"
              name="description"
              value={description}
              onChange={e => {
                setDescription(e.target.value)
              }}
              required
            />
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              name="category"
              value={category}
              onChange={e => {
                setCategory(e.target.value)
              }}
              required
              id="category"
            >
              <option value="None">None</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label class="form-label" for="inputGroupFile02" style={{ marginBottom: "0.6rem" }}>
              Photographs
            </label>
            <input
              name="images"
              type="file"
              id="inputGroupFile02"
              multiple
              accept="image/*"
              class="form-control file-input"
              onChange={handleFileChange}
            />
            <div className="createProduct-photos">{product.images === images && images.map(file => <img src={file.url} alt="img" />)}</div>
            <div className="createProduct-photos">{imagesPreview && imagesPreview.map(file => <img src={file} alt="img" />)}</div>
            <div style={{ display: "flex" }}>
              <button
                type="submit"
                className="btn btn-success"
                style={{ backgroundColor: "#1dab1d", borderColor: "#1dab1d" }}
                disabled={loading ? true : false}
              >
                Update
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/dashboard/products", { replace: true })
                }}
              >
                Go back
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default EditProduct
