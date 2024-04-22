import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReorderingPage() {
  const [itemIdOptions, setItemIdOptions] = useState([]); // State to store the available item IDs
  const [itemId, setItemId] = useState(""); // State to store the selected item ID
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [itemType, setItemType] = useState("");
  const [category, setCategory] = useState("");
  
  // Fetch item IDs based on selected category
  useEffect(() => {
    const fetchItemIds = async () => {
      try {
        const response = await axios.get(`/StudioInventory/filter?category=${category}`);
        console.log("Response data:", response.data); // Log response data for troubleshooting
        const items = response.data;
        const itemIds = items.map(item => item.pid);
        setItemIdOptions(itemIds);
        console.log("Item IDs:", itemIds); // Log extracted item IDs for troubleshooting
        setItemIdOptions(itemIds);
      } catch (error) {
        console.error("Error fetching item IDs:", error);
      }
    };
  
    if (category) {
      fetchItemIds();
    }
  }, [category]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inventoryItem = {
      itemId,
      quantity,
      date,
      itemType
    };

    try {
      await axios.post("/StudioInventory/reorder", inventoryItem);
      alert("Item sent successfully");
    } catch (error) {
      console.error("Error sending item:", error);
      alert("Failed to send item");
    }
  };

  return (
    <div className="container">
      <h3>Re-ordering Inventory Stocks</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="category">Category</label>
          <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="saloon">Saloon</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="itemId">Item ID</label>
          <select className="form-control" id="itemId" value={itemId} onChange={(e) => setItemId(e.target.value)}>
            <option value="">Select Item ID</option>
            {itemIdOptions.map((pid, index) => (
            <option key={index} value={pid}>{pid}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity">Quantity</label>
          <input type="text" className="form-control" id="quantity" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="itemType">Item Type</label>
          <input type="text" className="form-control" id="itemType" placeholder="Item Type" value={itemType} onChange={(e) => setItemType(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
