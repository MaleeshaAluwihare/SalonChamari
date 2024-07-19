import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

export default function UpdateInventory(props) {
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
    const productData = props.selected;
    if (productData) {
      setProductID(productData.pid);
      setName(productData.name);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setUseQuantity(productData.useQuantity);
      setDate(productData.date);
      setTotalUseQuantity(productData.useQuantity || 0);
    }
  }, [props.selected]);
  

  const getMaxAllowedUseQuantity = () => {
    return parseInt(quantity) - totalUseQuantity;
  };

  const updateProduct = (e) => {
    e.preventDefault();
    const maxAllowedUseQuantity = parseInt(quantity) - totalUseQuantity;
    const updatedUseQuantity = parseInt(useQuantity) + totalUseQuantity;
    if (updatedUseQuantity > parseInt(quantity)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Use Quantity cannot exceed available Quantity',
      });
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
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product Updated',
        });
        props.handleUpdate();
        props.showUpdated();
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  };
  

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" ,color:"white"}}>Update Inventory</h2>
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
          disabled
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
        <button 
          type="button"
          onClick={() => props.handleUpdate()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF0000",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}