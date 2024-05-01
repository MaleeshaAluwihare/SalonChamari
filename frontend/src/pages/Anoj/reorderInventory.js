import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from "@mui/material";

// Functional component for reordering inventory stocks
export default function ReorderingPage() {
  // State variables to manage form data
  const [itemIdOptions, setItemIdOptions] = useState([]);
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [itemType, setItemType] = useState("");
  const [category, setCategory] = useState("");

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
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Re-ordering Inventory Stocks
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Select category */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="saloon">Saloon</MenuItem>
            <MenuItem value="studio">Studio</MenuItem>
          </Select>
        </FormControl>

        {/* Select item ID */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="itemId-label">Item ID</InputLabel>
          <Select
            labelId="itemId-label"
            id="itemId"
            value={itemId}
            required
            onChange={(e) => setItemId(e.target.value)}
            label="Item ID"
          >
            <MenuItem value="">Select Item ID</MenuItem>
            {itemIdOptions.map((pid, index) => (
              <MenuItem key={index} value={pid}>
                {pid}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Input field for quantity */}
        <TextField
          fullWidth
          margin="normal"
          id="quantity"
          label="Quantity"
          type="text"
          value={quantity}
          required
          onChange={(e) => setQuantity(e.target.value)}
        />

        {/* Input field for date */}
        <TextField
          fullWidth
          margin="normal"
          id="date"
          label="Date"
          type="date"
          value={date}
          disabled
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Input field for item type */}
        <TextField
          fullWidth
          margin="normal"
          id="itemType"
          label="Item Type"
          type="text"
          value={itemType}
          required
          onChange={(e) => setItemType(e.target.value)}
        />

        {/* Submit button */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}
