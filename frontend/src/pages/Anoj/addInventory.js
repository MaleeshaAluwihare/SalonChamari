import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddInventory() {
  const [category, setCategory] = useState("");
  const [pid, setID] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [fieldData, setFieldData] = useState({
    category: "",
    pid: "",
    name: "",
    price: "",
    quantity: "",
  });
  const navigate = useNavigate();

  const clearField = () => {
    setFieldData({
      category: "",
      pid: "",
      name: "",
      price: "",
      quantity: "",
    });
  };

  const handleInput = (e) => {
    const { id, value } = e.target;

    setFieldData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  // Validation methods
  const validateItemId = (itemId) => {
    const pattern = /^(ST|SL)\d{3}$/;
    return pattern.test(itemId);
  };

  const validateQuantity = (quantity) => {
    const pattern = /^\d+$/;
    return pattern.test(quantity);
  };

  // Function to handle form submission
  const sendData = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check validations
    const isItemIdValid = validateItemId(fieldData.pid);
    const isQuantityValid = validateQuantity(fieldData.quantity);

    if (!isItemIdValid) {
      alert("Invalid Inventory ID format. It should be in the format 'ST###' or 'SL###'.");
      return;
    }

    if (!isQuantityValid) {
      alert("Invalid Quantity format. It should be a positive integer.");
      return;
    }

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
      .post("/StudioInventory/add", fieldData)
      .then(() => {
        alert("Product Added"); // Show success message
        clearField(); // Redirect to home page
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
      <form
        onSubmit={sendData}
        style={{ padding: "20px", backgroundColor: "#f2f2f2", borderRadius: "5px" }}
      >
        {/* Select input for category */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="category" style={{ display: "block", marginBottom: "5px" }}>
            Category
          </label>
          <select
            id="category"
            value={fieldData.category}
            required
            onChange={handleInput}
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
            value={fieldData.pid}
            id="pid"
            placeholder="Enter inventory ID"
            required
            onChange={handleInput}
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
            value={fieldData.name}
            id="name"
            placeholder="Enter inventory name"
            required
            onChange={handleInput}
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
            value={fieldData.quantity}
            id="quantity"
            placeholder="Enter Quantity"
            required
            onChange={handleInput}
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
            value={fieldData.price}
            id="price"
            placeholder="Enter Price"
            required
            onChange={handleInput}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "20px",
            marginLeft: "-4px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}