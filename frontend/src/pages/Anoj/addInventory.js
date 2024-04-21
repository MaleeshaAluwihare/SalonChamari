import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function AddInventory() {

  const [pid, setID] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    const newProduct = {
      pid,
      name,
      price,
      quantity,
    };

    axios.post('/StudioInventory/add', newProduct)
      .then(() => {
        alert("Product Added");
        navigate("/dash"); // Navigate after successful submission
      })
      .catch((err) => {
        console.error('Error massage:',err)
        alert(err);
      });
  }

  return (
    <div className="container mt-5">
      <h1>Add Inventory</h1>
      <form onSubmit={sendData}>
  
        <div className="mb-3">
          <label htmlFor="inventoryID" className="form-label">Inventory ID</label>
          <input type="text" className="form-control" id="inventoryID" placeholder="Enter inventory ID"
            onChange={(e) => setID(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="inventoryName" className="form-label">Inventory Name</label>
          <input type="text" className="form-control" id="inventoryName" placeholder="Enter inventory name"
            onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="number" className="form-control" id="quantity" placeholder="Enter Quantity"
            onChange={(e) => setQuantity(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" placeholder="Enter Price"
            onChange={(e) => setPrice(e.target.value)} />
        </div>
          
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
