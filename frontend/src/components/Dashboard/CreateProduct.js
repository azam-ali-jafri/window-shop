import React, { useState } from "react"
import "../../stylesheets/CreateProduct.css"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"

import axios from "axios"

function CreateProduct() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [category, setCategory] = useState("None")
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [loading, setLoading] = useState(false)

  const categories = ["Smartphone", "Laptop", "Camera", "Headphone", "Accessories", "Watch", "Men Clothing"]

  const alert = useAlert()
  const navigate = useNavigate()

  const handleFileChange = e => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])

    files.forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(old => [...old, reader.result])
          setImages(old => [...old, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("stock", stock)
    formData.append("category", category)
    images.forEach(image => {
      formData.append("images", image)
    })

    await axios
      .post("/api/v1/product/new", formData)
      .then(res => {
        setLoading(false)
        navigate("/dashboard/products", { replace: true })
        alert.success("product successfully created")
      })
      .catch(error => {
        setLoading(false)
        alert.error(error.response.data.message)
      })
  }

  return (
    <div className="createProduct-container">
      <div className="createProduct-h1">
        <h1>Create Product</h1>
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
          required
        />
        <div className="createProduct-photos">{imagesPreview && imagesPreview.map(file => <img src={file} alt="img" />)}</div>
        <div style={{ display: "flex" }}>
          <button
            type="submit"
            className="btn btn-success"
            style={{ backgroundColor: "#1dab1d", borderColor: "#1dab1d" }}
            disabled={loading ? true : false}
          >
            Create
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
  )
}

export default CreateProduct
