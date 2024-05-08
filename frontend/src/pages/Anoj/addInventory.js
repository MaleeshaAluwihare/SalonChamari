import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddInventory() {
  // State variables to hold form data
  const [category, setCategory] = useState("");
  const [pid, setID] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  // Function to handle form submission
  const sendData = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a new product object with form data
    const newProduct = {
      category,
      pid,
      name,
      price,
      quantity,
    };

    // Send POST request to add new product
    axios
      .post("/StudioInventory/add", newProduct)
      .then(() => {
        alert("Product Added"); // Show success message
        navigate("/inventoryDashboard"); // Redirect to home page
      })
      .catch((err) => {
        console.error("Error message:", err); // Log error message to console
        alert(err); // Show error message to user
      });
  };

  // JSX code for the component
  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Add Inventory</h2>
      <form onSubmit={sendData} style={{ padding: "20px", backgroundColor: "#f2f2f2", borderRadius: "5px" }}>
        {/* Select input for category */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="category" style={{ display: "block", marginBottom: "5px" }}>
            Category
          </label>
          <select
            id="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">Select Category</option>
            <option value="saloon">Saloon</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        {/* Text field for inventory ID */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="inventoryID" style={{ display: "block", marginBottom: "5px" }}>
            Inventory ID
          </label>
          <input
            type="text"
            id="inventoryID"
            placeholder="Enter inventory ID"
            required
            onChange={(e) => setID(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Text field for inventory name */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="inventoryName" style={{ display: "block", marginBottom: "5px" }}>
            Inventory Name
          </label>
          <input
            type="text"
            id="inventoryName"
            placeholder="Enter inventory name"
            required
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Text field for quantity */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="quantity" style={{ display: "block", marginBottom: "5px" }}>
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter Quantity"
            required
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Text field for price */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="price" style={{ display: "block", marginBottom: "5px" }}>
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            required
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Submit button */}
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}