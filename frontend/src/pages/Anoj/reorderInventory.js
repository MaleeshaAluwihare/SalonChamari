import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReorderingPage() {
  const [itemIdOptions, setItemIdOptions] = useState([]);
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [itemType, setItemType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("salon");

  useEffect(() => {
    const fetchItemIds = async () => {
      try {
        const response = await axios.get(`/StudioInventory/display?category=${selectedCategory}`);
        const itemIds = response.data.map(item => String(item.pid));
        setItemIdOptions(itemIds);
      } catch (error) {
        console.error("Error fetching item IDs:", error);
      }
    };

    fetchItemIds();
  }, [selectedCategory]);

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container">
      <h3>Re-ordering Inventory Stocks</h3>
      <div className="mb-3">
        <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="salon">Salon</option>
          <option value="studio">Studio</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="itemId">Inventory ID</label>
          <select className="form-control" id="itemId" value={itemId} onChange={(e) => setItemId(e.target.value)}>
            <option value="">Select Inventory ID</option>
            {itemIdOptions.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="quantity">Quantity</label>
          <input type="text" className="form-control" id="quantity" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" id="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="itemType">Inventory Type</label>
          <input type="text" className="form-control" id="itemType" placeholder="Inventory Type" value={itemType} onChange={(e) => setItemType(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
