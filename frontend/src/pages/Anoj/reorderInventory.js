import React, { useEffect, useState } from "react";
import axios from "axios";

// Functional component for reordering inventory stocks
export default function ReorderingPage() {
  // State variables to manage form data
  const [itemIdOptions, setItemIdOptions] = useState([]);
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [itemType, setItemType] = useState("");
  const [category, setCategory] = useState("");

  // Validation methods
  const validateItemId = (itemId) => {
    const pattern = /^(ST|SL)\d{3}$/;
    return pattern.test(itemId);
  };

  const validateQuantity = (quantity) => {
    const pattern = /^\d+$/;
    return pattern.test(quantity);
  };

  // Fetch item IDs based on selected category
  useEffect(() => {
    const fetchItemIds = async () => {
      try {
        const response = await axios.get(`/StudioInventory/filter?category=${category}`);
        const items = response.data;
        const itemIds = items.map((item) => item.pid);
        setItemIdOptions(itemIds);
      } catch (error) {
        console.error("Error fetching item IDs:", error);
      }
    };

    if (category) {
      fetchItemIds();
    }
  }, [category]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check validations
    const isItemIdValid = validateItemId(itemId);
    const isQuantityValid = validateQuantity(quantity);

    if (!isItemIdValid) {
      alert("Invalid Inventory ID format. It should be in the format 'ST###' or 'SL###'.");
      return;
    }

    if (!isQuantityValid) {
      alert("Invalid Quantity format. It should be a positive integer.");
      return;
    }

    const inventoryItem = {
      itemId,
      quantity,
      date,
      itemType,
    };

    try {
      await axios.post("/StudioInventory/reorder", inventoryItem);
      alert("Item sent successfully");
    } catch (error) {
      console.error("Error sending item:", error);
      alert("Failed to send item");
    }
  };

  // JSX code for rendering the component
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", display: "flex", flexWrap: "wrap" }}>
      <h2 style={{ textAlign: "center" }}>Re-ordering Inventory Stocks</h2>
      <form onSubmit={handleSubmit} style={{ padding: "20px", backgroundColor: "#f2f2f2", borderRadius: "20px" }}>
        {/* Select category */}
        <div style={{ marginBottom: "20px", marginRight: "20px" }}>
          <label htmlFor="category" style={{ display: "block", marginBottom: "2px" }}>
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

        {/* Select item ID */}
        <div style={{ marginBottom: "20px", marginRight: "20px" }}>
          <label htmlFor="itemId" style={{ display: "block", marginBottom: "2px" }}>
            Inventory ID
          </label>
          <select
            id="itemId"
            value={itemId}
            required
            onChange={(e) => setItemId(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">Inventory ID</option>
            {itemIdOptions.map((pid, index) => (
              <option key={index} value={pid}>
                {pid}
              </option>
            ))}
          </select>
        </div>

        {/* Input field for quantity */}
        <div style={{ marginBottom: "20px", marginRight: "20px" }}>
          <label htmlFor="quantity" style={{ display: "block", marginBottom: "2px" }}>
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            required
            placeholder="Enter Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        {/* Input field for date */}
        <div style={{ marginBottom: "20px", marginRight: "40px", marginLeft: "-20px" }}>
          <label htmlFor="date" style={{ display: "block", marginBottom: "2px", padding: "2px 5px 2px" }}>
            Date
          </label>
          <input type="date" id="date" value={date} readOnly style={{ width: "100%", padding: "10px" }} />
        </div>

        {/* Input field for item type */}
        <div style={{ marginBottom: "20px", marginRight: "20px" }}>
          <label htmlFor="itemType" style={{ display: "block", marginBottom: "2px" }}>
            Inventory Name
          </label>
          <input
            type="text"
            id="Inventory Name"
            value={itemType}
            required
            placeholder="Enter Inventory Name"
            onChange={(e) => setItemType(e.target.value)}
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
            marginRight: "15px",
            marginLeft: "-10px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}