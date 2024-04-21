import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function UpdateInventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pid, setProductID] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [useQuantity, setUseQuantity] = useState("");
  const [date, setDate] = useState(""); // Add state for date
  const [totalUseQuantity, setTotalUseQuantity] = useState(0); // Add state for total use quantity

  useEffect(() => {
    const productData = location.state;
    if (productData) {
      setProductID(productData.pid);
      setName(productData.name);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setUseQuantity(productData.useQuantity);
      setTotalUseQuantity(productData.useQuantity); // Initialize total use quantity with current use quantity
      setDate(productData.date); // Set date from location state
    }
  }, [location.state]);

  // Function to calculate maximum allowed use quantity
  const getMaxAllowedUseQuantity = () => {
    return parseInt(quantity) - totalUseQuantity;
  };

  const updateProduct = (e) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      price,
      quantity,
      useQuantity: parseInt(useQuantity) + totalUseQuantity, // Add updated use quantity to total use quantity
      date // Include date in the updated product
    };

    axios
      .put(`/StudioInventory/update/${pid}`, updatedProduct)
      .then(() => {
        alert("Product Updated");
        navigate("/edit");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      <h1>Update Inventory</h1>
      <form onSubmit={updateProduct}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Inventory ID
          </label>
          <input
            type="text"
            className="form-control"
            id="pid"
            value={pid}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Inventory Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={quantity}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="useQuantity" className="form-label">
            Use Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="useQuantity"
            value={useQuantity}
            max={getMaxAllowedUseQuantity()} // Set maximum allowed use quantity
            onChange={(e) => setUseQuantity(e.target.value)}
            required
          />
          <small className="text-muted">
            Maximum allowed: {getMaxAllowedUseQuantity()}
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

