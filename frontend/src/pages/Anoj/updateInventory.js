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
  const [date, setDate] = useState("");
  const [totalUseQuantity, setTotalUseQuantity] = useState(0);

  useEffect(() => {
    const productData = location.state;
    if (productData) {
      setProductID(productData.pid);
      setName(productData.name);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setUseQuantity(productData.useQuantity);
      setDate(productData.date);
      setTotalUseQuantity(productData.useQuantity || 0);
    }
  }, [location.state]);
  

  const getMaxAllowedUseQuantity = () => {
    return parseInt(quantity) - totalUseQuantity;
  };

  const updateProduct = (e) => {
    e.preventDefault();
    const maxAllowedUseQuantity = parseInt(quantity) - totalUseQuantity;
    const updatedUseQuantity = parseInt(useQuantity) + totalUseQuantity;
    if (updatedUseQuantity > parseInt(quantity)) {
      alert("Use Quantity cannot exceed available Quantity");
      return;
    }
    const updatedProduct = {
      name,
      price,
      quantity,
      useQuantity: updatedUseQuantity,
      date,
    };
    axios
      .put(`/StudioInventory/update/${pid}`, updatedProduct)
      .then(() => {
        alert("Product Updated");
        navigate("/inventoryDashboard");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Update Inventory</h2>
      <form onSubmit={updateProduct} style={{ display: "flex", flexDirection: "column" }}>
        <b>Inventory ID</b>
        <input
          type="text"
          value={pid}
          disabled
          style={{ padding: "10px", marginBottom: "10px" }}
          placeholder="Inventory ID"
          
        />
        <b>Inventory Name</b>
        <input
          type="text"
          value={name}
          required
          style={{ padding: "10px", marginBottom: "10px" }}
          placeholder="Inventory Name"
          onChange={(e) => setName(e.target.value)}
        />
        <b>Price</b>
        <input
          type="number"
          value={price}
          required
          style={{ padding: "10px", marginBottom: "10px" }}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <b>Current Quantity</b>
        <input
          type="text"
          value={quantity}
          disabled
          style={{ padding: "10px", marginBottom: "10px" }}
          placeholder="Quantity"
        />
        <b>Use Quantity</b>
        <input
          type="number"
          value={useQuantity}
          required
          style={{ padding: "10px", marginBottom: "10px" }}
          placeholder="Use Quantity"
          max={getMaxAllowedUseQuantity()}
          onChange={(e) => setUseQuantity(e.target.value)}
        />
        <p style={{ marginBottom: "10px" }}>
          Maximum allowed: {getMaxAllowedUseQuantity()}
        </p>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
}